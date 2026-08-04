"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, BrainCircuit, Cog, Code2, Cpu, GraduationCap, Cloud } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/shared/CTASection";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { services } from "@/data/services";
import React from "react";

// Per-service accent colors and gradients for visual variety
const serviceThemes: Record<string, { accent: string; gradient: string; bgGlow: string; codeLines: string[][] }> = {
  "ai-solutions": {
    accent: "text-accent-purple",
    gradient: "from-accent-purple/12 via-accent/5 to-transparent",
    bgGlow: "bg-accent-purple/8",
    codeLines: [
      ["const", "model", "=", "tf.sequential()"],
      ["model.", "add", "(Dense(128))"],
      ["await", "model.", "fit", "(data)"],
      ["//", "accuracy: 97.3%"],
    ],
  },
  "automation": {
    accent: "text-accent",
    gradient: "from-accent/12 via-accent-cyan/5 to-transparent",
    bgGlow: "bg-accent/8",
    codeLines: [
      ["const", "bot", "=", "new RPA()"],
      ["bot.", "extract", "(invoiceData)"],
      ["await", "bot.", "process", "(queue)"],
      ["//", "80% time saved"],
    ],
  },
  "software-development": {
    accent: "text-accent-cyan",
    gradient: "from-accent-cyan/12 via-accent/5 to-transparent",
    bgGlow: "bg-accent-cyan/8",
    codeLines: [
      ["export", "default", "function", "App()"],
      ["const", "[data]", "=", "useSWR(api)"],
      ["return", "<Dashboard", "/>"],
      ["//", "shipped to prod ✓"],
    ],
  },
  "iot-solutions": {
    accent: "text-success",
    gradient: "from-success/12 via-accent-cyan/5 to-transparent",
    bgGlow: "bg-success/8",
    codeLines: [
      ["sensor.", "read", "(GPIO_PIN)"],
      ["mqtt.", "publish", "(sensorData)"],
      ["dashboard.", "update", "()"],
      ["//", "real-time stream ✓"],
    ],
  },
  "final-year-projects": {
    accent: "text-accent-purple",
    gradient: "from-accent-purple/12 via-success/5 to-transparent",
    bgGlow: "bg-accent-purple/8",
    codeLines: [
      ["project.", "init", "({ mentor: true })"],
      ["docs.", "generate", "(thesis)"],
      ["viva.", "prepare", "(slides)"],
      ["//", "grade: A+ ✓"],
    ],
  },
  "cloud-devops": {
    accent: "text-accent-cyan",
    gradient: "from-accent-cyan/12 via-accent-purple/5 to-transparent",
    bgGlow: "bg-accent-cyan/8",
    codeLines: [
      ["docker.", "build", "(-t app .)"],
      ["kubectl", "apply", "(-f deploy)"],
      ["terraform", "plan", "→ apply"],
      ["//", "99.9% uptime ✓"],
    ],
  },
};

const processSteps = [
  { step: "01", title: "Discover", description: "We analyze your requirements, constraints, and business goals to define a clear scope.", icon: "🔍" },
  { step: "02", title: "Design", description: "Architecture planning, UI/UX design, and component selection to ensure a robust foundation.", icon: "✏️" },
  { step: "03", title: "Develop", description: "Iterative, test-driven development with regular check-ins and transparent progress tracking.", icon: "⚡" },
  { step: "04", title: "Deliver", description: "Rigorous testing, deployment, handover, and ongoing support for your solution.", icon: "🚀" },
];

// Decorative section divider
function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2">
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="h-[1px] w-48 bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent origin-center" />
      <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.4 }} className="w-2 h-2 rounded-full bg-accent-purple/30 mx-3 shrink-0" />
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="h-[1px] w-48 bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent origin-center" />
    </div>
  );
}

// Visual Neural Network for AI Service
function NeuralNetworkVisual() {
  const nodeLayers = [
    { color: "#3b82f6", nodes: [{x: 20, y: 25}, {x: 20, y: 50}, {x: 20, y: 75}] },
    { color: "#06b6d4", nodes: [{x: 50, y: 15}, {x: 50, y: 38}, {x: 50, y: 62}, {x: 50, y: 85}] },
    { color: "#8b5cf6", nodes: [{x: 80, y: 25}, {x: 80, y: 50}, {x: 80, y: 75}] }
  ];

  const connections: {from: {x:number, y:number}, to: {x:number, y:number}, color1: string, color2: string}[] = [];
  for (let i = 0; i < nodeLayers.length - 1; i++) {
    for (const node1 of nodeLayers[i].nodes) {
      for (const node2 of nodeLayers[i+1].nodes) {
        connections.push({ from: node1, to: node2, color1: nodeLayers[i].color, color2: nodeLayers[i+1].color });
      }
    }
  }

  return (
    <div className="w-full h-full rounded-[2.5rem] bg-base shadow-neu-inset flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/12 via-accent/5 to-transparent pointer-events-none rounded-[2.5rem]"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.08] pointer-events-none rounded-[2.5rem]"></div>
      
      <motion.svg 
        viewBox="0 0 100 100" 
        className="w-full h-full p-8 relative z-10 overflow-visible"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "100px" }}
      >
        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {connections.map((c, i) => (
          <motion.line
            key={`conn-${i}`}
            x1={c.from.x}
            y1={c.from.y}
            x2={c.to.x}
            y2={c.to.y}
            stroke={c.from.x === 20 ? "url(#lineGradient1)" : "url(#lineGradient2)"}
            strokeWidth="0.5"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: [0, 0, 1, 1, 0, 0],
                opacity: [0, 0, 0.5, 0.5, 0, 0],
                transition: { 
                  duration: 10, 
                  times: [0, 0.28, 0.38, 0.75, 0.85, 1], 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.05
                }
              }
            }}
          />
        ))}

        {nodeLayers.map((layer, layerIdx) => (
          <g key={`layer-${layerIdx}`}>
            {layer.nodes.map((node, i) => (
              <motion.g 
                key={`node-group-${layerIdx}-${i}`}
                variants={{
                  hidden: { opacity: 0, x: (node.x - 50) * 5, y: (node.y - 50) * 5 },
                  visible: { 
                    opacity: [0, 1, 1, 0, 0], 
                    x: [(node.x - 50) * 5, 0, 0, (node.x - 50) * 5, (node.x - 50) * 5], 
                    y: [(node.y - 50) * 5, 0, 0, (node.y - 50) * 5, (node.y - 50) * 5], 
                    transition: { 
                      duration: 10, 
                      times: [0, 0.12, 0.88, 0.98, 1], 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: (layerIdx * 4 + i) * 0.15
                    } 
                  }
                }}
              >
                {/* Outer ring */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="6"
                  fill="transparent"
                  stroke={layer.color}
                  strokeWidth="0.5"
                  strokeOpacity="0.5"
                  initial={{ scale: 0.85 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: (layerIdx + i) * 0.3 }}
                />
                {/* Inner glowing dot */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="2.2"
                  fill={layer.color}
                  style={{ filter: `drop-shadow(0 0 5px ${layer.color}) drop-shadow(0 0 10px ${layer.color})` }}
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: (layerIdx + i) * 0.3 }}
                />
              </motion.g>
            ))}
          </g>
        ))}
      </motion.svg>
    </div>
  );
}

// Mini code terminal for each service
function ServiceTerminal({ serviceId, title }: { serviceId: string; title: string }) {
  const theme = serviceThemes[serviceId];
  if (!theme) return null;

  const syntaxColors = ["text-accent-purple", "text-accent-cyan", "text-text-secondary", "text-amber-600"];

  return (
    <div className="w-full h-full rounded-[2.5rem] bg-base shadow-neu-inset flex flex-col overflow-hidden relative">
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} pointer-events-none rounded-[2.5rem]`}></div>
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.08] pointer-events-none rounded-[2.5rem]"></div>

      {/* Terminal header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-black/5 relative z-10">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/60"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/60"></div>
        <span className="ml-3 text-[11px] text-text-secondary/70 font-mono">
          {serviceId === 'ai-solutions' ? 'neural-network.ts' : `${serviceId}.ts`}
        </span>
      </div>

      {/* Code body */}
      <div className="flex-1 px-6 py-5 font-mono text-[12px] md:text-[13px] leading-loose relative z-10 flex flex-col justify-center">
        {theme.codeLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="flex gap-1.5"
          >
            {line.map((token, j) => (
              <span key={j} className={j === line.length - 1 && i === theme.codeLines.length - 1 ? "text-success" : syntaxColors[j % syntaxColors.length]}>
                {token}
              </span>
            ))}
          </motion.div>
        ))}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="inline-block w-[2px] h-4 bg-accent-purple mt-2"
          style={{ animation: "blink 1s step-end infinite" }}
        />
      </div>

      {/* Central icon */}
      <div className="absolute bottom-6 right-6 w-14 h-14 rounded-2xl bg-base/80 backdrop-blur-sm shadow-neu flex items-center justify-center opacity-30 z-10">
        <ServiceIcon serviceId={serviceId} size={24} />
      </div>
    </div>
  );
}

// Map service ID to icon
function ServiceIcon({ serviceId, size = 32 }: { serviceId: string; size?: number }) {
  const icons: Record<string, React.ElementType> = {
    "ai-solutions": BrainCircuit,
    "automation": Cog,
    "software-development": Code2,
    "iot-solutions": Cpu,
    "final-year-projects": GraduationCap,
    "cloud-devops": Cloud,
  };
  const Icon = icons[serviceId] || Code2;
  return <Icon size={size} />;
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* ─── Hero Header ─── */}
      <section className="relative pt-32 md:pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.3] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/8 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] bg-accent-purple/5 rounded-full blur-[80px] pointer-events-none"></div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest bg-base/80 backdrop-blur-md shadow-neu-inset text-accent-purple border border-accent-purple/15 mx-auto"
            >
              <Sparkles size={12} className="mr-2" />
              What We Offer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold leading-tight"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent-purple">Engineering solutions that </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-cyan">scale.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto"
            >
              From deep-tech AI integrations to comprehensive student mentorship, explore our core areas of expertise.
            </motion.p>

            {/* Service quick-nav pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap justify-center gap-3 pt-4"
            >
              {services.map((s, i) => (
                <motion.a
                  key={s.id}
                  href={`#${s.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-base/80 backdrop-blur-md shadow-neu text-text-secondary text-sm font-medium hover:text-accent-purple hover:shadow-neu-hover transition-all group"
                >
                  <s.icon size={14} className="group-hover:scale-110 transition-transform" />
                  {s.title}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ─── Services List ─── */}
      <section>
        <Container>
          <div className="flex flex-col gap-32">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              const theme = serviceThemes[service.id];
              return (
                <div key={service.id}>
                  <div 
                    id={service.id} 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center scroll-m-32"
                  >
                    {/* Content side */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.55 }}
                      className={isEven ? "lg:order-1" : "lg:order-2"}
                    >
                      {/* Service number + icon */}
                      <div className="flex items-center gap-4 mb-8">
                        <div className={`w-14 h-14 rounded-2xl bg-base shadow-neu flex items-center justify-center ${theme?.accent || "text-accent"} transition-transform hover:scale-110 hover:rotate-3`}>
                          <service.icon size={28} />
                        </div>
                        <span className="text-6xl font-heading font-extrabold text-text-primary/[0.06] select-none">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent-purple mb-6 pb-1">
                        {service.title}
                      </h2>
                      <p className="text-lg text-text-secondary leading-relaxed mb-8">
                        {service.description}
                      </p>
                      
                      {/* Key offerings */}
                      <div className="space-y-4 mb-8">
                        <h4 className="font-semibold text-text-primary uppercase tracking-wider text-xs flex items-center gap-2">
                          <div className="w-6 h-[1px] bg-accent-purple/40"></div>
                          Key Offerings
                        </h4>
                        <ul className="space-y-3">
                          {service.features.map((feature, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -15 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.2 + i * 0.08 }}
                              className="flex items-start gap-3 group/feat"
                            >
                              <div className="mt-1 flex items-center justify-center w-5 h-5 rounded-full bg-base shadow-neu text-success transition-all group-hover/feat:shadow-neu-hover group-hover/feat:scale-110">
                                <Check size={12} strokeWidth={3} />
                              </div>
                              <span className="text-text-secondary group-hover/feat:text-text-primary transition-colors">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                    </motion.div>

                    {/* Visual side — code terminal */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.93 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6, delay: 0.15 }}
                      className={`w-full aspect-square md:aspect-[4/3] lg:aspect-square ${isEven ? "lg:order-2" : "lg:order-1"}`}
                    >
                      {service.id === "ai-solutions" ? (
                        <NeuralNetworkVisual />
                      ) : (
                        <ServiceTerminal serviceId={service.id} title={service.title} />
                      )}
                    </motion.div>
                  </div>

                  {/* Divider between services (not after last) */}
                  {index < services.length - 1 && (
                    <div className="mt-32">
                      <SectionDivider />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ─── Process Section ─── */}
      <section className="py-24 bg-base shadow-neu-inset rounded-[3rem] mx-4 md:mx-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.12] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-cyan/5 rounded-full blur-[80px] pointer-events-none"></div>

        <Container className="relative z-10">
          <SectionHeading 
            eyebrow="Process" 
            title="How We Work" 
            description="A proven methodology that delivers results, every time."
            centered
            className="mb-20"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-14 left-[12%] right-[12%] h-[2px] overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-accent-purple/30 via-accent/20 to-accent-cyan/30 origin-left"
              />
            </div>
            
            {processSteps.map((step, i) => (
              <motion.div 
                key={step.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative z-10 flex flex-col items-center text-center space-y-5 group"
              >
                <div className="w-28 h-28 rounded-full bg-base shadow-neu flex items-center justify-center relative group-hover:shadow-neu-hover transition-all">
                  {/* Pulsing ring on hover */}
                  <div className="absolute inset-0 rounded-full border-2 border-accent-purple/0 group-hover:border-accent-purple/20 transition-all" style={{ animation: "pulse-glow 2s ease-in-out infinite" }}></div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-0.5">{step.icon}</span>
                    <span className="text-lg font-heading font-bold text-accent-purple">{step.step}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-text-primary mb-3 group-hover:text-accent-purple transition-colors">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <Button variant="primary" className="shadow-primary-btn hover:shadow-[0_8px_25px_rgba(37,99,235,0.5)] transition-shadow group" asChild>
              <Link href="/contact">
                Start Your Project
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </Container>
      </section>

      <CTASection
        title="Need a custom solution?"
        description="Tell us about your project and we'll craft an engineering plan tailored to your needs, timeline, and budget."
        primaryButtonText="Get a Free Consultation"
        primaryButtonLink="/contact"
      />
    </div>
  );
}
