import { industries } from "@/config/industries";
import { notFound } from "next/navigation";

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = industries.find((i) => i.slug === params.slug);
  if (!industry) return notFound();
  return (
    <main className="max-w-2xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">{industry.name}</h1>
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Pain Points</h2>
        <ul className="list-disc ml-6 text-gray-300">
          {industry.painPoints.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </section>
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Example Workflows</h2>
        <ul className="list-disc ml-6 text-gray-300">
          {industry.workflows.map((w) => <li key={w}>{w}</li>)}
        </ul>
      </section>
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Suggested Agents</h2>
        <ul className="list-disc ml-6 text-gray-300">
          {industry.agents.map((a) => <li key={a}>{a}</li>)}
        </ul>
      </section>
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Integrations</h2>
        <ul className="list-disc ml-6 text-gray-300">
          {industry.integrations.map((i) => <li key={i}>{i}</li>)}
        </ul>
      </section>
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Compliance Considerations</h2>
        <p className="text-gray-400 text-sm">{industry.compliance} <br /><span className="italic">Disclaimer: not legal advice.</span></p>
      </section>
    </main>
  );
}
