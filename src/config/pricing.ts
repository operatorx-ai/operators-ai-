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
    implementationFeeOneTime: 5000,
    plans: [
      { name: "Starter", price: "$499/mo", features: ["All Personal features", "Custom integrations", "Audit logs", "SLA"] },
      { name: "Growth", price: "$999/mo", features: ["All Starter features", "Advanced analytics", "Priority support"] },
      { name: "Enterprise", price: "$1,999/mo", features: ["All Growth features", "Custom compliance", "Dedicated account manager"] },
    ],
  },
  government: {
    name: "Government",
    implementationFeeOneTime: 10000,
    plans: [
      { name: "Starter", price: "$1,999/mo", features: ["All Business features", "FedRAMP path language", "Custom audit trails"] },
      { name: "Growth", price: "$3,999/mo", features: ["All Starter features", "Dedicated compliance team", "Custom controls"] },
      { name: "Enterprise", price: "$7,999/mo", features: ["All Growth features", "Custom SLAs", "Government onboarding"] },
    ],
  },
};
