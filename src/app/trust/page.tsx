export default function TrustCenter() {
  return (
    <main className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Trust Center</h1>
      <ul className="list-disc ml-6 space-y-2">
        <li>Security-by-design: encryption at rest/in transit, RBAC, audit trails, approvals</li>
        <li>Privacy-first: no chat logs stored by default</li>
        <li>Compliance-support: audit logs, controls, FedRAMP path language (not a certification)</li>
        <li>Secure SDLC: CI scanning, dependency checks</li>
      </ul>
      {/* TODO: Add links to /trust/security, /trust/privacy, /trust/compliance */}
    </main>
  );
}
