"use client";

import React, { useState } from "react";
import { Plus, ArrowRight } from "lucide-react";
import { AnimatedText } from "./ZiroBuildHero";

export const DEFAULT_FAQS = [
  {
    id: "faq-1",
    question: "EduNext có những lĩnh vực nào?",
    answer: "Danh mục được chia thành 11 nhóm chuyên ngành với 50 lĩnh vực đào tạo thực chiến từ CNTT, Thiết kế, Marketing đến Kinh doanh và Ngoại ngữ.",
  },
  {
    id: "faq-2",
    question: "Làm sao biết một khóa học đã mở bán?",
    answer: "Trạng thái được hiển thị rõ bằng huy hiệu Bán chạy hoặc Đề cương trên mỗi thẻ khóa học và trang chi tiết.",
  },
  {
    id: "faq-3",
    question: "Tôi có thể xem nội dung trước khi đăng ký không?",
    answer: "Có! Bạn có thể xem đề cương chi tiết từng bài học, mục tiêu đầu ra và video xem trước miễn phí.",
  },
  {
    id: "faq-4",
    question: "Tiến độ học tập và chứng chỉ được lưu như thế nào?",
    answer: "Khi tài khoản hoàn thành các bài học, hệ thống tự động ghi nhận tiến độ và cấp chứng chỉ số chính thức có mã định danh xác thực.",
  },
];

export default function FaqSection({
  className = "",
  badgeText = "Hỏi đáp & Hỗ trợ",
  headlineTitle = "Những điều cần biết",
  headlineGradient = "trước khi học",
  description = "Giải đáp thắc mắc về lộ trình đào tạo, quyền truy cập và chính sách cấp chứng chỉ tại EduNext.",
  helpBoxTitle = "Bạn có câu hỏi khác?",
  helpBoxDescription = "Đội ngũ cố vấn luôn sẵn sàng giải đáp thắc mắc 24/7 qua cộng đồng và live chat.",
  viewAllText = "Xem toàn bộ câu hỏi",
  viewAllHref = "#/faq",
  faqs = DEFAULT_FAQS,
}) {
  const [openId, setOpenId] = useState(faqs[0]?.id || null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={`w-full bg-transparent text-white py-24 px-6 md:px-12 lg:px-24 font-sans ${className}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
        {/* Left Column: Intro & Help Card */}
        <div className="lg:col-span-5">
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

          <p className="text-slate-400 text-base leading-relaxed mb-8">
            {description}
          </p>

          <div className="p-6 rounded-2xl bg-[#0D0F17] border border-teal-500/25 shadow-lg shadow-black/40">
            <h4 className="text-white font-bold text-base mb-2">
              {helpBoxTitle}
            </h4>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-4">
              {helpBoxDescription}
            </p>
            <a
              href={viewAllHref}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold hover:bg-teal-500/20 hover:text-white transition-all"
            >
              <AnimatedText text={viewAllText} />
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Column: FAQ Accordion */}
        <div className="lg:col-span-7 flex flex-col gap-3.5">
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl bg-[#0D0F17] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-teal-500/40 bg-[#111420] shadow-md shadow-teal-500/5"
                    : "border-white/[0.08] hover:border-white/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-white font-bold text-sm md:text-base">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-45 border-teal-400/50 bg-teal-500/10 text-teal-300" : "text-slate-400"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 md:px-6 pb-6 pt-1 text-slate-300 text-xs md:text-sm leading-relaxed border-t border-white/[0.06] mt-1">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

