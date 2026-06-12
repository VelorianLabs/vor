export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export async function sendEmail(data: EmailData): Promise<void> {
  // In production, integrate with an email service like Resend, SendGrid, or AWS SES
  // For now, this is a placeholder that logs the email content
  
  console.log('=== EMAIL SERVICE ===');
  console.log('To:', data.to);
  console.log('Subject:', data.subject);
  console.log('Body:', data.text || data.html);
  console.log('===================');
  
  // TODO: Integrate with email service
  // Example with Resend:
  // import { Resend } from 'resend';
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'VOR <noreply@vintageoutlookrealty.com>',
  //   to: data.to,
  //   subject: data.subject,
  //   html: data.html,
  // });
}

export async function sendOTPEmail(email: string, otp: string): Promise<void> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #1e3a5f; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: #d4af37; margin: 0; font-size: 24px;">Vintage Outlook Realty</h1>
      </div>
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #1e3a5f; margin-top: 0;">Your Verification Code</h2>
        <p style="color: #333; line-height: 1.6;">
          You requested a verification code for your property inspection request with Vintage Outlook Realty.
        </p>
        <div style="background: white; padding: 20px; text-align: center; border-radius: 5px; margin: 20px 0;">
          <span style="font-size: 36px; font-weight: bold; color: #1e3a5f; letter-spacing: 5px;">${otp}</span>
        </div>
        <p style="color: #333; line-height: 1.6;">
          This code will expire in 10 minutes. Please do not share this code with anyone.
        </p>
        <p style="color: #666; font-size: 14px; margin-top: 30px;">
          If you did not request this code, please ignore this email.
        </p>
      </div>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: 'Your VOR Verification Code',
    from: 'vorsyd@gmail.com',
    html,
    text: `Your Vintage Outlook Realty verification code is: ${otp}\n\nThis code will expire in 10 minutes.`,
  });
}

export async function sendInspectionLetters(
  clientEmail: string,
  clientLetter: string,
  vorLetter: string,
  clientName: string
): Promise<void> {
  // Send Letter of Service to client
  await sendEmail({
    to: clientEmail,
    subject: 'Letter of Confirmation - Vintage Outlook Realty',
    from: 'vorsyd@gmail.com',
    text: clientLetter,
    html: `<pre style="font-family: monospace; white-space: pre-wrap;">${clientLetter}</pre>`,
  });

  // Send Letter of Request to VOR
  await sendEmail({
    to: 'vorsyd@gmail.com', // VOR's email
    subject: `Inspection Request - ${clientName}`,
    text: vorLetter,
    html: `<pre style="font-family: monospace; white-space: pre-wrap;">${vorLetter}</pre>`,
  });
}
