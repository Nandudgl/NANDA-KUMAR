export type BloomLevel = 'K1' | 'K2' | 'K3' | 'K4' | 'K5' | 'K6';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type QuestionMarks = 2 | 5 | 8 | 13 | 15 | 16;

export interface Unit {
  id: string;
  unitNumber: number; // 1, 2, 3, 4, 5
  unitTitle: string;
  code: string; // e.g. "UNIT I"
  description: string;
  order: number;
  status: 'active' | 'inactive';
  topicsCount?: number;
}

export interface Topic {
  id: string;
  unitId: string;
  unitNumber: number;
  topicTitle: string;
  description: string;
  order: number;
  status: 'active' | 'inactive';
}

export interface Note {
  id: string;
  unitId: string;
  unitNumber: number;
  topicId: string;
  topicTitle: string;
  title: string;
  definition: string;
  introduction: string;
  content: string; // Detailed step-by-step
  working: string;
  formula?: string;
  example?: string;
  comparisonTable?: {
    headers: string[];
    rows: string[][];
  };
  advantages: string[];
  limitations: string[];
  applications: string[];
  examPoints: string[];
  summary: string;
  relatedTopicIds?: string[];
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface MCQ {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  unitId: string;
  unitNumber: number;
  topicId: string;
  topicTitle: string;
  difficulty: Difficulty;
  bloomLevel: BloomLevel;
  marks: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface QuestionAnswer {
  id: string;
  question: string;
  answer: string;
  marks: QuestionMarks;
  unitId: string;
  unitNumber: number;
  topicId: string;
  topicTitle: string;
  bloomLevel: BloomLevel;
  difficulty: Difficulty;
  tags: string[];
  diagramDescription?: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface QuizQuestion extends MCQ {
  userSelectedOption?: 'A' | 'B' | 'C' | 'D';
}

export interface QuizAttempt {
  id: string;
  userId?: string;
  studentName?: string;
  mode?: string;
  unitId?: string; // 'all' or specific
  unitNumber?: number;
  topicId?: string; // 'all' or specific
  difficulty?: string;
  totalQuestions: number;
  attempted?: number;
  unattempted?: number;
  correct?: number;
  wrong?: number;
  score: number;
  percentage: number;
  timeSpentSeconds: number;
  totalTimeSeconds?: number;
  date?: string;
  completedAt?: string;
  answers?: {
    questionId: string;
    question: string;
    selectedOption?: 'A' | 'B' | 'C' | 'D';
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface PortalSettings {
  portalTitle: string;
  subtitle: string;
  institutionName: string;
  departmentName: string;
  academicYear: string;
  defaultQuizTimePer10QuestionsMinutes: number;
  allowGuestQuizzes: boolean;
}

export interface ActivityLog {
  id: string;
  action: string;
  entityType: 'unit' | 'topic' | 'note' | 'mcq' | 'question' | 'quiz';
  entityTitle: string;
  timestamp: string;
}
