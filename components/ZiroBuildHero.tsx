"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export interface AnimatedTextProps {
  text: string;
}

/**
 * AnimatedText
 * Ticker roll hover effect where text rolls up and out while a duplicate rolls up into place.
 */
export function AnimatedText({ text }: AnimatedTextProps) {
  return (
    <span className="relative overflow-hidden inline-flex">
      <span className="transition-transform duration-500 ease-in-out group-hover:-translate-y-[120%] whitespace-nowrap">
        {text}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 transition-transform duration-500 ease-in-out translate-y-[120%] group-hover:translate-y-0 whitespace-nowrap flex justify-center items-center"
      >
        {text}
      </span>
    </span>
  );
}

export interface ZiroBuildHeroProps {
  className?: string;
  brandName?: string;
  navLinks?: NavLink[];
  loginText?: string;
  signupText?: string;
}

const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: "Trang chủ", href: "#/" },
  { label: "Khóa học", href: "#/courses" },
  { label: "Lĩnh vực", href: "#/categories" },
  { label: "Blog", href: "#/blog" },
  { label: "Hỏi đáp", href: "#/faq" },
];

/**
 * ZiroBuildHero
 * Full-viewport, dark, video-background hero section with slick roll-up hover interaction.
 * Synchronized with the EduNext brand and navigation content.
 */
export default function ZiroBuildHero({
  className = "",
  brandName = "EduNext",
  navLinks = DEFAULT_NAV_LINKS,
  loginText = "Đăng nhập",
  signupText = "Đăng ký",
}: ZiroBuildHeroProps) {
  return (
    <div
      className={`relative min-h-screen w-full flex flex-col overflow-hidden text-white font-sans bg-black ${className}`}
    >
      {/* 1. Background video (z-0) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://cdn.jiro.build/BG%20effect%20for%20Tanvir/bg-video.mp4"
      />

      {/* 2. Content wrapper (z-10) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 3. Header / navigation (EduNext content in ZiroBuild UI style) */}
        <header className="flex items-center justify-between px-8 py-6 w-full max-w-6xl mx-auto">
          {/* Left — Brand Logo */}
          <a href="#/" className="flex items-center gap-3 text-white no-underline group">
            <span className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center font-bold text-white text-lg shadow-sm group-hover:bg-teal-500 transition-colors">
              E
            </span>
            <div className="flex flex-col text-left">
              <span className="text-xl font-bold tracking-tight text-white leading-none">
                {brandName}
              </span>
              <span className="text-[10px] text-gray-400 font-medium tracking-wide mt-1">
                Học điều bạn cần
              </span>
            </div>
          </a>

          {/* Center — nav (desktop only) */}
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group hover:text-white transition-colors"
              >
                <AnimatedText text={link.label} />
              </a>
            ))}
          </nav>

          {/* Right — auth cluster */}
          <div className="flex items-center gap-5 text-sm font-medium">
            <a
              href="#/login"
              className="group hover:text-white text-gray-300 transition-colors"
            >
              <AnimatedText text={loginText} />
            </a>
            <a
              href="#/register"
              className="group px-5 py-2.5 border border-white/20 rounded-md hover:bg-white/10 transition-colors text-white"
            >
              <AnimatedText text={signupText} />
            </a>
          </div>
        </header>

        {/* 4. Main hero content */}
        <main className="flex-1 flex flex-col items-center justify-center pr-4 pl-[17px] max-w-5xl mx-auto text-center w-full mt-12 mb-[-80px] h-[680px]">
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-xs font-medium text-gray-200 mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span>Trusted by 500+ Innovation Teams</span>
          </div>

          {/* Headline */}
          <h1 className="text-[80px] leading-[88.6px] font-display font-medium tracking-tight mb-[20px]">
            Build The Future With
            <br />
            AI-Native Products
          </h1>

          {/* Paragraph */}
          <p className="text-[18px] leading-[26px] text-gray-300 mb-8 max-w-2xl font-light">
            Design, build, and scale intelligent products, with powerful AI tools
            built for modern teams.
          </p>

          {/* CTA button row */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#/courses"
              className="group px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <AnimatedText text="Explore More" />
            </a>
            <a
              href="#/categories"
              className="group px-8 py-4 bg-white/10 border border-white/30 backdrop-blur-md text-white font-medium rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <AnimatedText text="Get Started" />
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
