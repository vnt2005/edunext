"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { AnimatedText } from "./ZiroBuildHero";

export const DEFAULT_CATEGORIES = [
  { id: "cntt", name: "Công nghệ thông tin", count: "14 chuyên ngành", icon: "💻", href: "#/group/cong-nghe-thong-tin" },
  { id: "design", name: "Thiết kế & UI/UX", count: "7 chuyên ngành", icon: "🎨", href: "#/group/thiet-ke-sang-tao" },
  { id: "marketing", name: "Marketing & Content", count: "3 chuyên ngành", icon: "🚀", href: "#/group/marketing-truyen-thong-noi-dung" },
  { id: "business", name: "Kinh doanh & Quản trị", count: "6 chuyên ngành", icon: "💼", href: "#/group/kinh-doanh-quan-tri" },
  { id: "data", name: "Tài chính & Dữ liệu", count: "5 chuyên ngành", icon: "📊", href: "#/group/tai-chinh-nhan-su-van-hanh" },
  { id: "languages", name: "Ngoại ngữ & Đào tạo", count: "3 chuyên ngành", icon: "🌐", href: "#/group/ngoai-ngu-giao-duc" },
  { id: "productivity", name: "Kỹ năng & Năng suất", count: "3 chuyên ngành", icon: "⚡", href: "#/group/ky-nang-van-phong" },
  { id: "ai", name: "AI & Khoa học máy tính", count: "4 chuyên ngành", icon: "🧠", href: "#/group/khoa-hoc-ky-thuat" },
];

export default function CategoryGrid({
  className = "",
  badgeText = "50 Chuyên ngành thực chiến",
  headlineTitle = "Khám phá theo",
  headlineGradient = "lĩnh vực hàng đầu",
  description = "Chọn đúng định hướng nghề nghiệp từ 50 chuyên ngành được chuẩn hóa theo thực tế doanh nghiệp.",
  categories = DEFAULT_CATEGORIES,
  viewAllText = "Xem tất cả 50 lĩnh vực",
  viewAllHref = "#/categories",
}) {
  return (
    <section className={`w-full bg-transparent text-white py-20 px-6 md:px-12 lg:px-24 font-sans ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-xs font-semibold text-slate-300 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)] animate-pulse" />
              <span>{badgeText}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
              {headlineTitle}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-200 to-teal-400">
                {headlineGradient}
              </span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl">
              {description}
            </p>
          </div>
          <a
            href={viewAllHref}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-sm font-semibold hover:bg-teal-500/20 hover:border-teal-400 hover:text-white transition-all w-fit"
          >
            <AnimatedText text={viewAllText} />
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={cat.href}
              className="group relative flex items-center gap-4 p-5 rounded-2xl bg-[#0D0F17] border border-white/[0.08] hover:border-teal-500/40 hover:bg-[#121522] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 group-hover:border-teal-500/30 transition-all">
                {cat.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-sm md:text-base truncate group-hover:text-teal-300 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-xs text-slate-400 group-hover:text-teal-200 transition-colors">
                  {cat.count}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 opacity-30 group-hover:opacity-100 group-hover:text-teal-400 group-hover:translate-x-1 transition-all shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

