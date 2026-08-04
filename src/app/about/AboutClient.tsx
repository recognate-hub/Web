"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Lightbulb, ShieldCheck, BookOpen, Cpu, Target, Users, Rocket, Code2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { CTASection } from "@/components/shared/CTASection";
import { Button } from "@/components/ui/Button";
import React, { useRef, useCallback } from "react";

const values = [
  {
    title: "Innovation",
    description: "We don't just follow trends; we apply the latest advancements in AI and automation to solve real-world problems efficiently.",
    icon: Lightbulb,
    color: "text-amber-500",
    gradient: "from-amber-500/10 to-transparent",
  },
  {
    title: "Reliability",
    description: "Enterprise-grade architecture and robust code. We build solutions that scale and stand the test of time.",
    icon: ShieldCheck,
    color: "text-accent",
    gradient: "from-accent/10 to-transparent",
  },
  {
    title: "Mentorship",
    description: "We believe in lifting the next generation. Our student capstone program is designed to create real engineers, not just pass grades.",
    icon: BookOpen,
    color: "text-accent-purple",
    gradient: "from-accent-purple/10 to-transparent",
  },
  {
    title: "Quality Engineering",
    description: "From embedded IoT nodes to complex cloud infrastructure, quality is built into every layer of our stack.",
    icon: Cpu,
    color: "text-accent-cyan",
    gradient: "from-accent-cyan/10 to-transparent",
  },
];


import { TeamMember } from "@/data/team";

// Decorative section divider (reused from home page pattern)
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

export default function AboutClient({ initialTeam }: { initialTeam: TeamMember[] }) {
  const team = initialTeam;
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* ─── Hero Header ─── */}
      <section className="relative pt-32 md:pt-40 pb-20 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.3] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/8 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-[20%] right-[5%] w-[300px] h-[300px] bg-accent-cyan/5 rounded-full blur-[80px] pointer-events-none"></div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest bg-base/80 backdrop-blur-md shadow-neu-inset text-accent-purple border border-accent-purple/15 mx-auto"
            >
              <Sparkles size={12} className="mr-2" />
              About ReCognate
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold leading-tight"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent-purple">We engineer the </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-cyan">future.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto"
            >
              ReCognate is a specialized development hub. We partner with businesses to build custom AI, automation, and software solutions, and we mentor engineering students to build capstone projects that actually matter.
            </motion.p>

            {/* Quick stat badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap justify-center gap-4 pt-4"
            >
              {[
                { label: "On-time Delivery", value: "100%" },
                { label: "Tech Domains", value: "5+" },
                { label: "Client Satisfaction", value: "A+" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3 bg-base/80 backdrop-blur-md shadow-neu rounded-full px-5 py-2.5">
                  <span className="text-lg font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-cyan">{stat.value}</span>
                  <span className="text-xs text-text-secondary font-medium">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ─── Mission & Vision ─── */}
      <section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full relative overflow-hidden group gradient-border-glow">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-base shadow-neu flex items-center justify-center text-accent transition-transform group-hover:scale-110 group-hover:rotate-3">
                      <Target size={24} />
                    </div>
                    <CardTitle className="text-2xl">Our Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 space-y-4">
                  <p className="text-text-secondary leading-relaxed">
                    To bridge the gap between &ldquo;having an idea&rdquo; and &ldquo;deploying a reliable solution.&rdquo; We deliver world-class software and hardware solutions to businesses, while providing structured mentorship to the next generation of engineers.
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    We believe that technology should be accessible, reliable, and crafted with care — whether it&apos;s an enterprise automation platform or a student&apos;s capstone project.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full relative overflow-hidden group gradient-border-glow">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-base shadow-neu flex items-center justify-center text-accent-purple transition-transform group-hover:scale-110 group-hover:rotate-3">
                      <Rocket size={24} />
                    </div>
                    <CardTitle className="text-2xl">Our Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 space-y-4">
                  <p className="text-text-secondary leading-relaxed">
                    To become the go-to engineering partner for organizations that demand quality — and the most trusted mentorship hub for aspiring engineers across the country.
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    We envision a world where every startup has access to enterprise-grade engineering, and every student graduates with real, deployable experience under their belt.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      <SectionDivider />


      {/* ─── Values ─── */}
      <section className="py-20 bg-base shadow-neu-inset rounded-[3rem] mx-4 md:mx-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.12] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <Container className="relative z-10">
          <SectionHeading 
            eyebrow="Our Values" 
            title="What drives us" 
            description="The principles that guide every line of code and every decision we make."
            centered
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="h-full flex flex-col items-center text-center p-6 group hover:shadow-neu-hover transition-all duration-300 relative overflow-hidden gradient-border-glow">
                  {/* Gradient hover overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none`}></div>
                  
                  <div className={`w-16 h-16 rounded-full bg-base shadow-neu flex items-center justify-center ${value.color} mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-neu-hover relative z-10`}>
                    <value.icon size={28} />
                  </div>
                  <CardTitle className="mb-4 relative z-10 group-hover:text-accent transition-colors duration-300">{value.title}</CardTitle>
                  <CardDescription className="text-sm relative z-10">{value.description}</CardDescription>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ─── Team Section ─── */}
      <section>
        <Container>
          <SectionHeading 
            eyebrow="The Team" 
            title="Meet the experts" 
            description="A passionate team of engineers dedicated to building what matters."
            centered
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5, type: "spring", stiffness: 200 }}
              >
                <div className="bg-base shadow-neu rounded-3xl p-6 flex flex-col items-center text-center group hover:shadow-neu-hover transition-all duration-300 relative overflow-hidden gradient-border-glow">
                  {/* Gradient hover bg */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
                  
                  {/* Avatar with gradient ring */}
                  <div className="relative mb-6 z-10">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-accent-purple/20 via-accent/10 to-accent-cyan/20 p-[2px]">
                      <div className="w-full h-full rounded-full bg-base shadow-neu-inset flex items-center justify-center overflow-hidden">
                        {member.imageUrl ? (
                          <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-br from-accent-purple to-accent-cyan">
                            ?
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Status dot */}
                    <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-base shadow-neu flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-success"></div>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-heading text-text-primary relative z-10 group-hover:text-accent-purple transition-colors">{member.name}</h4>
                  <p className="text-accent-purple text-sm font-semibold mt-1 relative z-10">{member.role}</p>
                  <p className="text-xs text-text-secondary mt-2 relative z-10">{member.speciality}</p>
                  
                  {/* Decorative tech stack dots */}
                  <div className="flex gap-1.5 mt-4 relative z-10">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="w-1.5 h-1.5 rounded-full bg-accent-purple/25 group-hover:bg-accent-purple/50 transition-colors"></div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* ─── Why Work With Us ─── */}
      <section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="Why ReCognate"
                title="More than just a vendor."
                description="We're your engineering partner — invested in your success from day one."
              />
              <div className="mt-10 space-y-5">
                {[
                  { icon: Code2, text: "Clean, maintainable code with comprehensive documentation" },
                  { icon: Users, text: "Dedicated team that communicates proactively" },
                  { icon: ShieldCheck, text: "Enterprise-grade security and architecture patterns" },
                  { icon: Rocket, text: "Rapid iteration with CI/CD and automated testing" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex items-start gap-4 group/item"
                  >
                    <div className="mt-0.5 w-10 h-10 rounded-xl bg-base shadow-neu flex items-center justify-center text-accent-purple transition-all group-hover/item:shadow-neu-hover group-hover/item:scale-110 shrink-0">
                      <item.icon size={18} />
                    </div>
                    <p className="text-text-primary font-medium pt-2 group-hover/item:text-accent transition-colors">{item.text}</p>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-10"
              >
                <Button variant="primary" className="shadow-primary-btn hover:shadow-[0_8px_25px_rgba(37,99,235,0.5)] transition-shadow group" asChild>
                  <Link href="/contact">
                    Start a Conversation
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Process visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-base shadow-neu rounded-3xl p-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.1] pointer-events-none rounded-3xl"></div>
              <h4 className="font-heading text-lg font-bold text-text-primary mb-8 relative z-10">Our Process</h4>
              <div className="space-y-6 relative z-10">
                {[
                  { step: "01", title: "Discover", desc: "Understand your requirements, constraints, and goals." },
                  { step: "02", title: "Architect", desc: "Design scalable, clean architecture before writing code." },
                  { step: "03", title: "Build & Test", desc: "Iterative development with continuous testing and feedback." },
                  { step: "04", title: "Deploy & Support", desc: "Ship to production with documentation and ongoing support." },
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.12 }}
                    className="flex items-start gap-5 group/step"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-base shadow-neu-inset flex items-center justify-center shrink-0 transition-all group-hover/step:shadow-neu">
                      <span className="text-sm font-heading font-bold text-accent-purple">{item.step}</span>
                    </div>
                    <div className="pt-1">
                      <h5 className="font-heading font-bold text-text-primary group-hover/step:text-accent-purple transition-colors">{item.title}</h5>
                      <p className="text-sm text-text-secondary mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to work with us?"
        description="Let's discuss how ReCognate can help you build, automate, and scale your next project."
        primaryButtonText="Get in Touch"
        primaryButtonLink="/contact"
        secondaryButtonText="View Our Work"
        secondaryButtonLink="/projects"
      />
    </div>
  );
}
