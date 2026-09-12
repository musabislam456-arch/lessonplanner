import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'LessonPlanner AI — Smart Lesson Plan, Worksheet & Rubric Generator for Teachers',
  description: 'Design structured, standards-aligned lesson plans, fill-in-the-blank practice worksheets, and 4-level grading rubrics in seconds. 100% free teacher tool.',
  keywords: [
    'lesson plan generator',
    'worksheet builder',
    'rubric generator',
    'teacher tools',
    'differentiation ideas',
    'curriculum planning',
    'educational AI',
    '5E lesson plans',
    'Common Core alignment'
  ],
  authors: [{ name: 'LessonPlanner AI Team' }],
  creator: 'LessonPlanner AI',
  publisher: 'LessonPlanner AI',
  metadataBase: new URL(process.env.APP_URL || 'https://lessonplanner.utilix.site'),
  openGraph: {
    title: 'LessonPlanner AI — High-Impact Instructional Design for Teachers',
    description: 'Instant, research-backed lesson plans, fill-in-the-blank worksheets, and observable grading rubrics. Reclaim your evenings.',
    url: '/',
    siteName: 'LessonPlanner AI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LessonPlanner AI — Lesson Plans, Worksheets & Rubrics',
    description: 'Empowering teachers with structured pedagogical generators. Plan in 5 minutes.',
    creator: '@lessonplannerai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body 
        suppressHydrationWarning 
        className="min-h-screen flex flex-col bg-[#FDFCFB] text-slate-900 font-sans antialiased selection:bg-teal-100 selection:text-teal-900"
      >
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />

        {/* CHATBOT_SCRIPT_START */}
        {/* Paste client's chatbot <script> embed code here */}
        {/* CHATBOT_SCRIPT_END */}
      </body>
    </html>
  );
}
