"use client";

import React from "react";
import { ArrowRight, Lock, Check, MessageSquare } from "lucide-react";
import { AnimatedText } from "./ZiroBuildHero";

export const DEFAULT_TRUST_POINTS = [
  "Truy cập vĩnh viễn",
  "Chứng chỉ số định danh",
  "Hỏi đáp 1-1 cùng Mentor",
];

export default function BottomCtaBanner({
  className = "",
  badgeText = "Bắt đầu ngay hôm nay",
  headlineTitle = "Sẵn sàng bắt đầu",
  headlineGradient = "lộ trình của bạn?",
  description = "Gia nhập cộng đồng hơn 15,000 học viên nâng tầm kỹ năng số ngay hôm nay.",
  primaryButtonText = "Khám phá khóa học ngay",
  primaryButtonHref = "#/courses",
  secondaryButtonText = "Duyệt 50 lĩnh vực",
  secondaryButtonHref = "#/categories",
  trustPoints = DEFAULT_TRUST_POINTS,
}) {
  return (
    <section className={`w-full bg-[#050608] text-white py-20 px-6 md:px-12 lg:px-24 font-sans border-t border-white/[0.06] ${className}`}>
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0D0F17] to-[#06070A] border border-white/[0.12] p-12 md:p-16 text-center overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_60px_rgba(45,212,191,0.1)] flex flex-col items-center">
          {/* Ambient Spotlight */}
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-teal-400/20 blur-[100px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-xs font-semibold text-slate-300 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)] animate-pulse" />
            <span>{badgeText}</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-tight max-w-3xl">
            {headlineTitle}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-200 to-teal-400">
              {headlineGradient}
            </span>
          </h2>

          {/* Description */}
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl mb-9">
            {description}
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 w-full sm:w-auto">
            <a
              href={primaryButtonHref}
              className="group px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10 w-full sm:w-auto cursor-pointer"
            >
              <AnimatedText text={primaryButtonText} />
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={secondaryButtonHref}
              className="group px-8 py-4 bg-white/10 border border-white/30 backdrop-blur-md text-white font-semibold rounded-xl hover:bg-white/20 hover:border-white/50 transition-all w-full sm:w-auto cursor-pointer"
            >
              <AnimatedText text={secondaryButtonText} />
            </a>
          </div>

          {/* Trust points */}
          <div className="flex items-center justify-center gap-4 text-xs md:text-sm text-slate-400 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-teal-400" />
              {trustPoints[0]}
            </span>
            <span className="opacity-30">•</span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-teal-400" />
              {trustPoints[1]}
            </span>
            <span className="opacity-30">•</span>
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
              {trustPoints[2]}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
