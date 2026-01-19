import { User } from '@prisma/client';
import { clerkClient } from '@clerk/nextjs/server';

export function getUserRole(user: User): 'admin' | 'member' | 'guest' {
  // Example: role logic based on user object
  if (user.role === 'admin') return 'admin';
  if (user.role === 'member') return 'member';
  return 'guest';
}

export async function isAdmin(userId: string) {
  const user = await clerkClient.users.getUser(userId);
  return user.publicMetadata.role === 'admin';
}

export async function isMember(userId: string) {
  const user = await clerkClient.users.getUser(userId);
  return user.publicMetadata.role === 'member';
}
