"use client";

import React from "react";
import { Star } from "lucide-react";

export const DEFAULT_INSTRUCTORS = [
  {
    id: "quan",
    name: "Nguyễn Văn Minh",
    role: "Senior .NET Architect",
    org: "VNG",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    rating: 4.95,
    studentsCount: "3,500+ Học viên",
  },
  {
    id: "trang",
    name: "Trần Thu Trang",
    role: "Head of Product Design",
    org: "Tiki",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250",
    rating: 4.95,
    studentsCount: "3,500+ Học viên",
  },
  {
    id: "nam",
    name: "Lê Hoàng Nam",
    role: "Lead Data Scientist",
    org: "FPT Software",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    rating: 4.95,
    studentsCount: "3,500+ Học viên",
  },
  {
    id: "phuong",
    name: "Đặng Mai Phương",
    role: "Growth Marketing Lead",
    org: "Shopee",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    rating: 4.95,
    studentsCount: "3,500+ Học viên",
  },
];

export default function InstructorsSection({
  className = "",
  badgeText = "Đội ngũ chuyên gia",
  headlineTitle = "Giảng viên",
  headlineGradient = "hàng đầu ngành",
  description = "Học hỏi trực tiếp từ các Tech Lead, Principal Engineer và Head of Product tại các tập đoàn công nghệ lớn.",
  instructors = DEFAULT_INSTRUCTORS,
}) {
  return (
    <section className={`w-full bg-[#0B0C10] text-white py-20 px-6 md:px-12 lg:px-24 font-sans border-t border-white/[0.06] ${className}`}>
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

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((inst) => (
            <article
              key={inst.id}
              className="group relative bg-[#0D0F17] border border-white/[0.08] hover:border-teal-500/40 rounded-2xl p-7 text-center transition-all duration-300 hover:-translate-y-1.5 shadow-lg shadow-black/40 overflow-hidden"
            >
              {/* Avatar with Verified badge */}
              <div className="relative w-24 h-24 mx-auto mb-5">
                <img
                  src={inst.avatar}
                  alt={inst.name}
                  className="w-full h-full rounded-full object-cover border-2 border-teal-500/40 shadow-lg"
                  loading="lazy"
                />
                <span className="absolute bottom-0 right-0 px-2 py-0.5 rounded-full bg-teal-700 border border-white/30 text-white text-[10px] font-bold">
                  ✓ Verified
                </span>
              </div>

              {/* Info */}
              <h3 className="text-white font-bold text-lg mb-1 group-hover:text-teal-300 transition-colors">
                {inst.name}
              </h3>
              <p className="text-slate-400 text-xs md:text-sm mb-3">
                {inst.role}
              </p>

              {/* Org pill */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-300 text-xs font-bold">
                  {inst.org}
                </span>
              </div>

              {/* Metrics */}
              <div className="flex items-center justify-center gap-3 text-xs text-slate-400 pt-3 border-t border-white/[0.06]">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {inst.rating} Rating
                </span>
                <span>•</span>
                <span>{inst.studentsCount}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
