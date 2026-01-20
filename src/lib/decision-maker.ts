export type DecisionResult = {
  suggestedAction: string;
  confidence: number; // 0..1
  needsHumanApproval: boolean;
  rationale: string;
};

type AgentLike = { id?: string; name?: string; riskLevel?: 'low' | 'medium' | 'high' } | null;

const HIGH_RISK_KEYWORDS = [
  'submit',
  'execute',
  'deploy',
  'run payroll',
  'pay',
  'transfer',
  'delete',
  'remove',
  'terminate',
  'approve',
  'publish',
  'release',
  'make changes',
  'implement',
  'kick off',
  'start job'
];

export function assessDecision(messages: Array<{ role: string; content: string }>, agent: AgentLike = null): DecisionResult {
  const lastUser = [...messages].reverse().find(m => m.role === 'user')?.content || messages[messages.length - 1]?.content || '';
  const text = (lastUser || '').toLowerCase();

  // Simple heuristic for suggested action: summarize intent in one line
  let suggestedAction = 'Provide information';
  if (/summariz|summary|brief/.test(text)) suggestedAction = 'Summarize key points';
  if (/draft|write|compose|create|generate/.test(text)) suggestedAction = 'Draft document or template';
  if (/checklist|steps|todo|task/.test(text)) suggestedAction = 'Generate checklist / action items';
  if (/prioritiz|prioritise|rank/.test(text)) suggestedAction = 'Prioritize items and assign owners';
  if (/forecast|predict|cash runway|forecast/.test(text)) suggestedAction = 'Produce forecast/summary with assumptions';
  if (/deploy|release|publish/.test(text)) suggestedAction = 'Prepare deployment/release plan';
  if (/payroll|invoice|payment|transfer/.test(text)) suggestedAction = 'Flag as financial action requiring review';

  // Detect high-risk verbs
  const foundKeywords = HIGH_RISK_KEYWORDS.filter(k => text.includes(k));

  // Base confidence by agent risk level
  let baseConf = 0.6;
  if (agent?.riskLevel === 'low') baseConf = 0.8;
  if (agent?.riskLevel === 'medium') baseConf = 0.6;
  if (agent?.riskLevel === 'high') baseConf = 0.45;

  // Adjust confidence based on explicitness of user request
  const explicitness = Math.min(0.2, (text.split(' ').length - 1) / 50); // longer requests slightly increase confidence
  let confidence = Math.min(0.98, baseConf + explicitness + (foundKeywords.length ? -0.05 : 0.08));

  // Needs human approval if agent risk is high or keywords indicate execution
  const needsHumanApproval = (agent?.riskLevel === 'high') || foundKeywords.length > 0;

  const rationaleParts: string[] = [];
  rationaleParts.push(`Agent risk: ${agent?.riskLevel ?? 'unknown'}`);
  if (foundKeywords.length) rationaleParts.push(`Detected high-risk keywords: ${foundKeywords.join(', ')}`);
  rationaleParts.push(`Heuristic confidence base: ${baseConf.toFixed(2)}`);

  const rationale = rationaleParts.join('. ');

  return {
    suggestedAction,
    confidence: Number(confidence.toFixed(2)),
    needsHumanApproval,
    rationale,
  };
}

export default { assessDecision };
