import { pricingTiers } from "@/config/pricing";

export default function PricingPage() {
  return (
    <main className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Pricing</h1>
      {/* TODO: Add tabs/segmented control for Personal, Business, Government */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Personal Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingTiers.personal.plans.map((plan) => (
            <div key={plan.name} className="bg-accent rounded-lg p-6 shadow">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="text-2xl font-semibold mb-2">{plan.price}</div>
              <ul className="mb-2">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm">{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      {/* TODO: Add Business and Government sections with implementation fee breakdown and CTAs */}
      <p className="text-xs mt-8 text-gray-400">Compliance-support features help you operate responsibly; final legal compliance depends on your policies and counsel.</p>
    </main>
  );
}
