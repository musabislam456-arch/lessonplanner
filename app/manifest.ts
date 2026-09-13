import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LessonPlanner AI',
    short_name: 'LessonPlanner',
    description:
      'Smart Lesson Plan, Worksheet & Rubric Generator for Teachers.',
    start_url: '/',
    display: 'standalone',
    background_color: '#042f2e',
    theme_color: '#f97316',
    icons: [
      { src: '/icon', sizes: '192x192', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
