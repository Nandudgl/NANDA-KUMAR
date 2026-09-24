import React from 'react';
import { 
  BarChart3, 
  Award, 
  CheckCircle2, 
  Clock, 
  Bookmark, 
  BookOpen, 
  HelpCircle, 
  Flame, 
  Trash2,
  ChevronRight
} from 'lucide-react';
import { Unit, Topic, MCQ, QuestionAnswer, QuizAttempt } from '../types';

interface ProgressDashboardProps {
  units: Unit[];
  topics: Topic[];
  mcqs: MCQ[];
  questions: QuestionAnswer[];
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  quizHistory: QuizAttempt[];
  onClearHistory: () => void;
  onSelectTopic: (topicId: string, unitNumber: number) => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  units,
  topics,
  mcqs,
  questions,
  bookmarks,
  toggleBookmark,
  quizHistory,
  onClearHistory,
  onSelectTopic
}) => {
  // Statistics calculations
  const totalQuestionsAttempted = quizHistory.reduce((acc, q) => acc + q.totalQuestions, 0);
  const totalScoreEarned = quizHistory.reduce((acc, q) => acc + q.score, 0);
  const averageAccuracy = totalQuestionsAttempted > 0 
    ? Math.round((totalScoreEarned / totalQuestionsAttempted) * 100) 
    : 0;

  // Bookmarked items resolved
  const bookmarkedTopics = topics.filter((t) => bookmarks.includes(t.id));
  const bookmarkedQuestions = questions.filter((q) => bookmarks.includes(q.id));
  const bookmarkedMCQs = mcqs.filter((m) => bookmarks.includes(m.id));

  return (
    <div className="space-y-6">
      
      {/* Top Welcome & KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Topics */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Curriculum Topics</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-white">{topics.length}</span>
            <span className="text-xs text-slate-400">Across 5 Units</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1">
            <div className="bg-indigo-500 h-1 rounded-full w-full" />
          </div>
        </div>

        {/* Total MCQs */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">MCQ Question Bank</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-white">{mcqs.length}+</span>
            <span className="text-xs text-slate-400">Curated Problems</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1">
            <div className="bg-purple-500 h-1 rounded-full w-full" />
          </div>
        </div>

        {/* Exam Questions Bank */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Exam Questions</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-white">{questions.length}+</span>
            <span className="text-xs text-slate-400">2M & Essay Q&As</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1">
            <div className="bg-emerald-500 h-1 rounded-full w-full" />
          </div>
        </div>

        {/* Average Quiz Accuracy */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Test Accuracy</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-white">{averageAccuracy}%</span>
            <span className="text-xs text-slate-400">({totalQuestionsAttempted} Answered)</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1">
            <div
              className="bg-amber-500 h-1 rounded-full transition-all"
              style={{ width: `${Math.min(averageAccuracy, 100)}%` }}
            />
          </div>
        </div>

      </div>

      {/* Two Columns: Syllabus Mastery & Quiz History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Unit Breakdown & Syllabus Map */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-400" />
              <span>Deep Learning Curriculum Syllabus Coverage</span>
            </h3>

            <div className="space-y-4">
              {units.map((unit) => {
                const unitTopics = topics.filter((t) => t.unitNumber === unit.unitNumber);
                const unitMCQs = mcqs.filter((m) => m.unitNumber === unit.unitNumber);
                const unitQuestions = questions.filter((q) => q.unitNumber === unit.unitNumber);

                return (
                  <div key={unit.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                          {unit.code || `Unit ${unit.unitNumber}`}
                        </span>
                        <h4 className="text-sm font-semibold text-white">{unit.unitTitle}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold text-slate-300">
                          {unitTopics.length} Topics
                        </span>
                        <p className="text-[11px] text-slate-400">
                          {unitMCQs.length} MCQs • {unitQuestions.length} Q&As
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {unit.description}
                    </p>

                    <div className="pt-1 flex flex-wrap gap-1">
                      {unitTopics.map((top) => (
                        <button
                          key={top.id}
                          onClick={() => onSelectTopic(top.id, unit.unitNumber)}
                          className="px-2 py-0.5 rounded text-[11px] bg-slate-800 hover:bg-indigo-600/30 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                        >
                          {top.topicTitle}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Quiz Records & Bookmarks */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Quiz Attempts History */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>Recent Quiz Attempts</span>
              </h3>
              {quizHistory.length > 0 && (
                <button
                  onClick={onClearHistory}
                  className="text-slate-400 hover:text-rose-400 text-xs p-1 cursor-pointer"
                  title="Clear history"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {quizHistory.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {quizHistory.slice(0, 8).map((att) => (
                  <div key={att.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-white">
                        {att.mode === 'unit' ? `Unit ${att.unitNumber} Practice` : 'Comprehensive Exam'}
                      </span>
                      <p className="text-[11px] text-slate-400">
                        {new Date(att.completedAt || att.date || Date.now()).toLocaleDateString()} at {new Date(att.completedAt || att.date || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold ${att.percentage >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {att.score} / {att.totalQuestions} ({att.percentage}%)
                      </span>
                      <p className="text-[10px] text-slate-400">{att.timeSpentSeconds}s duration</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-6">
                No quizzes attempted yet. Head over to MCQs & Quizzes to test your skills!
              </p>
            )}
          </div>

          {/* Bookmarks Section */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-pink-400" />
              <span>Saved Bookmarks ({bookmarks.length})</span>
            </h3>

            {bookmarks.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {bookmarkedTopics.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => onSelectTopic(t.id, t.unitNumber)}
                    className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/40 flex items-center justify-between text-xs cursor-pointer group"
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <span className="text-[10px] text-indigo-400 font-medium">Topic • Unit {t.unitNumber}</span>
                      <h4 className="text-slate-200 font-semibold truncate group-hover:text-white">{t.topicTitle}</h4>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white shrink-0" />
                  </div>
                ))}

                {bookmarkedQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <span className="text-[10px] text-purple-400 font-medium">Exam Question • {q.marks}M</span>
                      <h4 className="text-slate-200 font-semibold truncate">{q.question}</h4>
                    </div>
                    <button
                      onClick={() => toggleBookmark(q.id)}
                      className="text-pink-400 hover:text-pink-300 p-1 cursor-pointer"
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-4">
                No items bookmarked yet. Click the bookmark icon on any topic, MCQ, or exam question to save it here for fast revision!
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
