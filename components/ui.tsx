"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-70px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] ${light ? "text-white/50" : "text-moss"}`}>
      <span className={`h-px w-8 ${light ? "bg-white/30" : "bg-moss/50"}`} />
      {children}
    </div>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8.5 6.8v10.4c0 .83.92 1.33 1.62.88l8.08-5.2a1.05 1.05 0 0 0 0-1.76l-8.08-5.2c-.7-.45-1.62.05-1.62.88Z" fill="currentColor" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CapabilityIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    dialogue: <><path d="M5 16.5 2.5 19v-5.3A7.5 7.5 0 1 1 5 16.5Z" /><path d="M8 9h8M8 12h5" /></>,
    document: <><path d="M6 2.5h8l4 4v15H6v-19Z" /><path d="M14 2.5v4h4M9 11h6M9 15h6" /></>,
    connection: <><circle cx="6" cy="12" r="3" /><circle cx="18" cy="6" r="3" /><circle cx="18" cy="18" r="3" /><path d="m8.7 10.7 6.5-3.4M8.7 13.3l6.5 3.4" /></>,
    camera: <><rect x="3" y="6" width="14" height="12" rx="2" /><path d="m17 10 4-2v8l-4-2M7 6l1.2-2h3.6L13 6" /></>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <g stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</g>
    </svg>
  );
}
