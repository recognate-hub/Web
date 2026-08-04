"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        {
          "items-center text-center": centered,
        },
        className
      )}
      {...props}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={cn(
            "inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-base/80 backdrop-blur-md shadow-neu-inset text-accent-purple border border-accent-purple/20 relative overflow-hidden group transition-colors hover:text-accent-cyan hover:border-accent-cyan/40 cursor-default",
            centered ? "mx-auto" : "self-start"
          )}
        >
          {/* Shimmer sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>
          {/* Pulsing glow ring */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: "0 0 12px rgba(139,92,246,0.25)" }}></div>
          <span className="relative z-10 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] transition-colors">{eyebrow}</span>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-text-primary via-text-primary to-accent-purple drop-shadow-sm pb-1"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-lg text-text-secondary max-w-2xl drop-shadow-sm"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
