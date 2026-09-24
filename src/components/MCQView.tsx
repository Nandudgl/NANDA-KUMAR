import React, { useState, useMemo, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  Filter, 
  RotateCcw, 
  Award, 
  Timer, 
  Bookmark, 
  BookmarkCheck, 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal,
  PlusCircle,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MCQ, QuizAttempt } from '../types';
import { generateCustomMCQs } from '../services/ai';
import { saveQuizAttempt } from '../services/firebase';

interface MCQViewProps {
  initialMCQs: MCQ[];
  selectedUnitFilter: number | null;
  setSelectedUnitFilter: (u: number | null) => void;
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  onRecordQuizAttempt?: (attempt: QuizAttempt) => void;
}

export const MCQView: React.FC<MCQViewProps> = ({
  initialMCQs,
  selectedUnitFilter,
  setSelectedUnitFilter,
  bookmarks,
  toggleBookmark,
  onRecordQuizAttempt
}) => {
  const [allMCQs, setAllMCQs] = useState<MCQ[]>(initialMCQs);
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [bloomFilter, setBloomFilter] = useState<'All' | 'K1' | 'K2' | 'K3' | 'K4' | 'K5' | 'K6'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Mode: Practice (instant answer) vs Exam (timed batch)
  const [mode, setMode] = useState<'practice' | 'exam'>('practice');

  // Active question index in current filtered list
  const [currentIndex, setCurrentIndex] = useState(0);

  // Selected answers: map of mcq.id -> 'A' | 'B' | 'C' | 'D'
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});

  // Exam mode state
  const [isExamActive, setIsExamActive] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [examSecondsLeft, setExamSecondsLeft] = useState(900); // 15 mins default
  const [examStartTime, setExamStartTime] = useState<number>(0);

  // AI Quiz Generator modal state
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiTopicInput, setAiTopicInput] = useState('');
  const [aiUnitSelect, setAiUnitSelect] = useState(1);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [aiGenError, setAiGenError] = useState<string | null>(null);

  // Filter questions
  const filteredMCQs = useMemo(() => {
    return allMCQs.filter((mcq) => {
      if (selectedUnitFilter !== null && mcq.unitNumber !== selectedUnitFilter) return false;
      if (difficultyFilter !== 'All' && mcq.difficulty !== difficultyFilter) return false;
      if (bloomFilter !== 'All' && mcq.bloomLevel !== bloomFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQ = mcq.question.toLowerCase().includes(q) ||
          mcq.topicTitle.toLowerCase().includes(q) ||
          mcq.explanation.toLowerCase().includes(q);
        if (!matchesQ) return false;
      }
      return true;
    });
  }, [allMCQs, selectedUnitFilter, difficultyFilter, bloomFilter, searchQuery]);

  // Current question safely clamped
  const currentMCQ = filteredMCQs[currentIndex] || filteredMCQs[0];

  // Timer for Exam mode
  useEffect(() => {
    let interval: any = null;
    if (isExamActive && !examFinished && examSecondsLeft > 0) {
      interval = setInterval(() => {
        setExamSecondsLeft((prev) => {
          if (prev <= 1) {
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isExamActive, examFinished, examSecondsLeft]);

  // Handle option click
  const handleSelectOption = (option: 'A' | 'B' | 'C' | 'D') => {
    if (!currentMCQ) return;
    // In practice mode, allow changing or lock once answered
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentMCQ.id]: option
    }));
  };

  // Start Exam
  const handleStartExam = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsExamActive(true);
    setExamFinished(false);
    setExamSecondsLeft(Math.min(filteredMCQs.length * 60, 1800)); // 1 min per question, up to 30 mins
    setExamStartTime(Date.now());
  };

  // Finish Exam & calculate score
  const handleFinishExam = () => {
    setIsExamActive(false);
    setExamFinished(true);

    // Calculate score
    let score = 0;
    filteredMCQs.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    const percentage = filteredMCQs.length > 0 ? Math.round((score / filteredMCQs.length) * 100) : 0;
    const timeSpent = Math.round((Date.now() - examStartTime) / 1000);

    const attempt: QuizAttempt = {
      id: 'attempt_' + Date.now(),
      userId: 'student_' + Math.random().toString(36).substring(2, 8),
      mode: selectedUnitFilter ? 'unit' : 'comprehensive',
      unitNumber: selectedUnitFilter || undefined,
      totalQuestions: filteredMCQs.length,
      score,
      percentage,
      timeSpentSeconds: timeSpent,
      completedAt: new Date().toISOString()
    };

    saveQuizAttempt(attempt);
    if (onRecordQuizAttempt) onRecordQuizAttempt(attempt);

    // Trigger celebratory confetti if passed >= 70%
    if (percentage >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Reset current session
  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsExamActive(false);
    setExamFinished(false);
  };

  // Generate Custom AI Quiz
  const handleGenerateAIQuiz = async () => {
    if (!aiTopicInput.trim()) return;
    setIsAIGenerating(true);
    setAiGenError(null);
    try {
      const generated = await generateCustomMCQs({
        unitNumber: aiUnitSelect,
        topicTitle: aiTopicInput,
        count: 4
      });

      if (generated && generated.length > 0) {
        const formatted: MCQ[] = generated.map((g, idx) => ({
          id: `ai-mcq-${Date.now()}-${idx}`,
          question: g.question,
          optionA: g.optionA,
          optionB: g.optionB,
          optionC: g.optionC,
          optionD: g.optionD,
          correctAnswer: g.correctAnswer,
          explanation: g.explanation,
          unitId: `unit-${aiUnitSelect}`,
          unitNumber: aiUnitSelect,
          topicId: 'custom-topic',
          topicTitle: aiTopicInput,
          difficulty: (g.difficulty as any) || 'Medium',
          bloomLevel: (g.bloomLevel as any) || 'K3',
          marks: 1,
          tags: ['AI Generated', aiTopicInput],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }));

        setAllMCQs((prev) => [...formatted, ...prev]);
        setIsAIModalOpen(false);
        setAiTopicInput('');
        // Switch to the newly generated question
        setCurrentIndex(0);
      }
    } catch (err: any) {
      setAiGenError(err.message || 'Failed to generate quiz.');
    } finally {
      setIsAIGenerating(false);
    }
  };

  // Score stats for practice mode
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = Object.entries(selectedAnswers).filter(([qId, ans]) => {
    const q = allMCQs.find((m) => m.id === qId);
    return q && q.correctAnswer === ans;
  }).length;

  return (
    <div className="space-y-6">
      
      {/* Top Filter & Control Panel */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Unit Selector Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Unit:
            </span>
            <button
              onClick={() => { setSelectedUnitFilter(null); setCurrentIndex(0); }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedUnitFilter === null
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Units (105+)
            </button>
            {[1, 2, 3, 4, 5].map((u) => (
              <button
                key={u}
                onClick={() => { setSelectedUnitFilter(u); setCurrentIndex(0); }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedUnitFilter === u
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Unit {u}
              </button>
            ))}
          </div>

          {/* Mode Switcher & AI Generator Button */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => { setMode('practice'); setIsExamActive(false); setExamFinished(false); }}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  mode === 'practice'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Practice Mode
              </button>
              <button
                onClick={() => { setMode('exam'); }}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  mode === 'exam'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Exam Simulation
              </button>
            </div>

            <button
              onClick={() => setIsAIModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-purple-600/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Quiz Generator</span>
            </button>
          </div>

        </div>

        {/* Secondary Filters: Difficulty, Bloom Level, Search */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Difficulty */}
            <div className="flex items-center space-x-1">
              <span className="text-slate-400">Difficulty:</span>
              <select
                value={difficultyFilter}
                onChange={(e) => { setDifficultyFilter(e.target.value as any); setCurrentIndex(0); }}
                className="bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500 text-xs"
              >
                <option value="All">All Levels</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Bloom Level */}
            <div className="flex items-center space-x-1">
              <span className="text-slate-400">Bloom:</span>
              <select
                value={bloomFilter}
                onChange={(e) => { setBloomFilter(e.target.value as any); setCurrentIndex(0); }}
                className="bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500 text-xs"
              >
                <option value="All">All K1-K6</option>
                <option value="K1">K1 Remember</option>
                <option value="K2">K2 Understand</option>
                <option value="K3">K3 Apply</option>
                <option value="K4">K4 Analyze</option>
              </select>
            </div>

            {/* Search */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentIndex(0); }}
              placeholder="Filter by question text..."
              className="bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-2.5 py-1 text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Quick Score Counter */}
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-slate-400">
              Filtered: <strong className="text-white">{filteredMCQs.length}</strong> questions
            </span>
            <span className="text-slate-400">
              Attempted: <strong className="text-indigo-400">{answeredCount}</strong>
            </span>
            <span className="text-slate-400">
              Score: <strong className="text-emerald-400">{correctCount}</strong>
            </span>
            <button
              onClick={handleResetQuiz}
              className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
              title="Reset current session"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Main MCQ Question Card */}
      {filteredMCQs.length > 0 && currentMCQ ? (
        <div className="space-y-4">
          
          {/* Progress Header & Question Navigator */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-white">
                Question {currentIndex + 1} of {filteredMCQs.length}
              </span>
              <span className="text-slate-500">•</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-medium">
                Unit {currentMCQ.unitNumber}
              </span>
              <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[11px] font-medium">
                Bloom: {currentMCQ.bloomLevel}
              </span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                currentMCQ.difficulty === 'Easy'
                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                  : currentMCQ.difficulty === 'Medium'
                  ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                  : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
              }`}>
                {currentMCQ.difficulty}
              </span>
            </div>

            {/* Exam Mode Timer if active */}
            {mode === 'exam' && isExamActive && (
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono font-bold">
                <Timer className="w-4 h-4 animate-pulse" />
                <span>
                  {Math.floor(examSecondsLeft / 60)}:{(examSecondsLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
            )}

            {/* Bookmark button */}
            <button
              onClick={() => toggleBookmark(currentMCQ.id)}
              className="flex items-center space-x-1 text-slate-400 hover:text-pink-400 transition-colors cursor-pointer"
            >
              {bookmarks.includes(currentMCQ.id) ? (
                <BookmarkCheck className="w-4 h-4 text-pink-400" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
              <span className="hidden sm:inline text-[11px]">Save</span>
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / filteredMCQs.length) * 100}%` }}
            />
          </div>

          {/* The Question Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            
            {/* Question Prompt */}
            <div>
              <span className="text-[11px] text-indigo-400 font-semibold tracking-wider uppercase block mb-1">
                {currentMCQ.topicTitle}
              </span>
              <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">
                {currentMCQ.question}
              </h3>
            </div>

            {/* The 4 Options */}
            <div className="grid grid-cols-1 gap-3">
              {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                const optText = currentMCQ[`option${optKey}` as keyof MCQ] as string;
                const isUserSelected = selectedAnswers[currentMCQ.id] === optKey;
                const isCorrect = currentMCQ.correctAnswer === optKey;
                const hasAnswered = selectedAnswers[currentMCQ.id] !== undefined;

                // Determine styling based on mode and selection
                let cardStyle = 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/40 text-slate-200';
                let indicatorStyle = 'bg-slate-800 text-slate-400 border-slate-700';

                if (mode === 'practice' && hasAnswered) {
                  if (isCorrect) {
                    cardStyle = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 ring-1 ring-emerald-500/50';
                    indicatorStyle = 'bg-emerald-600 text-white border-emerald-500';
                  } else if (isUserSelected && !isCorrect) {
                    cardStyle = 'bg-rose-950/40 border-rose-500/60 text-rose-200 ring-1 ring-rose-500/50';
                    indicatorStyle = 'bg-rose-600 text-white border-rose-500';
                  }
                } else if (isUserSelected) {
                  cardStyle = 'bg-indigo-950/40 border-indigo-500/60 text-indigo-200 ring-1 ring-indigo-500/50';
                  indicatorStyle = 'bg-indigo-600 text-white border-indigo-500';
                }

                return (
                  <button
                    key={optKey}
                    onClick={() => handleSelectOption(optKey)}
                    className={`text-left p-3.5 rounded-xl border transition-all flex items-start space-x-3 cursor-pointer ${cardStyle}`}
                  >
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 border ${indicatorStyle}`}>
                      {optKey}
                    </span>
                    <span className="text-xs md:text-sm font-medium flex-1 mt-0.5 leading-snug">
                      {optText}
                    </span>
                    {mode === 'practice' && hasAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {mode === 'practice' && hasAnswered && isUserSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Practice Mode: Pedagogical Explanation Card */}
            {mode === 'practice' && selectedAnswers[currentMCQ.id] !== undefined && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2 mt-4">
                <div className="flex items-center space-x-2">
                  {selectedAnswers[currentMCQ.id] === currentMCQ.correctAnswer ? (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Correct! Option {currentMCQ.correctAnswer}
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                      <XCircle className="w-4 h-4 text-rose-400" /> Incorrect. Correct Answer: Option {currentMCQ.correctAnswer}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-indigo-300">Explanation: </strong>
                  {currentMCQ.explanation}
                </p>
              </div>
            )}

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {/* Number bubbles in mobile & desktop */}
              <span className="text-xs text-slate-400 font-mono">
                {currentIndex + 1} / {filteredMCQs.length}
              </span>

              {currentIndex < filteredMCQs.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, filteredMCQs.length - 1))}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : mode === 'exam' && isExamActive ? (
                <button
                  onClick={handleFinishExam}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-emerald-600/20 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Submit Exam</span>
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIndex(0)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  Back to Start
                </button>
              )}
            </div>

          </div>

          {/* Exam Mode Start/Finish Screen Banner */}
          {mode === 'exam' && !isExamActive && !examFinished && (
            <div className="bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-500/30 rounded-2xl p-6 text-center space-y-3">
              <Award className="w-10 h-10 text-purple-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">University Exam Simulation Mode</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Test your mastery under timed examination conditions. Immediate answer rationales will be hidden until you submit your complete exam.
              </p>
              <button
                onClick={handleStartExam}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-purple-600/25 cursor-pointer"
              >
                Begin Exam Session ({filteredMCQs.length} Questions)
              </button>
            </div>
          )}

          {/* Exam Mode Result Summary Card */}
          {mode === 'exam' && examFinished && (
            <div className="bg-gradient-to-br from-indigo-950/50 to-slate-900 border border-indigo-500/40 rounded-2xl p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center mx-auto text-indigo-300">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Exam Completed!</h3>
              <div className="flex justify-center items-center space-x-6">
                <div>
                  <span className="text-2xl font-black text-emerald-400">{correctCount}</span>
                  <p className="text-xs text-slate-400">Correct</p>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <span className="text-2xl font-black text-rose-400">{filteredMCQs.length - correctCount}</span>
                  <p className="text-xs text-slate-400">Incorrect</p>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <span className="text-2xl font-black text-indigo-400">
                    {Math.round((correctCount / filteredMCQs.length) * 100)}%
                  </span>
                  <p className="text-xs text-slate-400">Score</p>
                </div>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => { setMode('practice'); }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
                >
                  Review All Explanations
                </button>
                <button
                  onClick={handleStartExam}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
                >
                  Retake Exam
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          <HelpCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p>No MCQs match the selected unit or filters.</p>
          <button
            onClick={() => { setSelectedUnitFilter(null); setDifficultyFilter('All'); setBloomFilter('All'); setSearchQuery(''); }}
            className="mt-3 px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* AI Quiz Generator Modal */}
      {isAIModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">AI Quiz Question Generator</h3>
              </div>
              <button
                onClick={() => setIsAIModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Prompt the AI Professor to generate customized, high-yield university multiple choice questions on any concept in the syllabus.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Target Curriculum Unit</label>
                <select
                  value={aiUnitSelect}
                  onChange={(e) => setAiUnitSelect(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value={1}>Unit 1: Introduction to Deep Learning</option>
                  <option value={2}>Unit 2: Deep Neural Networks & Optimization</option>
                  <option value={3}>Unit 3: Convolutional Neural Networks (CNN)</option>
                  <option value={4}>Unit 4: Recurrent Neural Networks (RNN & LSTM)</option>
                  <option value={5}>Unit 5: Advanced Deep Learning & Transformers</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Concept / Topic Focus</label>
                <input
                  type="text"
                  value={aiTopicInput}
                  onChange={(e) => setAiTopicInput(e.target.value)}
                  placeholder="e.g. Backpropagation Chain Rule, Adam Optimizer, ResNet Skip Connections..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 placeholder-slate-400"
                />
              </div>

              {aiGenError && (
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  {aiGenError}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsAIModalOpen(false)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={isAIGenerating || !aiTopicInput.trim()}
                onClick={handleGenerateAIQuiz}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-bold flex items-center space-x-2 cursor-pointer shadow-lg shadow-purple-600/20"
              >
                {isAIGenerating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Synthesizing Questions...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Generate Practice Set</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
