import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const subscriptionId = searchParams.get("sub_id");

    if (!subscriptionId) {
      return Response.json(
        { error: "Missing subscription ID" },
        { status: 400 }
      );
    }

    const subscription = await stripe.subscriptions.retrieve(
      subscriptionId,
      {
        expand: ["customer", "items.data.price.product"],
      }
    );

    const customer =
      typeof subscription.customer === "string"
        ? null
        : subscription.customer;

    const price = subscription.items.data[0]?.price;

    const product =
      price && typeof price.product === "object"
        ? price.product
        : null;

    return Response.json({
      customerEmail: customer?.email ?? "",
      planName:
        product?.name ??
        price?.nickname ??
        "Subscription",
      planAmount: price?.unit_amount
        ? price.unit_amount / 100
        : 0,
      currency: price?.currency?.toUpperCase(),
    });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
