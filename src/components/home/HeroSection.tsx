"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import RecognateLogo from '@/components/ui/RecognateLogo';

export default function HeroSection() {

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-base">
      {/* Dot grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] z-0 pointer-events-none"></div>

      {/* Animated glowing reactor orb centered behind logo */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 360],
          opacity: [0.12, 0.35, 0.12],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[130px] z-0 pointer-events-none"
        style={{
          background: "conic-gradient(from 0deg, rgba(37,99,235,0.2), rgba(139,92,246,0.45), rgba(6,182,212,0.35), rgba(37,99,235,0.2))"
        }}
      />

      {/* Secondary ambient orb — offset for depth */}
      <motion.div
        animate={{ opacity: [0.08, 0.2, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] right-[10%] w-[400px] h-[400px] rounded-full blur-[100px] z-0 pointer-events-none bg-accent-cyan/20"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 lg:px-24 flex flex-col items-center text-center">
        
        {/* ══ 3D Logo with mouse-tracking tilt ══ */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="w-full max-w-5xl flex items-center justify-center origin-center"
          style={{ perspective: 1200 }}
        >
          <motion.div
            className="relative w-full"
          >
            {/* Idle floating animation layered underneath the tilt */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Static neumorphic shadow */}
              <div
                className="absolute inset-0 rounded-3xl blur-[2px] opacity-40 pointer-events-none"
                style={{
                  transform: "translate(0, 10px)",
                  background: "rgba(163,177,198,0.45)",
                  filter: "blur(24px)",
                  zIndex: -1,
                }}
              />

              {/* Logo layer — elevated in Z for depth */}
              <div
                style={{
                  transform: "translateZ(40px)",
                  filter: "drop-shadow(10px 10px 20px rgba(163,177,198,0.55)) drop-shadow(-10px -10px 20px rgba(255,255,255,0.85))",
                }}
                className="w-full relative"
              >
                <RecognateLogo animated={true} />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 sm:mt-16 mb-24"
        >
          <span className="font-['Cascade',var(--font-orbitron)] italic text-base sm:text-lg md:text-xl font-bold tracking-[0.3em] sm:tracking-[0.6em] md:tracking-[0.8em] uppercase text-text-secondary">
            A Development Hub
          </span>
        </motion.div>


        {/* Hero CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center gap-5"
        >
          {/* Charging Animated Border Button */}
          <div className="relative group rounded-full overflow-hidden p-[2px] shadow-neu hover:shadow-neu-inset transition-all">
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-150%] origin-center"
              style={{ background: "conic-gradient(from 0deg, transparent 60%, #8b5cf6 80%, #06b6d4 100%)" }}
            />
            <div className="absolute inset-0 blur-sm" style={{ background: "conic-gradient(from 0deg, transparent 60%, #8b5cf6 80%, #06b6d4 100%)" }}></div>
            <a href="/contact" className="relative z-10 flex items-center justify-center px-8 py-4 rounded-full bg-base text-accent font-heading font-bold text-lg hover:text-accent-purple transition-colors">
              Start Your Project
            </a>
          </div>

          <a href="/projects" className="px-8 py-4 rounded-full bg-base shadow-neu-inset text-text-secondary font-heading font-bold text-lg hover:shadow-neu hover:text-accent transition-all">
            See Our Work
          </a>
        </motion.div>
      </div>

      {/* Scroll-down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary/60 font-medium">Scroll</span>
        <ChevronDown size={20} className="text-text-secondary/50" style={{ animation: "scroll-hint 2s ease-in-out infinite" }} />
      </motion.div>
    </section>
  );
}
