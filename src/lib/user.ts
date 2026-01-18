import { prisma } from './db';

export async function upsertUserByClerkId(clerkUserId: string, email: string, name: string) {
  return prisma.user.upsert({
    where: { clerkUserId },
    update: { email, name },
    create: { clerkUserId, email, name },
  });
}
