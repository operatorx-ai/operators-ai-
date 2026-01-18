import { prisma } from './db';

export async function createPersonalOrgForUser(userId: string, name: string) {
  return prisma.organization.create({
    data: {
      name: `${name}'s Personal Org`,
      type: 'PERSONAL',
      members: {
        create: [{
          user: { connect: { id: userId } },
          role: 'OWNER',
        }],
      },
    },
    include: { members: true },
  });
}

export async function getActiveOrg(userId: string) {
  const membership = await prisma.membership.findFirst({
    where: { userId },
    include: { org: true },
  });
  return membership?.org || null;
}
