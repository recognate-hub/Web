"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight, CheckCircle2, Code2, Star, BrainCircuit, Cog, Cpu, GraduationCap, Terminal, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/shared/CTASection";
import { services } from "@/data/services";
import { Project } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import HeroSection from "@/components/home/HeroSection";
import React from "react";

// Category icon mapping for project cards
const categoryIcons: Record<string, React.ElementType> = {
  AI: BrainCircuit,
  Automation: Cog,
  Software: Code2,
  IoT: Cpu,
  "Final Year": GraduationCap,
};

// Unique subtle tint per service card for visual variety
const serviceTints = [
  "from-accent/8 to-transparent",
  "from-accent-purple/8 to-transparent",
  "from-accent-cyan/8 to-transparent",
  "from-success/8 to-transparent",
  "from-accent/8 to-transparent",
];

// Animated counter component for the stats
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return () => unsubscribe();
  }, [rounded]);

  return (
    <motion.span
      onViewportEnter={() => {
        animate(count, target, { duration: 2, ease: "easeOut" });
      }}
    >
      {displayValue}{suffix}
    </motion.span>
  );
}

// Decorative section divider
function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-[1px] w-48 bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent origin-center"
      />
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="w-2 h-2 rounded-full bg-accent-purple/30 mx-3 shrink-0"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-[1px] w-48 bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent origin-center"
      />
    </div>
  );
}

export default function HomeClient({ featuredProjects }: { featuredProjects: Project[] }) {
  const featuredServices = services.slice(0, 5);

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <HeroSection />

      <SectionDivider />

      {/* ─── What We Do ─── */}
      <section>
        <Container>
          <SectionHeading 
            eyebrow="Capabilities" 
            title="What We Do" 
            description="Comprehensive engineering across software, hardware, and artificial intelligence."
            centered
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, i) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              >
                <Card className="h-full flex flex-col hover:shadow-neu-hover transition-all duration-300 group relative overflow-hidden gradient-border-glow">
                  {/* Unique tint gradient overlay per card */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${serviceTints[i] || serviceTints[0]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none`}></div>
                  <CardHeader className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-base shadow-neu flex items-center justify-center text-accent mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-neu-hover">
                      <service.icon size={24} />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow relative z-10">
                    <CardDescription>{service.description}</CardDescription>

                  </CardContent>
                  <CardFooter className="relative z-10">
                    <Button variant="ghost" className="w-full justify-between hover:bg-transparent hover:text-accent" asChild>
                      <Link href={`/services#${service.id}`}>
                        Learn more <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Button variant="outline" className="group" asChild>
              <Link href="/services">
                View All Services
                <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </Container>
      </section>

      <SectionDivider />

      {/* ─── Featured Projects ─── */}
      <section>
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <SectionHeading 
              eyebrow="Portfolio" 
              title="Featured Projects" 
              description="A glimpse into the robust solutions we've built."
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Button variant="outline" className="group" asChild>
                <Link href="/projects">
                  View All Projects
                  <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, i) => {
              const IconComp = categoryIcons[project.category] || Code2;
              const categoryGradients: Record<string, string> = {
                AI: "from-accent-purple/10 via-accent/5 to-transparent",
                Automation: "from-accent/10 via-accent-cyan/5 to-transparent",
                Software: "from-accent-cyan/10 via-accent/5 to-transparent",
                IoT: "from-success/10 via-accent-cyan/5 to-transparent",
                "Final Year": "from-accent-purple/10 via-success/5 to-transparent",
              };
              const gradient = categoryGradients[project.category] || categoryGradients.Software;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: i === 0 ? -25 : i === 2 ? 25 : 0, y: 25 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.55, ease: "easeOut" }}
                >
                  <Card className="h-full flex flex-col p-4 group hover:shadow-neu-hover transition-all duration-300 gradient-border-glow">
                    {/* Category-tinted graphic placeholder */}
                    <div className="w-full h-48 rounded-2xl bg-base shadow-neu-inset p-4 mb-6 relative overflow-hidden flex items-center justify-center">
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      {/* Decorative corner dots */}
                      <div className="absolute top-4 right-4 w-8 h-8 grid grid-cols-2 gap-1 opacity-20">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-purple"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-purple"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-purple"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-purple"></div>
                      </div>
                      <div className="w-16 h-16 rounded-full shadow-neu bg-base flex items-center justify-center text-accent z-10 transition-all duration-300 group-hover:scale-110 group-hover:text-accent-purple group-hover:shadow-neu-hover">
                        <IconComp size={24} />
                      </div>
                    </div>
                    <CardHeader className="px-2">
                      <div className="text-xs font-bold text-accent-purple uppercase tracking-wider mb-2">{project.category}</div>
                      <CardTitle className="text-xl group-hover:text-accent transition-colors duration-300">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-2 flex-grow">
                      <CardDescription>{project.shortDescription}</CardDescription>
                    </CardContent>
                    <CardFooter className="px-2 pb-2 mt-auto">
                      <Button variant="ghost" className="px-0 hover:bg-transparent hover:text-accent" asChild>
                        <Link href={`/projects/${project.id}`}>
                          View Details <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-2" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ─── Why ReCognate ─── */}
      <section className="py-20 bg-base shadow-neu-inset rounded-[3rem] mx-4 md:mx-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent-purple/5 blur-[100px] pointer-events-none"></div>
        
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading 
                eyebrow="Why Us" 
                title="Engineering excellence without the fluff." 
                description="We prioritize solid architecture, reliable code, and clear communication over buzzwords."
              />
              <div className="mt-10 space-y-5">
                {[
                  "End-to-end delivery from concept to deployment.",
                  "Modern, scalable tech stack (React, Node, Python, AWS).",
                  "Real engineering mentorship for students.",
                  "Comprehensive documentation and support."
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.45 }}
                    className="flex items-start gap-4 group/item"
                  >
                    <div className="mt-1 bg-base rounded-full shadow-neu p-1.5 text-success transition-all group-hover/item:shadow-neu-hover group-hover/item:scale-110">
                      <CheckCircle2 size={18} />
                    </div>
                    <p className="text-text-primary font-medium group-hover/item:text-accent transition-colors">{item}</p>
                  </motion.div>
                ))}
              </div>

              {/* Stat: 100% On-time Delivery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-10 inline-flex items-center gap-5 bg-base rounded-2xl shadow-neu px-7 py-5 relative overflow-hidden group/stat"
              >
                {/* Shimmer sweep on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-purple/10 to-transparent -translate-x-[200%] group-hover/stat:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none rounded-2xl"></div>
                <div className="text-4xl md:text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-cyan">
                  <AnimatedCounter target={100} suffix="%" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-text-primary">On-time Delivery</span>
                  <span className="text-xs text-text-secondary">Every project. Every time.</span>
                </div>
              </motion.div>
            </div>
            
            {/* Code terminal mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotateY: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative h-[420px] w-full rounded-3xl bg-base shadow-neu flex flex-col overflow-hidden"
              style={{ perspective: 1000 }}
            >
              {/* Terminal header bar */}
              <div className="flex items-center gap-2 px-6 py-4 border-b border-black/5 bg-base/50">
                <div className="w-3 h-3 rounded-full bg-red-400/80 hover:bg-red-500 transition-colors cursor-default"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80 hover:bg-yellow-500 transition-colors cursor-default"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/80 hover:bg-green-500 transition-colors cursor-default"></div>
                <span className="ml-3 text-xs text-text-secondary font-mono flex items-center gap-2">
                  <Sparkles size={10} className="text-accent-purple" />
                  architecture.ts
                </span>
              </div>
              {/* Terminal body */}
              <div className="flex-1 px-6 py-5 font-mono text-[13px] leading-relaxed overflow-hidden relative">
                {/* Line numbers gutter */}
                <div className="absolute left-0 top-5 bottom-0 w-10 flex flex-col items-end pr-2 text-text-secondary/25 text-[11px] leading-relaxed select-none">
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <div key={n} className="h-[1.625em]">{n}</div>
                  ))}
                </div>
                <div className="space-y-1.5 ml-8">
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                    <span className="text-accent-purple">const</span> <span className="text-accent-cyan">project</span> <span className="text-text-secondary">=</span> <span className="text-accent">ReCognate</span><span className="text-text-secondary">.</span><span className="text-success">init</span><span className="text-text-secondary">({"{"}</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
                    <span className="text-text-secondary ml-6">architecture:</span> <span className="text-amber-600">&quot;clean&quot;</span><span className="text-text-secondary">,</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
                    <span className="text-text-secondary ml-6">scalability:</span> <span className="text-amber-600">&quot;infinite&quot;</span><span className="text-text-secondary">,</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.0 }}>
                    <span className="text-text-secondary ml-6">testing:</span> <span className="text-accent-purple">true</span><span className="text-text-secondary">,</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.2 }}>
                    <span className="text-text-secondary ml-6">documentation:</span> <span className="text-amber-600">&quot;comprehensive&quot;</span><span className="text-text-secondary">,</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.4 }}>
                    <span className="text-text-secondary">{"}"});</span>
                  </motion.div>
                  <div className="h-4"></div>
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.6 }}>
                    <span className="text-text-secondary/50">{"// Built to scale. Built to last."}</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.8 }}>
                    <span className="text-accent-purple">await</span> <span className="text-accent-cyan">project</span><span className="text-text-secondary">.</span><span className="text-success">deploy</span><span className="text-text-secondary">();</span>
                    <span className="inline-block w-[2px] h-4 bg-accent-purple ml-1 align-middle" style={{ animation: "blink 1s step-end infinite" }}></span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2.2 }}
                    className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-success/10 rounded-lg w-fit"
                  >
                    <span className="text-success font-bold">✓</span> <span className="text-success font-medium">Deployed successfully</span>
                  </motion.div>
                </div>
                {/* Gradient fade at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-base to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ─── Final Year Projects Spotlight ─── */}
      <section>
        <Container>
          <div className="relative group rounded-[2rem] p-[2px] overflow-hidden shadow-neu">
            {/* Animated gradient border */}
            <div
              className="absolute inset-[-100%] origin-center animate-[spin_8s_linear_infinite]"
              style={{ background: "conic-gradient(from 0deg, transparent 50%, #8b5cf6 75%, #06b6d4 100%)" }}
            ></div>
            <div className="absolute inset-0 blur-lg opacity-50" style={{ background: "conic-gradient(from 0deg, transparent 50%, #8b5cf6 75%, #06b6d4 100%)" }}></div>

            <Card className="bg-base border-none shadow-none overflow-hidden relative p-4 md:p-8 rounded-[2rem]">
              {/* Decorative background shapes */}
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-base shadow-neu-inset opacity-50" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-base shadow-neu-inset opacity-50" />
              {/* Grid pattern */}
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.08] pointer-events-none rounded-[2rem]"></div>
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-4 md:p-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold bg-base shadow-neu-inset text-accent-purple">
                    <Sparkles size={12} className="mr-2" />
                    For Students
                  </div>
                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-accent-purple">Ace your Final Year Project</h3>
                  <p className="text-text-secondary text-lg max-w-md">
                    Get hands-on mentorship, enterprise-grade architecture, and comprehensive viva prep for your engineering capstone.
                  </p>
                  {/* Feature checklist */}
                  <div className="space-y-3">
                    {[
                      "Project ideation to final deployment",
                      "Complete PPT + Report + Project Deliverables",
                      "Hardware + software integration support"
                    ].map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-base shadow-neu flex items-center justify-center">
                          <CheckCircle2 size={14} className="text-success" />
                        </div>
                        <span className="text-sm text-text-primary font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  <Button variant="primary" className="shadow-primary-btn hover:shadow-[0_8px_25px_rgba(37,99,235,0.5)] transition-shadow" asChild>
                    <Link href="/services#final-year-projects">Explore Student Program</Link>
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="hidden md:flex justify-end pr-8"
                >
                  <div className="w-48 h-48 rounded-full bg-base shadow-neu flex items-center justify-center text-accent-purple relative group/icon">
                    {/* Pulsing ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-accent-purple/20 opacity-0 group-hover/icon:opacity-100 transition-opacity" style={{ animation: "pulse-glow 2s ease-in-out infinite" }}></div>
                    <GraduationCap size={64} className="transition-transform group-hover/icon:scale-110 group-hover/icon:rotate-6" />
                  </div>
                </motion.div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ─── Testimonials ─── */}
      <section className="relative">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <Container className="relative z-10">
          <SectionHeading 
            eyebrow="Testimonials" 
            title="What people say" 
            centered
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30, rotate: i === 0 ? -1 : i === 2 ? 1 : 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
              >
                <Card className="h-full flex flex-col justify-between relative overflow-hidden group hover:shadow-neu-hover transition-all duration-300 gradient-border-glow">
                  {/* Gradient decorative quote mark */}
                  <div className="absolute top-1 left-4 text-[7rem] font-heading pointer-events-none select-none leading-none text-transparent bg-clip-text bg-gradient-to-br from-accent-purple/20 to-accent-cyan/10">&ldquo;</div>
                  {/* Hover glow */}
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-accent-purple/0 group-hover:bg-accent-purple/5 blur-[40px] transition-all duration-500 pointer-events-none"></div>
                  
                  <CardHeader className="relative z-10 pt-10">
                    {/* Star rating */}
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + j * 0.05 }}
                        >
                          <Star size={14} className="fill-amber-400 text-amber-400 drop-shadow-[0_0_3px_rgba(251,191,36,0.4)]" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-text-primary leading-relaxed text-base italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  </CardHeader>
                  <CardFooter className="pt-6 mt-auto border-t border-black/5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 shadow-neu flex items-center justify-center text-accent-purple font-bold text-lg">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-text-primary text-sm">{testimonial.author}</span>
                        <span className="text-xs text-text-secondary">{testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Global CTA */}
      <CTASection />
    </div>
  );
}
