export interface GradeResult {
  awardedMarks: number;
  maxMarks: number;
  grade: string;
  summary: string;
  strengths: string[];
  missingKeyPoints: string[];
  diagramFeedback: string;
  constructiveTips: string;
}

export interface GeneratedMCQ {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  bloomLevel: string;
}

export async function askAIExplanation(params: {
  topicTitle: string;
  unitTitle: string;
  query?: string;
  level?: string;
}): Promise<string> {
  const res = await fetch('/api/ai/explain', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to generate explanation from AI.');
  }
  const data = await res.json();
  return data.text;
}

export async function evaluateStudentAnswer(params: {
  question: string;
  modelAnswer: string;
  studentAnswer: string;
  maxMarks: number;
}): Promise<GradeResult> {
  const res = await fetch('/api/ai/grade-answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to evaluate answer.');
  }
  return await res.json();
}

export async function fetchCodeTutor(params: {
  topic: string;
  framework?: 'PyTorch' | 'TensorFlow';
}): Promise<string> {
  const res = await fetch('/api/ai/code-tutor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to generate code implementation.');
  }
  const data = await res.json();
  return data.code;
}

export async function generateCustomMCQs(params: {
  unitNumber?: number;
  topicTitle: string;
  count?: number;
}): Promise<GeneratedMCQ[]> {
  const res = await fetch('/api/ai/generate-quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to generate custom quiz.');
  }
  const data = await res.json();
  return data.questions || [];
}
