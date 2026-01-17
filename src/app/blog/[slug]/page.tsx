const posts = [
  {
    slug: "launch",
    title: "Operators-AI Launch: Human-First Automation",
    content: "<p>Welcome to Operators-AI. We believe in augmenting people, not replacing jobs. Our platform brings human-in-the-loop automation to every industry.</p>"
  },
  {
    slug: "why-human-in-the-loop",
    title: "Why Human-in-the-Loop Matters",
    content: "<p>Automation is powerful, but human oversight is essential for trust, compliance, and quality. Operators-AI puts people at the center of every workflow.</p>"
  },
  {
    slug: "ai-trust",
    title: "Building Trust in AI Automation",
    content: "<p>Trust is earned through transparency, audit trails, and responsible controls. Learn how Operators-AI approaches security and compliance.</p>"
  }
];

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return <div className="p-8">Not found</div>;
  return (
    <main className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <article className="prose prose-invert" dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  );
}
