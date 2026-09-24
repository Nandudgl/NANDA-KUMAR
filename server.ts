import express, { Request, Response } from 'express';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, GenerateVideosOperation, LiveServerMessage, Modality } from '@google/genai';
import { WebSocketServer, WebSocket } from 'ws';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const PORT = Number(process.env.PORT) || 3000;

// Allow larger payloads for image and audio data uploads
app.use(express.json({ limit: '60mb' }));
app.use(express.urlencoded({ extended: true, limit: '60mb' }));

// Initialize Google GenAI with required telemetry headers
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Resilient AI generation with automatic fallback if a model experiences high demand
async function generateWithFallback(params: {
  contents: any;
  config?: any;
}) {
  if (!ai) throw new Error('Gemini AI is not configured.');

  const candidateModels = ['gemini-2.5-flash', 'gemini-3.8-flash', 'gemini-3.1-flash-lite'];
  let lastError: any = null;

  for (const model of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config,
      });
      return { response, modelUsed: model };
    } catch (err: any) {
      lastError = err;
      console.warn(`Model ${model} unavailable or busy, attempting fallback...`);
    }
  }

  throw lastError || new Error('All AI models currently unavailable.');
}

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    aiAvailable: Boolean(ai),
    timestamp: new Date().toISOString(),
  });
});

// AI Concept Tutor & Doubt Resolution
app.post('/api/ai/explain', async (req: Request, res: Response) => {
  try {
    const { topicTitle, unitTitle, query, level } = req.body;

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini AI is not configured on the server. Please check your GEMINI_API_KEY environment variable.',
      });
    }

    const prompt = `You are a distinguished Professor of Artificial Intelligence & Deep Learning specializing in university-level pedagogy.
Explain the following topic or address the student's question with utmost academic rigor, clarity, and exam-oriented precision.

Context:
- Curriculum: Deep Learning (University Engineering / Computer Science syllabus)
- Unit: ${unitTitle || 'Deep Learning Concepts'}
- Topic: ${topicTitle || 'General Topic'}
- Student Understanding Level: ${level || 'Undergraduate'}
- Student Query / Request: "${query || `Please provide a thorough pedagogical explanation of ${topicTitle}`}"

Format your response using clean Markdown with:
1. **Executive Intuition:** Simple intuitive analogy (e.g. real-world metaphor).
2. **Mathematical Formulation:** Precise LaTeX equations (use $ for inline math, $$ for block formulas).
3. **Architectural Breakdown / Working Mechanism:** Step-by-step description of how tensors/gradients flow.
4. **Key Edge Cases / Failure Modes:** Vanishing gradients, dead neurons, overfitting, or mode collapse if applicable.
5. **University Exam Tip:** High-yield tips on what professors look for in university exams (keywords, required diagrams, common student mistakes).`;

    const { response, modelUsed } = await generateWithFallback({
      contents: prompt,
    });

    res.json({
      text: response.text || 'No response generated.',
      model: modelUsed,
    });
  } catch (error: any) {
    console.error('Error in /api/ai/explain:', error);
    res.status(500).json({ error: error.message || 'Failed to generate explanation' });
  }
});

// AI Model Answer Evaluator (Automated Grading against College Exam Rubrics)
app.post('/api/ai/grade-answer', async (req: Request, res: Response) => {
  try {
    const { question, modelAnswer, studentAnswer, maxMarks } = req.body;

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini AI is not configured on the server.',
      });
    }

    if (!studentAnswer || !studentAnswer.trim()) {
      return res.status(400).json({ error: 'Student answer is empty.' });
    }

    const prompt = `You are a Senior University Examiner evaluating an Engineering College semester exam paper in Deep Learning.
Evaluate the student's answer against the standard model answer and question marks allocation.

Question (${maxMarks || 10} Marks):
"${question}"

Reference / Model Answer:
"${modelAnswer}"

Student's Written Answer:
"${studentAnswer}"

Evaluate strictly yet constructively. Return your evaluation strictly in the following JSON structure:
\`\`\`json
{
  "awardedMarks": <number between 0 and ${maxMarks || 10}>,
  "maxMarks": ${maxMarks || 10},
  "grade": "<S / A+ / A / B / C / Re-attempt>",
  "summary": "<1-2 sentence overall appraisal>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "missingKeyPoints": ["<essential technical concept or keyword omitted>"],
  "diagramFeedback": "<feedback regarding diagrams, architectural flow, or formulas>",
  "constructiveTips": "<actionable advice for scoring full marks in a semester examination>"
}
\`\`\``;

    const { response } = await generateWithFallback({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/ai/grade-answer:', error);
    res.status(500).json({ error: error.message || 'Failed to grade answer' });
  }
});

// AI PyTorch / TensorFlow Code Tutor
app.post('/api/ai/code-tutor', async (req: Request, res: Response) => {
  try {
    const { topic, framework } = req.body;

    if (!ai) {
      return res.status(503).json({ error: 'Gemini AI is not configured.' });
    }

    const targetFramework = framework || 'PyTorch';

    const prompt = `You are an expert Deep Learning research engineer and educator.
Write a clean, self-contained, idiomatic ${targetFramework} implementation demonstrating: "${topic}".

Requirements:
1. Modern, clean code using standard modules (e.g. torch.nn, torch.optim or tf.keras).
2. Explicit input tensor shape annotations (e.g., # shape: (batch_size, channels, height, width)).
3. Forward pass comments tracing the dimensional transformations at every step.
4. Minimal mock training loop or dummy input test demonstrating that the model compiles and executes without errors.
5. Brief commentary on why specific layers or hyperparameters were selected.`;

    const { response, modelUsed } = await generateWithFallback({
      contents: prompt,
    });

    res.json({
      code: response.text || '',
      framework: targetFramework,
      model: modelUsed,
    });
  } catch (error: any) {
    console.error('Error in /api/ai/code-tutor:', error);
    res.status(500).json({ error: error.message || 'Failed to generate code' });
  }
});

// AI On-Demand Practice Quiz Generator
app.post('/api/ai/generate-quiz', async (req: Request, res: Response) => {
  try {
    const { unitNumber, topicTitle, count } = req.body;

    if (!ai) {
      return res.status(503).json({ error: 'Gemini AI is not configured.' });
    }

    const numQuestions = Math.min(Math.max(Number(count) || 3, 1), 5);

    const prompt = `Generate ${numQuestions} high-yield, college-level multiple choice questions on the topic "${topicTitle || 'Deep Learning'}" (Unit ${unitNumber || 'Comprehensive'}).
Ensure questions test true conceptual understanding, math formulations, or architectural mechanics (Bloom Levels K2-K4).

Output strictly valid JSON matching this schema:
\`\`\`json
[
  {
    "id": "ai-gen-1",
    "question": "Question text here",
    "optionA": "Choice A",
    "optionB": "Choice B",
    "optionC": "Choice C",
    "optionD": "Choice D",
    "correctAnswer": "A",
    "explanation": "Thorough explanation of why choice is correct and others are incorrect",
    "difficulty": "Medium",
    "bloomLevel": "K3"
  }
]
\`\`\``;

    const { response } = await generateWithFallback({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '[]');
    res.json({ questions: parsed });
  } catch (error: any) {
    console.error('Error in /api/ai/generate-quiz:', error);
    res.status(500).json({ error: error.message || 'Failed to generate quiz' });
  }
});

// =========================================================================
// NEW FEATURE 1: ANIMATE IMAGES INTO VIDEO (Veo veo-3.1-fast-generate-preview)
// =========================================================================

// 1. Start Video Generation
app.post('/api/ai/generate-video', async (req: Request, res: Response) => {
  try {
    const { imageBytes, mimeType, prompt, aspectRatio } = req.body;

    if (!ai) {
      return res.status(503).json({ error: 'Gemini AI is not configured.' });
    }

    if (!imageBytes) {
      return res.status(400).json({ error: 'No image provided to animate.' });
    }

    // Required aspect ratio: 16:9 (landscape) or 9:16 (portrait)
    const validAspectRatio = aspectRatio === '9:16' ? '9:16' : '16:9';

    // Model: veo-3.1-fast-generate-preview as requested
    const operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt || 'Animate this deep learning architectural diagram with fluid data and tensor flow motions, glowing neural connections, and cinematic visual depth',
      image: {
        imageBytes: imageBytes.replace(/^data:image\/[a-zA-Z+]+;base64,/, ''),
        mimeType: mimeType || 'image/png',
      },
      config: {
        numberOfVideos: 1,
        aspectRatio: validAspectRatio,
      },
    });

    res.json({
      operationName: operation.name,
      aspectRatio: validAspectRatio,
      model: 'veo-3.1-fast-generate-preview',
    });
  } catch (error: any) {
    console.error('Error in /api/ai/generate-video:', error);
    res.status(500).json({ error: error.message || 'Failed to initiate video generation' });
  }
});

// 2. Poll Video Operation Status
app.post('/api/ai/video-status', async (req: Request, res: Response) => {
  try {
    const { operationName } = req.body;

    if (!ai) {
      return res.status(503).json({ error: 'Gemini AI is not configured.' });
    }

    if (!operationName) {
      return res.status(400).json({ error: 'Missing operationName parameter.' });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });

    res.json({
      done: Boolean(updated.done),
      error: updated.error || null,
      metadata: updated.metadata || null,
    });
  } catch (error: any) {
    console.error('Error in /api/ai/video-status:', error);
    res.status(500).json({ error: error.message || 'Failed to check video status' });
  }
});

// 3. Download / Stream Video
app.post('/api/ai/video-download', async (req: Request, res: Response) => {
  try {
    const { operationName } = req.body;

    if (!ai) {
      return res.status(503).json({ error: 'Gemini AI is not configured.' });
    }

    if (!operationName) {
      return res.status(400).json({ error: 'Missing operationName.' });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });

    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
    if (!uri) {
      return res.status(404).json({ error: 'Generated video URI is not available yet.' });
    }

    // Fetch video binary using the server-side API key
    const videoRes = await fetch(uri, {
      headers: { 'x-goog-api-key': apiKey },
    });

    if (!videoRes.ok) {
      return res.status(videoRes.status).json({ error: 'Failed to download video file from storage.' });
    }

    res.setHeader('Content-Type', 'video/mp4');
    const arrayBuffer = await videoRes.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (error: any) {
    console.error('Error in /api/ai/video-download:', error);
    res.status(500).json({ error: error.message || 'Failed to download video' });
  }
});

// =========================================================================
// NEW FEATURE 2: AUDIO TRANSCRIPTION (gemini-3.5-transcribe)
// =========================================================================
app.post('/api/ai/transcribe', async (req: Request, res: Response) => {
  try {
    const { audioBytes, mimeType, prompt } = req.body;

    if (!ai) {
      return res.status(503).json({ error: 'Gemini AI is not configured.' });
    }

    if (!audioBytes) {
      return res.status(400).json({ error: 'No audio data provided.' });
    }

    const cleanBase64 = audioBytes.replace(/^data:audio\/[a-zA-Z0-9.+_-]+;base64,/, '');

    const audioPart = {
      inlineData: {
        mimeType: mimeType || 'audio/webm',
        data: cleanBase64,
      },
    };

    // Use model gemini-3.5-transcribe as requested
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: {
        parts: [
          audioPart,
          {
            text:
              prompt ||
              'Transcribe this audio recording with utmost accuracy. Preserve all Deep Learning terminology, mathematical symbols, equations, question formatting, and acronyms (such as CNN, RNN, LSTM, SGD, Adam, Transformer, Backprop, ReLU).',
          },
        ],
      },
    });

    res.json({
      transcription: response.text || '',
      model: 'gemini-3.5-transcribe',
    });
  } catch (error: any) {
    console.error('Error in /api/ai/transcribe:', error);
    res.status(500).json({ error: error.message || 'Failed to transcribe audio' });
  }
});

// =========================================================================
// NEW FEATURE 3: LIVE VOICE CONVERSATION (gemini-3.8-live & gemini-3.8-flash)
// =========================================================================

// Fallback / REST Voice Conversational Chat Endpoint (uses models/gemini-3.8-flash)
app.post('/api/ai/live-chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!ai) {
      return res.status(503).json({ error: 'Gemini AI is not configured.' });
    }

    const systemInstruction = `You are the AI Professor for Deep Learning at an elite engineering university. 
You are speaking directly to a student in a live voice conversation.
Respond in clear, natural, spoken conversational language (1-3 paragraphs max).
Keep formulas spoken phonetically or simplified for listening (e.g., 'w transpose x plus b' rather than dense LaTeX unless explicitly asked).
Be encouraging, academically authoritative, and exam-focused.`;

    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const turn of history.slice(-6)) {
        contents.push({
          role: turn.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: turn.text }],
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message || 'Hello Professor, can you explain deep learning?' }],
    });

    let response: any;
    let modelUsed = 'gemini-3.8-flash';
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: { systemInstruction },
      });
    } catch {
      const fallback = await generateWithFallback({
        contents,
        config: { systemInstruction },
      });
      response = fallback.response;
      modelUsed = fallback.modelUsed;
    }

    res.json({
      reply: response.text || '',
      model: modelUsed,
    });
  } catch (error: any) {
    console.error('Error in /api/ai/live-chat:', error);
    res.status(500).json({ error: error.message || 'Failed to conduct live chat' });
  }
});

// WebSocket Server for Real-Time Gemini Live API (gemini-3.8-live)
const wss = new WebSocketServer({ server, path: '/api/live' });

wss.on('connection', async (clientWs: WebSocket) => {
  console.log('Client connected to Gemini Live API WebSocket');

  if (!ai) {
    clientWs.send(
      JSON.stringify({
        type: 'error',
        error: 'Gemini AI is not configured on server.',
      })
    );
    clientWs.close();
    return;
  }

  let session: any = null;

  try {
    session = await ai.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
        },
        systemInstruction: `You are an expert, encouraging university Deep Learning Professor. 
Converse naturally and dynamically with the student about neural network architectures, optimization algorithms, transformers, and exam questions. Keep spoken answers concise, engaging, and clear.`,
      },
      callbacks: {
        onmessage: (message: LiveServerMessage) => {
          if (clientWs.readyState !== WebSocket.OPEN) return;

          const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          const text = message.serverContent?.modelTurn?.parts?.[0]?.text;

          if (audio) {
            clientWs.send(JSON.stringify({ type: 'audio', audio }));
          }
          if (text) {
            clientWs.send(JSON.stringify({ type: 'text', text }));
          }
          if (message.serverContent?.interrupted) {
            clientWs.send(JSON.stringify({ type: 'interrupted' }));
          }
          if (message.serverContent?.turnComplete) {
            clientWs.send(JSON.stringify({ type: 'turnComplete' }));
          }
        },
        onclose: () => {
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ type: 'closed' }));
            clientWs.close();
          }
        },
        onerror: (err: any) => {
          console.error('Gemini Live API callback error:', err);
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(
              JSON.stringify({
                type: 'error',
                error: err?.message || 'Live API session encountered an error',
              })
            );
          }
        },
      },
    });

    clientWs.send(JSON.stringify({ type: 'ready', model: 'gemini-3.8-live' }));
  } catch (err: any) {
    console.error('Failed to initialize gemini-3.8-live session:', err);
    clientWs.send(
      JSON.stringify({
        type: 'error',
        error: `Live API connection: ${err.message || 'Falling back to conversational voice chat'}`,
      })
    );
  }

  clientWs.on('message', (raw: any) => {
    if (!session) return;
    try {
      const data = JSON.parse(raw.toString());
      if (data.audio) {
        // Raw 16kHz PCM audio
        session.sendRealtimeInput({
          audio: { data: data.audio, mimeType: 'audio/pcm;rate=16000' },
        });
      } else if (data.text) {
        session.sendClientContent({
          turns: [{ role: 'user', parts: [{ text: data.text }] }],
          turnComplete: true,
        });
      }
    } catch (e) {
      console.error('Error handling WebSocket message from client:', e);
    }
  });

  clientWs.on('close', () => {
    console.log('Client closed Live API WebSocket');
    if (session) {
      try {
        session.close();
      } catch {}
    }
  });
});

// Vite middleware or static serving
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Deep Learning Learning Portal server running at http://localhost:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
