import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  Search, 
  Filter, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  FileText, 
  PenTool, 
  Send, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  Check,
  Mic,
  Square
} from 'lucide-react';
import { QuestionAnswer } from '../types';
import { evaluateStudentAnswer, GradeResult } from '../services/ai';
import { transcribeAudio } from '../services/aiMedia';

interface QuestionBankViewProps {
  questions: QuestionAnswer[];
  selectedUnitFilter: number | null;
  setSelectedUnitFilter: (u: number | null) => void;
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  questions,
  selectedUnitFilter,
  setSelectedUnitFilter,
  bookmarks,
  toggleBookmark
}) => {
  const [marksFilter, setMarksFilter] = useState<'All' | '2' | '5' | '8' | '13' | '15' | '16'>('All');
  const [bloomFilter, setBloomFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // AI Evaluation Modal State
  const [activeGradingQuestion, setActiveGradingQuestion] = useState<QuestionAnswer | null>(null);
  const [studentWrittenAnswer, setStudentWrittenAnswer] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState<GradeResult | null>(null);
  const [gradingError, setGradingError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Audio Dictation state (gemini-3.5-transcribe)
  const [isRecordingAnswer, setIsRecordingAnswer] = useState(false);
  const [isTranscribingAnswer, setIsTranscribingAnswer] = useState(false);
  const answerMediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const answerAudioChunksRef = React.useRef<Blob[]>([]);

  const toggleAnswerRecording = async () => {
    if (isRecordingAnswer) {
      if (answerMediaRecorderRef.current) {
        answerMediaRecorderRef.current.stop();
        setIsRecordingAnswer(false);
      }
      return;
    }

    try {
      answerAudioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      answerMediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) answerAudioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(answerAudioChunksRef.current, { type: 'audio/webm' });
        stream.getTracks().forEach((t) => t.stop());
        setIsTranscribingAnswer(true);

        try {
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            const base64 = (reader.result as string) || '';
            const res = await transcribeAudio({
              audioBytes: base64,
              mimeType: 'audio/webm',
              prompt: 'Transcribe this student oral exam answer accurately for grading.',
            });
            if (res.transcription) {
              setStudentWrittenAnswer((prev) => (prev ? `${prev} ${res.transcription}` : res.transcription));
            }
          };
        } catch (err: any) {
          console.error('Answer transcription error:', err);
        } finally {
          setIsTranscribingAnswer(false);
        }
      };

      recorder.start(250);
      setIsRecordingAnswer(true);
    } catch (err) {
      console.error('Microphone error:', err);
    }
  };

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (selectedUnitFilter !== null && q.unitNumber !== selectedUnitFilter) return false;
      if (marksFilter !== 'All' && q.marks !== Number(marksFilter)) return false;
      if (bloomFilter !== 'All' && q.bloomLevel !== bloomFilter) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches = q.question.toLowerCase().includes(query) ||
          q.answer.toLowerCase().includes(query) ||
          q.topicTitle?.toLowerCase().includes(query);
        if (!matches) return false;
      }
      return true;
    });
  }, [questions, selectedUnitFilter, marksFilter, bloomFilter, searchQuery]);

  // Handle Copy Model Answer
  const handleCopyAnswer = (q: QuestionAnswer) => {
    navigator.clipboard.writeText(`Question (${q.marks} Marks):\n${q.question}\n\nModel Answer:\n${q.answer}`);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Trigger Grading
  const handleGradeSubmission = async () => {
    if (!activeGradingQuestion || !studentWrittenAnswer.trim()) return;
    setIsGrading(true);
    setGradingError(null);
    try {
      const result = await evaluateStudentAnswer({
        question: activeGradingQuestion.question,
        modelAnswer: activeGradingQuestion.answer,
        studentAnswer: studentWrittenAnswer,
        maxMarks: activeGradingQuestion.marks
      });
      setGradeResult(result);
    } catch (err: any) {
      setGradingError(err.message || 'Failed to grade answer. Please try again.');
    } finally {
      setIsGrading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Filters Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-4">
        
        {/* Unit and Mark Categories */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Unit selector pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Unit:
            </span>
            <button
              onClick={() => setSelectedUnitFilter(null)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedUnitFilter === null
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Units (75+)
            </button>
            {[1, 2, 3, 4, 5].map((u) => (
              <button
                key={u}
                onClick={() => setSelectedUnitFilter(u)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedUnitFilter === u
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Unit {u}
              </button>
            ))}
          </div>

          {/* Mark Filter Category */}
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 px-2 font-medium">Marks:</span>
            <button
              onClick={() => setMarksFilter('All')}
              className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer ${
                marksFilter === 'All' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setMarksFilter('2')}
              className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer ${
                marksFilter === '2' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2 Marks (Part A)
            </button>
            {(['5', '8', '13', '15', '16'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMarksFilter(m)}
                className={`px-2 py-1 rounded-lg font-medium cursor-pointer ${
                  marksFilter === m ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {m}M
              </button>
            ))}
          </div>

        </div>

        {/* Search and Secondary Filter Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          
          <div className="flex flex-wrap items-center gap-2 flex-1 max-w-lg">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, question text, or keyword (e.g., 'ResNet', 'LSTM', 'Backprop')..."
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs placeholder-slate-400 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="text-slate-400">
              Showing <strong className="text-white">{filteredQuestions.length}</strong> exam questions
            </span>
            <span className="text-slate-400">
              2-Mark: <strong className="text-indigo-400">{filteredQuestions.filter((q) => q.marks === 2).length}</strong>
            </span>
            <span className="text-slate-400">
              Long Answer: <strong className="text-purple-400">{filteredQuestions.filter((q) => q.marks > 2).length}</strong>
            </span>
          </div>

        </div>

      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q, idx) => {
            const isExpanded = expandedId === q.id;
            const isSaved = bookmarks.includes(q.id);
            const is2Mark = q.marks === 2;

            return (
              <div
                key={q.id}
                className={`bg-slate-900/90 border rounded-2xl transition-all overflow-hidden ${
                  isExpanded ? 'border-purple-500/50 shadow-lg shadow-purple-500/10' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Question Header Card */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                        is2Mark
                          ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                          : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                      }`}>
                        {q.marks} Marks {is2Mark ? '(Short Answer)' : '(University Essay)'}
                      </span>
                      <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        Unit {q.unitNumber}
                      </span>
                      <span className="text-[11px] text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                        Bloom: {q.bloomLevel}
                      </span>
                      {q.topicTitle && (
                        <span className="text-[11px] text-slate-400">
                          • {q.topicTitle}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      Q{idx + 1}. {q.question}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(q.id);
                      }}
                      className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-pink-400 cursor-pointer"
                      title="Bookmark Question"
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4 text-pink-400" /> : <Bookmark className="w-4 h-4" />}
                    </button>

                    <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Model Answer & Evaluation Button */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-4 bg-slate-950/40">
                    
                    {/* Top Action Bar */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        <span>University Model Examination Answer</span>
                      </span>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleCopyAnswer(q)}
                          className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
                        >
                          {copiedId === q.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === q.id ? 'Copied' : 'Copy'}</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveGradingQuestion(q);
                            setStudentWrittenAnswer('');
                            setGradeResult(null);
                            setGradingError(null);
                          }}
                          className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 cursor-pointer"
                        >
                          <PenTool className="w-3.5 h-3.5 text-amber-300" />
                          <span>AI Grade My Answer</span>
                        </button>
                      </div>
                    </div>

                    {/* Formatted Model Answer Content */}
                    <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                      {q.answer.split('\n\n').map((paragraph, pIdx) => {
                        // Headers
                        if (paragraph.startsWith('### ')) {
                          return (
                            <h4 key={pIdx} className="text-sm font-bold text-purple-300 mt-4 mb-1 border-b border-slate-800 pb-1 flex items-center gap-1.5">
                              <span className="w-1 h-3 bg-purple-500 rounded-full"></span>
                              {paragraph.replace('### ', '')}
                            </h4>
                          );
                        }
                        if (paragraph.startsWith('#### ')) {
                          return (
                            <h5 key={pIdx} className="text-xs font-semibold text-indigo-300 mt-2 mb-0.5">
                              {paragraph.replace('#### ', '')}
                            </h5>
                          );
                        }
                        // Code or Diagram block
                        if (paragraph.startsWith('```') && paragraph.endsWith('```')) {
                          const cleanCode = paragraph.replace(/```[a-z]*\n?/g, '').replace(/```$/g, '');
                          return (
                            <pre key={pIdx} className="bg-slate-950 p-3 rounded-lg text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800">
                              {cleanCode}
                            </pre>
                          );
                        }
                        // Lists
                        if (paragraph.startsWith('- ') || paragraph.startsWith('* ') || paragraph.match(/^\d+\.\s/)) {
                          const lines = paragraph.split('\n');
                          return (
                            <ul key={pIdx} className="list-disc list-inside space-y-1 text-slate-300 text-xs pl-2">
                              {lines.map((l, lIdx) => (
                                <li key={lIdx}>{l.replace(/^[-*]\s+|\d+\.\s+/, '')}</li>
                              ))}
                            </ul>
                          );
                        }
                        // Standard paragraph
                        return (
                          <p key={pIdx} className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>

                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            <HelpCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p>No questions match the current criteria.</p>
            <button
              onClick={() => { setSelectedUnitFilter(null); setMarksFilter('All'); setSearchQuery(''); }}
              className="mt-3 px-3.5 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-semibold cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* AI Answer Grader Modal */}
      {activeGradingQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl my-8">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <PenTool className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">AI University Examiner & Answer Grader</h3>
              </div>
              <button
                onClick={() => setActiveGradingQuestion(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Question Summary */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
              <span className="text-purple-400 font-semibold uppercase tracking-wider block mb-1">
                Question ({activeGradingQuestion.marks} Marks)
              </span>
              <p className="text-slate-200 font-medium">{activeGradingQuestion.question}</p>
            </div>

            {/* Input Box for Student's Written Answer */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                Write or paste your answer below:
              </label>
              <textarea
                rows={6}
                value={studentWrittenAnswer}
                onChange={(e) => setStudentWrittenAnswer(e.target.value)}
                placeholder="Type your exam response here... Be sure to include key definitions, mathematical formulas, and architectural steps."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-purple-500 placeholder-slate-400 resize-y"
              />
              <span className="text-[11px] text-slate-400">
                {studentWrittenAnswer.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            {gradingError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{gradingError}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    // Pre-fill sample answer for testing
                    setStudentWrittenAnswer(activeGradingQuestion.answer.slice(0, 300) + '...');
                  }}
                  className="text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer"
                >
                  Insert sample text
                </button>

                <button
                  type="button"
                  onClick={toggleAnswerRecording}
                  className={`text-xs px-2.5 py-1 rounded-lg border flex items-center space-x-1.5 transition-all ${
                    isRecordingAnswer
                      ? 'border-red-500 bg-red-600/20 text-red-300 animate-pulse'
                      : isTranscribingAnswer
                      ? 'border-emerald-500 bg-emerald-600/20 text-emerald-300'
                      : 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:border-slate-600'
                  }`}
                >
                  {isRecordingAnswer ? (
                    <>
                      <Square className="w-3.5 h-3.5 text-red-400 fill-current" />
                      <span>Stop Recording</span>
                    </>
                  ) : isTranscribingAnswer ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                      <span>Transcribing...</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Dictate with Mic</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveGradingQuestion(null)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium cursor-pointer"
                >
                  Close
                </button>
                <button
                  disabled={isGrading || !studentWrittenAnswer.trim()}
                  onClick={handleGradeSubmission}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-bold flex items-center space-x-2 cursor-pointer shadow-lg shadow-purple-600/20"
                >
                  {isGrading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Examiner Evaluating...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Grade My Answer</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Grading Report Results Card */}
            {gradeResult && (
              <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-purple-500/40 space-y-4 animate-fadeIn">
                
                {/* Score Banner */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs text-slate-400">Awarded Marks</span>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-black text-emerald-400">{gradeResult.awardedMarks}</span>
                      <span className="text-sm text-slate-400">/ {gradeResult.maxMarks}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400">Examiner Grade</span>
                    <span className="text-lg font-black text-purple-300 block">{gradeResult.grade}</span>
                  </div>
                </div>

                {/* Overall Appraisal */}
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {gradeResult.summary}
                </p>

                {/* Strengths */}
                {gradeResult.strengths && gradeResult.strengths.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Strengths Demonstrated:
                    </span>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-0.5">
                      {gradeResult.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Missing Points */}
                {gradeResult.missingKeyPoints && gradeResult.missingKeyPoints.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                      Missing Technical Concepts:
                    </span>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-0.5">
                      {gradeResult.missingKeyPoints.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Diagram and Examiner Tips */}
                {gradeResult.constructiveTips && (
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-indigo-300 block">
                      Professor\'s Advice for Full Marks:
                    </span>
                    <p>{gradeResult.constructiveTips}</p>
                    {gradeResult.diagramFeedback && (
                      <p className="text-slate-400 mt-1 italic">
                        Diagram tip: {gradeResult.diagramFeedback}
                      </p>
                    )}
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
