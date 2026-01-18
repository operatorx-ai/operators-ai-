import { industries, sectors } from "@/config/industries";
import { agents } from "@/config/agents";
import { notFound } from "next/navigation";

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = industries.find((i) => i.slug === params.slug);
  if (!industry) return notFound();
  const sector = sectors.find(s => s.id === industry.sectorId);
  return (
    <main className="max-w-2xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-2">{industry.name}</h1>
      {sector && <div className="mb-4 text-muted-foreground text-sm">Sector: {sector.name}</div>}
      <div className="mb-4 text-muted-foreground">{industry.summary}</div>
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Pain Points</h2>
        <ul className="list-disc ml-6 text-muted-foreground">
          {industry.painPoints.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </section>
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Example Workflows</h2>
        {industry.workflows.map((w) => (
          <div key={w.title} className="mb-2">
            <div className="font-semibold text-sm mb-1">{w.title}</div>
            <ul className="list-disc ml-6 text-muted-foreground">
              {w.steps.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        ))}
      </section>
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Suggested Agents</h2>
        <ul className="list-disc ml-6 text-muted-foreground">
          {industry.suggestedAgents.map((id) => {
            const agent = agents.find(a => a.id === id);
            return <li key={id}>{agent ? agent.name : id}</li>;
          })}
        </ul>
      </section>
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Integrations</h2>
        <ul className="list-disc ml-6 text-muted-foreground">
          {industry.integrations.map((i) => <li key={i}>{i}</li>)}
        </ul>
      </section>
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Compliance Considerations</h2>
        <ul className="list-disc ml-6 text-muted-foreground">
          {industry.complianceNotes.map((c) => <li key={c}>{c}</li>)}
        </ul>
        <div className="text-xs text-muted-foreground italic mt-2">Disclaimer: not legal advice.</div>
      </section>
    </main>
  );
}
