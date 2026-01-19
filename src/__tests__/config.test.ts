import { describe, it, expect } from 'vitest';
import { pricingTiers } from '@/config/pricing';
import { industries } from '@/config/industries';
import { agents } from '@/config/agents';

describe('Config integrity', () => {
  it('pricingTiers has correct structure', () => {
    expect(pricingTiers.personal.plans.length).toBe(3);
    expect(pricingTiers.business.plans.length).toBe(3);
    expect(pricingTiers.government.plans.length).toBe(3);
    expect(typeof pricingTiers.business.implementationFeeOneTime).toBe('number');
    expect(typeof pricingTiers.government.implementationFeeOneTime).toBe('number');
  });
  it('industries is an array with slugs', () => {
    expect(Array.isArray(industries)).toBe(true);
    expect(industries[0]).toHaveProperty('slug');
  });
  it('agents is an array with names', () => {
    expect(Array.isArray(agents)).toBe(true);
    expect(agents[0]).toHaveProperty('name');
  });
});
