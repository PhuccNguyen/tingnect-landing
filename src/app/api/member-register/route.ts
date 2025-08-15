// src/app/api/member-register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { google, Auth } from 'googleapis'
import { JWT } from 'google-auth-library';
import { sheets_v4 } from 'googleapis';



interface MemberRegistrationData {
  cardID: string;
  fullName: string;
  phone: string;
  email: string;
  telegram?: string;
  role?: string;
  experience?: string;
  interests: string[];
  consent: boolean;
  timestamp: string;
  userAgent: string;
  consentTimestamp: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  cardID?: string;
  sheetRowNumber?: number;
  telegramMessageId?: number;
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

interface GoogleSheetsError extends Error {
  code?: number;
  errors?: Array<{
    message: string;
    domain: string;
    reason: string;
  }>;
}

interface TelegramResponse {
  ok: boolean;
  result?: {
    message_id: number;
  };
  error_code?: number;
  description?: string;
}

interface TelegramPayload {
  chat_id: string;
  text: string;
  parse_mode: 'Markdown' | 'HTML';
  disable_web_page_preview: boolean;
  disable_notification: boolean;
  message_thread_id?: number;
}

// Rate limiting store
const rateLimitStore: RateLimitStore = {};

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5;

  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = { count: 1, resetTime: now + windowMs };
    return true;
  }

  if (now > rateLimitStore[ip].resetTime) {
    rateLimitStore[ip] = { count: 1, resetTime: now + windowMs };
    return true;
  }

  if (rateLimitStore[ip].count >= maxRequests) {
    return false;
  }

  rateLimitStore[ip].count++;
  return true;
}

// Validation functions
function validateCardID(cardID: string): boolean {
  return /^\d{2,}$/.test(cardID) && cardID.length >= 2;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  return /^\+84\d{9,10}$/.test(phone);
}

function validateTelegram(telegram: string): boolean {
  if (!telegram || telegram.trim() === '') return true;
  return /^@?[a-zA-Z0-9_]{5,32}$/.test(telegram.replace('@', ''));
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>\"']/g, '');
}

// Google Sheets setup with proper JWT authentication
async function getGoogleSheetsClient() {
  try {
    const credentials = {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(process.env.GOOGLE_CLIENT_EMAIL || '')}`
    };

    console.log('Setting up Google Sheets client...');
    
    // Create JWT client directly
    const jwtClient = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    await jwtClient.authorize();
    
    // Initialize google.sheets with proper typing
    const sheets = google.sheets({
      version: 'v4',
      auth: jwtClient as unknown as Auth.OAuth2Client, // Cast to OAuth2Client type
    });
    
    console.log('Google Sheets client setup successful');
    return sheets;
  } catch (error) {
    console.error('Google Sheets client setup error:', error);
    throw new Error(`Failed to setup Google Sheets client: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Format data beautifully for Google Sheets
function formatSheetData(data: MemberRegistrationData, ip: string, rowNumber: number): string[][] {
  const vnTime = new Date(data.timestamp).toLocaleString('vi-VN', { 
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // Role formatting
  const roleDisplay = data.role ? formatRoleForSheet(data.role) : '';
  
  // Experience formatting
  const experienceDisplay = data.experience ? formatExperienceForSheet(data.experience) : '';
  
  // Interests formatting
  const interestsDisplay = data.interests.length > 0 ? data.interests.join(', ') : '';

  // Status formatting
  const statusEmoji = '✅ ACTIVE';
  
  return [[
    data.cardID,
    data.fullName,
    data.email,
    data.phone,
    data.telegram || '',
    roleDisplay,
    experienceDisplay,
    interestsDisplay,
    statusEmoji,
    vnTime,
    data.userAgent.substring(0, 50) + '...',
    ip,
    `=HYPERLINK("${process.env.NEXT_PUBLIC_MAIN_SITE_URL}", "TingNect")`,
    rowNumber.toString()
  ]];
}

function formatRoleForSheet(role: string): string {
  const roleMap: { [key: string]: string } = {
    developer: '👨‍💻 Developer',
    founder: '🚀 Founder', 
    investor: '💰 Investor',
    builder: '🔨 Builder',
    designer: '🎨 Designer',
    marketer: '📢 Marketer',
    community: '👥 Community Manager',
    other: '🔥 Other'
  };
  return roleMap[role] || role;
}

function formatExperienceForSheet(experience: string): string {
  const expMap: { [key: string]: string } = {
    beginner: '🌱 Beginner (0-1y)',
    intermediate: '🚀 Intermediate (1-3y)',
    advanced: '⚡ Advanced (3-5y)',
    expert: '💎 Expert (5y+)'
  };
  return expMap[experience] || experience;
}

// Save data to Google Sheets with beautiful formatting
async function saveToGoogleSheets(data: MemberRegistrationData, ip: string): Promise<number> {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error('Google Sheet ID not configured');
    }

    console.log('Saving to Google Sheets...');

    // Check if Card ID already exists
    try {
      const existingData = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Members!A:A',
      });

      const existingIds = existingData.data.values?.flat().slice(1) || []; // Skip header
      if (existingIds.includes(data.cardID)) {
        throw new Error('Card ID already exists');
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'Card ID already exists') {
        throw error;
      }
      console.warn('Could not check existing IDs, proceeding with insert...');
    }

    // Get current row count to determine new row number
    const currentData = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Members!A:A',
    });
    
    const newRowNumber = (currentData.data.values?.length || 1) + 1;
    
    // Format data for sheet
    const formattedData = formatSheetData(data, ip, newRowNumber - 1);

    // Append to sheet
    const appendResult = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Members!A:N',
      valueInputOption: 'USER_ENTERED', // This allows formulas to work
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: formattedData,
      },
    });

    // Apply formatting to the new row
    await formatNewRow(sheets, spreadsheetId, newRowNumber);

    console.log('Data saved to Google Sheets successfully');
    return newRowNumber - 1; // Return actual row number (excluding header)

  } catch (error) {
    console.error('Google Sheets save error:', error);
    const gsError = error as GoogleSheetsError;
    
    if (gsError.message?.includes('Card ID already exists')) {
      throw new Error('Card ID already exists');
    }
    
    if (gsError.code === 429) {
      throw new Error('Google Sheets service temporarily unavailable. Please try again later.');
    }
    
    throw new Error(`Failed to save to Google Sheets: ${gsError.message || 'Unknown error'}`);
  }
}

// Apply beautiful formatting to new row
async function formatNewRow(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  rowNumber: number
): Promise<void> {  try {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: rowNumber - 1,
                endRowIndex: rowNumber,
                startColumnIndex: 0,
                endColumnIndex: 14
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    red: 0.95,
                    green: 0.98,
                    blue: 1.0
                  },
                  textFormat: {
                    fontFamily: 'Google Sans',
                    fontSize: 10
                  },
                  borders: {
                    top: { style: 'SOLID', width: 1, color: { red: 0.8, green: 0.8, blue: 0.8 }},
                    bottom: { style: 'SOLID', width: 1, color: { red: 0.8, green: 0.8, blue: 0.8 }},
                    left: { style: 'SOLID', width: 1, color: { red: 0.8, green: 0.8, blue: 0.8 }},
                    right: { style: 'SOLID', width: 1, color: { red: 0.8, green: 0.8, blue: 0.8 }}
                  }
                }
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat,borders)'
            }
          }
        ]
      }
    });
  } catch (formatError) {
    console.warn('Could not apply formatting to new row:', formatError);
    // Don't throw error - formatting failure shouldn't break the main process
  }
}

// Send simple professional Telegram notification
async function sendTelegramNotification(data: MemberRegistrationData, rowNumber: number): Promise<number | undefined> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const messageThreadId = process.env.MESSAGE_THREAD_ID;

  if (!botToken || !chatId) {
    console.warn('Telegram credentials not configured');
    return undefined;
  }

  // Simple professional message
  const message = `
🎉 *New TingNect Member*

**${data.fullName}** has joined!
📧 ${data.email}
💳 Card ID: \`${data.cardID}\`
📱 ${data.phone}

[View Details](https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}) • Row #${rowNumber}

#TingNect #NewMember
  `;

  try {
    console.log('Sending Telegram notification...');
    
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const payload: TelegramPayload = {
      chat_id: chatId,
      text: message.trim(),
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
      disable_notification: false,
    };

    // Add message thread ID if provided
    if (messageThreadId) {
      payload.message_thread_id = parseInt(messageThreadId);
      console.log(`Sending to topic thread: ${messageThreadId}`);
    }

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'User-Agent': 'TingNect-Bot/1.0'
      },
      body: JSON.stringify(payload),
    });

    const result: TelegramResponse = await response.json();

    if (result.ok) {
      console.log('Telegram notification sent successfully');
      return result.result?.message_id;
    } else {
      console.error('Telegram API error:', result);
      return undefined;
    }

  } catch (telegramError) {
    console.error('Telegram notification error:', telegramError);
    return undefined;
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';

    console.log(`Registration request from IP: ${ip}`);

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    let body: MemberRegistrationData;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { success: false, message: 'Invalid request format' },
        { status: 400 }
      );
    }

    console.log('Processing registration for Card ID:', body.cardID);

    // Validate required fields
    const requiredFields: (keyof MemberRegistrationData)[] = [
      'cardID', 'fullName', 'phone', 'email', 'consent'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate data formats
    if (!validateCardID(body.cardID)) {
      return NextResponse.json(
        { success: false, message: 'Card ID must be at least 2 digits' },
        { status: 400 }
      );
    }

    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!validatePhone(body.phone)) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    if (body.telegram && !validateTelegram(body.telegram)) {
      return NextResponse.json(
        { success: false, message: 'Invalid Telegram username format' },
        { status: 400 }
      );
    }

    if (!body.consent) {
      return NextResponse.json(
        { success: false, message: 'Consent is required' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData: MemberRegistrationData = {
      cardID: sanitizeInput(body.cardID),
      fullName: sanitizeInput(body.fullName),
      phone: sanitizeInput(body.phone),
      email: sanitizeInput(body.email),
      telegram: body.telegram ? sanitizeInput(body.telegram) : undefined,
      role: body.role ? sanitizeInput(body.role) : undefined,
      experience: body.experience ? sanitizeInput(body.experience) : undefined,
      interests: Array.isArray(body.interests) ? body.interests.map(interest => sanitizeInput(interest)) : [],
      consent: body.consent,
      timestamp: body.timestamp || new Date().toISOString(),
      userAgent: sanitizeInput(body.userAgent || ''),
      consentTimestamp: body.consentTimestamp || new Date().toISOString()
    };

    // Save to Google Sheets
    let rowNumber: number;
    try {
      rowNumber = await saveToGoogleSheets(sanitizedData, ip);
    } catch (sheetsError) {
      console.error('Google Sheets error:', sheetsError);
      
      if (sheetsError instanceof Error && sheetsError.message.includes('Card ID already exists')) {
        return NextResponse.json(
          { success: false, message: 'Card ID already exists. Please choose a different ID.' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { success: false, message: 'Failed to save registration data. Please try again.' },
        { status: 500 }
      );
    }

    // Send Telegram notification
    const messageId = await sendTelegramNotification(sanitizedData, rowNumber);

    console.log(`Registration successful for Card ID: ${sanitizedData.cardID}, Row: ${rowNumber}`);

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Registration successful! Welcome to TingNect Elite community.',
      cardID: sanitizedData.cardID,
      sheetRowNumber: rowNumber,
      telegramMessageId: messageId
    });

  } catch (generalError) {
    console.error('Registration API error:', generalError);
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}



export async function GET(): Promise<NextResponse<ApiResponse>> {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}
