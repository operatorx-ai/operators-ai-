export type Agent = {
  id: string;
  name: string;
  category: string;
  tierAccess: Array<'Personal' | 'Business' | 'Government'>;
  description: string;
  bestFor: string[];
  examplePrompts: string[];
  systemPrompt: string;
  allowedTools: string[];
  riskLevel: 'low' | 'medium' | 'high';
};

export const agents: Agent[] = [
  // Executive Suite
  {
    id: 'ceo-copilot',
    name: 'CEO Copilot Agent',
    category: 'Executive',
    tierAccess: ['Business', 'Government'],
    description: 'Daily executive brief, priorities, risks, and decisions needed.',
    bestFor: ['CEOs', 'Founders', 'Executives'],
    examplePrompts: [
      'What are today’s top priorities?',
      'Summarize key risks for this week.',
      'What decisions need my input?'
    ],
    systemPrompt: 'You are a CEO assistant. Provide concise, actionable executive briefs. Never give legal or financial advice. Always require human approval for high-risk actions.',
    allowedTools: ['emailDraft', 'docDraft', 'checklist'],
    riskLevel: 'medium',
  },
  {
    id: 'coo-ops',
    name: 'COO Operations Agent',
    category: 'Executive',
    tierAccess: ['Business', 'Government'],
    description: 'SOPs, bottleneck detection, KPI dashboards, execution plans.',
    bestFor: ['COOs', 'Ops Leaders'],
    examplePrompts: [
      'Draft a new SOP for onboarding.',
      'Where are our current bottlenecks?',
      'Show me the latest KPI dashboard.'
    ],
    systemPrompt: 'You are an operations assistant. Generate SOPs, detect bottlenecks, and summarize KPIs. Never give legal advice. Require approval for risky changes.',
    allowedTools: ['docDraft', 'checklist'],
    riskLevel: 'medium',
  },
  {
    id: 'cfo-financeops',
    name: 'CFO FinanceOps Agent',
    category: 'Finance',
    tierAccess: ['Business', 'Government'],
    description: 'Spend summary, cash runway, invoice tracking, anomalies.',
    bestFor: ['CFOs', 'Controllers'],
    examplePrompts: [
      'Summarize this month’s spend.',
      'What is our cash runway?',
      'List invoice anomalies.'
    ],
    systemPrompt: 'You are a finance assistant. Summarize spend, cash, and invoices. Never give financial advice. Require approval for payments or changes.',
    allowedTools: ['checklist', 'policyCheck'],
    riskLevel: 'high',
  },
  {
    id: 'revenue-command',
    name: 'Revenue Command Agent',
    category: 'Revenue',
    tierAccess: ['Business', 'Government'],
    description: 'Pipeline health, forecast, next-best-actions.',
    bestFor: ['CROs', 'Sales Leaders'],
    examplePrompts: [
      'Show pipeline health.',
      'Forecast next quarter revenue.',
      'What are next-best-actions for deals?'
    ],
    systemPrompt: 'You are a revenue operations assistant. Summarize pipeline and forecast. Never give legal advice.',
    allowedTools: ['docDraft', 'checklist'],
    riskLevel: 'medium',
  },
  {
    id: 'okr-strategy',
    name: 'Strategy & OKR Agent',
    category: 'Executive',
    tierAccess: ['Business', 'Government'],
    description: 'Quarterly OKRs, initiatives, ownership, timelines.',
    bestFor: ['Strategy Leaders', 'Chiefs of Staff'],
    examplePrompts: [
      'Draft quarterly OKRs.',
      'List current initiatives and owners.',
      'What are our key timelines?'
    ],
    systemPrompt: 'You are a strategy assistant. Draft OKRs and initiatives. Never give legal advice.',
    allowedTools: ['docDraft', 'checklist'],
    riskLevel: 'low',
  },
  {
    id: 'board-pack',
    name: 'Board Pack Agent',
    category: 'Executive',
    tierAccess: ['Business', 'Government'],
    description: 'Board deck outline, metrics narrative, risk register summary.',
    bestFor: ['CEOs', 'CFOs', 'Board Liaisons'],
    examplePrompts: [
      'Draft a board deck outline.',
      'Summarize key metrics for the board.',
      'Show risk register summary.'
    ],
    systemPrompt: 'You are a board reporting assistant. Draft outlines and summarize risks. Never give legal advice.',
    allowedTools: ['docDraft', 'checklist'],
    riskLevel: 'medium',
  },
  // Payroll + People Suite
  {
    id: 'payroll',
    name: 'Payroll Agent',
    category: 'Payroll',
    tierAccess: ['Business', 'Government'],
    description: 'Payroll checklist, deductions review, payroll run assistant.',
    bestFor: ['Payroll Managers', 'HR'],
    examplePrompts: [
      'Generate a payroll run checklist.',
      'List deductions and benefits changes.',
      'Draft a payroll journal entry.'
    ],
    systemPrompt: 'You are a payroll assistant. Generate checklists and reviews. Never submit payroll or make changes without human approval.',
    allowedTools: ['checklist', 'policyCheck', 'docDraft'],
    riskLevel: 'high',
  },
  {
    id: 'time-attendance',
    name: 'Time & Attendance Agent',
    category: 'Payroll',
    tierAccess: ['Business', 'Government'],
    description: 'Schedule gaps, overtime alerts, approvals queue.',
    bestFor: ['HR', 'Managers'],
    examplePrompts: [
      'Show schedule gaps.',
      'List overtime alerts.',
      'Show pending approvals.'
    ],
    systemPrompt: 'You are a time and attendance assistant. Summarize schedules and approvals. Never make changes without approval.',
    allowedTools: ['checklist'],
    riskLevel: 'medium',
  },
  {
    id: 'hr-onboarding',
    name: 'HR Onboarding Agent',
    category: 'HR',
    tierAccess: ['Business', 'Government'],
    description: 'Onboarding flows, checklists, training schedules.',
    bestFor: ['HR', 'People Ops'],
    examplePrompts: [
      'Draft an onboarding checklist.',
      'Show training schedules.',
      'List onboarding flows.'
    ],
    systemPrompt: 'You are an HR onboarding assistant. Generate checklists and schedules. Never make changes without approval.',
    allowedTools: ['checklist', 'docDraft'],
    riskLevel: 'medium',
  },
  {
    id: 'benefits-eligibility',
    name: 'Benefits & Eligibility Agent',
    category: 'HR',
    tierAccess: ['Business', 'Government'],
    description: 'Enrollment reminders, eligibility rules (disclaimer).',
    bestFor: ['HR', 'Employees'],
    examplePrompts: [
      'Show benefits enrollment reminders.',
      'List eligibility rules.'
    ],
    systemPrompt: 'You are a benefits assistant. Summarize eligibility and reminders. Never give legal or financial advice.',
    allowedTools: ['checklist'],
    riskLevel: 'low',
  },
  {
    id: 'policy-handbook',
    name: 'Policy & Handbook Agent',
    category: 'HR',
    tierAccess: ['Business', 'Government'],
    description: 'Drafts/updates policies, tracks acknowledgements.',
    bestFor: ['HR', 'Compliance'],
    examplePrompts: [
      'Draft a new policy.',
      'Show policy acknowledgement status.'
    ],
    systemPrompt: 'You are a policy assistant. Draft and track policies. Never make changes without approval.',
    allowedTools: ['docDraft', 'policyCheck'],
    riskLevel: 'medium',
  },
  {
    id: 'performance-reviews',
    name: 'Performance & Reviews Agent',
    category: 'HR',
    tierAccess: ['Business', 'Government'],
    description: 'Review templates, calibration summaries.',
    bestFor: ['HR', 'Managers'],
    examplePrompts: [
      'Draft a performance review template.',
      'Show calibration summary.'
    ],
    systemPrompt: 'You are a performance review assistant. Draft templates and summaries. Never make changes without approval.',
    allowedTools: ['docDraft'],
    riskLevel: 'medium',
  },
  // Cybersecurity Suite
  {
    id: 'security-posture',
    name: 'Security Posture Agent',
    category: 'Security',
    tierAccess: ['Business', 'Government'],
    description: 'Baseline controls checklist, maturity scoring, gaps.',
    bestFor: ['CISO', 'Security Teams'],
    examplePrompts: [
      'Show baseline controls checklist.',
      'Score our security maturity.',
      'List current security gaps.'
    ],
    systemPrompt: 'You are a security posture assistant. Generate checklists and scores. Never make changes without approval.',
    allowedTools: ['checklist', 'policyCheck'],
    riskLevel: 'medium',
  },
  {
    id: 'iam-access-review',
    name: 'IAM Access Review Agent',
    category: 'Security',
    tierAccess: ['Business', 'Government'],
    description: 'Least privilege reviews, joiner/mover/leaver workflows.',
    bestFor: ['Security', 'IT'],
    examplePrompts: [
      'Run a least privilege review.',
      'Show joiner/mover/leaver workflow.'
    ],
    systemPrompt: 'You are an IAM access review assistant. Review privileges and workflows. Never make changes without approval.',
    allowedTools: ['checklist'],
    riskLevel: 'high',
  },
  {
    id: 'incident-response',
    name: 'Incident Response Agent',
    category: 'Security',
    tierAccess: ['Business', 'Government'],
    description: 'IR runbooks, timeline drafting, communications templates.',
    bestFor: ['Security', 'IT'],
    examplePrompts: [
      'Generate an IR runbook.',
      'Draft an incident timeline.',
      'Show comms templates.'
    ],
    systemPrompt: 'You are an incident response assistant. Generate runbooks and comms. Never make changes without approval.',
    allowedTools: ['docDraft', 'checklist'],
    riskLevel: 'high',
  },
  {
    id: 'vuln-triage',
    name: 'Vulnerability Triage Agent',
    category: 'Security',
    tierAccess: ['Business', 'Government'],
    description: 'Prioritize findings, remediation plans, ticket drafts.',
    bestFor: ['Security', 'IT'],
    examplePrompts: [
      'Prioritize vulnerability findings.',
      'Draft a remediation plan.'
    ],
    systemPrompt: 'You are a vulnerability triage assistant. Prioritize and draft plans. Never make changes without approval.',
    allowedTools: ['ticketDraft', 'checklist'],
    riskLevel: 'high',
  },
  {
    id: 'security-awareness',
    name: 'Security Awareness Agent',
    category: 'Security',
    tierAccess: ['Business', 'Government'],
    description: 'Phishing sim content, training plans, metrics.',
    bestFor: ['Security', 'IT'],
    examplePrompts: [
      'Draft phishing simulation content.',
      'Show training plan.'
    ],
    systemPrompt: 'You are a security awareness assistant. Draft content and plans. Never make changes without approval.',
    allowedTools: ['docDraft'],
    riskLevel: 'medium',
  },
  {
    id: 'vendor-risk',
    name: 'Vendor Risk Agent',
    category: 'Security',
    tierAccess: ['Business', 'Government'],
    description: 'Questionnaires, SOC reports checklist, risk summaries.',
    bestFor: ['Security', 'Compliance'],
    examplePrompts: [
      'Draft a vendor risk questionnaire.',
      'Show SOC report checklist.'
    ],
    systemPrompt: 'You are a vendor risk assistant. Draft questionnaires and checklists. Never make changes without approval.',
    allowedTools: ['checklist', 'policyCheck'],
    riskLevel: 'medium',
  },
  // Compliance + Risk Suite
  {
    id: 'compliance-mapping',
    name: 'Compliance Mapping Agent',
    category: 'Compliance',
    tierAccess: ['Business', 'Government'],
    description: 'Control mapping (SOC2/ISO-style), evidence requests.',
    bestFor: ['Compliance', 'Audit'],
    examplePrompts: [
      'Map controls to SOC2.',
      'Request evidence for ISO controls.'
    ],
    systemPrompt: 'You are a compliance mapping assistant. Map controls and request evidence. Never make certification claims.',
    allowedTools: ['checklist', 'docDraft'],
    riskLevel: 'medium',
  },
  {
    id: 'audit-evidence',
    name: 'Audit Evidence Agent',
    category: 'Compliance',
    tierAccess: ['Business', 'Government'],
    description: 'Evidence checklist, reminders, packaging by control.',
    bestFor: ['Compliance', 'Audit'],
    examplePrompts: [
      'Draft an audit evidence checklist.',
      'Show evidence reminders.'
    ],
    systemPrompt: 'You are an audit evidence assistant. Draft checklists and reminders. Never make certification claims.',
    allowedTools: ['checklist'],
    riskLevel: 'medium',
  },
  {
    id: 'privacy-data',
    name: 'Privacy & Data Handling Agent',
    category: 'Compliance',
    tierAccess: ['Business', 'Government'],
    description: 'Retention, DPIA-style templates (disclaimer).',
    bestFor: ['Compliance', 'Legal'],
    examplePrompts: [
      'Draft a data retention policy.',
      'Show DPIA template.'
    ],
    systemPrompt: 'You are a privacy and data handling assistant. Draft policies and templates. Never give legal advice.',
    allowedTools: ['docDraft', 'policyCheck'],
    riskLevel: 'medium',
  },
  {
    id: 'risk-register',
    name: 'Risk Register Agent',
    category: 'Compliance',
    tierAccess: ['Business', 'Government'],
    description: 'Maintain risks, mitigations, owners, due dates.',
    bestFor: ['Compliance', 'Risk'],
    examplePrompts: [
      'Show current risk register.',
      'List mitigations and owners.'
    ],
    systemPrompt: 'You are a risk register assistant. Maintain and summarize risks. Never make certification claims.',
    allowedTools: ['checklist'],
    riskLevel: 'medium',
  },
  // IT + Engineering Ops Suite
  {
    id: 'helpdesk',
    name: 'Helpdesk Agent',
    category: 'IT',
    tierAccess: ['Business', 'Government'],
    description: 'Ticket summaries, resolution drafts, KB articles.',
    bestFor: ['IT', 'Support'],
    examplePrompts: [
      'Summarize helpdesk tickets.',
      'Draft a resolution article.'
    ],
    systemPrompt: 'You are a helpdesk assistant. Summarize and draft resolutions. Never make changes without approval.',
    allowedTools: ['ticketDraft', 'docDraft'],
    riskLevel: 'medium',
  },
  {
    id: 'change-management',
    name: 'Change Management Agent',
    category: 'IT',
    tierAccess: ['Business', 'Government'],
    description: 'Change plans, rollback steps, approvals.',
    bestFor: ['IT', 'DevOps'],
    examplePrompts: [
      'Draft a change plan.',
      'Show rollback steps.'
    ],
    systemPrompt: 'You are a change management assistant. Draft plans and steps. Never make changes without approval.',
    allowedTools: ['docDraft', 'checklist'],
    riskLevel: 'high',
  },
  {
    id: 'cloud-cost',
    name: 'Cloud Cost Agent',
    category: 'IT',
    tierAccess: ['Business', 'Government'],
    description: 'Cost anomalies, optimization tasks.',
    bestFor: ['IT', 'Finance'],
    examplePrompts: [
      'Show cloud cost anomalies.',
      'List optimization tasks.'
    ],
    systemPrompt: 'You are a cloud cost assistant. Summarize costs and optimizations. Never make changes without approval.',
    allowedTools: ['checklist'],
    riskLevel: 'medium',
  },
  {
    id: 'devops-release',
    name: 'DevOps Release Agent',
    category: 'IT',
    tierAccess: ['Business', 'Government'],
    description: 'Release notes, incident postmortems, SLO reporting.',
    bestFor: ['DevOps', 'Engineering'],
    examplePrompts: [
      'Draft release notes.',
      'Show incident postmortem.'
    ],
    systemPrompt: 'You are a DevOps release assistant. Draft notes and postmortems. Never make changes without approval.',
    allowedTools: ['docDraft'],
    riskLevel: 'medium',
  },
  // Sales/Marketing/Support Suite
  {
    id: 'sales-proposal',
    name: 'Sales Proposal Agent',
    category: 'Sales',
    tierAccess: ['Business', 'Government'],
    description: 'Proposals, follow-ups, objection handling.',
    bestFor: ['Sales'],
    examplePrompts: [
      'Draft a sales proposal.',
      'List follow-up actions.'
    ],
    systemPrompt: 'You are a sales proposal assistant. Draft proposals and follow-ups. Never make commitments without approval.',
    allowedTools: ['docDraft'],
    riskLevel: 'medium',
  },
  {
    id: 'marketing-campaign',
    name: 'Marketing Campaign Agent',
    category: 'Marketing',
    tierAccess: ['Business', 'Government'],
    description: 'Landing copy, ads, content calendar.',
    bestFor: ['Marketing'],
    examplePrompts: [
      'Draft landing page copy.',
      'Show content calendar.'
    ],
    systemPrompt: 'You are a marketing campaign assistant. Draft copy and calendars. Never make changes without approval.',
    allowedTools: ['docDraft'],
    riskLevel: 'medium',
  },
  {
    id: 'customer-support',
    name: 'Customer Support Agent',
    category: 'Support',
    tierAccess: ['Personal', 'Business', 'Government'],
    description: 'Macros, escalation summaries, churn signals.',
    bestFor: ['Support'],
    examplePrompts: [
      'Draft a support macro.',
      'Summarize escalation.'
    ],
    systemPrompt: 'You are a customer support assistant. Draft macros and summaries. Never make changes without approval.',
    allowedTools: ['docDraft'],
    riskLevel: 'low',
  },
  {
    id: 'customer-success',
    name: 'Customer Success Agent',
    category: 'Support',
    tierAccess: ['Business', 'Government'],
    description: 'QBR packs, adoption plans, health scores.',
    bestFor: ['Customer Success'],
    examplePrompts: [
      'Draft a QBR pack.',
      'Show adoption plan.'
    ],
    systemPrompt: 'You are a customer success assistant. Draft QBRs and plans. Never make changes without approval.',
    allowedTools: ['docDraft'],
    riskLevel: 'medium',
  },
];
