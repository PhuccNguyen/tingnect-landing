import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, type } = body;

    // Here you would integrate with Google Sheets and Telegram
    // For now, just return success
    
    console.log('Contact form submission:', { name, email, message, type });

    // TODO: Implement Google Sheets integration
    // TODO: Implement Telegram notification

    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}