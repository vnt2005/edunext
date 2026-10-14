"use client";

import React, { useState } from "react";
import { ArrowRight, Star, ShoppingBag } from "lucide-react";
import { AnimatedText } from "./ZiroBuildHero";

export interface CourseItem {
  id: string;
  title: string;
  category: string;
  level: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  discount?: string;
  instructor: {
    name: string;
    org: string;
    avatar: string;
  };
  stats: {
    rating: number;
    reviews: number;
  };
  lessonsCount: number;
  hours?: number;
  href: string;
}

export interface CourseTab {
  id: string;
  label: string;
}

export interface FeaturedCoursesProps {
  className?: string;
  badgeText?: string;
  headlineTitle?: string;
  headlineGradient?: string;
  description?: string;
  tabs?: CourseTab[];
  courses?: CourseItem[];
  viewAllText?: string;
  viewAllHref?: string;
}

export const DEFAULT_TABS: CourseTab[] = [
  { id: "all", label: "Tất cả khóa học" },
  { id: "cntt", label: "Lập trình & CNTT" },
  { id: "design", label: "Thiết kế & Sáng tạo" },
  { id: "marketing", label: "Marketing & Sales" },
  { id: "data", label: "Dữ liệu & AI" },
  { id: "business", label: "Kinh doanh & Quản trị" },
];

export const DEFAULT_COURSES: CourseItem[] = [
  {
    id: "csharp",
    title: "C# từ cơ bản đến xây dựng ứng dụng",
    category: "LẬP TRÌNH & PHÁT TRIỂN PHẦN MỀM",
    level: "Chưa xác định",
    price: 249000,
    originalPrice: 399000,
    discount: "-38%",
    badge: "Đề cương",
    image: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&q=82&w=800",
    instructor: { name: "Vũ Hoàng Quân", org: "Viettel", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" },
    stats: { rating: 5.0, reviews: 1285 },
    lessonsCount: 8,
    href: "#/course/csharp",
  },
  {
    id: "dsa",
    title: "Cấu trúc dữ liệu, thuật toán và tư duy giải quyết vấn đề",
    category: "LẬP TRÌNH & PHÁT TRIỂN PHẦN MỀM",
    level: "Chưa xác định",
    price: 449000,
    originalPrice: 599000,
    discount: "-25%",
    badge: "Đề cương",
    image: "https://images.unsplash.com/photo-1516116211227-bbc141e8c057?auto=format&fit=crop&q=80&w=800",
    instructor: { name: "Trần Thu Trang", org: "Tiki", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120" },
    stats: { rating: 4.9, reviews: 435 },
    lessonsCount: 8,
    href: "#/course/dsa",
  },
  {
    id: "frontend-web",
    title: "Frontend Web từ HTML đến JavaScript",
    category: "PHÁT TRIỂN WEB",
    level: "Chưa xác định",
    price: 399000,
    originalPrice: 549000,
    discount: "-27%",
    badge: "Đề cương",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    instructor: { name: "Vũ Hoàng Quân", org: "Viettel", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" },
    stats: { rating: 5.0, reviews: 520 },
    lessonsCount: 8,
    href: "#/course/frontend-web",
  },
  {
    id: "fullstack-web",
    title: "Xây dựng ứng dụng Web Full-stack",
    category: "PHÁT TRIỂN WEB",
    level: "Chưa xác định",
    price: 399000,
    originalPrice: 499000,
    discount: "-20%",
    badge: "Đề cương",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    instructor: { name: "Lê Hoàng Nam", org: "FPT Software", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120" },
    stats: { rating: 5.0, reviews: 540 },
    lessonsCount: 8,
    href: "#/course/fullstack-web",
  },
];

export default function FeaturedCourses({
  className = "",
  badgeText = "Chương trình chọn lọc",
  headlineTitle = "Khóa học",
  headlineGradient = "thực chiến nổi bật",
  description = "Giáo trình cô đọng, bài tập thực hành theo dự án thật, hỗ trợ hỏi đáp trực tiếp cùng mentor.",
  tabs = DEFAULT_TABS,
  courses = DEFAULT_COURSES,
  viewAllText = "Xem tất cả khóa học",
  viewAllHref = "#/courses",
}: FeaturedCoursesProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "all");

  const formatPrice = (val: number) =>
    val.toLocaleString("vi-VN") + "đ";

  return (
    <section className={`w-full bg-transparent text-white py-20 px-6 md:px-12 lg:px-24 font-sans ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
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

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md overflow-x-auto scrollbar-none mb-10 w-fit max-w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-teal-600 text-white font-semibold shadow-[0_0_15px_rgba(15,118,110,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {courses.map((course) => (
            <article
              key={course.id}
              className="group relative bg-[#0D0F17] border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col hover:border-teal-500/40 hover:-translate-y-1.5 transition-all duration-300 shadow-lg shadow-black/40"
            >
              {/* Media Thumbnail */}
              <a href={course.href} className="relative aspect-video overflow-hidden bg-white/5 block">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                  {course.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 border border-white/20 text-slate-200 backdrop-blur-md">
                      {course.badge}
                    </span>
                  )}
                  {course.discount && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white">
                      {course.discount}
                    </span>
                  )}
                </div>
              </a>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between text-[11px] font-semibold text-teal-400 mb-2">
                  <span className="uppercase tracking-wider truncate">{course.category}</span>
                  <span className="text-slate-400 font-normal shrink-0 ml-2">{course.level}</span>
                </div>

                <h3 className="text-white font-bold text-base leading-snug line-clamp-2 mb-3 group-hover:text-teal-200 transition-colors">
                  <a href={course.href}>{course.title}</a>
                </h3>

                {/* Instructor */}
                <div className="flex items-center gap-2 mb-3">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-6 h-6 rounded-full object-cover border border-teal-500/40"
                  />
                  <span className="text-xs text-slate-300 font-medium truncate">
                    {course.instructor.name}{" "}
                    <small className="text-slate-500">· {course.instructor.org}</small>
                  </span>
                </div>

                {/* Meta row */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/[0.06] mt-auto">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <b className="text-white">{course.stats.rating}</b>
                    <small className="text-slate-500">({course.stats.reviews.toLocaleString("vi-VN")})</small>
                  </span>
                  <span>{course.lessonsCount} bài</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 px-5 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex items-baseline gap-1.5">
                  <strong className="text-lg font-bold text-white tracking-tight">
                    {formatPrice(course.price)}
                  </strong>
                  {course.originalPrice && (
                    <del className="text-xs text-slate-500">
                      {formatPrice(course.originalPrice)}
                    </del>
                  )}
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-teal-600 border border-white/10 hover:border-teal-500 text-xs font-semibold text-white transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Chọn học</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Footer CTA button */}
        <div className="text-center">
          <a
            href={viewAllHref}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/[0.04] border border-white/20 text-white text-sm font-semibold hover:bg-white/10 hover:border-teal-400 hover:text-teal-300 transition-all"
          >
            <AnimatedText text="Xem thêm toàn bộ danh mục khóa học" />
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

