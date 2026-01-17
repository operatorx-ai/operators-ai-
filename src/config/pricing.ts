export const pricingTiers = {
  personal: {
    name: "Personal",
    plans: [
      {
        name: "Basic",
        price: "$0/mo",
        features: ["Community support", "Limited workflows", "No API access"],
      },
      {
        name: "Pro",
        price: "$29/mo",
        features: ["Unlimited workflows", "API access", "Priority support"],
      },
      {
        name: "Pro+",
        price: "$99/mo",
        features: ["All Pro features", "Advanced controls", "Early access to new agents"],
      },
    ],
  },
  business: {
    name: "Business",
    implementationFee: 5000,
    installments: 4,
    plans: [
      { name: "Business Standard", price: "$499/mo", features: ["All Personal features", "Custom integrations", "Audit logs", "SLA"] },
      { name: "Business Plus", price: "$999/mo", features: ["All Standard features", "Dedicated support", "Custom compliance"] },
    ],
  },
  government: {
    name: "Government",
    implementationFee: 10000,
    installments: 4,
    plans: [
      { name: "Gov Standard", price: "$1,999/mo", features: ["All Business features", "FedRAMP path language", "Custom audit trails"] },
      { name: "Gov Plus", price: "$3,999/mo", features: ["All Standard features", "Dedicated compliance team", "Custom controls"] },
    ],
  },
};
