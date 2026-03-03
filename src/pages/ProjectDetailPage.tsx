import { useParams } from "react-router";

export default function ProjectDetailPage() {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="space-y-8">
        <header>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Project: {id}</h1>
          <p className="text-slate-400">Case study page coming soon</p>
        </header>

        <section className="prose prose-invert max-w-none">
          <p className="text-slate-300">Project details will include:</p>
          <ul className="text-slate-300 space-y-2">
            <li>Problem Statement</li>
            <li>Technical Constraints & Decisions</li>
            <li>Architecture & Implementation</li>
            <li>Challenges & Solutions</li>
            <li>Outcomes & Metrics</li>
            <li>Key Learnings</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
