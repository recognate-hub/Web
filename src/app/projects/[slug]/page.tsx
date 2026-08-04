import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Code2, BrainCircuit, Cog, Cpu, GraduationCap, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/shared/CTASection";
import { getProjects } from "@/data/projects";

// In App Router, we use generateStaticParams to statically generate the dynamic routes
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export const revalidate = 60;

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  // Map category to icon
  const icons: Record<string, React.ElementType> = {
    AI: BrainCircuit,
    Automation: Cog,
    Software: Code2,
    IoT: Cpu,
    "Final Year": GraduationCap,
  };
  const IconComp = icons[project.category] || Code2;

  // Map category to accent colors
  const categoryThemes: Record<string, { gradient: string; text: string; bg: string }> = {
    AI: { gradient: "from-accent-purple/20 via-accent/10 to-transparent", text: "text-accent-purple", bg: "bg-accent-purple/10" },
    Automation: { gradient: "from-accent/20 via-accent-cyan/10 to-transparent", text: "text-accent", bg: "bg-accent/10" },
    Software: { gradient: "from-accent-cyan/20 via-accent/10 to-transparent", text: "text-accent-cyan", bg: "bg-accent-cyan/10" },
    IoT: { gradient: "from-success/20 via-accent-cyan/10 to-transparent", text: "text-success", bg: "bg-success/10" },
    "Final Year": { gradient: "from-accent-purple/20 via-success/10 to-transparent", text: "text-accent-purple", bg: "bg-accent-purple/10" },
  };
  const theme = categoryThemes[project.category] || categoryThemes.Software;

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* ─── Hero Header ─── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] pointer-events-none"></div>
        <div className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none"></div>

        <Container className="relative z-10">
          <Button variant="ghost" className="px-0 mb-12 hover:bg-transparent hover:text-accent-purple group" asChild>
            <Link href="/projects">
              <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" /> Back to Projects
            </Link>
          </Button>
          
          <div className="flex flex-col gap-6 max-w-4xl">
            <div className="flex flex-wrap gap-4 items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-base shadow-neu-inset ${theme.text}`}>
                <div className={`w-2 h-2 rounded-full ${theme.bg} mr-2`}></div>
                {project.category}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold leading-tight animate-in fade-in slide-in-from-bottom-6 duration-500 delay-100">
              {project.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
              {project.shortDescription}
            </p>
          </div>
        </Container>
      </section>

      {/* ─── Hero Visual Presentation ─── */}
      <section className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
        <Container>
          <div className="w-full aspect-video md:aspect-[21/9] bg-base shadow-neu rounded-[3rem] p-4 relative overflow-hidden group">
            {/* Inner screen area */}
            <div className="w-full h-full rounded-[2rem] bg-base shadow-neu-inset relative overflow-hidden flex items-center justify-center">
              <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-700`}></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.1] pointer-events-none mix-blend-overlay"></div>
              
              {/* Massive background icon */}
              <div className={`absolute -right-12 -bottom-12 ${theme.text} opacity-[0.05] group-hover:opacity-10 transition-all duration-700 group-hover:scale-110`}>
                <IconComp size={400} strokeWidth={1} />
              </div>

              {/* Central floating icon */}
              <div className={`w-24 h-24 rounded-full bg-base/80 backdrop-blur-md shadow-neu flex items-center justify-center ${theme.text} z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                <IconComp size={40} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Details Section ─── */}
      <section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left Col: Overview */}
            <div className="lg:col-span-2 space-y-12">
              <div className="prose prose-lg prose-slate max-w-none">
                <h2 className="text-3xl font-heading font-bold text-text-primary mb-8 flex items-center gap-3">
                  <div className="w-8 h-[2px] bg-accent-purple/50"></div>
                  Overview
                </h2>
                <div className="bg-base shadow-neu rounded-3xl p-8 md:p-10 relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${theme.gradient} opacity-50 rounded-bl-full pointer-events-none`}></div>
                  <p className="text-lg text-text-secondary leading-loose whitespace-pre-wrap relative z-10">
                    {project.fullDescription}
                  </p>
                </div>
              </div>

              {/* Solution Highlights (Mockup) */}
              <div className="space-y-6 pt-4">
                <h3 className="text-2xl font-heading font-bold text-text-primary">Key Outcomes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(project.keyOutcomes && project.keyOutcomes.length > 0 ? project.keyOutcomes : ["Successfully deployed to production"]).map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-base shadow-neu-inset rounded-2xl p-4">
                      <div className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-success/10 text-success shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-text-secondary text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Meta Info */}
            <div className="space-y-8">
              {/* Technologies Card */}
              <div className="bg-base shadow-neu rounded-3xl p-8 relative overflow-hidden gradient-border-glow">
                <h3 className="text-xl font-heading font-bold text-text-primary mb-6 flex items-center gap-2">
                  <Code2 size={20} className={theme.text} /> Technologies
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-4 py-2 rounded-xl text-sm font-medium bg-base shadow-neu-inset text-text-secondary hover:text-text-primary hover:shadow-neu transition-all cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Meta Card */}
              <div className="bg-base shadow-neu rounded-3xl p-8">
                <h3 className="text-xl font-heading font-bold text-text-primary mb-6">Project Details</h3>
                <ul className="space-y-5">
                  <li className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wider font-bold text-text-secondary/60">Category</span>
                    <span className="font-medium text-text-primary">{project.category}</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wider font-bold text-text-secondary/60">Status</span>
                    <span className="inline-flex items-center gap-2 font-medium text-success">
                      {project.status === 'Completed' && <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>}
                      {project.status}
                    </span>
                  </li>
                </ul>
                {project.url && (
                  <div className="mt-8 pt-8 border-t border-black/5">
                    <Button variant="outline" className="w-full group" asChild>
                      <Link href={project.url} target="_blank" rel="noopener noreferrer">
                        Live Demo <ArrowUpRight size={16} className="ml-2 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection title="Ready to start your project?" />
    </div>
  );
}
