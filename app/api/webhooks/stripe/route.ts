import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2025-02-27.acacia' as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return Response.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Log the three requested values
    console.log('client_reference_id:', session.client_reference_id);
    console.log('customer:', session.customer);
    console.log('subscription:', session.subscription);
  }

  return Response.json({ received: true }, { status: 200 });
}



// ### Environment and Testing Steps

// * Set your keys in your `.env.local` file: `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`.
// * Run the [Stripe CLI]