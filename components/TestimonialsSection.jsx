"use client";

import React from "react";
import { Star } from "lucide-react";

export const DEFAULT_TESTIMONIALS = [
  {
    id: "kiet",
    quote: "Khóa C# và ASP.NET Core giúp tôi hệ thống lại kiến thức bài bản, làm được dự án API hoàn chỉnh và vượt qua phỏng vấn Backend Developer chỉ sau 3 tháng.",
    author: "Lê Tuấn Kiệt",
    title: "Backend Engineer tại VNG",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: "my",
    quote: "Lộ trình UI/UX trên EduNext rất thực tế, tập trung vào design system, quy chuẩn auto-layout và tư duy sản phẩm số thay vì chỉ dạy công cụ Figma cơ bản.",
    author: "Nguyễn Thảo My",
    title: "Product Designer tại Tiki",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: "hoang",
    quote: "Khóa học SQL và Phân tích dữ liệu đi thẳng vào bài toán kinh doanh thật. Giờ đây mình có thể tự tin viết query phức tạp và xây dựng dashboard báo cáo cho sếp.",
    author: "Đỗ Minh Hoàng",
    title: "Data Analyst tại Shopee",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=150",
  },
];

export default function TestimonialsSection({
  className = "",
  badgeText = "Đánh giá thực tế",
  headlineTitle = "Cảm nhận từ",
  headlineGradient = "học viên",
  description = "Hơn 15,000 học viên đã nâng cao kỹ năng và bứt phá sự nghiệp cùng EduNext.",
  testimonials = DEFAULT_TESTIMONIALS,
}) {
  return (
    <section className={`w-full bg-[#07080B] text-white py-20 px-6 md:px-12 lg:px-24 font-sans border-t border-white/[0.06] ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group relative bg-[#0D0F17] border border-white/[0.08] hover:border-teal-500/40 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-lg shadow-black/40"
            >
              <div
                className="absolute top-4 right-6 text-5xl font-serif text-teal-400/10 pointer-events-none select-none"
                aria-hidden="true"
              >
                “
              </div>

              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-300 text-sm leading-relaxed italic mb-8">
                  “{t.quote}”
                </p>
              </div>

              {/* Author footer */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-11 h-11 rounded-full object-cover border border-teal-500/40 shadow-sm"
                  loading="lazy"
                />
                <div>
                  <strong className="text-white text-sm font-bold block">
                    {t.author}
                  </strong>
                  <small className="text-teal-400 text-xs font-medium block">
                    {t.title}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
