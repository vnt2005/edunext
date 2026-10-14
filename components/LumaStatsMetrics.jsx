"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Stats and Metrics 01 Luma
 *
 * A dark, minimal results section for the Luma / EduNext brand.
 * Supports clean metric cards (number + label) with drifting corner dot-grid,
 * or extended mode with badge, headline, and paragraph body.
 *
 * Harmonized palette: Ultra-dark black canvas (#000000), frosted hairline borders,
 * glowing pill indicator, and subtle cyan-teal accents synchronized with the ZiroBuild hero.
 */

export const DEFAULT_STATS = [
  {
    number: "100+",
    label: "Khóa thực chiến",
    gradient: "from-white via-slate-100 to-teal-300/80",
  },
  {
    number: "50",
    label: "Chuyên ngành đào tạo",
    gradient: "from-white via-slate-100 to-cyan-300/80",
  },
  {
    number: "15,000+",
    label: "Học viên theo học",
    gradient: "from-white via-slate-100 to-teal-300/80",
  },
  {
    number: "98%",
    label: "Hài lòng & Có việc",
    gradient: "from-white via-slate-100 to-sky-300/80",
  },
];

// SVG DotGrid with subtle drift animation
function DotGrid({ id = "dotGrid" }) {
  return (
    <svg
      className="absolute bottom-0 right-0 w-[100px] h-[100px] opacity-25 pointer-events-none"
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="#2DD4BF" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill={`url(#${id})`} />
    </svg>
  );
}

function StatCard({ item, index }) {
  const hasBody = Boolean(item.body);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative bg-[#0A0B0B] border border-[#1B1B1A] hover:border-teal-500/40 rounded-[20px] ${
        hasBody ? "h-[320px] p-8" : "h-[200px] p-7"
      } flex flex-col justify-between overflow-hidden group transition-all duration-500 hover:shadow-[0_12px_40px_rgba(45,212,191,0.08)]`}
    >
      {/* Background glow on hover */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-teal-500/10 transition-colors duration-500" />

      {/* Top: Big Gradient Number */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.2, ease: "easeOut" }}
        className={`text-transparent bg-clip-text bg-gradient-to-r ${
          item.gradient || "from-white to-white/40"
        } text-[40px] md:text-[44px] font-bold leading-none tracking-tight font-sans`}
      >
        {item.number}
      </motion.div>

      {/* Bottom: Text block (Label + optional Body) */}
      <div className="relative z-10">
        <h4 className="text-white text-[16px] md:text-[17px] font-semibold tracking-tight group-hover:text-teal-200 transition-colors duration-300 m-0">
          {item.label}
        </h4>
        {hasBody && (
          <p className="text-[#94A3B8] text-[14px] leading-relaxed font-light mt-2 mb-0">
            {item.body}
          </p>
        )}
      </div>

      {/* Corner: Drifting Dot-Grid */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 5, 0], y: [0, 5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-full h-full relative"
        >
          <DotGrid id={`dotGrid-${index}`} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function LumaStatsMetrics({
  className = "",
  showHeader = false,
  badgeText = "Our statistics",
  headline = "Proven results you can measure",
  items = DEFAULT_STATS,
}) {
  return (
    <section
      className={`w-full bg-black py-14 px-6 md:px-12 lg:px-24 font-sans overflow-hidden text-white border-t border-white/5 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Optional Centered Header */}
        {showHeader && (
          <div className="flex flex-col items-center text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 bg-[#1E1F1F] border border-[#333333] hover:border-teal-500/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)] animate-pulse" />
              <span className="text-white text-[13px] font-medium tracking-wide">
                {badgeText}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-white text-[36px] md:text-[56px] font-bold leading-tight tracking-tight max-w-3xl"
            >
              {headline.includes("measure") ? (
                <>
                  Proven results you can{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-200 to-teal-400">
                    measure
                  </span>
                </>
              ) : (
                headline
              )}
            </motion.h2>
          </div>
        )}

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <StatCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
