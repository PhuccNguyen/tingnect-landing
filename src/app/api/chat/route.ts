import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const { message, threadId, assistantId } = await request.json();

    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Check API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not found in environment variables');
      return NextResponse.json(
        { success: false, error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const defaultAssistantId = process.env.OPENAI_ASSISTANT_ID;
    const finalAssistantId = assistantId || defaultAssistantId;

    if (!finalAssistantId) {
      return NextResponse.json(
        { success: false, error: 'Assistant ID not configured' },
        { status: 500 }
      );
    }

    let currentThreadId = threadId;

    // Create new thread if none exists
    if (!currentThreadId) {
      try {
        const thread = await openai.beta.threads.create();
        currentThreadId = thread.id;
      } catch (error) {
        console.error('Failed to create thread:', error);
        return NextResponse.json(
          { success: false, error: 'Failed to initialize conversation' },
          { status: 500 }
        );
      }
    }

    try {
      // Add message to thread
      await openai.beta.threads.messages.create(currentThreadId, {
        role: 'user',
        content: message,
      });

      // Run assistant
      const run = await openai.beta.threads.runs.create(currentThreadId, {
        assistant_id: finalAssistantId,
      });

      // Wait for completion with timeout
      let runStatus = await openai.beta.threads.runs.retrieve(run.id, { thread_id: currentThreadId });
      let attempts = 0;
      const maxAttempts = 30; // 30 seconds timeout

      while ((runStatus.status === 'in_progress' || runStatus.status === 'queued') && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        runStatus = await openai.beta.threads.runs.retrieve(run.id, { thread_id: currentThreadId });
        attempts++;
      }

      if (runStatus.status === 'completed') {
        // Get latest messages
        const messages = await openai.beta.threads.messages.list(currentThreadId, {
          limit: 1,
          order: 'desc'
        });
        
        const lastMessage = messages.data[0];

        if (lastMessage && lastMessage.role === 'assistant' && lastMessage.content[0]?.type === 'text') {
          return NextResponse.json({
            success: true,
            message: lastMessage.content[0].text.value,
            threadId: currentThreadId,
          });
        }
      } else if (runStatus.status === 'failed') {
        console.error('Run failed:', runStatus.last_error);
        return NextResponse.json(
          { success: false, error: 'Assistant processing failed' },
          { status: 500 }
        );
      } else if (attempts >= maxAttempts) {
        return NextResponse.json(
          { success: false, error: 'Response timeout. Please try again.' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: false, error: 'No response generated' },
        { status: 500 }
      );

    } catch (assistantError) {
      console.error('Assistant API error:', assistantError);
      return NextResponse.json(
        { success: false, error: 'Failed to process request with assistant' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// Handle GET requests
export async function GET() {
  return NextResponse.json(
    { message: 'Chat API is running. Use POST to send messages.' },
    { status: 200 }
  );
}
