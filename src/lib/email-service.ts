/**
 * Email Service
 * Handles sending emails for form submissions
 */

import nodemailer from 'nodemailer';

export interface EmailData {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  text?: string;
  attachments?: any[];
}

export class EmailService {
  private static transporter: nodemailer.Transporter;

  /**
   * Initialize the email transporter
   */
  private static getTransporter() {
    if (!this.transporter) {
      // Create reusable transporter object using SMTP transport
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    }
    return this.transporter;
  }

  /**
   * Send an email
   */
  static async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      const { to, subject, html, from, text, attachments } = emailData;
      
      const mailOptions = {
        from: from || process.env.SMTP_FROM || 'White Massif <noreply@whitemassif.com>',
        to,
        subject,
        text: text || '',
        html,
        attachments: attachments || [],
      };

      const transporter = this.getTransporter();
      await transporter.sendMail(mailOptions);
      
      return true;
    } catch (error) {
      console.error('Email sending error:', error);
      return false;
    }
  }

  /**
   * Generate contact form notification email
   */
  static generateContactFormEmail(formData: any): EmailData {
    const adminEmail = process.env.ADMIN_EMAIL || 'info@whitemassif.com';
    
    // Format the form data for the email
    const formattedData = Object.entries(formData)
      .map(([key, value]) => {
        // Skip empty values and formType
        if (!value || key === 'formType') return null;
        
        // Format the key for better readability
        const formattedKey = key
          .replace(/([A-Z])/g, ' $1') // Add space before capital letters
          .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
        
        return `<tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">${formattedKey}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${value}</td>
        </tr>`;
      })
      .filter(Boolean)
      .join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Lead from Contact Page</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2A3959; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          table { width: 100%; border-collapse: collapse; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          .highlight { color: #F9A625; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Lead from Contact Page</h1>
          </div>
          <div class="content">
            <p>A new lead has been submitted through the contact form:</p>
            
            <table>
              ${formattedData}
            </table>
            
            <p style="margin-top: 20px;">
              <strong>Source:</strong> ${formData.source || 'Contact Page'}
            </p>
          </div>
          <div class="footer">
            <p>This is an automated notification from <span class="highlight">White Massif</span>.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return {
      to: adminEmail,
      subject: 'New Lead from Contact Page',
      html,
    };
  }

  /**
   * Generate enquiry form notification email
   */
  static generateEnquiryFormEmail(formData: any): EmailData {
    const adminEmail = process.env.ADMIN_EMAIL || 'info@whitemassif.com';
    
    // Format the form data for the email
    const formattedData = Object.entries(formData)
      .map(([key, value]) => {
        // Skip empty values and formType
        if (!value || key === 'formType') return null;
        
        // Format the key for better readability
        const formattedKey = key
          .replace(/([A-Z])/g, ' $1') // Add space before capital letters
          .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
        
        return `<tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">${formattedKey}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${value}</td>
        </tr>`;
      })
      .filter(Boolean)
      .join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Enquiry Received</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2A3959; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          table { width: 100%; border-collapse: collapse; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          .highlight { color: #F9A625; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Enquiry Received</h1>
          </div>
          <div class="content">
            <p>A new enquiry has been submitted:</p>
            
            <table>
              ${formattedData}
            </table>
            
            <p style="margin-top: 20px;">
              <strong>Source:</strong> ${formData.source || 'Enquiry Form'}
            </p>
          </div>
          <div class="footer">
            <p>This is an automated notification from <span class="highlight">White Massif</span>.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return {
      to: adminEmail,
      subject: 'New Enquiry Received',
      html,
    };
  }
}