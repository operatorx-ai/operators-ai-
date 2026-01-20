import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const prisma = new PrismaClient();

export async function createBillingSession(userId: string) {
  // Example: create a Stripe Checkout session and link to user in Prisma
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing/cancel`,
    client_reference_id: userId,
  });
  // Optionally persist session.id to your DB (Billing model) if needed.
  return session.url;
}

export async function getBillingInfo(userId: string) {
  // Fetch billing info via the user's membership -> organization -> Billing record
  const membership = await prisma.membership.findFirst({ where: { userId } });
  if (!membership) return null;
  const billing = await prisma.billing.findUnique({ where: { orgId: membership.orgId } });
  if (!billing?.stripeCustomerId) return null;
  const customer = await stripe.customers.retrieve(billing.stripeCustomerId);
  return customer;
}
