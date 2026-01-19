import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

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
  await prisma.user.update({
    where: { id: userId },
    data: { stripeSessionId: session.id },
  });
  return session.url;
}

export async function getBillingInfo(userId: string) {
  // Example: fetch billing info from Stripe and Prisma
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.stripeCustomerId) return null;
  const customer = await stripe.customers.retrieve(user.stripeCustomerId);
  return customer;
}
