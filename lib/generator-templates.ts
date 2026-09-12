import { 
  Subject, 
  GradeLevel, 
  Duration, 
  DifferentiationFocus, 
  LessonPlanRequest, 
  GeneratedLessonPlan,
  GeneratedWorksheet,
  GeneratedRubric,
  RubricCriterion
} from './types';

// Sample prefill prompts for quick teacher inspiration
export const QUICK_PROMPT_PRESETS = [
  {
    title: 'Photosynthesis & Plant Cell Energy',
    subject: 'Science & Biology' as Subject,
    grade: '6th - 8th Grade (Middle School)' as GradeLevel,
    duration: '45 minutes' as Duration,
    diff: 'Mixed Ability (Balanced)' as DifferentiationFocus,
    method: '5E Model (Engage, Explore, Explain, Elaborate, Evaluate)' as const
  },
  {
    title: 'Persuasive Writing: Ethos, Pathos, and Logos',
    subject: 'English Language Arts' as Subject,
    grade: '9th - 10th Grade (High School)' as GradeLevel,
    duration: '60 minutes' as Duration,
    diff: 'English Language Learners (ELL scaffolds)' as DifferentiationFocus,
    method: 'Gradual Release (I Do, We Do, You Do)' as const
  },
  {
    title: 'Adding Fractions with Unlike Denominators',
    subject: 'Mathematics' as Subject,
    grade: '3rd - 5th Grade' as GradeLevel,
    duration: '45 minutes' as Duration,
    diff: 'Special Education / IEP Accommodations' as DifferentiationFocus,
    method: 'Gradual Release (I Do, We Do, You Do)' as const
  },
  {
    title: 'Causes of the American Revolution: Taxation without Representation',
    subject: 'Social Studies & History' as Subject,
    grade: '6th - 8th Grade (Middle School)' as GradeLevel,
    duration: '60 minutes' as Duration,
    diff: 'Mixed Ability (Balanced)' as DifferentiationFocus,
    method: 'Inquiry-Based & Socratic' as const
  }
];

// Helper to determine time allocation based on duration
function parseDurationMinutes(duration: Duration): number {
  switch (duration) {
    case '30 minutes': return 30;
    case '45 minutes': return 45;
    case '60 minutes': return 60;
    case '90 minutes (Block)': return 90;
    default: return 45;
  }
}

export function generateLessonPlan(req: LessonPlanRequest): GeneratedLessonPlan {
  const totalMins = parseDurationMinutes(req.duration);
  const hookMins = Math.round(totalMins * 0.15);
  const directMins = Math.round(totalMins * 0.30);
  const guidedMins = Math.round(totalMins * 0.25);
  const independentMins = Math.round(totalMins * 0.20);
  const wrapMins = totalMins - (hookMins + directMins + guidedMins + independentMins);

  const cleanTopic = req.topic.trim() || 'Core Concept Exploration';

  // Standard Bloom's verbs by subject
  const verbMap: Record<Subject, string[]> = {
    'English Language Arts': ['analyze', 'evaluate', 'compose', 'critique', 'identify evidence for'],
    'Mathematics': ['calculate', 'model', 'solve', 'justify solutions for', 'graph'],
    'Science & Biology': ['hypothesize', 'investigate', 'categorize', 'explain mechanisms of', 'interpret data from'],
    'Social Studies & History': ['compare and contrast', 'contextualize', 'evaluate historical perspectives on', 'corroborate sources regarding'],
    'Visual & Performing Arts': ['synthesize', 'execute technique in', 'critically assess', 'express through'],
    'Foreign Languages': ['conjugate', 'dialogue using', 'translate', 'comprehend spoken phrases in'],
    'Health & Physical Education': ['demonstrate proper form in', 'assess personal endurance during', 'explain anatomical benefits of'],
    'Computer Science & Tech': ['debug', 'algorithmically implement', 'construct data structures for', 'optimize']
  };

  const verbs = verbMap[req.subject] || ['analyze', 'apply', 'synthesize'];

  const objectives = [
    `Students will be able to ${verbs[0]} the fundamental principles of ${cleanTopic} using key academic vocabulary.`,
    `Students will be able to ${verbs[1]} real-world scenarios or problems related to ${cleanTopic} with at least 80% accuracy on formative checks.`,
    `Students will be able to collaborate in peer pairings to explain and defend their reasoning regarding ${cleanTopic}.`
  ];

  const essentialQuestions = [
    `How does an understanding of ${cleanTopic} help us make sense of systems in the world around us?`,
    `What patterns or foundational rules emerge when we analyze ${cleanTopic}?`,
    `Why is precision in terminology crucial when communicating solutions about ${cleanTopic}?`
  ];

  const materials = [
    `Interactive whiteboard / slide presentation on ${cleanTopic}`,
    `Guided student notes graphic organizer (print and digital copy)`,
    `Manipulatives, source cards, or primary excerpts for group exploration`,
    `Individual exit ticket slips or digital response link (Google Forms/Canvas)`,
    `Visual word wall chart with tier-2 and tier-3 academic vocabulary`
  ];

  let sections = [];

  if (req.teachingMethod === '5E Model (Engage, Explore, Explain, Elaborate, Evaluate)') {
    sections = [
      {
        title: 'Phase 1: Engage (Hook & Phenomenon)',
        durationMinutes: hookMins,
        content: [
          `Display a high-interest mystery prompt or puzzling phenomenon connected to "${cleanTopic}".`,
          `Have students participate in a 90-second "Think-Ink-Pair-Share": jot down 2 observations and 1 burning question.`,
          `Record 3 student predictions on the board to revisit during the conclusion.`
        ],
        teacherTip: 'Avoid pre-teaching definitions here; let student curiosity drive the initial wonder.'
      },
      {
        title: 'Phase 2: Explore (Hands-on Inquiry)',
        durationMinutes: directMins,
        content: [
          `Distribute hands-on inquiry cards / data sets representing ${cleanTopic}.`,
          `Students work in triad teams with designated roles (Reader, Facilitator, Recorder).`,
          `Teams test hypotheses, record trends, and highlight surprising anomalies without teacher intervention.`
        ],
        teacherTip: 'Circulate actively with a clipboard checklist to note common misconceptions to address in the Explain phase.'
      },
      {
        title: 'Phase 3: Explain (Concept Clarification & Modeling)',
        durationMinutes: guidedMins,
        content: [
          `Reconvene as a whole group. Anchor student findings to formal terminology for ${cleanTopic}.`,
          `Deliver explicit mini-lecture (10-12 mins max) linking their exploratory observations to core conceptual laws.`,
          `Model a worked example step-by-step using a document camera or live projection.`
        ],
        teacherTip: 'Explicitly contrast the common misconception noted during exploration with the correct scientific/mathematical principle.'
      },
      {
        title: 'Phase 4: Elaborate (Extension & Application)',
        durationMinutes: independentMins,
        content: [
          `Challenge students to apply the concept of ${cleanTopic} to a novel, unpracticed real-world scenario.`,
          `Students work individually or in buddy pairs to draft a proposed solution and justification.`
        ],
        teacherTip: 'Provide leveled hint cards for students who experience cognitive stall.'
      },
      {
        title: 'Phase 5: Evaluate (Formative Assessment & Closure)',
        durationMinutes: wrapMins,
        content: [
          `Distribute the targeted Exit Ticket.`,
          `Conduct a quick 60-second fist-to-five self-efficacy confidence check.`,
          `Review 1 exemplary student response under the visualizer.`
        ],
        teacherTip: 'Collect exit tickets at the door to quickly sort into three piles (Mastered, Minor Gap, Needs Reteach) for tomorrow.'
      }
    ];
  } else {
    // Gradual Release / Standard Framework
    sections = [
      {
        title: '1. Hook & Anticipatory Set (Connect & Ignite)',
        durationMinutes: hookMins,
        content: [
          `Open with a compelling real-world connection: "Where does ${cleanTopic} appear in daily life or contemporary issues?"`,
          `Activate prior knowledge: Review yesterday's prerequisite skill using a rapid 2-minute whiteboard drill.`,
          `Clearly state today's objective and "Why this matters" in student-friendly terms.`
        ],
        teacherTip: 'Write the objective on the corner of the board so students know the exact destination of the lesson.'
      },
      {
        title: '2. Direct Instruction: "I Do" (Explicit Modeling)',
        durationMinutes: directMins,
        content: [
          `Introduce key academic vocabulary terms essential for ${cleanTopic} with visual non-linguistic cues.`,
          `Think-Aloud Modeling: Demonstrate two contrasting examples on the board, narrating your cognitive decision-making process aloud.`,
          `Highlight the "Golden Rule" or procedural checkpoint to avoid frequent pitfalls.`,
          `Check for immediate comprehension using choral response or finger-voting.`
        ],
        teacherTip: 'Pause every 4 minutes to have students echo or paraphrase a key sentence to their neighbor.'
      },
      {
        title: '3. Guided Practice: "We Do" (Collaborative Application)',
        durationMinutes: guidedMins,
        content: [
          `Tackle a moderately complex problem as a cooperative class, soliciting student steps and reasoning.`,
          `Transition into structured partner work: Student A explains step 1 while Student B records; roles alternate for step 2.`,
          `Teacher conducts targeted micro-conferences at desks, providing just-in-time scaffolds.`
        ],
        teacherTip: 'Praise specific strategies overheard in student discussions rather than just speed.'
      },
      {
        title: '4. Independent Practice: "You Do" (Individual Mastery)',
        durationMinutes: independentMins,
        content: [
          `Students work independently on 4-6 tiered practice exercises relating to ${cleanTopic}.`,
          `Level 1: Foundational verification (2 items).`,
          `Level 2: Standard application and multi-step reasoning (2 items).`,
          `Level 3: Challenge extension / open-ended evaluation (1 item).`
        ],
        teacherTip: 'Pull a small focus group of 3-4 students to the back table for guided intervention if needed.'
      },
      {
        title: '5. Lesson Closure & Synthesis',
        durationMinutes: wrapMins,
        content: [
          `Synthesize today\'s core insight: Have 2 randomly chosen students summarize the key takeaway.`,
          `Administer the 3-minute Exit Ticket.`,
          `Preview tomorrow\'s progression building upon ${cleanTopic}.`
        ],
        teacherTip: 'Never let the bell dismiss the class; dismiss them after exit tickets are securely deposited.'
      }
    ];
  }

  // Differentiation Scaffolds
  const scaffolding = [
    `Sentence starters and sentence frames for explaining: "The primary factor in ${cleanTopic} is ___ because ___."`,
    `Color-coded visual reference sheet and vocabulary bank on student desks.`,
    `Chunked assignment: check in with teacher after finishing problem 2 before proceeding.`
  ];

  const ellSupport = [
    `Dual-language vocabulary glossaries with visual icons alongside key English terms.`,
    `Allow verbal or illustrated responses alongside written answers for initial checks.`,
    `Intentional pairing with a supportive bilingual peer partner during guided practice.`
  ];

  const extensions = [
    `"Error Analysis" challenge: identify and write an explanation debunking a deliberately flawed solution to ${cleanTopic}.`,
    `Create a 60-second video script or anchor chart teaching ${cleanTopic} to younger students.`,
    `Research a career or real-world technological application that heavily relies on mastery of ${cleanTopic}.`
  ];

  return {
    id: `plan-${Date.now()}`,
    title: `${cleanTopic} — Lesson Plan`,
    subject: req.subject,
    gradeLevel: req.gradeLevel,
    duration: req.duration,
    standard: req.standard || `Standard Alignment: Focus on foundational conceptual mastery & inquiry standards for ${req.gradeLevel}`,
    differentiationFocus: req.differentiation,
    objectives,
    essentialQuestions,
    materials,
    sections,
    assessment: {
      formativeCheck: `Continuous whiteboard checks during "We Do" + Teacher circulation observational checklist.`,
      exitTicketQuestions: [
        `Question 1 (Recall & Vocabulary): Define or identify the core role of ${cleanTopic} in your own words.`,
        `Question 2 (Application): Solve or explain this specific scenario applying today's concept...`,
        `Question 3 (Self-Reflection): What was one point in today's lesson that felt crystal clear, and what is one question you still have?`
      ]
    },
    differentiationDetails: {
      scaffolding,
      extensions,
      ellSupport
    },
    homeworkOrExtension: `Independent review sheet: 3 practice questions reinforcing ${cleanTopic} + find one example of this concept in your home or daily media.`,
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
}

// Worksheet generator templates
export interface WorksheetGeneratorParams {
  topic: string;
  subject: string;
  gradeLevel: string;
  itemCount: number;
  includeWordBank: boolean;
  rawText?: string;
}

export function generateWorksheet(params: WorksheetGeneratorParams): GeneratedWorksheet {
  const cleanTopic = params.topic.trim() || 'General Science & Reading';

  // If user provided raw text with brackets [like this], parse it!
  if (params.rawText && params.rawText.includes('[') && params.rawText.includes(']')) {
    const regex = /\[(.*?)\]/g;
    const items = [];
    const bankSet = new Set<string>();
    
    // split by sentences or newlines
    const rawLines = params.rawText.split(/\n+/).filter(l => l.trim().length > 0);
    let idCounter = 1;

    for (const line of rawLines) {
      if (!line.includes('[')) continue;
      
      const parts = line.split(/(\[.*?\])/);
      let before = '';
      let answer = '';
      let after = '';
      let foundAnswer = false;

      for (const part of parts) {
        if (part.startsWith('[') && part.endsWith(']') && !foundAnswer) {
          answer = part.slice(1, -1).trim();
          bankSet.add(answer);
          foundAnswer = true;
        } else if (!foundAnswer) {
          before += part;
        } else {
          after += part;
        }
      }

      if (answer) {
        items.push({
          id: idCounter++,
          sentenceBefore: before.trim(),
          blankAnswer: answer,
          sentenceAfter: after.trim(),
          hint: `Starts with '${answer.charAt(0).toUpperCase()}'`
        });
      }
    }

    if (items.length > 0) {
      const wordBank = Array.from(bankSet).sort(() => Math.random() - 0.5);
      return {
        id: `ws-${Date.now()}`,
        title: `${cleanTopic}: Practice Worksheet`,
        gradeLevel: params.gradeLevel,
        subject: params.subject,
        instructions: params.includeWordBank
          ? 'Use the words in the word bank below to fill in each blank space. Each word will be used once.'
          : 'Carefully read each sentence and write the correct term in the blank space.',
        items,
        wordBank,
        includeWordBank: params.includeWordBank,
        notes: 'Handout generated from custom teacher text passage.'
      };
    }
  }

  // Curated educational sentence banks by topic
  const sampleBank: Record<string, Array<{ before: string; answer: string; after: string; hint: string }>> = {
    science: [
      { before: 'The process by which green plants make food using sunlight is called', answer: 'photosynthesis', after: '.', hint: 'Light + putting together' },
      { before: 'Inside the plant cell, this green organelle called the', answer: 'chloroplast', after: 'captures radiant light energy.', hint: 'Contains chlorophyll' },
      { before: 'Plants absorb', answer: 'carbon dioxide', after: 'from the atmosphere through small microscopic pores.', hint: 'Chemical formula CO2' },
      { before: 'As a byproduct of this reaction, plants release', answer: 'oxygen', after: 'into the air for humans and animals to breathe.', hint: 'Gas vital for respiration' },
      { before: 'Water and essential soil minerals are drawn up from the soil through the plant\'s', answer: 'roots', after: '.', hint: 'Underground system' },
      { before: 'The primary simple sugar generated to provide cellular fuel is known as', answer: 'glucose', after: '.', hint: 'C6H12O6' },
      { before: 'Microscopic pores located on the undersides of leaves are called', answer: 'stomata', after: '.', hint: 'Controlled by guard cells' },
      { before: 'Sunlight energy is converted and stored inside chemical', answer: 'bonds', after: 'of carbohydrate molecules.', hint: 'Molecular connections' }
    ],
    ela: [
      { before: 'An appeal to logic, facts, and statistical data is known in rhetoric as', answer: 'logos', after: '.', hint: 'Root of logic' },
      { before: 'When a speaker establishes credibility, trustworthiness, and ethical character, they utilize', answer: 'ethos', after: '.', hint: 'Root of ethics' },
      { before: 'An appeal that evokes strong emotional reactions such as empathy, fear, or joy is called', answer: 'pathos', after: '.', hint: 'Root of sympathy' },
      { before: 'A comparison between two unrelated items using the words "like" or "as" is a', answer: 'simile', after: '.', hint: 'Direct comparison' },
      { before: 'A direct comparison that states one thing is another without using "like" or "as" is a', answer: 'metaphor', after: '.', hint: 'Figurative equation' },
      { before: 'The central, overarching message or moral lesson explored in a literary work is its', answer: 'theme', after: '.', hint: 'Big idea of a story' },
      { before: 'Giving human characteristics to inanimate objects or abstract concepts is', answer: 'personification', after: '.', hint: 'Person-like quality' },
      { before: 'The vantage point or lens from which a narrative story is told is the', answer: 'point of view', after: '.', hint: 'First, second, or third' }
    ],
    history: [
      { before: 'The slogan "No taxation without', answer: 'representation', after: '" became a battle cry for disgruntled American colonists.', hint: 'Voice in Parliament' },
      { before: 'The document signed in 1776 declaring the thirteen American colonies independent was the', answer: 'Declaration of Independence', after: '.', hint: 'Drafted by Thomas Jefferson' },
      { before: 'The first ten amendments to the United States Constitution are collectively called the', answer: 'Bill of Rights', after: '.', hint: 'Protects individual liberties' },
      { before: 'The division of governmental power between executive, legislative, and judicial branches is', answer: 'separation of powers', after: '.', hint: 'Checks and balances structure' },
      { before: 'The system that ensures no single branch of government becomes tyrannical is called checks and', answer: 'balances', after: '.', hint: 'Mutual restraint' },
      { before: 'A primary source is an artifact or written record created', answer: 'firsthand', after: 'during the time period under study.', hint: 'Eyewitness account' },
      { before: 'The supreme law of the United States of America is the', answer: 'Constitution', after: '.', hint: 'Written in Philadelphia 1787' },
      { before: 'Citizens who remained loyal to the British Crown during the American Revolutionary War were called', answer: 'Loyalists', after: '.', hint: 'Opposite of Patriots' }
    ]
  };

  const lowerTopic = cleanTopic.toLowerCase();
  let selectedCategory = sampleBank.science;
  if (lowerTopic.includes('write') || lowerTopic.includes('literature') || lowerTopic.includes('speech') || lowerTopic.includes('rhetoric') || lowerTopic.includes('grammar') || params.subject.includes('English')) {
    selectedCategory = sampleBank.ela;
  } else if (lowerTopic.includes('history') || lowerTopic.includes('revolution') || lowerTopic.includes('war') || lowerTopic.includes('government') || params.subject.includes('Social Studies')) {
    selectedCategory = sampleBank.history;
  }

  // Slice to requested item count
  const count = Math.min(Math.max(params.itemCount || 6, 4), 10);
  const sliced = selectedCategory.slice(0, count);

  const items = sliced.map((item, idx) => ({
    id: idx + 1,
    sentenceBefore: item.before,
    blankAnswer: item.answer,
    sentenceAfter: item.after,
    hint: item.hint
  }));

  const wordBank = items.map(i => i.blankAnswer).sort(() => Math.random() - 0.5);

  return {
    id: `ws-${Date.now()}`,
    title: `${cleanTopic} — Student Concept Worksheet`,
    gradeLevel: params.gradeLevel,
    subject: params.subject,
    instructions: params.includeWordBank
      ? 'Directions: Select the most accurate term from the word bank box to complete each numbered statement. Each word is used only once.'
      : 'Directions: Read each statement carefully and write the correct academic term in the provided blank line.',
    items,
    wordBank,
    includeWordBank: params.includeWordBank,
    notes: 'Teacher Reminder: Review terms 3 and 5 during whole-group closure check.'
  };
}

// Rubric Generator
export interface RubricGeneratorParams {
  title: string;
  gradeLevel: string;
  subject: string;
  rubricType: 'analytic' | 'holistic';
  scaleType: '4-point' | '3-point';
  selectedCriteria?: string[];
}

export function generateRubric(params: RubricGeneratorParams): GeneratedRubric {
  const cleanTitle = params.title.trim() || 'Culminating Performance Task';

  const defaultCriteria: RubricCriterion[] = [
    {
      id: 'crit-1',
      name: 'Content Knowledge & Conceptual Accuracy',
      weight: '30%',
      levels: {
        exemplary: `Demonstrates deep, thorough mastery of ${cleanTitle}. All core facts, mechanisms, and disciplinary principles are accurately synthesized and contextualized with zero misconceptions.`,
        proficient: `Demonstrates clear understanding of ${cleanTitle}. Most key ideas and facts are accurate with only minor, non-critical oversights that do not detract from overall comprehension.`,
        developing: `Shows partial understanding of ${cleanTitle}. Basic concepts are identified, but reveals notable factual gaps, unsupported assertions, or common misconceptions.`,
        beginning: `Demonstrates limited or inaccurate understanding of ${cleanTitle}. Key ideas are omitted, misunderstood, or lack any factual grounding.`
      }
    },
    {
      id: 'crit-2',
      name: 'Evidence, Reasoning & Problem Solving',
      weight: '25%',
      levels: {
        exemplary: 'Provides robust, persuasive textual or computational evidence. Logical reasoning seamlessly connects claims to proof with nuanced analysis and evaluation of alternatives.',
        proficient: 'Includes relevant evidence to support conclusions. Explanations are logical and demonstrate solid cause-and-effect reasoning with clear rationale.',
        developing: 'Evidence is sparse, generic, or insufficiently linked to core claims. Reasoning relies on basic summaries rather than analytical depth.',
        beginning: 'Claims lack supporting evidence or data. Reasoning is absent, circular, or disconnected from the assigned prompt.'
      }
    },
    {
      id: 'crit-3',
      name: 'Organization, Structure & Clarity',
      weight: '25%',
      levels: {
        exemplary: 'Work is meticulously structured with compelling transitions, an insightful introduction/thesis, and purposeful pacing that enhances reader engagement.',
        proficient: 'Logical organizational structure with a clear beginning, middle, and conclusion. Transitions between sections are consistent and easy to follow.',
        developing: 'Structure is somewhat disjointed or abrupt. Ideas are presented without consistent sequence or clear paragraph groupings.',
        beginning: 'Lacks discernible structure or organization. Difficult to navigate due to fragmented thought sequences.'
      }
    },
    {
      id: 'crit-4',
      name: 'Academic Conventions & Professional Presentation',
      weight: '20%',
      levels: {
        exemplary: 'Impeccable execution of subject-specific conventions, formatting, and grammar. Shows sophisticated vocabulary and polished craftsmanship.',
        proficient: 'Follows required format with few errors in spelling, grammar, or notation. Errors do not impede reader comprehension.',
        developing: 'Frequent errors in formatting, spelling, or mechanics that cause minor confusion and require re-reading.',
        beginning: 'Pervasive grammatical or formatting errors significantly hinder comprehension and demonstrate a lack of proofreading.'
      }
    }
  ];

  return {
    id: `rubric-${Date.now()}`,
    title: `${cleanTitle} — Evaluation Rubric`,
    gradeLevel: params.gradeLevel,
    subject: params.subject,
    totalPoints: 100,
    scaleNames: {
      level4: '4: Exemplary (Advanced)',
      level3: '3: Proficient (Meets Standard)',
      level2: '2: Developing (Approaching)',
      level1: '1: Beginning (Emerging)'
    },
    criteria: defaultCriteria
  };
}
