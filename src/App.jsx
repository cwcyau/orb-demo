import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const pages = [
  {
    key: 'about',
    title: 'About ORB',
    eyebrow: 'Overview',
    summary:
      'ORB is a national hub for developing and validating advanced human pre-clinical models that are clinically anchored, reproducible and accessible to academic, NHS, charity and industry users.',
    blocks: [
      {
        heading: 'What the Hub is for',
        text: 'ORB brings together model development, access to human tissue, validation data and secure digital infrastructure in one place. The aim is to make translational human models easier to find, use and reuse.',
      },
      {
        heading: 'What users will find',
        text: 'A searchable catalogue of models, metadata standards, validation metrics, access routes and exemplar programmes that demonstrate how the Hub will operate in practice.',
      },
      {
        heading: 'Why Birmingham',
        text: 'The Hub is grounded in Birmingham’s strengths in tissue access, disease models, translational science, engineering, AI and clinical partnership.',
      },
    ],
    ctas: [
      { label: 'View the model catalogue', target: 'models' },
      { label: 'Read the access policy', target: 'access' },
    ],
  },
  {
    key: 'access',
    title: 'How access works',
    eyebrow: 'User access',
    summary:
      'Users submit a project request, the Hub triages scientific fit and translational need, and approved projects are matched to existing models or exemplar development pipelines.',
    blocks: [
      {
        heading: 'Step 1: Submit a request',
        text: 'Users describe the biological question, model type needed, data required, and whether they are internal or external to the University of Birmingham.',
      },
      {
        heading: 'Step 2: Triaging and matching',
        text: 'The Hub assesses scientific fit, translational relevance, feasibility, access conditions and whether an existing model can answer the question.',
      },
      {
        heading: 'Step 3: Delivery',
        text: 'Approved users are routed to the appropriate model pipeline, secure analysis environment or collaboration workspace, with clear expectations on outputs and timing.',
      },
    ],
    ctas: [
      { label: 'Request access', target: 'governance' },
      { label: 'See example request form', target: 'ask-orb' },
    ],
  },
  {
    key: 'platform',
    title: 'AI-enabled platform',
    eyebrow: 'Digital platform',
    summary:
      'The digital platform provides searchable metadata, model comparison, secure analysis environments and benchmarking for external AI tools and workflows.',
    blocks: [
      {
        heading: 'Catalogue and metadata',
        text: 'Users can search models by disease, tissue, assay, validation status, access terms and linked datasets. Each asset carries provenance and readiness information.',
      },
      {
        heading: 'Secure analysis',
        text: 'The platform supports governed access for internal and external users, including secure workspaces for code, data interrogation and reproducible workflows.',
      },
      {
        heading: 'AI benchmarking',
        text: 'External models and agents can be evaluated against curated datasets through a bring-your-own-agent framework, with standard metrics and transparent reporting.',
      },
    ],
    ctas: [
      { label: 'Browse the catalogue', target: 'models' },
      { label: 'Launch secure workspace', target: 'ask-orb' },
    ],
  },
  {
    key: 'governance',
    title: 'Governance',
    eyebrow: 'Trust and oversight',
    summary:
      'Access, data use, IP and public partnership are governed through transparent committees, with secure and auditable processes for sensitive data and external users.',
    blocks: [
      {
        heading: 'Access and prioritisation',
        text: 'Requests are reviewed against scientific quality, translational value, feasibility, governance constraints and fairness across user groups and exemplar areas.',
      },
      {
        heading: 'Data and IP',
        text: 'The Hub will manage metadata, sensitive information, IP boundaries and publication review through clear, documented processes that support collaboration without compromising trust.',
      },
      {
        heading: 'Public partnership',
        text: 'Public contributors will help shape acceptable use, communication, access policy and the balance between open science, collaboration and responsible use.',
      },
    ],
    ctas: [
      { label: 'View governance framework', target: 'governance' },
      { label: 'Meet the public panel', target: 'governance' },
    ],
  },
];

const prompts = [
  {
    id: 'question1',
    label: 'Which models are best for immune-oncology?',
    answer:
      'Recommended models: immune-competent tumour organoids, matched explant systems and tumour–immune co-cultures. The platform would prioritise models with validated immune readouts, matched clinical metadata and available perturbation data.',
  },
  {
    id: 'question2',
    label: 'Can I test drug response in a BBB model?',
    answer:
      'Yes. The platform would route you to BBB iPSC co-cultures and related neural systems, with options for transport, neuroinflammation and drug penetration readouts. It would also suggest the most relevant endpoints and controls.',
  },
  {
    id: 'question3',
    label: 'How should I design a co-culture experiment?',
    answer:
      'A suggested design would include biological controls, matched monocultures, cell ratio optimisation, assay endpoints, replication strategy and a feasibility check against available model metadata before starting the experiment.',
  },
  {
    id: 'question4',
    label: 'Which models have matched clinical data?',
    answer:
      'The interface would identify models with linked clinical metadata, donor provenance, pathology annotations and longitudinal data. Those assets would be flagged as higher priority for translational use and benchmarking.',
  },
];

const models = [
  {
    name: 'Colorectal cancer organoids',
    type: 'Cancer',
    access: 'Internal + external',
    summary: 'Patient-derived epithelial models with immune co-culture and drug-response annotations.',
    tags: ['organoid', 'immune', 'validated'],
  },
  {
    name: 'Inflammatory bowel explants',
    type: 'Inflammation',
    access: 'Internal + external',
    summary: 'Fresh tissue explants with matched clinical metadata and imaging readouts.',
    tags: ['explant', 'clinical', 'matched data'],
  },
  {
    name: 'BBB iPSC co-cultures',
    type: 'CNS',
    access: 'Internal',
    summary: 'Blood-brain barrier systems for transport, neuroinflammation and drug penetration studies.',
    tags: ['iPSC', 'BBB', 'multi-cell'],
  },
  {
    name: 'Cardiometabolic stem-cell models',
    type: 'Metabolism',
    access: 'Internal + external',
    summary: 'QC-controlled stem-cell-derived models for metabolic dysfunction and translational screening.',
    tags: ['stem cell', 'QC', 'scalable'],
  },
  {
    name: 'Organoid-on-chip liver systems',
    type: 'Engineering',
    access: 'External pilot',
    summary: 'Flow-enabled systems for physiology, toxicology-aware benchmarking and medtech screening.',
    tags: ['chip', 'flow', 'benchmarking'],
  },
  {
    name: 'Immune-competent tumour models',
    type: 'Cancer',
    access: 'Internal + external',
    summary: 'Co-cultures for immune killing, biomarker discovery and perturbation testing.',
    tags: ['immune', 'perturbation', 'translational'],
  },
];

const updates = [
  {
    date: 'Summer 2027',
    title: 'Platform foundation',
    text: 'Build the model catalogue, metadata standards and secure access layer.',
  },
  {
    date: 'Summer 2028',
    title: 'Exemplar integration',
    text: 'Connect disease exemplars to validated datasets and user-facing access routes.',
  },
  {
    date: 'Summer 2029',
    title: 'Benchmarking launch',
    text: 'Open challenge datasets and bring-your-own-agent evaluation for selected use cases.',
  },
];

const stats = [
  { value: 'About', label: 'national hub', target: 'about' },
  { value: 'Examples', label: 'exemplar programmes', target: 'platform' },
  { value: 'Models', label: 'model families', target: 'models' },
  { value: 'Users', label: 'user routes', target: 'access' },
];

const filters = ['All', 'Cancer', 'Inflammation', 'CNS', 'Metabolism', 'Engineering'];

function IconPill({ symbol, active }) {
  return (
    <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${active ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'}`} aria-hidden="true">
      {symbol}
    </div>
  );
}

export default function OrbDigitalPlatformMockup() {
  const [currentPage, setCurrentPage] = useState('about');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedPrompt, setSelectedPrompt] = useState(prompts[0]);

  const activePage = useMemo(() => pages.find((p) => p.key === currentPage) || pages[0], [currentPage]);

  const filteredModels = useMemo(() => {
    return models.filter((m) => {
      const haystack = [m.name, m.type, m.summary, ...m.tags].join(' ').toLowerCase();
      const matchQuery = query.trim().length === 0 || haystack.includes(query.toLowerCase());
      const matchFilter = filter === 'All' || m.type === filter;
      return matchQuery && matchFilter;
    });
  }, [query, filter]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div>
            <div className="text-sm font-semibold tracking-wide text-indigo-700">ORB</div>
            <div className="text-xs text-slate-500">Organoid and Advanced Human Model Repository Birmingham</div>
          </div>
          <nav className="hidden gap-6 text-sm text-slate-600 md:flex">
            <button onClick={() => scrollToSection('about')} className="hover:text-slate-900">About</button>
            <button onClick={() => scrollToSection('access')} className="hover:text-slate-900">Access</button>
            <button onClick={() => scrollToSection('platform')} className="hover:text-slate-900">Platform</button>
            <button onClick={() => scrollToSection('governance')} className="hover:text-slate-900">Governance</button>
          </nav>
          <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-700" onClick={() => scrollToSection('access')}>
            Request access
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:px-10">
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="grid gap-8 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-10 text-white md:px-10 lg:grid-cols-[1.25fr_0.75fr] lg:px-12">
            <div>
              <Badge className="rounded-full bg-white/10 px-3 py-1 text-white hover:bg-white/10">National hub for translational models</Badge>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
                A digital gateway to validated human model systems.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
                ORB connects curated models, linked datasets, secure compute and translational workflows in one place.
                It is designed for researchers who need reliable access, clear metadata and a route from question to impact.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="rounded-full bg-white text-slate-950 hover:bg-slate-100" onClick={() => scrollToSection('models')}>
                  Browse models
                </Button>
                <Button variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white" onClick={() => scrollToSection('about')}>
                  View platform overview
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {stats.map((s) => (
                <button
                  key={s.label}
                  onClick={() => scrollToSection(s.target)}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4 text-left transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/40"
                >
                  <div className="text-3xl font-semibold">{s.value}</div>
                  <div className="mt-1 text-sm text-white/70">{s.label}</div>
                </button>
              ))}
            </div>
          </div>
        </motion.section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pages.map((page) => (
            <button key={page.key} onClick={() => scrollToSection(page.key)} className="text-left">
              <Card className={`rounded-3xl border shadow-sm transition hover:shadow-md ${currentPage === page.key ? 'border-indigo-400 ring-1 ring-indigo-200' : 'border-slate-200'}`}>
                <CardContent className="p-6">
                  <div className="text-xs font-semibold uppercase tracking-wide text-indigo-700">{page.eyebrow}</div>
                  <h2 className="mt-2 text-lg font-semibold">{page.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{page.summary}</p>
                </CardContent>
              </Card>
            </button>
          ))}
        </section>

        <section id="about" className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="p-5">
              <div className="text-sm font-semibold text-slate-500">Site navigation</div>
              <div className="mt-4 space-y-2">
                {pages.map((page) => (
                  <button
                    key={page.key}
                    onClick={() => scrollToSection(page.key)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                      currentPage === page.key ? 'border-indigo-400 bg-indigo-50' : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-medium">{page.title}</span>
                    <span className="text-slate-400">→</span>
                  </button>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                This mockup is intentionally styled like a real landing page for a GitHub Pages-hosted site.
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-indigo-700">{activePage.eyebrow}</div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">{activePage.title}</h2>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">{activePage.summary}</p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {activePage.blocks.map((block) => (
                  <div key={block.heading} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="font-semibold">{block.heading}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{block.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {activePage.ctas.map((cta) => (
                  <Button key={cta.label} className="rounded-full bg-slate-900 text-white hover:bg-slate-700" onClick={() => scrollToSection(cta.target)}>
                    {cta.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="ask-orb" className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">Ask ORB</h2>
                  <p className="mt-1 text-sm text-slate-600">A mock natural-language interface for querying models and asking experimental design questions.</p>
                </div>
                <Badge variant="secondary" className="rounded-full px-3 py-1">Demo only</Badge>
              </div>

              <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Example questions</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {prompts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPrompt(p)}
                      className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">User query</div>
                <div className="mt-2 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">{selectedPrompt.label}</div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Suggested response</div>
                <div className="mt-2 rounded-2xl bg-slate-900 p-4 text-sm leading-6 text-white">{selectedPrompt.answer}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold tracking-tight">What the interface would support</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-semibold">Model discovery</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Ask which models are available for a disease area, tissue type or assay.</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-semibold">Experimental design</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Ask how to structure controls, perturbations, endpoints and replication.</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-semibold">Clinical matching</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Identify models with matched patient data and translational relevance.</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-semibold">Benchmarking</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Compare models or test AI workflows in a governed environment.</p>
                </div>
              </div>
              <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm leading-6 text-slate-600">
                This is a mock interface, so the buttons can stand in for real prompt examples in the hosted demo.
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="models" className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Featured model catalogue</h2>
              <p className="mt-1 text-sm text-slate-600">A preview of how visitors would browse available models and capabilities.</p>
            </div>
            <Badge variant="secondary" className="rounded-full px-3 py-1">Searchable, curated, governed</Badge>
          </div>

          <div className="mt-5 grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Search catalogue</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by disease, model type or keyword"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-full px-3 py-1.5 text-sm transition ${filter === f ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                The catalogue would typically include provenance, validation, assay compatibility, access terms and linked datasets.
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {filteredModels.map((m) => (
                <div key={m.name} className="rounded-2xl border border-slate-200 p-4 transition hover:border-slate-300 hover:shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{m.name}</h3>
                      <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">{m.type}</p>
                    </div>
                    <Badge className="rounded-full bg-emerald-600 text-white hover:bg-emerald-600">{m.access}</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{m.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {m.tags.map((t) => (
                      <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
              {filteredModels.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500 md:col-span-2">
                  No models match this search.
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="access" className="mt-10 grid gap-4 lg:grid-cols-2">
          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold tracking-tight">How access works</h2>
              <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
                <p><span className="font-semibold text-slate-900">1. Submit a request.</span> Users describe the biological question, model type needed, data required, and whether they are internal or external to the University of Birmingham.</p>
                <p><span className="font-semibold text-slate-900">2. Triaging and matching.</span> The Hub assesses scientific fit, translational relevance, feasibility, access conditions and whether an existing model can answer the question.</p>
                <p><span className="font-semibold text-slate-900">3. Delivery.</span> Approved users are routed to the appropriate model pipeline, secure analysis environment or collaboration workspace, with clear expectations on outputs and timing.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold tracking-tight">AI-enabled platform</h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                The digital layer supports model discovery, metadata standards, secure analysis, benchmarking of AI methods and generated experimental plans.
              </p>
              <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                Users can query models and datasets, compare biological relevance, and access a controlled environment for bringing their own code or AI agent.
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="platform" className="mt-10 grid gap-4 md:grid-cols-3">
          <Card className="rounded-3xl border-slate-200 shadow-sm md:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold tracking-tight">Platform roadmap</h2>
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {updates.map((u) => (
                  <div key={u.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-indigo-700">{u.date}</div>
                    <h3 className="mt-2 font-semibold">{u.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{u.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold tracking-tight">External users</h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Designed for academic collaborators, NHS partners and industry teams needing transparent access and reproducible outputs.
              </p>
              <Button className="mt-5 w-full rounded-full bg-slate-900 text-white hover:bg-slate-700" onClick={() => scrollToSection('ask-orb')}>
                Contact the Hub
              </Button>
            </CardContent>
          </Card>
        </section>

        <section id="governance" className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Governance and trust</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                ORB is designed around secure access, privacy-aware data handling, auditable decisions and clear IP and publication rules.
                Public partnership and stakeholder engagement are built into the platform from the outset.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {['Secure by design', 'FAIR metadata', 'Governed access', 'Transparent reporting'].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:px-8">
          <div>ORB Digital Platform mockup for the MRC bid.</div>
          <div>GitHub Pages-style landing page concept.</div>
        </div>
      </footer>
    </div>
  );
}
