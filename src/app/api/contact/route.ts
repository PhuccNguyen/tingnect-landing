import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  fullName: string;
  email: string;
  company?: string;
  phone?: string;
  telegramHandle?: string;
  inquiryType?: string;
  subject: string;
  message: string;
}

async function sendToTelegram(data: ContactFormData) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const messageThreadId = process.env.MESSAGE_THREAD_ID;

  if (!botToken || !chatId) {
    throw new Error('Missing Telegram bot configuration');
  }

  const inquiryTypeEmoji = {
    'partnership': '🤝',
    'development': '💻',
    'investment': '💰',
    'community': '👥',
    'technical': '🛠️',
    'media': '📰',
    'other': '📋'
  };

  const emoji = inquiryTypeEmoji[data.inquiryType as keyof typeof inquiryTypeEmoji] || '📋';

  const message = `
🔔 *New Contact Form Submission - TingNect*

👤 *Name:* ${data.fullName}
📧 *Email:* ${data.email}
${data.company ? `🏢 *Company:* ${data.company}` : ''}
${data.phone ? `📱 *Phone:* ${data.phone}` : ''}
${data.telegramHandle ? `💬 *Telegram:* ${data.telegramHandle}` : ''}
${data.inquiryType ? `${emoji} *Inquiry Type:* ${data.inquiryType}` : ''}

📝 *Subject:* ${data.subject}

💬 *Message:*
${data.message}

⏰ *Submitted:* ${new Date().toLocaleString('en-US', { 
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })} (GMT+7)

🌐 *Source:* TingNect Contact Form
  `.trim();

  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  const payload = {
    chat_id: chatId,
    text: message,
    parse_mode: 'Markdown',
    ...(messageThreadId && { message_thread_id: parseInt(messageThreadId) }),
  };

  const response = await fetch(telegramUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Telegram API Error: ${error}`);
  }

  return await response.json();
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Enhanced validation
    if (!data.fullName || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Sanitize telegram handle
    if (data.telegramHandle && !data.telegramHandle.startsWith('@')) {
      data.telegramHandle = '@' + data.telegramHandle.replace(/^@+/, '');
    }

    // Send to Telegram
    await sendToTelegram(data);

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting TingNect! We\'ll get back to you within 24 hours.',
    });

  } catch (error) {
    console.error('Contact API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error 
          ? error.message 
          : 'Unable to send message. Please try again or contact us directly at contact@tingnect.com'
      },
      { status: 500 }
    );
  }
}
