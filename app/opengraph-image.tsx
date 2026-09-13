import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'LessonPlanner AI — High-Impact Instructional Design for Teachers';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #042f2e 0%, #115e59 55%, #0d9488 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 36 }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 26,
              background: '#f97316',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 52,
              fontWeight: 700,
              color: '#ffffff',
              boxShadow: '0 8px 24px rgba(249,115,22,0.4)',
            }}
          >
            &#127891;
          </div>
          <div style={{ fontSize: 56, fontWeight: 800, color: '#ffffff', letterSpacing: -1 }}>
            LessonPlanner AI
          </div>
        </div>
        <div style={{ fontSize: 28, color: '#99f6e4', maxWidth: 960, textAlign: 'center' }}>
          Smart Lesson Plan, Worksheet &amp; Rubric Generator for Teachers
        </div>
        <div style={{ marginTop: 44, display: 'flex', gap: 16 }}>
          {['Lesson Plans', 'Worksheets', 'Rubrics'].map((t) => (
            <div
              key={t}
              style={{
                padding: '10px 24px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.10)',
                color: '#ccfbf1',
                fontSize: 20,
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
