import { pricingTiers } from "@/config/pricing";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const businessImplFeatures = [
  "Setup & onboarding",
  "Security baseline",
  "Workflow discovery",
  "RBAC & audit trail configuration",
  "Compliance review guidance"
];
const governmentImplFeatures = [
  ...businessImplFeatures,
  "Government onboarding",
  "Custom SLAs"
];

export default function PricingPage() {
  const [tab, setTab] = useState("personal");
  return (
    <main className="max-w-5xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Pricing</h1>
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="government">Government</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingTiers.personal.plans.map((plan) => (
                <Card key={plan.name} className="bg-accent rounded-lg p-6 shadow flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-2xl font-semibold mb-2">{plan.price}</div>
                  <ul className="mb-2 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="text-sm">{f}</li>
                    ))}
                  </ul>
                  <button className="bg-primary text-black px-4 py-2 rounded mt-4">Start Waitlist</button>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>
        <TabsContent value="business">
          <section className="mb-8">
            <Card className="bg-accent rounded-lg p-6 shadow mb-8">
              <h2 className="text-2xl font-bold mb-2">One-time Implementation Fee</h2>
              <div className="text-2xl font-semibold mb-2">${pricingTiers.business.implementationFeeOneTime.toLocaleString()}</div>
              <ul className="mb-2">
                {businessImplFeatures.map((f) => <li key={f} className="text-sm">{f}</li>)}
              </ul>
              <div className="text-xs text-gray-400">Required before selecting a subscription plan.</div>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingTiers.business.plans.map((plan) => (
                <Card key={plan.name} className="bg-accent rounded-lg p-6 shadow flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-2xl font-semibold mb-2">{plan.price}</div>
                  <ul className="mb-2 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="text-sm">{f}</li>
                    ))}
                  </ul>
                  <button className="bg-primary text-black px-4 py-2 rounded mt-4">Talk to Sales</button>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>
        <TabsContent value="government">
          <section className="mb-8">
            <Card className="bg-accent rounded-lg p-6 shadow mb-8">
              <h2 className="text-2xl font-bold mb-2">One-time Implementation Fee</h2>
              <div className="text-2xl font-semibold mb-2">${pricingTiers.government.implementationFeeOneTime.toLocaleString()}</div>
              <ul className="mb-2">
                {governmentImplFeatures.map((f) => <li key={f} className="text-sm">{f}</li>)}
              </ul>
              <div className="text-xs text-gray-400">Required before selecting a subscription plan.</div>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingTiers.government.plans.map((plan) => (
                <Card key={plan.name} className="bg-accent rounded-lg p-6 shadow flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-2xl font-semibold mb-2">{plan.price}</div>
                  <ul className="mb-2 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="text-sm">{f}</li>
                    ))}
                  </ul>
                  <button className="bg-primary text-black px-4 py-2 rounded mt-4">Talk to Sales</button>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>
      </Tabs>
      <p className="text-xs mt-8 text-gray-400">Compliance-support features help you operate responsibly; final legal compliance depends on your policies and counsel. <br />Not legal advice.</p>
    </main>
  );
}
