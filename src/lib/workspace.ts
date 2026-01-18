import { useOrganization, useUser } from '@clerk/nextjs';

/**
 * Returns the current workspace context for the user.
 * - If user is in an organization, returns org info.
 * - If not, returns personal workspace info.
 */
export function useWorkspace() {
  const { organization, membership } = useOrganization();
  const { user } = useUser();

  if (organization && membership) {
    return {
      type: 'org',
      organization,
      membership,
      isPersonal: false,
    };
  }

  return {
    type: 'personal',
    user,
    isPersonal: true,
  };
}

/**
 * Returns true if the user can create or join organizations (Business/Gov tiers).
 * You can extend this logic based on your app's user profile or Clerk metadata.
 */
export function canCreateOrJoinOrgs(user: any) {
  // Example: check user publicMetadata or custom claims for tier
  const tier = user?.publicMetadata?.tier;
  return tier === 'Business' || tier === 'Government';
}
