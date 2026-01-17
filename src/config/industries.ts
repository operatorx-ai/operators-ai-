export const industries = [
  {
    slug: "finance",
    name: "Finance",
    painPoints: ["Manual reconciliation", "Fraud risk", "Slow approvals"],
    workflows: [
      "Invoice processing",
      "Expense approvals",
      "Vendor onboarding"
    ],
    agents: ["FinanceOps Agent"],
    integrations: ["QuickBooks", "Xero", "Stripe"],
    compliance: "SOX, PCI-DSS (not legal advice)"
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    painPoints: ["HIPAA compliance", "Manual data entry", "Audit fatigue"],
    workflows: [
      "Patient intake",
      "Claims processing",
      "Access reviews"
    ],
    agents: ["Compliance Agent", "HR Agent"],
    integrations: ["Epic", "Cerner", "Slack"],
    compliance: "HIPAA, HITECH (not legal advice)"
  },
  // ...add 18+ more industries for launch
];
