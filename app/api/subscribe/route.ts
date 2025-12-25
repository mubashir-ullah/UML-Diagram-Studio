import { NextResponse } from "next/server";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Email service configuration
// You can use one of these services:
// 1. Resend (recommended) - https://resend.com (free tier: 3,000 emails/month)
// 2. Mailchimp - https://mailchimp.com (free tier: 500 contacts)
// 3. ConvertKit - https://convertkit.com (free tier available)
// 4. Buttondown - https://buttondown.email (free tier available)

async function subscribeToResend(email: string) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY not configured");
  }

  // Resend uses contacts API to manage subscribers
  // First, try to get or create an audience
  let audienceId = process.env.RESEND_AUDIENCE_ID;

  // If no audience ID is provided, get the first audience or create one
  if (!audienceId) {
    const audiencesResponse = await fetch("https://api.resend.com/audiences", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
    });

    if (audiencesResponse.ok) {
      const audiencesData = await audiencesResponse.json();
      if (audiencesData.data && audiencesData.data.length > 0) {
        audienceId = audiencesData.data[0].id;
      } else {
        // Create a new audience
        const createResponse = await fetch("https://api.resend.com/audiences", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "UML Diagram Studio Subscribers",
          }),
        });

        if (createResponse.ok) {
          const newAudience = await createResponse.json();
          audienceId = newAudience.id;
        } else {
          // If audience creation fails, we can still add the contact without an audience
          console.warn("Could not create audience, proceeding without audience ID");
        }
      }
    }
  }

  // Add contact to audience (or create contact if no audience)
  const contactUrl = audienceId
    ? `https://api.resend.com/audiences/${audienceId}/contacts`
    : "https://api.resend.com/contacts";

  const contactResponse = await fetch(contactUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  if (!contactResponse.ok) {
    const error = await contactResponse.json().catch(() => ({}));
    const errorMessage = error.message || error.error?.message || "Failed to add contact";
    
    // If contact already exists, that's okay
    if (
      errorMessage.toLowerCase().includes("already exists") ||
      errorMessage.toLowerCase().includes("duplicate") ||
      contactResponse.status === 409
    ) {
      return { success: true, message: "Email already subscribed!" };
    }
    
    throw new Error(errorMessage);
  }

  const result = await contactResponse.json();
  return { success: true, message: "Successfully subscribed!" };
}

async function subscribeToMailchimp(email: string) {
  if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_LIST_ID) {
    throw new Error("Mailchimp credentials not configured");
  }

  const [_, dataCenter] = process.env.MAILCHIMP_API_KEY.split("-");
  const response = await fetch(
    `https://${dataCenter}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    // If member already exists, that's okay
    if (error.title === "Member Exists") {
      return { success: true, message: "Email already subscribed!" };
    }
    throw new Error(error.detail || "Failed to subscribe");
  }

  return { success: true, message: "Successfully subscribed!" };
}

async function subscribeToConvertKit(email: string) {
  if (!process.env.CONVERTKIT_API_KEY || !process.env.CONVERTKIT_FORM_ID) {
    throw new Error("ConvertKit credentials not configured");
  }

  const response = await fetch(
    `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to subscribe");
  }

  return { success: true, message: "Successfully subscribed!" };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = subscribeSchema.parse(body);

    // Determine which email service to use based on environment variables
    let result;

    if (process.env.RESEND_API_KEY) {
      result = await subscribeToResend(email);
    } else if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
      result = await subscribeToMailchimp(email);
    } else if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID) {
      result = await subscribeToConvertKit(email);
    } else {
      // Fallback: Just log the email (for development/testing)
      console.log("Email subscription (no service configured):", email);
      result = {
        success: true,
        message: "Subscription received! (Email service not configured)",
      };
    }

    return NextResponse.json(
      { message: result.message },
      { status: result.success ? 201 : 400 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Subscribe error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to subscribe. Please try again later.",
      },
      { status: 500 }
    );
  }
}

