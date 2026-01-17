export default function Blog() {
  return (
    <main className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <ul className="space-y-4">
        <li className="bg-accent p-4 rounded"><a href="/blog/launch">Operators-AI Launch: Human-First Automation</a></li>
        <li className="bg-accent p-4 rounded"><a href="/blog/why-human-in-the-loop">Why Human-in-the-Loop Matters</a></li>
        <li className="bg-accent p-4 rounded"><a href="/blog/ai-trust">Building Trust in AI Automation</a></li>
      </ul>
    </main>
  );
}
