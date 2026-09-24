import React, { useState, useEffect } from 'react';
import { units } from './data/units';
import { topics } from './data/topics';
import { notes } from './data/notes';
import { mcqs } from './data/mcqs';
import { questions } from './data/questions';
import { QuizAttempt } from './types';
import { Navbar } from './components/Navbar';
import { CurriculumView } from './components/CurriculumView';
import { MCQView } from './components/MCQView';
import { QuestionBankView } from './components/QuestionBankView';
import { CodeLabView } from './components/CodeLabView';
import { AIMediaStudio } from './components/AIMediaStudio';
import { ProgressDashboard } from './components/ProgressDashboard';
import { AIExplainerModal } from './components/AIExplainerModal';
import { initStudentAuth, fetchQuizHistory, validateFirestoreConnection } from './services/firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState<'notes' | 'mcq' | 'questions' | 'codelab' | 'aimedia' | 'progress'>('notes');
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<number>(1);
  const [selectedTopicId, setSelectedTopicId] = useState<string>(topics[0]?.id || 't1-1');

  // Filter for MCQ and Question bank tabs
  const [targetUnitFilter, setTargetUnitFilter] = useState<number | null>(null);

  // Bookmarks state (IDs of topics, MCQs, or exam questions)
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dl_portal_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Quiz history
  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>([]);

  // AI Explainer Modal state
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [aiTutorTopic, setAiTutorTopic] = useState<string>('Deep Learning Foundations');
  const [aiTutorUnit, setAiTutorUnit] = useState<string>('Unit 1: Introduction');

  // Initialize Firebase and load user history
  useEffect(() => {
    validateFirestoreConnection();
    initStudentAuth().then(() => {
      fetchQuizHistory().then((history) => {
        if (history && history.length > 0) {
          setQuizHistory(history);
        }
      });
    });
  }, []);

  // Sync bookmarks to localStorage
  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('dl_portal_bookmarks', JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save bookmark locally', e);
      }
      return next;
    });
  };

  // Add quiz attempt to state
  const handleRecordQuizAttempt = (attempt: QuizAttempt) => {
    setQuizHistory((prev) => [attempt, ...prev]);
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('dl_quiz_history');
    } catch {}
    setQuizHistory([]);
  };

  // Jump handlers
  const handleJumpToMCQs = (unitNumber: number) => {
    setTargetUnitFilter(unitNumber);
    setActiveTab('mcq');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToQuestions = (unitNumber: number) => {
    setTargetUnitFilter(unitNumber);
    setActiveTab('questions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAITutorWithTopic = (topicTitle: string, unitTitle: string) => {
    setAiTutorTopic(topicTitle);
    setAiTutorUnit(unitTitle);
    setIsAITutorOpen(true);
  };

  const handleSelectTopicFromDashboard = (topicId: string, unitNumber: number) => {
    setSelectedUnitNumber(unitNumber);
    setSelectedTopicId(topicId);
    setActiveTab('notes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarkedCount={bookmarks.length}
        selectedUnit={targetUnitFilter}
        setSelectedUnit={setTargetUnitFilter}
        onOpenAITutor={() => {
          setAiTutorTopic('Deep Learning University Syllabus');
          setAiTutorUnit('Curriculum Overview');
          setIsAITutorOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {activeTab === 'notes' && (
          <CurriculumView
            units={units}
            topics={topics}
            notes={notes}
            selectedUnitNumber={selectedUnitNumber}
            setSelectedUnitNumber={setSelectedUnitNumber}
            selectedTopicId={selectedTopicId}
            setSelectedTopicId={setSelectedTopicId}
            bookmarks={bookmarks}
            toggleBookmark={toggleBookmark}
            onOpenAITutorWithTopic={handleOpenAITutorWithTopic}
            onJumpToMCQs={handleJumpToMCQs}
            onJumpToQuestions={handleJumpToQuestions}
          />
        )}

        {activeTab === 'mcq' && (
          <MCQView
            initialMCQs={mcqs}
            selectedUnitFilter={targetUnitFilter}
            setSelectedUnitFilter={setTargetUnitFilter}
            bookmarks={bookmarks}
            toggleBookmark={toggleBookmark}
            onRecordQuizAttempt={handleRecordQuizAttempt}
          />
        )}

        {activeTab === 'questions' && (
          <QuestionBankView
            questions={questions}
            selectedUnitFilter={targetUnitFilter}
            setSelectedUnitFilter={setTargetUnitFilter}
            bookmarks={bookmarks}
            toggleBookmark={toggleBookmark}
          />
        )}

        {activeTab === 'codelab' && (
          <CodeLabView />
        )}

        {activeTab === 'aimedia' && (
          <AIMediaStudio
            onOpenExplainerWithQuery={(query) => {
              setAiTutorTopic('Audio Question');
              setAiTutorUnit('Student Speech Input');
              setIsAITutorOpen(true);
            }}
            onNavigateToQuestionBank={(query) => {
              setActiveTab('questions');
            }}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressDashboard
            units={units}
            topics={topics}
            mcqs={mcqs}
            questions={questions}
            bookmarks={bookmarks}
            toggleBookmark={toggleBookmark}
            quizHistory={quizHistory}
            onClearHistory={handleClearHistory}
            onSelectTopic={handleSelectTopicFromDashboard}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Deep Learning Educational Portal • University Computer Science Curriculum</p>
          <div className="flex items-center space-x-4 text-slate-400">
            <span>5 Core Units</span>
            <span>•</span>
            <span>105+ Solved MCQs</span>
            <span>•</span>
            <span>75+ College Exam Answers</span>
          </div>
        </div>
      </footer>

      {/* Interactive AI Professor Tutor Modal */}
      <AIExplainerModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        initialTopicTitle={aiTutorTopic}
        initialUnitTitle={aiTutorUnit}
      />

    </div>
  );
}
