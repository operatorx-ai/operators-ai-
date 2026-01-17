export default function ProductPage() {
  return (
    <main className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">What is Operators-AI?</h1>
      <p className="mb-6">Operators-AI is a multi-agent automation platform designed for human-first, compliant automation. We augment people, not replace jobs.</p>
      <ul className="list-disc ml-6 mb-6 space-y-2">
        <li>Policy engine + approvals</li>
        <li>Audit logs</li>
        <li>Least-privilege connectors</li>
        <li>Observability & rollback patterns</li>
      </ul>
      {/* TODO: Add simple SVG architecture diagram */}
      <div className="bg-accent p-4 rounded text-center">[Architecture diagram coming soon]</div>
    </main>
  );
}
