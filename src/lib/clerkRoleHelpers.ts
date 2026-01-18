import { OrganizationMembershipRole } from '@clerk/nextjs/server';

export function isOwner(role?: string) {
  return role === OrganizationMembershipRole.Owner;
}

export function isAdmin(role?: string) {
  return role === OrganizationMembershipRole.Admin;
}

export function isMember(role?: string) {
  return role === OrganizationMembershipRole.Member;
}

export function hasOrgRole(role: string | undefined, allowed: string[]) {
  return !!role && allowed.includes(role);
}
