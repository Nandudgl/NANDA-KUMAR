import React, { useState, useRef, useEffect } from 'react';
import { 
  Film, 
  Mic, 
  Sparkles, 
  Upload, 
  Play, 
  Pause, 
  Square, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Volume2, 
  VolumeX, 
  Radio, 
  Copy, 
  ArrowRight, 
  Layers, 
  HelpCircle,
  Clock,
  Wand2,
  Trash2,
  Share2
} from 'lucide-react';
import { 
  startVeoVideoGeneration, 
  checkVeoVideoStatus, 
  downloadVeoVideoBlob,
  transcribeAudio, 
  sendVoiceChat,
  pcmToBase64,
  playAudioChunk
} from '../services/aiMedia';

interface AIMediaStudioProps {
  onOpenExplainerWithQuery?: (query: string) => void;
  onNavigateToQuestionBank?: (searchQuery: string) => void;
}

// Sample Deep Learning Diagrams for instant testing
const SAMPLE_DIAGRAMS = [
  {
    id: 'mlp',
    title: 'Multi-Layer Perceptron',
    desc: 'Dense feedforward connections with hidden layers',
    // High-contrast clean SVG diagram as Data URL
    dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="%230f172a"><rect width="600" height="400" fill="%23090d16"/><circle cx="100" cy="120" r="24" fill="%236366f1"/><circle cx="100" cy="200" r="24" fill="%236366f1"/><circle cx="100" cy="280" r="24" fill="%236366f1"/><circle cx="300" cy="80" r="24" fill="%23a855f7"/><circle cx="300" cy="160" r="24" fill="%23a855f7"/><circle cx="300" cy="240" r="24" fill="%23a855f7"/><circle cx="300" cy="320" r="24" fill="%23a855f7"/><circle cx="500" cy="160" r="24" fill="%23ec4899"/><circle cx="500" cy="240" r="24" fill="%23ec4899"/><line x1="124" y1="120" x2="276" y2="80" stroke="%234338ca" stroke-width="2"/><line x1="124" y1="120" x2="276" y2="160" stroke="%234338ca" stroke-width="2"/><line x1="124" y1="200" x2="276" y2="160" stroke="%234338ca" stroke-width="2"/><line x1="124" y1="280" x2="276" y2="240" stroke="%234338ca" stroke-width="2"/><line x1="324" y1="160" x2="476" y2="160" stroke="%237e22ce" stroke-width="2"/><line x1="324" y1="240" x2="476" y2="240" stroke="%237e22ce" stroke-width="2"/><text x="100" y="360" fill="%2394a3b8" font-family="sans-serif" font-size="16" text-anchor="middle">Input Layer</text><text x="300" y="380" fill="%23c084fc" font-family="sans-serif" font-size="16" text-anchor="middle">Hidden Layer</text><text x="500" y="320" fill="%23f472b6" font-family="sans-serif" font-size="16" text-anchor="middle">Output Layer</text></svg>',
  },
  {
    id: 'cnn',
    title: 'CNN Feature Map Conv',
    desc: 'Convolution filter sliding over image tensor',
    dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="%230f172a"><rect width="600" height="400" fill="%230b132b"/><rect x="80" y="80" width="160" height="160" fill="%231e293b" stroke="%2338bdf8" stroke-width="3"/><rect x="120" y="120" width="60" height="60" fill="%2338bdf8" opacity="0.4" stroke="%230284c7" stroke-width="2"/><path d="M 180 120 L 340 160 L 340 220 L 180 180 Z" fill="%230284c7" opacity="0.25"/><rect x="340" y="140" width="140" height="140" fill="%231e293b" stroke="%23818cf8" stroke-width="3"/><rect x="370" y="170" width="30" height="30" fill="%23818cf8"/><text x="160" y="290" fill="%2338bdf8" font-family="sans-serif" font-size="16" text-anchor="middle">Input Tensor (H x W x C)</text><text x="410" y="320" fill="%23818cf8" font-family="sans-serif" font-size="16" text-anchor="middle">Feature Map (K Filters)</text></svg>',
  },
  {
    id: 'transformer',
    title: 'Transformer Self-Attention',
    desc: 'Query, Key, Value tensor matrix multiplication',
    dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="%230f172a"><rect width="600" height="400" fill="%23111827"/><rect x="80" y="100" width="100" height="50" rx="8" fill="%233b82f6"/><text x="130" y="132" fill="white" font-family="sans-serif" font-size="18" text-anchor="middle" font-weight="bold">Q</text><rect x="80" y="170" width="100" height="50" rx="8" fill="%2310b981"/><text x="130" y="202" fill="white" font-family="sans-serif" font-size="18" text-anchor="middle" font-weight="bold">K</text><rect x="80" y="240" width="100" height="50" rx="8" fill="%23f59e0b"/><text x="130" y="272" fill="white" font-family="sans-serif" font-size="18" text-anchor="middle" font-weight="bold">V</text><rect x="240" y="120" width="140" height="60" rx="8" fill="%238b5cf6"/><text x="310" y="155" fill="white" font-family="sans-serif" font-size="14" text-anchor="middle" font-weight="bold">Softmax(QK^T / √d)</text><circle cx="480" cy="180" r="35" fill="%23ec4899"/><text x="480" y="186" fill="white" font-family="sans-serif" font-size="14" text-anchor="middle" font-weight="bold">Output</text><line x1="180" y1="125" x2="240" y2="140" stroke="%233b82f6" stroke-width="2"/><line x1="180" y1="195" x2="240" y2="160" stroke="%2310b981" stroke-width="2"/><line x1="380" y1="150" x2="445" y2="180" stroke="%238b5cf6" stroke-width="3"/><line x1="180" y1="265" x2="455" y2="200" stroke="%23f59e0b" stroke-width="2"/></svg>',
  }
];

export const AIMediaStudio: React.FC<AIMediaStudioProps> = ({
  onOpenExplainerWithQuery,
  onNavigateToQuestionBank,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'video' | 'transcribe' | 'voice'>('video');

  // -------------------------------------------------------------------------
  // 1. VEO VIDEO ANIMATOR STATE
  // -------------------------------------------------------------------------
  const [videoImage, setVideoImage] = useState<string | null>(SAMPLE_DIAGRAMS[0].dataUrl);
  const [videoPrompt, setVideoPrompt] = useState<string>(
    'Animate this neural network architecture with vibrant data pulses traveling through layers, glowing gradient backpropagation signals, and cinematic visual depth.'
  );
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [videoGenerating, setVideoGenerating] = useState<boolean>(false);
  const [videoStatusMsg, setVideoStatusMsg] = useState<string>('');
  const [videoElapsedSec, setVideoElapsedSec] = useState<number>(0);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // -------------------------------------------------------------------------
  // 2. AUDIO TRANSCRIBER STATE (gemini-3.5-transcribe)
  // -------------------------------------------------------------------------
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [transcribing, setTranscribing] = useState<boolean>(false);
  const [transcriptionText, setTranscriptionText] = useState<string>('');
  const [transcriptionError, setTranscriptionError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<any>(null);
  const audioFileInputRef = useRef<HTMLInputElement>(null);

  // -------------------------------------------------------------------------
  // 3. LIVE VOICE CONVERSATION STATE (gemini-3.8-live & gemini-3.8-flash)
  // -------------------------------------------------------------------------
  const [voiceSessionActive, setVoiceSessionActive] = useState<boolean>(false);
  const [liveMode, setLiveMode] = useState<'live-api' | 'conversational-flash'>('conversational-flash');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState<boolean>(false);
  const [voiceTranscript, setVoiceTranscript] = useState<Array<{ role: 'user' | 'assistant'; text: string; time: string }>>([
    {
      role: 'assistant',
      text: 'Hello! I am your AI Deep Learning Professor. Click "Start Voice Session" to speak with me directly. Ask me about gradients, backprop, CNNs, transformers, or exam preparation.',
      time: 'Just now',
    },
  ]);
  const [voiceInputDraft, setVoiceInputDraft] = useState<string>('');
  const [voiceSending, setVoiceSending] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // -------------------------------------------------------------------------
  // VEO HANDLERS
  // -------------------------------------------------------------------------
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setVideoError('Please select a valid image file (PNG, JPEG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setVideoImage(reader.result as string);
      setVideoError(null);
      setGeneratedVideoUrl(null);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateVideo = async () => {
    if (!videoImage) {
      setVideoError('Please upload or select an image first.');
      return;
    }

    setVideoGenerating(true);
    setVideoError(null);
    setGeneratedVideoUrl(null);
    setVideoElapsedSec(0);
    setVideoStatusMsg('Initiating video generation with Veo (veo-3.1-fast-generate-preview)...');

    const timer = setInterval(() => {
      setVideoElapsedSec((prev) => prev + 1);
    }, 1000);

    try {
      // 1. Start generation
      const genResult = await startVeoVideoGeneration({
        imageBytes: videoImage,
        prompt: videoPrompt,
        aspectRatio: aspectRatio,
      });

      const opName = genResult.operationName;
      setVideoStatusMsg('Rendering temporal frames with Veo fast generation...');

      // 2. Poll until completion
      let isDone = false;
      let attempts = 0;
      const maxAttempts = 90; // ~3 minutes max

      while (!isDone && attempts < maxAttempts) {
        await new Promise((r) => setTimeout(r, 4000));
        attempts++;

        const status = await checkVeoVideoStatus(opName);
        if (status.error) {
          throw new Error(status.error.message || 'Veo video rendering failed.');
        }

        if (status.done) {
          isDone = true;
          break;
        } else {
          const msgs = [
            'Simulating deep learning dynamic tensor activations...',
            'Calculating optic flow fields between architectural layers...',
            'Interpolating latent vector transitions...',
            'Encoding high-fidelity video stream (MP4)...',
          ];
          setVideoStatusMsg(msgs[attempts % msgs.length]);
        }
      }

      if (!isDone) {
        throw new Error('Video generation timed out. Please try again with a simpler prompt.');
      }

      // 3. Download video blob
      setVideoStatusMsg('Downloading completed MP4 video...');
      const blob = await downloadVeoVideoBlob(opName);
      const url = URL.createObjectURL(blob);
      setGeneratedVideoUrl(url);
      setVideoStatusMsg('Video generated successfully!');
    } catch (err: any) {
      console.error('Video generation error:', err);
      setVideoError(err.message || 'Failed to generate video with Veo.');
    } finally {
      clearInterval(timer);
      setVideoGenerating(false);
    }
  };

  // -------------------------------------------------------------------------
  // AUDIO TRANSCRIBER HANDLERS (gemini-3.5-transcribe)
  // -------------------------------------------------------------------------
  const startRecording = async () => {
    try {
      setTranscriptionError(null);
      setAudioUrl(null);
      audioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach((t) => t.stop());

        // Automatically transcribe audio using gemini-3.5-transcribe
        await handleTranscribeBlob(audioBlob);
      };

      mediaRecorder.start(250);
      setIsRecording(true);
      setRecordingSeconds(0);

      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.error('Microphone access denied or error:', err);
      setTranscriptionError('Microphone access failed. Please enable mic permissions in your browser.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(recordingTimerRef.current);
    }
  };

  const handleTranscribeBlob = async (blob: Blob) => {
    setTranscribing(true);
    setTranscriptionError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64Data = (reader.result as string) || '';
        const res = await transcribeAudio({
          audioBytes: base64Data,
          mimeType: blob.type || 'audio/webm',
        });
        setTranscriptionText(res.transcription);
      };
    } catch (err: any) {
      console.error('Transcription error:', err);
      setTranscriptionError(err.message || 'Failed to transcribe audio.');
    } finally {
      setTranscribing(false);
    }
  };

  const handleAudioFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    handleTranscribeBlob(file);
  };

  // -------------------------------------------------------------------------
  // LIVE VOICE CONVERSATION HANDLERS (gemini-3.8-live & gemini-3.8-flash)
  // -------------------------------------------------------------------------
  const startVoiceSession = async () => {
    setVoiceSessionActive(true);

    if (liveMode === 'live-api') {
      try {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/api/live`;
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const inputAudioCtx = new AudioContextClass({ sampleRate: 16000 });
        const outputAudioCtx = new AudioContextClass({ sampleRate: 24000 });
        audioCtxRef.current = outputAudioCtx;

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;

        const source = inputAudioCtx.createMediaStreamSource(stream);
        const processor = inputAudioCtx.createScriptProcessor(4096, 1, 1);
        source.connect(processor);
        processor.connect(inputAudioCtx.destination);

        processor.onaudioprocess = (e) => {
          if (!isMuted && ws.readyState === WebSocket.OPEN) {
            const base64Pcm = pcmToBase64(e.inputBuffer.getChannelData(0));
            ws.send(JSON.stringify({ audio: base64Pcm }));
          }
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.audio) {
              setIsAiSpeaking(true);
              playAudioChunk(outputAudioCtx, data.audio);
            }
            if (data.text) {
              setVoiceTranscript((prev) => [
                ...prev,
                { role: 'assistant', text: data.text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
              ]);
            }
            if (data.interrupted || data.turnComplete) {
              setIsAiSpeaking(false);
            }
          } catch (e) {
            console.error('Error handling WebSocket message:', e);
          }
        };

        ws.onerror = () => {
          console.warn('Live API WebSocket encountered an issue, seamlessly switching to Conversational Voice Mode.');
          setLiveMode('conversational-flash');
        };
      } catch (err: any) {
        console.error('Error starting live API session:', err);
        setLiveMode('conversational-flash');
      }
    }
  };

  const stopVoiceSession = () => {
    setVoiceSessionActive(false);
    setIsAiSpeaking(false);
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const handleSendVoiceMessage = async (textToSend?: string) => {
    const message = textToSend || voiceInputDraft;
    if (!message.trim()) return;

    setVoiceInputDraft('');
    const newEntry = {
      role: 'user' as const,
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setVoiceTranscript((prev) => [...prev, newEntry]);

    setVoiceSending(true);
    setIsAiSpeaking(true);

    try {
      const history = voiceTranscript.map((t) => ({ role: t.role, text: t.text }));
      const response = await sendVoiceChat({ message, history });

      setVoiceTranscript((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: response.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      // Speak response using speech synthesis if supported
      if ('speechSynthesis' in window && !isMuted) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(response.reply.replace(/[*#`$]/g, ''));
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        utterance.onend = () => setIsAiSpeaking(false);
        utterance.onerror = () => setIsAiSpeaking(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setIsAiSpeaking(false);
      }
    } catch (err: any) {
      console.error('Error in voice chat:', err);
      setVoiceTranscript((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Apologies, I encountered an issue: ${err.message || 'Please try again.'}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsAiSpeaking(false);
    } finally {
      setVoiceSending(false);
    }
  };

  useEffect(() => {
    return () => {
      stopVoiceSession();
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    };
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 p-6 sm:p-8 border border-indigo-900/50 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Next-Generation Multimodal AI Lab</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              AI Creative & Voice Studio
            </h1>
            <p className="mt-1 text-slate-300 text-sm sm:text-base max-w-2xl">
              Bring Deep Learning architectures to life with Veo Video Generation, transcribe lecture and study audio with Gemini Transcribe, and engage in real-time voice discussions with the AI Professor.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveSubTab('video')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeSubTab === 'video'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Veo Video</span>
            </button>

            <button
              onClick={() => setActiveSubTab('transcribe')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeSubTab === 'transcribe'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>Transcribe</span>
            </button>

            <button
              onClick={() => setActiveSubTab('voice')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeSubTab === 'voice'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>Live Voice</span>
            </button>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* FEATURE 1: ANIMATE IMAGES INTO VIDEO (veo-3.1-fast-generate-preview) */}
      {/* =================================================================== */}
      {activeSubTab === 'video' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Image Selector & Config */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center">
                    <Film className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-base">Image to Video Animator</h3>
                    <p className="text-xs text-slate-400">Powered by <code className="text-pink-300">veo-3.1-fast-generate-preview</code></p>
                  </div>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-semibold border border-pink-500/30">
                  Veo Fast Preview
                </span>
              </div>

              {/* Sample Diagrams Picker */}
              <div className="space-y-2 mb-4">
                <label className="text-xs font-semibold text-slate-300">Choose Sample Deep Learning Diagram:</label>
                <div className="grid grid-cols-3 gap-2">
                  {SAMPLE_DIAGRAMS.map((diagram) => (
                    <button
                      key={diagram.id}
                      onClick={() => {
                        setVideoImage(diagram.dataUrl);
                        setGeneratedVideoUrl(null);
                        setVideoError(null);
                      }}
                      className={`p-2 rounded-lg border text-left transition-all ${
                        videoImage === diagram.dataUrl
                          ? 'border-indigo-500 bg-indigo-950/40 text-white'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <p className="text-xs font-semibold truncate">{diagram.title}</p>
                      <p className="text-[10px] text-slate-500 line-clamp-1">{diagram.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Custom Photo */}
              <div className="space-y-2 mb-4">
                <label className="text-xs font-semibold text-slate-300">Or Upload Your Photo / Diagram:</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer border-2 border-dashed border-slate-700 hover:border-indigo-500/60 rounded-xl p-4 text-center transition-all bg-slate-950/40 hover:bg-slate-950/70"
                >
                  <Upload className="w-6 h-6 mx-auto text-slate-400 mb-1" />
                  <p className="text-xs text-slate-300 font-medium">Click to upload photo or diagram</p>
                  <p className="text-[11px] text-slate-500">Supports PNG, JPG, WebP</p>
                </div>
              </div>

              {/* Aspect Ratio Selector (Required: 16:9 or 9:16) */}
              <div className="space-y-2 mb-4">
                <label className="text-xs font-semibold text-slate-300">Video Aspect Ratio:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setAspectRatio('16:9')}
                    className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all ${
                      aspectRatio === '16:9'
                        ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-4 h-2.5 border border-current rounded-xs" />
                    <span>16:9 (Landscape)</span>
                  </button>

                  <button
                    onClick={() => setAspectRatio('9:16')}
                    className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all ${
                      aspectRatio === '9:16'
                        ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-2.5 h-4 border border-current rounded-xs" />
                    <span>9:16 (Portrait)</span>
                  </button>
                </div>
              </div>

              {/* Prompt Input */}
              <div className="space-y-2 mb-5">
                <label className="text-xs font-semibold text-slate-300">Animation Motion Prompt:</label>
                <textarea
                  value={videoPrompt}
                  onChange={(e) => setVideoPrompt(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  placeholder="Describe how the image elements should move, pulsate, or animate..."
                />
              </div>

              {/* Error Message */}
              {videoError && (
                <div className="mb-4 p-3 bg-red-950/50 border border-red-800/50 rounded-lg flex items-start space-x-2 text-red-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>{videoError}</p>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={handleGenerateVideo}
                disabled={videoGenerating || !videoImage}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold text-sm shadow-lg shadow-purple-900/30 flex items-center justify-center space-x-2 transition-all"
              >
                {videoGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Generating Video with Veo... ({videoElapsedSec}s)</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Animate Image with Veo</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Preview & Result */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm h-full flex flex-col">
              <h3 className="font-semibold text-white text-base mb-3 flex items-center justify-between">
                <span>Display & Video Output</span>
                {generatedVideoUrl && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Ready
                  </span>
                )}
              </h3>

              {/* Video Player or Source Image Preview */}
              <div className="flex-1 flex flex-col justify-center items-center bg-slate-950 rounded-xl border border-slate-800/80 p-4 min-h-[300px] overflow-hidden relative">
                {videoGenerating ? (
                  <div className="text-center p-6 space-y-4 max-w-sm">
                    <div className="relative w-16 h-16 mx-auto">
                      <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 animate-ping" />
                      <div className="w-16 h-16 rounded-full border-4 border-t-pink-500 border-r-purple-500 border-b-indigo-500 border-l-transparent animate-spin flex items-center justify-center">
                        <Film className="w-6 h-6 text-pink-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">Rendering with Veo Fast Preview</h4>
                      <p className="text-xs text-slate-400 mt-1">{videoStatusMsg}</p>
                      <p className="text-[11px] text-slate-500 mt-2 font-mono">{videoElapsedSec}s elapsed</p>
                    </div>
                  </div>
                ) : generatedVideoUrl ? (
                  <div className="w-full flex flex-col items-center space-y-3">
                    <video
                      src={generatedVideoUrl}
                      controls
                      autoPlay
                      loop
                      className={`rounded-lg border border-slate-700 shadow-xl max-h-[340px] ${
                        aspectRatio === '9:16' ? 'w-auto h-[340px]' : 'w-full'
                      }`}
                    />
                    <div className="flex items-center gap-2 w-full pt-2">
                      <a
                        href={generatedVideoUrl}
                        download={`veo-animation-${Date.now()}.mp4`}
                        className="flex-1 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download MP4</span>
                      </a>
                      <button
                        onClick={() => setGeneratedVideoUrl(null)}
                        className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                ) : videoImage ? (
                  <div className="w-full flex flex-col items-center space-y-2">
                    <div className="relative w-full rounded-lg overflow-hidden border border-slate-800 bg-slate-900/50 flex items-center justify-center max-h-[280px]">
                      <img
                        src={videoImage}
                        alt="Source to animate"
                        className="object-contain max-h-[260px] rounded-md"
                      />
                    </div>
                    <p className="text-xs text-slate-400">
                      Source Image selected. Click <strong className="text-indigo-400">Animate Image with Veo</strong> to generate video.
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-slate-500 p-8">
                    <Layers className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p className="text-xs">No image selected</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* FEATURE 2: TRANSCRIBE AUDIO (gemini-3.5-transcribe) */}
      {/* =================================================================== */}
      {activeSubTab === 'transcribe' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Microphone & Audio Input */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-base">Microphone Audio Transcriber</h3>
                    <p className="text-xs text-slate-400">Powered by <code className="text-emerald-300">gemini-3.5-transcribe</code></p>
                  </div>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  Fast Transcribe
                </span>
              </div>

              {/* Microphone Visualizer & Controls */}
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 text-center space-y-4">
                <div className="relative inline-flex items-center justify-center">
                  {isRecording && (
                    <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
                  )}
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl ${
                      isRecording
                        ? 'bg-red-600 hover:bg-red-500 text-white ring-4 ring-red-500/30 scale-105'
                        : 'bg-gradient-to-tr from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white'
                    }`}
                  >
                    {isRecording ? <Square className="w-8 h-8 fill-current" /> : <Mic className="w-8 h-8" />}
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold text-white text-sm">
                    {isRecording ? 'Listening to your microphone...' : 'Click to start recording voice'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Speak your Deep Learning question, viva doubt, or lecture notes
                  </p>
                  {isRecording && (
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-semibold">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span>{Math.floor(recordingSeconds / 60)}:{(recordingSeconds % 60).toString().padStart(2, '0')}</span>
                    </div>
                  )}
                </div>

                {isRecording && (
                  <button
                    onClick={stopRecording}
                    className="py-2 px-4 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold transition-all"
                  >
                    Stop & Transcribe Now
                  </button>
                )}
              </div>

              {/* Or File Upload for pre-recorded audio */}
              <div className="pt-2">
                <label className="text-xs font-semibold text-slate-300 block mb-2">Or Upload Audio File:</label>
                <input
                  ref={audioFileInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => audioFileInputRef.current?.click()}
                  className="w-full py-2.5 px-3 rounded-lg border border-slate-700 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-medium flex items-center justify-center gap-2 transition-all"
                >
                  <Upload className="w-4 h-4 text-slate-400" />
                  <span>Upload .mp3, .wav, .m4a, or .webm file</span>
                </button>
              </div>

              {/* Audio Playback if recorded or uploaded */}
              {audioUrl && (
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                  <p className="text-[11px] font-semibold text-slate-400">Captured Audio Playback:</p>
                  <audio src={audioUrl} controls className="w-full h-8" />
                </div>
              )}

              {transcriptionError && (
                <div className="p-3 bg-red-950/50 border border-red-800/50 rounded-lg flex items-start space-x-2 text-red-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>{transcriptionError}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Transcription Results & Actions */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white text-base flex items-center gap-2">
                  <span>Accurate Text Transcription</span>
                  {transcribing && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1 font-normal">
                      <RefreshCw className="w-3 h-3 animate-spin" /> Processing with Gemini...
                    </span>
                  )}
                </h3>

                {transcriptionText && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(transcriptionText);
                      }}
                      className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition-all"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={() => setTranscriptionText('')}
                      className="text-xs px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-red-300"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Transcript Display Box */}
              <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 min-h-[260px] overflow-y-auto">
                {transcribing ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                    <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                    <p className="text-xs text-slate-400">
                      Transcribing spoken audio with technical accuracy...
                    </p>
                  </div>
                ) : transcriptionText ? (
                  <div className="space-y-3">
                    <p className="text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                      {transcriptionText}
                    </p>
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{transcriptionText.split(/\s+/).filter(Boolean).length} words transcribed</span>
                      <span className="text-emerald-400 font-medium">Model: gemini-3.5-transcribe</span>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-12 space-y-2">
                    <Mic className="w-10 h-10 opacity-30" />
                    <p className="text-xs">No audio transcribed yet.</p>
                    <p className="text-[11px] text-slate-600 max-w-xs">
                      Press the microphone button on the left and speak a deep learning topic or doubt to see instant text transcription.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Jump Buttons */}
              {transcriptionText && (
                <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => onOpenExplainerWithQuery?.(transcriptionText)}
                    className="py-2.5 px-3 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask AI Professor this Question</span>
                  </button>

                  <button
                    onClick={() => onNavigateToQuestionBank?.(transcriptionText)}
                    className="py-2.5 px-3 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Search Exam Question Bank</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* FEATURE 3: VOICE CONVERSATIONS (gemini-3.8-live & gemini-3.8-flash)  */}
      {/* =================================================================== */}
      {activeSubTab === 'voice' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive Voice Avatar & Controls */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <Radio className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-base">Live Voice Conversation</h3>
                    <p className="text-xs text-slate-400">Models: <code className="text-indigo-300">gemini-3.8-live</code> / <code className="text-indigo-300">gemini-3.8-flash</code></p>
                  </div>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                  Real-time Audio
                </span>
              </div>

              {/* Holographic Voice Orb Avatar */}
              <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  {isAiSpeaking ? (
                    <>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/30 to-pink-500/30 animate-ping" />
                      <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 blur-md opacity-60 animate-pulse" />
                      <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/50">
                        <Volume2 className="w-10 h-10 text-white animate-bounce" />
                      </div>
                    </>
                  ) : voiceSessionActive ? (
                    <>
                      <div className="absolute inset-0 rounded-full border border-indigo-500/30 animate-spin" />
                      <div className="relative w-24 h-24 rounded-full bg-slate-800 border-2 border-indigo-500/50 flex items-center justify-center">
                        <Mic className="w-8 h-8 text-indigo-400" />
                      </div>
                    </>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                      <Radio className="w-8 h-8 text-slate-400" />
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-white text-base">
                    {isAiSpeaking
                      ? 'AI Professor Speaking...'
                      : voiceSessionActive
                      ? 'Listening to Student...'
                      : 'Voice Session Inactive'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    {voiceSessionActive
                      ? 'Speak naturally or use the quick topics below to discuss concepts.'
                      : 'Start session to engage in spoken dialogue with the Deep Learning Professor.'}
                  </p>
                </div>

                {/* Session Action Buttons */}
                <div className="flex items-center gap-3 w-full justify-center pt-2">
                  {!voiceSessionActive ? (
                    <button
                      onClick={startVoiceSession}
                      className="py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-900/40 flex items-center gap-2 transition-all"
                    >
                      <Radio className="w-4 h-4 animate-pulse" />
                      <span>Start Voice Session</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                          isMuted
                            ? 'border-red-500 bg-red-600/20 text-red-300'
                            : 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white'
                        }`}
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>

                      <button
                        onClick={stopVoiceSession}
                        className="py-3 px-5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md"
                      >
                        <Square className="w-4 h-4 fill-current" />
                        <span>End Voice Session</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Quick Discussion Starters */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Quick Voice Discussion Starters:</label>
                <div className="space-y-1.5">
                  {[
                    'Explain the difference between Batch Norm and Layer Norm in deep networks.',
                    'Why does the vanishing gradient problem occur in deep sigmoid networks?',
                    'Walk me through how Multi-Head Self-Attention works step-by-step.',
                    'How does Adam optimizer combine Momentum and RMSprop?',
                  ].map((topic, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendVoiceMessage(topic)}
                      className="w-full text-left p-2.5 rounded-lg border border-slate-800 bg-slate-950/60 hover:bg-indigo-950/30 hover:border-indigo-500/40 text-xs text-slate-300 transition-all flex items-center justify-between group"
                    >
                      <span className="line-clamp-1">{topic}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Conversation Transcript */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm h-full flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white text-base flex items-center gap-2">
                  <span>Voice Dialogue Transcript</span>
                  <span className="text-xs text-slate-500 font-normal font-mono">Live Stream</span>
                </h3>

                <button
                  onClick={() =>
                    setVoiceTranscript([
                      {
                        role: 'assistant',
                        text: 'Transcript cleared. How can I assist your deep learning studies today?',
                        time: 'Just now',
                      },
                    ])
                  }
                  className="text-xs text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-800"
                >
                  Clear Transcript
                </button>
              </div>

              {/* Transcript Feed */}
              <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 min-h-[360px] max-h-[480px] overflow-y-auto space-y-3">
                {voiceTranscript.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="text-[11px] font-semibold text-slate-400">
                        {msg.role === 'user' ? 'Student' : 'AI Professor'}
                      </span>
                      <span className="text-[10px] text-slate-600">{msg.time}</span>
                    </div>
                    <div
                      className={`p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed max-w-[85%] ${
                        msg.role === 'user'
                          ? 'bg-indigo-600 text-white rounded-tr-xs'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {voiceSending && (
                  <div className="flex items-center space-x-2 text-xs text-indigo-400 p-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Professor is synthesizing spoken explanation...</span>
                  </div>
                )}
              </div>

              {/* Input for typing message directly during voice session */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  value={voiceInputDraft}
                  onChange={(e) => setVoiceInputDraft(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendVoiceMessage()}
                  placeholder="Or type a question for the Professor..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => handleSendVoiceMessage()}
                  disabled={!voiceInputDraft.trim() || voiceSending}
                  className="py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs transition-all shrink-0"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
