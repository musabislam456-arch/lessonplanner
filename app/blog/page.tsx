import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-data';
import { Clock, ArrowRight, Sparkles, BookOpen, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Teacher Guides & Pedagogical Blog — LessonPlanner AI',
  description: 'Evidence-based instructional design tips, differentiation frameworks, and classroom time-saving strategies written by former educators.',
  openGraph: {
    title: 'Teacher Guides & Pedagogical Blog — LessonPlanner AI',
    description: 'Practical, high-yield classroom frameworks: 5-minute planning, UDL differentiation, and transparent rubrics.',
  }
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200 mb-3">
          <BookOpen className="w-3.5 h-3.5 text-orange-600" />
          <span>The Modern Educator Resource Library</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Classroom Guides & Instructional Strategies
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Actionable frameworks written by former classroom educators and instructional coaches. Real strategies to help you teach with rigor and preserve your personal time.
        </p>
      </div>

      {/* Featured Primary Article */}
      {BLOG_POSTS[0] && (
        <article className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-teal-900 to-teal-950 text-white shadow-lg relative overflow-hidden group">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-full font-bold bg-orange-500 text-white">
                Featured Strategy
              </span>
              <span className="text-teal-200 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {BLOG_POSTS[0].readTime}
              </span>
              <span className="text-teal-300">•</span>
              <span className="text-teal-200">{BLOG_POSTS[0].publishedDate}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight group-hover:text-teal-200 transition-colors">
              <Link href={`/blog/${BLOG_POSTS[0].slug}`}>
                {BLOG_POSTS[0].title}
              </Link>
            </h2>

            <p className="text-sm sm:text-base text-teal-100 leading-relaxed line-clamp-3">
              {BLOG_POSTS[0].description}
            </p>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold text-sm border border-teal-600">
                  {BLOG_POSTS[0].author.name[0]}
                </div>
                <div className="text-xs">
                  <div className="font-bold text-white">{BLOG_POSTS[0].author.name}</div>
                  <div className="text-teal-300">{BLOG_POSTS[0].author.role}</div>
                </div>
              </div>

              <Link
                href={`/blog/${BLOG_POSTS[0].slug}`}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-teal-900 hover:bg-teal-50 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </article>
      )}

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.slice(1).map((post) => (
          <article
            key={post.slug}
            className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 font-semibold text-teal-800 border border-teal-100">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug mb-2">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                {post.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-800 font-bold text-xs flex items-center justify-center">
                  {post.author.name[0]}
                </div>
                <span className="text-xs font-medium text-slate-700">
                  {post.author.name.split(',')[0]}
                </span>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="text-xs font-bold text-teal-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
              >
                <span>Read</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Embedded Teacher Tool Callout Banner */}
      <div className="rounded-2xl bg-teal-50 border border-teal-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-lg font-bold text-teal-950">
            Put these strategies into practice immediately.
          </h4>
          <p className="text-xs sm:text-sm text-teal-800 max-w-xl">
            Our lesson plan generator automatically scaffolds UDL differentiation, Bloom&apos;s objectives, and 5E inquiry timelines into ready-to-teach formats.
          </p>
        </div>
        <Link
          href="/tools/lesson-plan"
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-teal-700 hover:bg-teal-800 text-white shadow-sm shrink-0 transition-colors inline-flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 text-orange-300" />
          <span>Try Lesson Planner Free</span>
        </Link>
      </div>
    </div>
  );
}
