/**
 * Form Service
 * Handles form submissions to the API
 */

export interface FormSubmissionData {
  formType: 'contact' | 'enquiry' | 'newsletter' | 'feedback' | 'landing' | 'quote';
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  eventType?: string;
  eventDate?: string;
  location?: string;
  message?: string;
  source?: string;
  overallRating?: number;
  role?: string;
  comments?: string;
  [key: string]: any; // Allow additional fields
}

export interface FormSubmissionResponse {
  success: boolean;
  message: string;
  id?: string | number;
  error?: string;
}

export class FormService {
  private static readonly API_ENDPOINT = '/api/submit-form';

  /**
   * Submit form data to the API
   */
  static async submitForm(data: FormSubmissionData): Promise<FormSubmissionResponse> {
    try {
      const response = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.error || 'Form submission failed',
          error: result.error,
        };
      }

      return {
        success: true,
        message: result.message || 'Form submitted successfully',
        id: result.id,
      };
    } catch (error) {
      console.error('Form submission error:', error);
      
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Submit contact form
   */
  static async submitContactForm(data: {
    name?: string;
    email: string;
    phone?: string;
    company?: string;
    eventType?: string;
    message?: string;
  }): Promise<FormSubmissionResponse> {
    return this.submitForm({
      ...data,
      formType: 'contact',
      source: 'contact-page',
    });
  }

  /**
   * Submit enquiry popup form
   */
  static async submitEnquiryForm(data: {
    name?: string;
    email: string;
    phone?: string;
    eventType?: string;
    eventDate?: string;
    location?: string;
    message?: string;
    source?: string;
  }): Promise<FormSubmissionResponse> {
    return this.submitForm({
      ...data,
      formType: 'enquiry',
      source: data.source || 'enquiry-popup',
    });
  }

  /**
   * Submit newsletter subscription
   */
  static async submitNewsletterForm(data: {
    email: string;
    source?: string;
  }): Promise<FormSubmissionResponse> {
    return this.submitForm({
      ...data,
      formType: 'newsletter',
      source: data.source || 'footer-newsletter',
    });
  }

  /**
   * Submit feedback form
   */
  static async submitFeedbackForm(data: {
    name?: string;
    role?: string;
    overallRating?: number;
    comments?: string;
    [key: string]: any;
  }): Promise<FormSubmissionResponse> {
    return this.submitForm({
      ...data,
      formType: 'feedback',
      email: 'feedback@whitemassif.com', // Default email for feedback
      source: 'feedback-page',
    });
  }

  /**
   * Submit landing page form
   */
  static async submitLandingPageForm(data: {
    name?: string;
    email: string;
    phone?: string;
    company?: string;
    eventType?: string;
    message?: string;
    source?: string;
    [key: string]: any;
  }): Promise<FormSubmissionResponse> {
    return this.submitForm({
      ...data,
      formType: 'landing',
      source: data.source || 'landing-page',
    });
  }

  /**
   * Submit quick quote form
   */
  static async submitQuoteForm(data: {
    name?: string;
    email: string;
    phone?: string;
    company?: string;
    eventType?: string;
    eventDate?: string;
    message?: string;
    source?: string;
  }): Promise<FormSubmissionResponse> {
    return this.submitForm({
      ...data,
      formType: 'quote',
      source: data.source || 'quote-form',
    });
  }

  /**
   * Validate email format
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone number format (basic validation)
   */
  static validatePhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{3,14}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  }

  /**
   * Sanitize form data
   */
  static sanitizeFormData(data: any): any {
    const sanitized: any = {};
    
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        // Basic XSS prevention
        sanitized[key] = value
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;')
          .trim();
      } else {
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  }

  /**
   * Get form submission status message
   */
  static getStatusMessage(isSuccess: boolean, formType: string): string {
    if (isSuccess) {
      switch (formType) {
        case 'contact':
          return 'Thank you for contacting us! We&apos;ll get back to you soon.';
        case 'enquiry':
          return 'Thank you for your enquiry! Our team will contact you soon to discuss your event.';
        case 'newsletter':
          return 'Successfully subscribed to our newsletter!';
        case 'feedback':
          return 'Thank you for your valuable feedback!';
        case 'landing':
          return 'Thank you for your interest! We&apos;ll be in touch soon.';
        case 'quote':
          return 'Thank you! We&apos;ll prepare a quote and send it to you shortly.';
        default:
          return 'Form submitted successfully!';
      }
    } else {
      return 'Sorry, there was an error submitting your form. Please try again or contact us directly.';
    }
  }
}