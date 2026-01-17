export default function SecurityPage() {
  return (
    <main className="max-w-2xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Security</h1>
      <ul className="list-disc ml-6 space-y-2">
        <li>Encryption at rest and in transit (capability goal)</li>
        <li>RBAC, audit trails, approvals</li>
        <li>Secure SDLC: CI scanning, dependency checks</li>
        <li>Security headers, CSP baseline</li>
      </ul>
    </main>
  );
}
