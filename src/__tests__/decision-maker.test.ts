import { describe, it, expect } from 'vitest';
import { assessDecision } from '@/lib/decision-maker';

describe('DecisionMaker heuristics', () => {
  it('summaries produce high confidence and no approval for low-risk agents', () => {
    const res = assessDecision([{ role: 'user', content: 'Summarize today\'s priorities and risks' }], { id: 'x', name: 'test', riskLevel: 'low' });
    expect(res.suggestedAction.toLowerCase()).toContain('summar');
    expect(res.needsHumanApproval).toBe(false);
    expect(res.confidence).toBeGreaterThan(0.7);
  });

  it('deploy requests flag human approval for high-risk agents', () => {
    const res = assessDecision([{ role: 'user', content: 'Please deploy the new release to production now' }], { id: 'r', name: 'release', riskLevel: 'high' });
    expect(res.suggestedAction.toLowerCase()).toContain('deploy') || expect(res.suggestedAction.toLowerCase()).toContain('deployment');
    expect(res.needsHumanApproval).toBe(true);
    expect(res.confidence).toBeLessThanOrEqual(0.6);
  });
});
