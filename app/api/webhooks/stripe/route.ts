import { NextResponse } from 'next/server';
import Stripe from 'stripe';
// Import your database client here
import { db, auth } from '@/app/firebase';
import { doc, updateDoc } from 'firebase/firestore';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // apiVersion: '2023-10-16', // Ensure you use a valid Stripe API version
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }


  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = 
        session.client_reference_id ??
        session.metadata?.firebaseUID;

    if (!userId) {
    return NextResponse.json(
        { error: 'Missing Firebase UID' },
        { status: 400 }
    );
    }
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;
    const customerEmail = session.customer_details?.email;

    console.log('--- Stripe Event Received ---');
    console.log('User ID (client_reference_id):', userId);
    console.log('Customer ID:', customerId);
    console.log('Subscription ID:', subscriptionId);
    console.log('Customer Email:', customerEmail);

    // Save to Database Example:
    // In your webhook handler, replace the commented section with:
    try {
    await updateDoc(doc(db, 'users', userId as string), {
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        subscriptionStatus: 'active',
    });
    console.log('User saved to DB successfully');
    } catch (dbError) {
    console.error('Failed to save subscription to DB:', dbError);
    return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}