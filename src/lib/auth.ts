import { currentUser } from '@clerk/nextjs/server';
import { prisma } from './db';
import { redirect } from 'next/navigation';

export async function getCurrentUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;
  let user = await prisma.user.findUnique({
    where: { clerkUserId: clerkUser.id },
    include: { memberships: true },
  });
  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkUserId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        name: clerkUser.firstName || '',
        memberships: {
          create: [{
            org: {
              create: {
                name: `${clerkUser.firstName || clerkUser.id}'s Personal Org`,
                type: 'PERSONAL',
              },
            },
            role: 'OWNER',
          }],
        },
      },
      include: { memberships: true },
    });
  }
  return user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) redirect('/sign-in');
  return user;
}

export async function getActiveOrg(userId: string) {
  const membership = await prisma.membership.findFirst({
    where: { userId },
    include: { org: true },
  });
  return membership?.org || null;
}
