"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Sparkles } from "lucide-react";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export function CTASection({
  title = "Have an idea? Let's build it.",
  description = "Partner with ReCognate to turn your concepts into reliable, scalable technology. Whether it's an enterprise automation system or a final year project, we're here to help.",
  primaryButtonText = "Contact Us",
  primaryButtonLink = "/contact",
  secondaryButtonText,
  secondaryButtonLink,
}: CTASectionProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background ambient glow specifically for CTA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-[100px] pointer-events-none"></div>
      {/* Secondary glow */}
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-accent-cyan/5 rounded-full blur-[80px] pointer-events-none"></div>
      
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative group rounded-[2.5rem] p-[2px] max-w-5xl mx-auto overflow-hidden shadow-neu"
        >
          {/* Animated Gradient Border */}
          <div 
             className="absolute inset-[-100%] origin-center animate-[spin_6s_linear_infinite]"
             style={{ background: "conic-gradient(from 0deg, transparent 40%, #8b5cf6 80%, #06b6d4 100%)" }}
          ></div>
          <div className="absolute inset-0 blur-lg" style={{ background: "conic-gradient(from 0deg, transparent 40%, #8b5cf6 80%, #06b6d4 100%)" }}></div>

          {/* Inner Content */}
          <div className="relative z-10 rounded-[2.5rem] bg-base/90 backdrop-blur-xl p-8 md:p-20 text-center flex flex-col items-center gap-8 overflow-hidden">
            {/* Shimmer sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-[2s] ease-in-out pointer-events-none rounded-[2.5rem]"></div>
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] pointer-events-none rounded-[2.5rem]"></div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-14 h-14 rounded-full bg-base shadow-neu flex items-center justify-center text-accent-purple"
            >
              <Sparkles size={24} />
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent-purple drop-shadow-sm pb-2">
              {title}
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl drop-shadow-sm">
              {description}
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-8 w-full max-w-md">
              <Link
                href={primaryButtonLink}
                className="flex-1 min-w-[200px] px-8 py-5 rounded-full bg-accent-purple text-white font-heading font-bold text-lg hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] hover:bg-accent-purple-hover transition-all flex items-center justify-center gap-2 group/btn"
              >
                {primaryButtonText}
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </Link>
              {secondaryButtonText && secondaryButtonLink && (
                <Link href={secondaryButtonLink} className="flex-1 min-w-[200px] px-8 py-5 rounded-full bg-base shadow-neu-inset text-text-secondary font-heading font-bold text-lg hover:shadow-neu hover:text-accent-cyan transition-all flex items-center justify-center">
                  {secondaryButtonText}
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
