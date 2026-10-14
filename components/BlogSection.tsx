"use client";

import React from "react";
import { ArrowRight, Clock } from "lucide-react";
import { AnimatedText } from "./ZiroBuildHero";

export interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;
  tag: string;
  time: string;
  image: string;
  href: string;
}

export interface BlogSectionProps {
  className?: string;
  badgeText?: string;
  headlineTitle?: string;
  headlineGradient?: string;
  description?: string;
  articles?: ArticleItem[];
  viewAllText?: string;
  viewAllHref?: string;
}

export const DEFAULT_ARTICLES: ArticleItem[] = [
  {
    id: "csharp-data",
    title: "Học C# bằng cách lần theo dữ liệu, không phải học thuộc cú pháp",
    excerpt: "Có thể bạn đã xem khá nhiều video C# nhưng khi mở Visual Studio lên vẫn lúng túng. Một cách học dễ bám hơn là theo dõi dữ liệu đi qua từng dòng code thay vì chỉ nhớ từ khóa.",
    tag: "Lập trình",
    time: "7 phút đọc",
    image: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&q=82&w=800",
    href: "#/blog/hoc-c-bang-cach-lan-theo-du-lieu-khong-phai-hoc-thuoc-cu-phap",
  },
  {
    id: "aspnet-api",
    title: "Xây dựng REST API: bắt đầu từ một endpoint chạy đúng",
    excerpt: "Routing, controller, dependency injection và cơ sở dữ liệu dễ thành một mớ khái niệm nếu học cùng lúc. Hãy tạo một endpoint nhỏ, kiểm tra kết quả rồi mới mở rộng kiến trúc.",
    tag: "ASP.NET Core",
    time: "8 phút đọc",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=82&w=800",
    href: "#/blog/xay-dung-rest-api-bat-dau-tu-mot-endpoint-chay-dung",
  },
  {
    id: "autocad-layer",
    title: "Bản vẽ AutoCAD rõ ràng bắt đầu từ đơn vị và layer",
    excerpt: "Trước khi vẽ nhanh, hãy làm cho bản vẽ đúng đơn vị, dễ đọc và có thể in ra đúng tỷ lệ. Vài thiết lập đầu buổi sẽ giúp bạn tránh nhiều lỗi ở cuối dự án.",
    tag: "AutoCAD 2D",
    time: "7 phút đọc",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
    href: "#/blog/ban-ve-autocad-ro-rang-bat-dau-tu-don-vi-va-layer",
  },
];

export default function BlogSection({
  className = "",
  badgeText = "Góc chuyên môn",
  headlineTitle = "Kiến thức &",
  headlineGradient = "Kinh nghiệm thực tế",
  description = "Những bài học ngắn, phương pháp tư duy và kinh nghiệm đúc kết từ các dự án phát triển phần mềm.",
  articles = DEFAULT_ARTICLES,
  viewAllText = "Xem tất cả bài viết",
  viewAllHref = "#/blog",
}: BlogSectionProps) {
  return (
    <section className={`w-full bg-[#0B0C10] text-white py-20 px-6 md:px-12 lg:px-24 font-sans border-t border-white/[0.06] ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
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

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => (
            <article
              key={art.id}
              className="group relative bg-[#0D0F17] border border-white/[0.08] hover:border-teal-500/40 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 shadow-lg shadow-black/40"
            >
              {/* Media */}
              <a href={art.href} className="relative aspect-video w-full overflow-hidden block bg-white/5">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-teal-800/90 border border-teal-400/30 text-white text-[11px] font-bold backdrop-blur-md">
                  {art.tag}
                </span>
              </a>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{art.time}</span>
                </div>

                <h3 className="text-white font-bold text-base md:text-lg leading-snug line-clamp-2 mb-3 group-hover:text-teal-200 transition-colors">
                  <a href={art.href}>{art.title}</a>
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-5 flex-1">
                  {art.excerpt}
                </p>

                <div className="pt-4 border-t border-white/[0.06]">
                  <a
                    href={art.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 group-hover:text-teal-300 transition-colors"
                  >
                    <AnimatedText text="Đọc bài viết" />
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
