import { User } from '@prisma/client';
import { clerkClient } from '@clerk/nextjs/server';

export function getUserRole(user: Partial<User> & { role?: string }): 'admin' | 'member' | 'guest' {
  // Example: role logic based on a possible 'role' property
  if (user.role === 'admin') return 'admin';
  if (user.role === 'member') return 'member';
  return 'guest';
}

export async function isAdmin(userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return user.publicMetadata.role === 'admin';
}

export async function isMember(userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return user.publicMetadata.role === 'member';
}
