export type Subject = 
  | 'English Language Arts'
  | 'Mathematics'
  | 'Science & Biology'
  | 'Social Studies & History'
  | 'Visual & Performing Arts'
  | 'Foreign Languages'
  | 'Health & Physical Education'
  | 'Computer Science & Tech';

export type GradeLevel =
  | 'Kindergarten'
  | '1st - 2nd Grade'
  | '3rd - 5th Grade'
  | '6th - 8th Grade (Middle School)'
  | '9th - 10th Grade (High School)'
  | '11th - 12th Grade (High School)'
  | 'Higher Ed / College';

export type Duration = '30 minutes' | '45 minutes' | '60 minutes' | '90 minutes (Block)';

export type DifferentiationFocus = 
  | 'Mixed Ability (Balanced)'
  | 'English Language Learners (ELL scaffolds)'
  | 'Special Education / IEP Accommodations'
  | 'Gifted & Accelerated Learners';

export interface LessonPlanRequest {
  subject: Subject;
  gradeLevel: GradeLevel;
  topic: string;
  duration: Duration;
  standard?: string;
  differentiation: DifferentiationFocus;
  teachingMethod: 'Gradual Release (I Do, We Do, You Do)' | '5E Model (Engage, Explore, Explain, Elaborate, Evaluate)' | 'Inquiry-Based & Socratic' | 'Project & Problem-Based';
}

export interface LessonPlanSection {
  title: string;
  durationMinutes?: number;
  content: string[];
  teacherTip?: string;
}

export interface GeneratedLessonPlan {
  id: string;
  title: string;
  subject: Subject;
  gradeLevel: GradeLevel;
  duration: Duration;
  standard: string;
  differentiationFocus: DifferentiationFocus;
  objectives: string[];
  essentialQuestions: string[];
  materials: string[];
  sections: LessonPlanSection[];
  assessment: {
    formativeCheck: string;
    exitTicketQuestions: string[];
  };
  differentiationDetails: {
    scaffolding: string[];
    extensions: string[];
    ellSupport: string[];
  };
  homeworkOrExtension: string;
  createdAt: string;
}

export interface WorksheetItem {
  id: number;
  sentenceBefore: string;
  blankAnswer: string;
  sentenceAfter: string;
  hint?: string;
}

export interface GeneratedWorksheet {
  id: string;
  title: string;
  gradeLevel: string;
  subject: string;
  instructions: string;
  passage?: string;
  items: WorksheetItem[];
  wordBank: string[];
  includeWordBank: boolean;
  notes?: string;
}

export interface RubricLevel {
  level: number;
  label: string;
  points: string;
  description: string;
}

export interface RubricCriterion {
  id: string;
  name: string;
  weight: string;
  levels: {
    exemplary: string;
    proficient: string;
    developing: string;
    beginning: string;
  };
}

export interface GeneratedRubric {
  id: string;
  title: string;
  gradeLevel: string;
  subject: string;
  totalPoints: number;
  scaleNames: {
    level4: string;
    level3: string;
    level2: string;
    level1: string;
  };
  criteria: RubricCriterion[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  content: {
    summary: string;
    sections: {
      heading: string;
      body: string;
      callout?: string;
      checklistItems?: string[];
    }[];
    practicalExample?: {
      title: string;
      description: string;
      details: string[];
    };
  };
}
