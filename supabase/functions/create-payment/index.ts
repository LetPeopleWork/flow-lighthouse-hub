import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, organization, licenseType = "premium" } = await req.json();

    // Validate required fields
    if (!name || !email) {
      throw new Error("Name and email are required");
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Define pricing based on license type
    const prices = {
      premium: 49900, // $499 in cents
      enterprise: 99900, // $999 in cents
    };

    const productNames = {
      premium: "Lighthouse Premium License",
      enterprise: "Lighthouse Enterprise License",
    };

    const amount = prices[licenseType as keyof typeof prices] || prices.premium;
    const productName = productNames[licenseType as keyof typeof productNames] || productNames.premium;

    // Check if a Stripe customer record exists for this email
    const customers = await stripe.customers.list({ email: email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Create a one-time payment session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: productName,
              description: `License for ${organization || 'Individual'}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        customer_name: name,
        customer_email: email,
        organization: organization || '',
        license_type: licenseType,
      },
      success_url: `${req.headers.get("origin")}/lighthouse?payment=success`,
      cancel_url: `${req.headers.get("origin")}/lighthouse?payment=canceled`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Error in create-payment:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});