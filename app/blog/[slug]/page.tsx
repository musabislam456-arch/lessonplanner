import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/blog-data';
import { 
  Clock, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Share2, 
  Bookmark, 
  GraduationCap,
  ArrowRight
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Article Not Found — LessonPlanner AI' };

  return {
    title: `${post.title} — LessonPlanner AI`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-teal-700">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-teal-700">Teacher Guides</Link>
        <span>/</span>
        <span className="text-slate-800 truncate max-w-xs">{post.category}</span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="px-3 py-1 rounded-full font-bold bg-teal-50 text-teal-800 border border-teal-200">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {post.readTime}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">{post.publishedDate}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed">
          {post.description}
        </p>

        {/* Author Card */}
        <div className="pt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              {post.author.name[0]}
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">{post.author.name}</div>
              <div className="text-xs text-slate-500">{post.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/tools/lesson-plan"
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 transition-colors inline-flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>Apply in Generator</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <article className="space-y-8 text-slate-800 leading-relaxed text-base">
        {/* Executive Summary Box */}
        <div className="p-6 rounded-2xl bg-teal-50/70 border border-teal-200/90 text-sm text-teal-950 space-y-2">
          <span className="font-bold uppercase tracking-wider text-xs text-teal-800 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-teal-700" />
            <span>Key Takeaway for Busy Teachers</span>
          </span>
          <p className="leading-relaxed font-medium">
            {post.content.summary}
          </p>
        </div>

        {/* Dynamic Sections */}
        {post.content.sections.map((section, idx) => (
          <section key={idx} className="space-y-4 pt-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {section.heading}
            </h2>

            <div className="text-slate-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {section.body}
            </div>

            {/* Callout Box */}
            {section.callout && (
              <div className="p-4 rounded-xl bg-orange-50 border-l-4 border-orange-500 text-xs sm:text-sm text-orange-950 italic leading-relaxed my-4">
                <strong>Pedagogical Insight:</strong> {section.callout}
              </div>
            )}

            {/* Checklist */}
            {section.checklistItems && section.checklistItems.length > 0 && (
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 my-4">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Actionable Implementation Checklist:
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {section.checklistItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}

        {/* Practical Example Box (if available) */}
        {post.content.practicalExample && (
          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4 my-8">
            <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>{post.content.practicalExample.title}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {post.content.practicalExample.description}
            </p>
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs sm:text-sm text-slate-200">
              {post.content.practicalExample.details.map((d, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">•</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Generator Callout Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-teal-800 to-teal-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold">
            Create structured lesson plans using this exact method
          </h3>
          <p className="text-xs sm:text-sm text-teal-100 max-w-md">
            LessonPlanner AI generates complete time containers, UDL scaffolds, and exit tickets in 1 click.
          </p>
        </div>
        <Link
          href="/tools/lesson-plan"
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white shrink-0 transition-colors shadow-sm inline-flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>Open Lesson Generator</span>
        </Link>
      </div>

      {/* Related Articles */}
      <div className="pt-8 border-t border-slate-200 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            More Teacher Strategy Guides
          </h3>
          <Link href="/blog" className="text-xs font-bold text-teal-700 hover:underline">
            View All Guides →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {relatedPosts.map((rel) => (
            <Link
              key={rel.slug}
              href={`/blog/${rel.slug}`}
              className="p-5 rounded-xl border border-slate-200 bg-white hover:border-teal-300 hover:shadow-xs transition-all group block"
            >
              <span className="text-[11px] font-semibold text-teal-700 block mb-1">
                {rel.category}
              </span>
              <h4 className="font-bold text-sm text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 mb-2">
                {rel.title}
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2">
                {rel.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
