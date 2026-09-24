import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  Copy, 
  Check, 
  Sparkles, 
  ChevronRight, 
  Award, 
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  FileText,
  Lightbulb,
  Table,
  CheckSquare,
  AlertTriangle,
  Briefcase
} from 'lucide-react';
import { Unit, Topic, Note } from '../types';

interface CurriculumViewProps {
  units: Unit[];
  topics: Topic[];
  notes: Note[];
  selectedUnitNumber: number;
  setSelectedUnitNumber: (u: number) => void;
  selectedTopicId: string;
  setSelectedTopicId: (id: string) => void;
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  onOpenAITutorWithTopic: (topicTitle: string, unitTitle: string) => void;
  onJumpToMCQs: (unitNumber: number) => void;
  onJumpToQuestions: (unitNumber: number) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  units,
  topics,
  notes,
  selectedUnitNumber,
  setSelectedUnitNumber,
  selectedTopicId,
  setSelectedTopicId,
  bookmarks,
  toggleBookmark,
  onOpenAITutorWithTopic,
  onJumpToMCQs,
  onJumpToQuestions
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Current Unit
  const currentUnit = useMemo(() => {
    return units.find((u) => u.unitNumber === selectedUnitNumber) || units[0];
  }, [units, selectedUnitNumber]);

  // Topics for the current unit or filtered by search
  const filteredTopics = useMemo(() => {
    let list = topics.filter((t) => t.unitNumber === selectedUnitNumber);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = topics.filter((t) => 
        t.topicTitle.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [topics, selectedUnitNumber, searchQuery]);

  // Current selected topic
  const currentTopic = useMemo(() => {
    return topics.find((t) => t.id === selectedTopicId) || filteredTopics[0] || topics[0];
  }, [topics, selectedTopicId, filteredTopics]);

  // Current selected note
  const currentNote = useMemo(() => {
    return notes.find((n) => n.topicId === currentTopic?.id || n.topicTitle?.toLowerCase() === currentTopic?.topicTitle?.toLowerCase()) || notes[0];
  }, [notes, currentTopic]);

  const isBookmarked = bookmarks.includes(currentTopic?.id || '');

  const handleCopy = () => {
    if (!currentNote) return;
    const fullText = `# ${currentNote.title}\n\n## Definition\n${currentNote.definition}\n\n## Introduction\n${currentNote.introduction}\n\n## Content\n${currentNote.content}\n\n## Working\n${currentNote.working}\n\n## Summary\n${currentNote.summary}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Unit Selector Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {units.map((unit) => {
          const isActive = unit.unitNumber === selectedUnitNumber;
          const unitTopicsCount = topics.filter((t) => t.unitNumber === unit.unitNumber).length;

          return (
            <button
              key={unit.id}
              onClick={() => {
                setSelectedUnitNumber(unit.unitNumber);
                const firstTopic = topics.find((t) => t.unitNumber === unit.unitNumber);
                if (firstTopic) setSelectedTopicId(firstTopic.id);
              }}
              className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-b from-indigo-900/40 to-slate-900 border-indigo-500/60 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[11px] font-bold uppercase tracking-wider ${isActive ? 'text-indigo-400' : 'text-slate-400'}`}>
                  {unit.code || `Unit ${unit.unitNumber}`}
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                  {unitTopicsCount} Topics
                </span>
              </div>
              <h3 className={`text-xs font-semibold truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>
                {unit.unitTitle}
              </h3>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Study Workspace: Sidebar + Note Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Topic Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
            
            {/* Search within topics */}
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics across all units..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Topic List Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-xs text-slate-400">
              <span className="font-medium text-slate-300">
                {searchQuery ? `Search Results (${filteredTopics.length})` : `Unit ${selectedUnitNumber} Topics (${filteredTopics.length})`}
              </span>
              <span className="text-[11px]">Syllabus Order</span>
            </div>

            {/* Topics Scrollable Container */}
            <div className="space-y-1.5 max-h-[640px] overflow-y-auto pr-1">
              {filteredTopics.map((topic) => {
                const isSelected = topic.id === currentTopic?.id;
                const bookmarked = bookmarks.includes(topic.id);
                return (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-600/15 border-indigo-500/40 text-indigo-300 shadow-sm'
                        : 'bg-slate-950/40 border-slate-800/60 hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1.5 mb-1">
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                            #{topic.order}
                          </span>
                        </div>
                        <h4 className="text-xs font-semibold text-white truncate">
                          {topic.topicTitle}
                        </h4>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {topic.description}
                        </p>
                      </div>
                      {bookmarked && (
                        <BookmarkCheck className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Practice Jumpers */}
            <div className="pt-3 mt-3 border-t border-slate-800 space-y-2">
              <button
                onClick={() => onJumpToMCQs(selectedUnitNumber)}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 text-xs font-medium transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>Practice Unit {selectedUnitNumber} MCQs</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onJumpToQuestions(selectedUnitNumber)}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 text-xs font-medium transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4 text-purple-400" />
                  <span>Unit {selectedUnitNumber} Exam Questions (2M & Essay)</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Right Note Viewer (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {currentNote ? (
            <article className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              
              {/* Note Header Bar */}
              <div className="border-b border-slate-800 pb-5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Unit {currentTopic.unitNumber}: {currentUnit.unitTitle}
                    </span>
                    <span className="text-xs text-purple-400 flex items-center gap-1 font-medium">
                      <Award className="w-3.5 h-3.5" /> Topic: {currentTopic.topicTitle}
                    </span>
                  </div>

                  {/* Actions: Bookmark, Copy, Ask AI */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleBookmark(currentTopic.id)}
                      className={`p-2 rounded-lg border text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'bg-pink-500/20 border-pink-500/40 text-pink-300'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                      title={isBookmarked ? 'Bookmarked' : 'Bookmark topic'}
                    >
                      {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-pink-400" /> : <Bookmark className="w-4 h-4" />}
                      <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
                    </button>

                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
                      title="Copy Note"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      onClick={() => onOpenAITutorWithTopic(currentTopic.topicTitle, currentUnit.unitTitle)}
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-purple-600/20 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Ask AI Tutor</span>
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-white tracking-tight mt-2">
                  {currentNote.title}
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  {currentTopic.description}
                </p>
              </div>

              {/* 1. Formal Definition Card */}
              {currentNote.definition && (
                <div className="bg-gradient-to-r from-indigo-950/40 to-slate-900 p-4 rounded-xl border border-indigo-500/30 space-y-1">
                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">
                    1. Formal Academic Definition
                  </span>
                  <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
                    {currentNote.definition}
                  </p>
                </div>
              )}

              {/* 2. Pedagogical Introduction */}
              {currentNote.introduction && (
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-3.5 bg-indigo-500 rounded-full inline-block"></span>
                    <span>2. Pedagogical Introduction & Context</span>
                  </h3>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    {currentNote.introduction}
                  </p>
                </div>
              )}

              {/* 3. Mathematical Formula / Equation Highlight if available */}
              {currentNote.formula && (
                <div className="bg-slate-950 border border-indigo-500/40 rounded-xl p-4 shadow-inner space-y-2">
                  <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                    <FileText className="w-3.5 h-3.5" />
                    <span>3. Mathematical Formulation (Exam Critical)</span>
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 text-xs text-emerald-300 font-mono overflow-x-auto whitespace-pre-wrap">
                    {currentNote.formula}
                  </div>
                </div>
              )}

              {/* 4. Core Detailed Content */}
              {currentNote.content && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-3.5 bg-purple-500 rounded-full inline-block"></span>
                    <span>4. Core Principles & Architecture</span>
                  </h3>
                  <div className="text-xs md:text-sm text-slate-300 leading-relaxed space-y-3 whitespace-pre-line">
                    {currentNote.content}
                  </div>
                </div>
              )}

              {/* 5. Step-by-Step Working Mechanism */}
              {currentNote.working && (
                <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-3.5 bg-emerald-500 rounded-full inline-block"></span>
                    <span>5. Working Mechanism & Operational Flow</span>
                  </h3>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {currentNote.working}
                  </p>
                </div>
              )}

              {/* 6. Concrete Numerical / Code Example */}
              {currentNote.example && (
                <div className="space-y-2 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>6. Practical Real-World / Numerical Example</span>
                  </h3>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {currentNote.example}
                  </p>
                </div>
              )}

              {/* 7. Comparison Table if available */}
              {currentNote.comparisonTable && (
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Table className="w-4 h-4 text-indigo-400" />
                    <span>7. Analytical Comparison Table</span>
                  </h3>
                  <div className="overflow-x-auto border border-slate-800 rounded-xl">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-950 text-indigo-300 border-b border-slate-800 uppercase text-[10px] tracking-wider">
                        <tr>
                          {currentNote.comparisonTable.headers.map((h, i) => (
                            <th key={i} className="p-3 font-semibold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                        {currentNote.comparisonTable.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-800/40">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3 text-slate-300">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 8 & 9: Advantages & Limitations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentNote.advantages && currentNote.advantages.length > 0 && (
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>Key Advantages</span>
                    </h4>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                      {currentNote.advantages.map((adv, idx) => (
                        <li key={idx}>{adv}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentNote.limitations && currentNote.limitations.length > 0 && (
                  <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                    <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Known Limitations</span>
                    </h4>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                      {currentNote.limitations.map((lim, idx) => (
                        <li key={idx}>{lim}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 10. Real-World Applications */}
              {currentNote.applications && currentNote.applications.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Real-World Industry Applications</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentNote.applications.map((app, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 11. University Examination High-Yield Points */}
              {currentNote.examPoints && currentNote.examPoints.length > 0 && (
                <div className="bg-gradient-to-br from-purple-950/30 to-indigo-950/30 border border-purple-500/40 rounded-xl p-4 space-y-2">
                  <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-400" />
                    <span>University Examination Scoring Checklist</span>
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                    {currentNote.examPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start space-x-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-indigo-400 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Summary */}
              {currentNote.summary && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-indigo-300">Summary: </strong>
                  {currentNote.summary}
                </div>
              )}

              {/* Bottom Quick Test Banner */}
              <div className="border-t border-slate-800 pt-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-white">Ready to test your knowledge?</h4>
                  <p className="text-xs text-slate-400">Practice questions covering {currentTopic.topicTitle}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onJumpToMCQs(selectedUnitNumber)}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
                  >
                    <span>Practice MCQs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onJumpToQuestions(selectedUnitNumber)}
                    className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-purple-600/20 cursor-pointer"
                  >
                    <span>Exam Questions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </article>
          ) : (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p>Select a topic from the syllabus list to view detailed lecture notes.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
