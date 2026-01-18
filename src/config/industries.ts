
export type Sector = {
  id: string;
  name: string;
  description: string;
};

export type Industry = {
  id: string;
  slug: string;
  name: string;
  sectorId: string;
  summary: string;
  keywords: string[];
  painPoints: string[];
  workflows: { title: string; steps: string[] }[];
  suggestedAgents: string[];
  integrations: string[];
  complianceNotes: string[];
};

export const sectors: Sector[] = [
  { id: "agriculture", name: "Agriculture, Forestry, Fishing & Hunting", description: "Farming, livestock, forestry, and related services." },
  { id: "mining", name: "Mining, Quarrying, Oil & Gas", description: "Extraction of minerals, oil, gas, and related activities." },
  { id: "utilities", name: "Utilities", description: "Electric, water, gas, and other utility services." },
  { id: "construction", name: "Construction", description: "Building, engineering, and specialty trade contractors." },
  { id: "manufacturing", name: "Manufacturing", description: "Production of goods in factories and plants." },
  { id: "wholesale", name: "Wholesale Trade", description: "Wholesale distribution of goods and materials." },
  { id: "retail", name: "Retail Trade", description: "Retail sales of goods to consumers." },
  { id: "transportation", name: "Transportation & Warehousing", description: "Logistics, shipping, and storage services." },
  { id: "information", name: "Information (Media/Telecom/Software)", description: "Publishing, broadcasting, telecom, and software." },
  { id: "finance", name: "Finance & Insurance", description: "Banking, insurance, and financial services." },
  { id: "realestate", name: "Real Estate & Rental & Leasing", description: "Property sales, leasing, and management." },
  { id: "professional", name: "Professional, Scientific & Technical Services", description: "Consulting, legal, accounting, engineering, and R&D." },
  { id: "management", name: "Management of Companies & Enterprises", description: "Corporate headquarters and holding companies." },
  { id: "adminsupport", name: "Administrative & Support & Waste Services", description: "Admin, facilities, staffing, and waste management." },
  { id: "education", name: "Educational Services", description: "Schools, colleges, training, and education support." },
  { id: "healthcare", name: "Health Care & Social Assistance", description: "Hospitals, clinics, social services, and care providers." },
  { id: "arts", name: "Arts, Entertainment & Recreation", description: "Performing arts, sports, museums, and recreation." },
  { id: "accommodation", name: "Accommodation & Food Services", description: "Hotels, restaurants, and food service providers." },
  { id: "other", name: "Other Services (Repair/Personal Services)", description: "Personal care, repair, laundry, and other services." },
  { id: "publicadmin", name: "Public Administration (Government)", description: "Federal, state, local government, and public agencies." },
];

// --- INDUSTRY DATASET ---
// For brevity, only a few sample industries are shown here. In the real implementation, this array should be expanded to 300+ entries, one per NAICS-style industry, with all required fields.
export const industries: Industry[] = [
  {
    id: "finance-banking",
    slug: "banking",
    name: "Banking",
    sectorId: "finance",
    summary: "Retail and commercial banking services for individuals and businesses.",
    keywords: ["bank", "loans", "checking", "savings", "mortgage", "branch"],
    painPoints: [
      "Manual loan processing",
      "Fraud detection",
      "Regulatory compliance",
      "Customer onboarding delays"
    ],
    workflows: [
      { title: "Loan Origination", steps: ["Collect application", "Verify documents", "Credit check", "Approval workflow"] },
      { title: "Account Opening", steps: ["KYC verification", "Document upload", "Approval"] }
    ],
    suggestedAgents: ["cfo-financeops", "compliance-mapping", "risk-register"],
    integrations: ["FIS", "Jack Henry", "Salesforce"],
    complianceNotes: ["FDIC, SOX, PCI-DSS (not legal advice)", "Always require human review for high-risk actions."]
  },
  {
    id: "healthcare-hospital",
    slug: "hospital",
    name: "Hospital",
    sectorId: "healthcare",
    summary: "Acute care, emergency, and specialty medical services.",
    keywords: ["hospital", "acute care", "emergency", "inpatient", "outpatient"],
    painPoints: [
      "HIPAA compliance",
      "Manual patient intake",
      "Audit fatigue",
      "Staffing shortages"
    ],
    workflows: [
      { title: "Patient Intake", steps: ["Collect demographics", "Insurance verification", "Consent forms"] },
      { title: "Claims Processing", steps: ["Code visit", "Submit claim", "Track denials"] }
    ],
    suggestedAgents: ["compliance-mapping", "hr-onboarding", "audit-evidence"],
    integrations: ["Epic", "Cerner", "Slack"],
    complianceNotes: ["HIPAA, HITECH (not legal advice)", "Never give medical advice."]
  },
  {
    id: "publicadmin-citygov",
    slug: "city-government",
    name: "City Government",
    sectorId: "publicadmin",
    summary: "Municipal services, permitting, and public safety for cities and towns.",
    keywords: ["city", "municipal", "permitting", "public safety", "council"],
    painPoints: [
      "Manual permit processing",
      "Budget constraints",
      "Transparency requirements",
      "Citizen engagement"
    ],
    workflows: [
      { title: "Permit Application", steps: ["Receive application", "Review documents", "Issue permit"] },
      { title: "Council Agenda Prep", steps: ["Collect items", "Draft agenda", "Distribute packets"] }
    ],
    suggestedAgents: ["policy-handbook", "risk-register", "helpdesk"],
    integrations: ["Tyler Tech", "CivicPlus", "Office 365"],
    complianceNotes: ["Sunshine laws, FOIA (not legal advice)", "Always require human approval for public actions."]
  },
  // ... 300+ more industries, each with id, slug, name, sectorId, summary, keywords, painPoints, workflows, suggestedAgents, integrations, complianceNotes
];
