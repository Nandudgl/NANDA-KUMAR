import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Code2, 
  BarChart3, 
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'notes' | 'mcq' | 'questions' | 'codelab' | 'aimedia' | 'progress';
  setActiveTab: (tab: 'notes' | 'mcq' | 'questions' | 'codelab' | 'aimedia' | 'progress') => void;
  bookmarkedCount: number;
  selectedUnit: number | null;
  setSelectedUnit: (u: number | null) => void;
  onOpenAITutor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  bookmarkedCount,
  selectedUnit,
  setSelectedUnit,
  onOpenAITutor
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Portal Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setActiveTab('notes'); setSelectedUnit(null); }}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-white tracking-tight">DeepLearning</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-medium border border-indigo-500/30">
                  Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-slate-400 inline" /> University Engineering Curriculum
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'notes'
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Notes & Syllabus</span>
            </button>

            <button
              onClick={() => setActiveTab('mcq')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'mcq'
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>MCQs & Quizzes</span>
              <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-1.5 py-0.2 rounded-full font-semibold">105+</span>
            </button>

            <button
              onClick={() => setActiveTab('questions')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'questions'
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Exam Question Bank</span>
              <span className="text-[10px] bg-purple-500/30 text-purple-200 px-1.5 py-0.2 rounded-full font-semibold">75+</span>
            </button>

            <button
              onClick={() => setActiveTab('codelab')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'codelab'
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Code Lab</span>
            </button>

            <button
              onClick={() => setActiveTab('aimedia')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'aimedia'
                  ? 'bg-gradient-to-r from-pink-600/20 to-indigo-600/20 text-pink-300 border border-pink-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-pink-300 hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>AI Media & Voice</span>
              <span className="text-[9px] uppercase tracking-wider bg-pink-500/20 text-pink-300 px-1.5 py-0.5 rounded-full font-bold">New</span>
            </button>

            <button
              onClick={() => setActiveTab('progress')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'progress'
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
              {bookmarkedCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
              )}
            </button>
          </nav>

          {/* Right Action: AI Tutor Assistant */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenAITutor}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span>AI Professor Tutor</span>
            </button>
          </div>

        </div>

        {/* Mobile Tab Navigation */}
        <div className="flex md:hidden overflow-x-auto py-2 border-t border-slate-800/80 space-x-2 text-xs scrollbar-none">
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'notes' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
            }`}
          >
            Notes
          </button>
          <button
            onClick={() => setActiveTab('mcq')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'mcq' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
            }`}
          >
            MCQs (105+)
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'questions' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
            }`}
          >
            Exam Q&A (75+)
          </button>
          <button
            onClick={() => setActiveTab('codelab')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'codelab' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
            }`}
          >
            Code Lab
          </button>
          <button
            onClick={() => setActiveTab('aimedia')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'aimedia' ? 'bg-pink-600 text-white font-bold' : 'text-pink-400 bg-pink-950/40 border border-pink-500/30'
            }`}
          >
            AI Media & Voice
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'progress' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
            }`}
          >
            Progress
          </button>
        </div>
      </div>
    </header>
  );
};
