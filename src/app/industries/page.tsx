import { industries } from "@/config/industries";

export default function IndustriesPage() {
  return (
    <main className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Industries</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {industries.map((ind) => (
          <a key={ind.slug} href={`/industries/${ind.slug}`} className="block bg-accent p-6 rounded shadow hover:bg-primary/10">
            <h2 className="text-2xl font-semibold mb-2">{ind.name}</h2>
            <p className="text-sm text-gray-400">{ind.painPoints.join(", ")}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
