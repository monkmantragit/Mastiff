import { NextRequest, NextResponse } from 'next/server';

// Helper function to get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');
  const cloudflare = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (cloudflare) {
    return cloudflare;
  }
  if (real) {
    return real;
  }
  
  return 'unknown';
}

// Helper function to submit to Directus
async function submitToDirectus(collection: string, data: any) {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
  const directusToken = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN;

  if (!directusUrl || !directusToken) {
    throw new Error('Directus configuration missing');
  }

  const response = await fetch(`${directusUrl}/items/${collection}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${directusToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Directus API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formType, ...formData } = body;

    // Get client information
    const clientIP = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer') || '';

    // Validate required fields
    if (!formType) {
      return NextResponse.json(
        { error: 'Form type is required' },
        { status: 400 }
      );
    }

    let result;

    switch (formType) {
      case 'contact':
      case 'enquiry':
      case 'landing':
      case 'quote': {
        // Validate email is present
        if (!formData.email) {
          return NextResponse.json(
            { error: 'Email is required' },
            { status: 400 }
          );
        }

        // Prepare form submission data
        const submissionData = {
          form_type: formType,
          name: formData.name || null,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          event_type: formData.eventType || null,
          event_date: formData.eventDate || null,
          location: formData.location || null,
          message: formData.message || null,
          source: formData.source || referer,
          form_data: formData, // Store complete form data as JSON
          ip_address: clientIP,
          user_agent: userAgent,
          status: 'new',
          notes: null,
        };

        result = await submitToDirectus('form_submissions', submissionData);
        break;
      }

      case 'newsletter': {
        // Validate email is present
        if (!formData.email) {
          return NextResponse.json(
            { error: 'Email is required' },
            { status: 400 }
          );
        }

        // Check if email already exists
        try {
          const existingResponse = await fetch(
            `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/newsletter_subscribers?filter={"email":{"_eq":"${formData.email}"}}`,
            {
              headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`,
                'Content-Type': 'application/json',
              },
            }
          );

          if (existingResponse.ok) {
            const existingData = await existingResponse.json();
            if (existingData.data && existingData.data.length > 0) {
              return NextResponse.json(
                { error: 'Email already subscribed' },
                { status: 409 }
              );
            }
          }
        } catch (error) {
          // Continue with subscription if check fails
          console.warn('Error checking existing subscription:', error);
        }

        // Prepare newsletter subscription data
        const subscriptionData = {
          email: formData.email,
          source: formData.source || referer,
          status: 'active',
          ip_address: clientIP,
        };

        result = await submitToDirectus('newsletter_subscribers', subscriptionData);
        break;
      }

      case 'feedback': {
        // Prepare feedback data
        const feedbackData = {
          name: formData.name || null,
          role: formData.role || null,
          overall_rating: formData.overallRating || null,
          feedback_data: formData, // Store complete feedback as JSON
          comments: formData.comments || null,
        };

        result = await submitToDirectus('feedback_responses', feedbackData);
        break;
      }

      default:
        return NextResponse.json(
          { error: 'Invalid form type' },
          { status: 400 }
        );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      id: result.data?.id || result.id,
    });

  } catch (error) {
    console.error('Form submission error:', error);

    // Return appropriate error response
    if (error instanceof Error) {
      if (error.message.includes('Directus API error')) {
        return NextResponse.json(
          { error: 'Database error. Please try again later.' },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit forms.' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit forms.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit forms.' },
    { status: 405 }
  );
}