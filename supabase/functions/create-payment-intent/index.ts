import { corsHeaders } from "../_shared/cors.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
      status: 200,
    });
  }

  try {
    const {
      campaignId,
      amount,
      receiptEmail,
      donorName,
      donorMessage,
      isAnonymous,
    } = await req.json();

    // Validate input
    if (!campaignId || !amount) {
      return new Response(
        JSON.stringify({ error: "Campaign ID and amount are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (amount < 500) {
      return new Response(
        JSON.stringify({
          error: "Minimum donation amount is $5.00 USD (500 cents)",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase environment variables");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify campaign exists and is active
    const { data: campaign, error: campaignError } = await supabase
      .from("campaigns")
      .select("id, title, status")
      .eq("id", campaignId)
      .single();

    if (campaignError || !campaign) {
      return new Response(JSON.stringify({ error: "Campaign not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (campaign.status !== "active") {
      return new Response(JSON.stringify({ error: "Campaign is not active" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create Stripe Payment Intent using PICA API
    const picaSecretKey = Deno.env.get("PICA_SECRET_KEY");
    const picaConnectionKey = Deno.env.get("PICA_STRIPE_CONNECTION_KEY");

    if (!picaSecretKey || !picaConnectionKey) {
      console.error("Missing PICA environment variables");
      return new Response(
        JSON.stringify({ error: "Payment service configuration error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const url = "https://api.picaos.com/v1/passthrough/payment_intents";
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-pica-secret": picaSecretKey,
      "x-pica-connection-key": picaConnectionKey,
      "x-pica-action-id": "conn_mod_def::GCmOAuPP5MQ::O0MeKcobRza5lZQrIkoqBA",
    };

    const bodyParams = new URLSearchParams();
    bodyParams.append("amount", amount.toString());
    bodyParams.append("currency", "usd");
    bodyParams.append("automatic_payment_methods[enabled]", "true");
    bodyParams.append("description", `Donation to ${campaign.title}`);

    if (receiptEmail) {
      bodyParams.append("receipt_email", receiptEmail);
    }

    // Add metadata
    bodyParams.append("metadata[campaign_id]", campaignId);
    bodyParams.append("metadata[donor_name]", donorName || "Anonymous");
    if (donorMessage) {
      bodyParams.append("metadata[donor_message]", donorMessage);
    }
    bodyParams.append("metadata[is_anonymous]", isAnonymous ? "true" : "false");

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: bodyParams.toString(),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Stripe API error:", response.status, errorBody);
      return new Response(
        JSON.stringify({ error: "Failed to create payment intent" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const paymentIntent = await response.json();

    // Store payment record in database
    const { error: paymentError } = await supabase.from("payments").insert({
      campaign_id: campaignId,
      stripe_payment_intent_id: paymentIntent.id,
      amount: amount,
      currency: "usd",
      status: "pending",
      receipt_email: receiptEmail,
      donor_name: donorName,
      donor_message: donorMessage,
      is_anonymous: isAnonymous || false,
    });

    if (paymentError) {
      console.error("Error storing payment:", paymentError);
      // Continue anyway - the payment intent was created successfully
    }

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error in create-payment-intent:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
