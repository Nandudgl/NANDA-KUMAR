import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Loader2, 
  GraduationCap, 
  HelpCircle, 
  BookOpen, 
  Lightbulb, 
  Copy, 
  Check,
  Mic,
  Square
} from 'lucide-react';
import { askAIExplanation } from '../services/ai';
import { transcribeAudio } from '../services/aiMedia';

interface AIExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopicTitle?: string;
  initialUnitTitle?: string;
}

const QUICK_PROMPTS = [
  'Derive backpropagation gradient for a 2-layer MLP step-by-step',
  'Explain the vanishing and exploding gradient problem and 3 solutions',
  'Why does Batch Normalization accelerate deep network training?',
  'How does the Scaled Dot-Product Attention mechanism calculate context?',
  'Compare ResNet skip connections vs DenseNet feature reuse for university exams'
];

export const AIExplainerModal: React.FC<AIExplainerModalProps> = ({
  isOpen,
  onClose,
  initialTopicTitle,
  initialUnitTitle
}) => {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState(initialTopicTitle || 'Deep Learning Fundamentals');
  const [unit, setUnit] = useState(initialUnitTitle || 'University Curriculum');
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const audioChunksRef = React.useRef<Blob[]>([]);

  const toggleRecording = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
      return;
    }

    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        stream.getTracks().forEach((t) => t.stop());
        setIsTranscribing(true);

        try {
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            const base64 = (reader.result as string) || '';
            const res = await transcribeAudio({
              audioBytes: base64,
              mimeType: 'audio/webm',
            });
            if (res.transcription) {
              setQuery((prev) => (prev ? `${prev} ${res.transcription}` : res.transcription));
            }
          };
        } catch (err: any) {
          console.error('Transcription error:', err);
        } finally {
          setIsTranscribing(false);
        }
      };

      recorder.start(250);
      setIsRecording(true);
    } catch (err) {
      console.error('Microphone access failed:', err);
    }
  };

  if (!isOpen) return null;

  const handleAsk = async (textToAsk?: string) => {
    const q = textToAsk || query;
    setLoading(true);
    setError(null);
    try {
      const responseText = await askAIExplanation({
        topicTitle: topic,
        unitTitle: unit,
        query: q
      });
      setExplanation(responseText);
    } catch (err: any) {
      setError(err.message || 'Failed to get explanation from AI Professor.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!explanation) return;
    navigator.clipboard.writeText(explanation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 space-y-5 shadow-2xl my-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-600/25">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <span>AI Professor Tutor</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Gemini Flash
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Academic explanations, mathematical formulations, and college exam scoring tips
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white cursor-pointer p-1"
          >
            ✕
          </button>
        </div>

        {/* Topic Context Indicator */}
        <div className="flex flex-wrap items-center gap-2 text-xs bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <span className="text-slate-400 font-medium">Context:</span>
          <span className="text-indigo-300 font-semibold">{topic}</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">{unit}</span>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="space-y-1.5">
          <div className="flex items-center space-x-1 text-xs text-slate-400">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>High-Yield University Exam Doubts:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(prompt);
                  handleAsk(prompt);
                }}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-all cursor-pointer text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Query Input Box */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && query.trim() && !loading) {
                  handleAsk();
                }
              }}
              placeholder="Ask anything (e.g., 'Explain the role of momentum in SGD with equations')..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-10 py-2.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
            <button
              type="button"
              onClick={toggleRecording}
              className={`absolute right-2.5 top-2 p-1 rounded-md transition-all ${
                isRecording
                  ? 'bg-red-500/20 text-red-400 animate-pulse'
                  : isTranscribing
                  ? 'bg-emerald-500/20 text-emerald-400 animate-spin'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={isRecording ? 'Stop Recording' : 'Dictate with Gemini Transcribe'}
            >
              {isRecording ? <Square className="w-3.5 h-3.5 fill-current" /> : isTranscribing ? <Loader2 className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          </div>
          <button
            disabled={loading || !query.trim()}
            onClick={() => handleAsk()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-purple-600/20 cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span className="hidden sm:inline">Ask Tutor</span>
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {error}
          </div>
        )}

        {/* Explanation Result */}
        {explanation && (
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4 max-h-[420px] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Professor\'s Pedagogical Breakdown</span>
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1 text-slate-400 hover:text-slate-200 text-xs cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
              {explanation.split('\n\n').map((para, i) => {
                if (para.startsWith('### ') || para.startsWith('## ')) {
                  return (
                    <h4 key={i} className="text-sm font-bold text-indigo-300 mt-4 mb-1">
                      {para.replace(/^#{2,3}\s/, '')}
                    </h4>
                  );
                }
                if (para.startsWith('```')) {
                  const clean = para.replace(/```[a-z]*\n?/g, '').replace(/```$/g, '');
                  return (
                    <pre key={i} className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300 text-xs overflow-x-auto">
                      {clean}
                    </pre>
                  );
                }
                return (
                  <p key={i} className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {para}
                  </p>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
