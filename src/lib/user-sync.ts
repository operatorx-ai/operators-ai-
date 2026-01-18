import { prisma } from './prisma';
import { auth, currentUser } from '@clerk/nextjs/server';

export async function syncUserAndOrg() {
  const { userId } = auth();
  if (!userId) return null;
  let user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
  if (!user) {
    const clerkUser = await currentUser();
    user = await prisma.user.create({
      data: {
        clerkUserId: userId,
        email: clerkUser?.emailAddresses[0]?.emailAddress || '',
        name: clerkUser?.firstName || '',
        memberships: {
          create: [{
            org: {
              create: {
                name: `${clerkUser?.firstName || userId}'s Personal Org`,
                type: 'PERSONAL',
              },
            },
            role: 'OWNER',
          }],
        },
      },
    });
  }
  return user;
}
