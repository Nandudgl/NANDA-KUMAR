// Client-side helper services for Veo Video generation, Audio Transcription, and Live Voice

export interface VideoGenResponse {
  operationName: string;
  aspectRatio: '16:9' | '9:16';
  model: string;
}

export interface VideoStatusResponse {
  done: boolean;
  error?: any;
  metadata?: any;
}

export interface TranscribeResponse {
  transcription: string;
  model: string;
}

export interface VoiceChatResponse {
  reply: string;
  model: string;
}

// 1. Veo Video Generation API
export async function startVeoVideoGeneration(params: {
  imageBytes: string;
  mimeType?: string;
  prompt?: string;
  aspectRatio?: '16:9' | '9:16';
}): Promise<VideoGenResponse> {
  const res = await fetch('/api/ai/generate-video', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Video generation failed: ${res.statusText}`);
  }

  return res.json();
}

export async function checkVeoVideoStatus(operationName: string): Promise<VideoStatusResponse> {
  const res = await fetch('/api/ai/video-status', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ operationName }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Status check failed: ${res.statusText}`);
  }

  return res.json();
}

export async function downloadVeoVideoBlob(operationName: string): Promise<Blob> {
  const res = await fetch('/api/ai/video-download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ operationName }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Video download failed: ${res.statusText}`);
  }

  return res.blob();
}

// 2. Audio Transcription API (gemini-3.5-transcribe)
export async function transcribeAudio(params: {
  audioBytes: string; // Base64
  mimeType?: string;
  prompt?: string;
}): Promise<TranscribeResponse> {
  const res = await fetch('/api/ai/transcribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Transcription failed: ${res.statusText}`);
  }

  return res.json();
}

// 3. Conversational Voice Chat API (gemini-3.8-flash)
export async function sendVoiceChat(params: {
  message: string;
  history?: Array<{ role: string; text: string }>;
}): Promise<VoiceChatResponse> {
  const res = await fetch('/api/ai/live-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Voice chat failed: ${res.statusText}`);
  }

  return res.json();
}

// =========================================================================
// Real-Time Audio Utilities (PCM / Base64 conversion for Live API)
// =========================================================================

export function pcmToBase64(float32Array: Float32Array): string {
  const l = float32Array.length;
  const int16Array = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  let binary = '';
  const bytes = new Uint8Array(int16Array.buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function playAudioChunk(audioCtx: AudioContext, base64Audio: string) {
  try {
    const binary = atob(base64Audio);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const int16 = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) {
      float32[i] = int16[i] / 32768.0;
    }

    const buffer = audioCtx.createBuffer(1, float32.length, 24000);
    buffer.copyToChannel(float32, 0);

    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start();
  } catch (err) {
    console.error('Failed to play audio chunk:', err);
  }
}
