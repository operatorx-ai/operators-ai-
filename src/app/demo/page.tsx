export default function DemoPage() {
  return (
    <main className="max-w-2xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Interactive AI Demo</h1>
      {/* TODO: Add streaming chat, quick actions, demo modes, guardrails */}
      <div className="bg-accent p-6 rounded shadow text-center">
        <p className="mb-4">Demo outputs are suggestions; verify before action.</p>
        <p className="text-gray-400">[Streaming chat demo coming soon]</p>
      </div>
    </main>
  );
}
