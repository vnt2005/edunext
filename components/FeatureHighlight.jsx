"use client";

import React from "react";
import { Play, Check } from "lucide-react";

export const DEFAULT_STEPS = [
  {
    number: "01",
    title: "Lộ trình chuẩn hóa",
    description: "Xem trước đề cương chi tiết, mục tiêu đầu ra và video giới thiệu trước khi đăng ký.",
  },
  {
    number: "02",
    title: "Thực hành theo dự án",
    description: "Mỗi bài giảng đều đi kèm code mẫu, tài liệu cheat sheet và bài tập áp dụng thực tế.",
  },
  {
    number: "03",
    title: "Chứng chỉ số định danh",
    description: "Hoàn thành toàn bộ bài học để nhận chứng chỉ chính thức có mã tra cứu trên hệ thống.",
  },
];

export const DEFAULT_CHECKLIST = [
  "Cấu hình Controller & Dependency Injection",
  "Kết nối CSDL Entity Framework Core",
  "Kiểm thử tự động với Swagger & Postman",
];

export default function FeatureHighlight({
  className = "",
  badgeText = "Trải nghiệm tinh gọn",
  headlineTitle = "Học tập chủ động.",
  headlineGradient = "Tiến bộ từng ngày.",
  description = "EduNext loại bỏ rườm rà, tập trung 100% vào việc giúp bạn xây dựng kỹ năng và sản phẩm thật.",
  steps = DEFAULT_STEPS,
  videoThumbnail = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=700",
  lessonLabel = "Bài 03 / 24",
  lessonTitle = "Xây dựng REST API với ASP.NET Core",
  checklist = DEFAULT_CHECKLIST,
}) {
  return (
    <section className={`w-full bg-[#07080B] text-white py-24 px-6 md:px-12 lg:px-24 font-sans border-t border-white/[0.06] ${className}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Left Column: Copy & Steps */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-xs font-semibold text-slate-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)] animate-pulse" />
            <span>{badgeText}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            {headlineTitle}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-200 to-teal-400">
              {headlineGradient}
            </span>
          </h2>

          <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-lg">
            {description}
          </p>

          <div className="flex flex-col gap-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group flex items-start gap-5 p-5 rounded-2xl bg-[#0D0F17] border border-white/[0.08] hover:border-teal-500/40 hover:bg-[#121522] transition-all duration-300 hover:translate-x-1.5"
              >
                <div className="text-2xl font-black font-mono leading-none pt-0.5 text-transparent bg-clip-text bg-gradient-to-r from-white to-teal-400">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-white font-bold text-base mb-1 group-hover:text-teal-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Glass Classroom Mockup */}
        <div className="relative">
          <div className="relative bg-[#0D0F17] border border-teal-500/30 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(45,212,191,0.15)] group">
            {/* Video Box */}
            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={videoThumbnail}
                alt="Video bài giảng"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                type="button"
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-teal-600/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(45,212,191,0.6)] hover:scale-110 transition-transform cursor-pointer"
                aria-label="Xem video demo"
              >
                <Play className="w-6 h-6 fill-white ml-1" />
              </button>
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/75 border border-white/20 text-white text-xs font-semibold backdrop-blur-md">
                Trải nghiệm bài giảng
              </div>
            </div>

            {/* Syllabus Details */}
            <div className="p-6 md:p-8">
              <div className="mb-5">
                <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block mb-1">
                  {lessonLabel}
                </span>
                <strong className="text-lg md:text-xl font-bold text-white block">
                  {lessonTitle}
                </strong>
              </div>

              <div className="flex flex-col gap-3">
                {checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs md:text-sm text-slate-300">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
