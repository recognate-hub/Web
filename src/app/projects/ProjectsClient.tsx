"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BrainCircuit, Cog, Code2, Cpu, GraduationCap, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/Card";
import { CTASection } from "@/components/shared/CTASection";
import { Project, ProjectCategory } from "@/data/projects";

const categories: ProjectCategory[] = ["All", "AI", "Automation", "Software", "IoT", "Final Year"];

// Category icon mapping for project cards
const categoryIcons: Record<string, React.ElementType> = {
  AI: BrainCircuit,
  Automation: Cog,
  Software: Code2,
  IoT: Cpu,
  "Final Year": GraduationCap,
};

export default function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const [activeCategory, setActiveCategory] = React.useState<ProjectCategory>("All");

  const filteredProjects = React.useMemo(() => {
    if (activeCategory === "All") return initialProjects;
    return initialProjects.filter((p) => p.category === activeCategory);
  }, [activeCategory, initialProjects]);

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* ─── Hero Header ─── */}
      <section className="relative pt-32 md:pt-40 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.3] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/8 rounded-full blur-[120px] pointer-events-none"></div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest bg-base/80 backdrop-blur-md shadow-neu-inset text-accent-cyan border border-accent-cyan/15 mx-auto"
            >
              <Sparkles size={12} className="mr-2" />
              Portfolio
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold leading-tight"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent-cyan">Our </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">Work</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto"
            >
              Explore our portfolio of scalable software, intelligent automation, and IoT innovations built for real-world impact.
            </motion.p>
            
            {/* Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap justify-center gap-3 pt-4"
            >
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isActive
                        ? "text-white shadow-[0_4px_15px_rgba(139,92,246,0.4)]"
                        : "bg-base text-text-secondary shadow-neu hover:shadow-neu-hover hover:text-text-primary active:shadow-neu-inset"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFilter"
                        className="absolute inset-0 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <span className="relative z-10">{category}</span>
                  </button>
                );
              })}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ─── Projects Grid ─── */}
      <section className="relative">
        {/* Ambient glows behind grid */}
        <div className="absolute top-[20%] left-[5%] w-[400px] h-[400px] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] bg-accent-cyan/5 rounded-full blur-[80px] pointer-events-none"></div>

        <Container className="relative z-10">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => {
                const IconComp = categoryIcons[project.category] || Code2;
                const categoryGradients: Record<string, string> = {
                  AI: "from-accent-purple/15 via-accent/5 to-transparent",
                  Automation: "from-accent/15 via-accent-cyan/5 to-transparent",
                  Software: "from-accent-cyan/15 via-accent/5 to-transparent",
                  IoT: "from-success/15 via-accent-cyan/5 to-transparent",
                  "Final Year": "from-accent-purple/15 via-success/5 to-transparent",
                };
                const gradient = categoryGradients[project.category] || categoryGradients.Software;

                return (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, filter: "blur(5px)" }}
                    transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                  >
                    <Card className="h-full flex flex-col p-4 group hover:shadow-neu-hover transition-all duration-300 gradient-border-glow bg-base/80 backdrop-blur-sm">
                      {/* Decorative graphic placeholder */}
                      <div className="w-full h-48 rounded-2xl bg-base shadow-neu-inset p-4 mb-6 relative overflow-hidden flex items-center justify-center">
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>
                        
                        {/* Decorative corner dots */}
                        <div className="absolute top-4 right-4 w-8 h-8 grid grid-cols-2 gap-1 opacity-20 transition-opacity group-hover:opacity-40">
                          <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                        </div>
                        
                        <div className="w-16 h-16 rounded-full shadow-neu bg-base flex items-center justify-center text-accent z-10 transition-transform duration-500 group-hover:scale-110 group-hover:text-accent-cyan group-hover:shadow-neu-hover">
                          <IconComp size={24} />
                        </div>
                      </div>
                      
                      <CardHeader className="px-2">
                        <div className="text-xs font-bold text-accent-cyan uppercase tracking-wider mb-2 flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-accent-cyan"></div>
                          {project.category}
                        </div>
                        <CardTitle className="text-xl group-hover:text-accent-cyan transition-colors">{project.title}</CardTitle>
                      </CardHeader>
                      
                      <CardContent className="px-2 flex-grow">
                        <CardDescription>{project.shortDescription}</CardDescription>
                      </CardContent>
                      
                      <CardFooter className="px-2 pb-2 mt-auto pt-6">
                        <Link 
                          href={`/projects/${project.id}`}
                          className="inline-flex items-center text-sm font-bold text-text-primary hover:text-accent-cyan transition-colors group/link"
                        >
                          View Details 
                          <ArrowRight size={16} className="ml-2 transition-transform group-hover/link:translate-x-2" />
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
          
          {filteredProjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 flex flex-col items-center justify-center"
            >
              <div className="w-20 h-20 rounded-full bg-base shadow-neu-inset flex items-center justify-center text-text-secondary/30 mb-6">
                <Code2 size={32} />
              </div>
              <p className="text-xl text-text-secondary font-medium">No projects found in this category.</p>
              <button 
                onClick={() => setActiveCategory("All")}
                className="mt-6 text-accent hover:text-accent-cyan font-semibold transition-colors"
              >
                Clear Filter
              </button>
            </motion.div>
          )}
        </Container>
      </section>

      <CTASection
        title="Ready to start your project?"
        description="Whether you need a custom enterprise solution or a student capstone, we're ready to engineer it."
      />
    </div>
  );
}
