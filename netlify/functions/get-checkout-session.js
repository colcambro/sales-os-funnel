// Netlify Function: GET /.netlify/functions/get-checkout-session?session_id=cs_...
//
// Looks up a completed Stripe Checkout Session so the /thank-you page
// (src/routes/thank-you.tsx) can show the real customer email and fire the
// Meta Pixel "Purchase" event with the actual amount charged, instead of
// trusting whatever is in the URL's query string (which anyone could edit).
//
// Checkout itself doesn't go through this app — the checkout page
// (src/routes/checkout.tsx) links straight to Stripe's own hosted Payment
// Links, which create the Checkout Session on Stripe's side automatically.
// This function only ever READS a session back afterwards (a plain
// stripe.checkout.sessions.retrieve call), to confirm the sale and get
// accurate data for the pixel — it never creates or charges anything.
//
// Required env var: STRIPE_SECRET_KEY.

// NOTE: this project's package.json has "type": "module", so this file must
// use ESM import/export syntax.
import Stripe from "stripe";

export const handler = async (event) => {
    if (event.httpMethod !== "GET") {
          return { statusCode: 405, body: "Method Not Allowed" };
    }
  
    const sessionId = event.queryStringParameters && event.queryStringParameters.session_id;
    if (!sessionId) {
          return { statusCode: 400, body: JSON.stringify({ error: "Missing session_id" }) };
    }
  
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
          console.error("STRIPE_SECRET_KEY is not set");
          return { statusCode: 500, body: JSON.stringify({ error: "Stripe is not configured yet." }) };
    }
  
    const stripe = new Stripe(secretKey, { apiVersion: "2024-06-20" });
  
    try {
          const session = await stripe.checkout.sessions.retrieve(sessionId);
      
          return {
                  statusCode: 200,
                  body: JSON.stringify({
                            status: session.payment_status, // "paid" | "unpaid" | "no_payment_required"
                            email: session.customer_details ? session.customer_details.email : null,
                            amountTotal: session.amount_total, // smallest currency unit (cents for USD)
                            currency: session.currency,
                  }),
          };
    } catch (err) {
          console.error("Stripe session lookup failed:", err);
          return { statusCode: 404, body: JSON.stringify({ error: "Session not found" }) };
    }
};
test
