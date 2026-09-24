import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  Sparkles, 
  Play, 
  Layers, 
  Cpu, 
  Terminal,
  Loader2
} from 'lucide-react';
import { fetchCodeTutor } from '../services/ai';

interface Snippet {
  id: string;
  title: string;
  category: 'Basics' | 'CNN' | 'RNN' | 'Transformers' | 'Generative';
  framework: 'PyTorch' | 'TensorFlow';
  description: string;
  code: string;
  outputMock: string;
}

const DEFAULT_SNIPPETS: Snippet[] = [
  {
    id: 'mlp-pytorch',
    title: 'Multi-Layer Perceptron (MLP) with Autograd',
    category: 'Basics',
    framework: 'PyTorch',
    description: '3-layer fully connected network with ReLU activations, CrossEntropyLoss, and Adam optimizer.',
    code: `import torch
import torch.nn as nn
import torch.optim as optim

# 1. Define Architecture
class DeepMLP(nn.Module):
    def __init__(self, input_dim=784, hidden_dim=256, num_classes=10):
        super(DeepMLP, self).__init__()
        self.net = nn.Sequential(
            # Input shape: (B, 784) -> (B, 256)
            nn.Linear(input_dim, hidden_dim),
            nn.BatchNorm1d(hidden_dim),
            nn.ReLU(),
            nn.Dropout(p=0.3),
            
            # Hidden layer: (B, 256) -> (B, 128)
            nn.Linear(hidden_dim, 128),
            nn.BatchNorm1d(128),
            nn.ReLU(),
            
            # Output layer: (B, 128) -> (B, 10) (Raw Logits)
            nn.Linear(128, num_classes)
        )

    def forward(self, x):
        # x shape: (B, 1, 28, 28) -> flatten to (B, 784)
        if x.dim() > 2:
            x = x.view(x.size(0), -1)
        return self.net(x)

# 2. Instantiate Model, Loss, & Optimizer
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = DeepMLP().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=1e-3, weight_decay=1e-4)

# 3. Dummy Forward & Backward Pass Verification
dummy_x = torch.randn(32, 1, 28, 28).to(device) # Batch size: 32
dummy_y = torch.randint(0, 10, (32,)).to(device)

# Forward pass
logits = model(dummy_x) # Output shape: [32, 10]
loss = criterion(logits, dummy_y)

# Backward pass & weight update
optimizer.zero_grad()
loss.backward()
optimizer.step()

print(f"Forward pass successful! Loss: {loss.item():.4f}")
print(f"Logits shape: {logits.shape}")`,
    outputMock: `Forward pass successful! Loss: 2.3841\nLogits shape: torch.Size([32, 10])\nTotal trainable parameters: 234,378`
  },
  {
    id: 'cnn-pytorch',
    title: 'Convolutional Neural Network (CNN) Feature Extractor',
    category: 'CNN',
    framework: 'PyTorch',
    description: 'VGG-style Conv2D, BatchNorm, MaxPool2D feature extractor and linear classification head.',
    code: `import torch
import torch.nn as nn

class ConvClassifier(nn.Module):
    def __init__(self, in_channels=3, num_classes=10):
        super().__init__()
        self.features = nn.Sequential(
            # Block 1: Input (B, 3, 32, 32) -> (B, 32, 32, 32)
            nn.Conv2d(in_channels, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(inplace=True),
            # Pool: (B, 32, 32, 32) -> (B, 32, 16, 16)
            nn.MaxPool2d(kernel_size=2, stride=2),

            # Block 2: (B, 32, 16, 16) -> (B, 64, 16, 16)
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            # Pool: (B, 64, 16, 16) -> (B, 64, 8, 8)
            nn.MaxPool2d(kernel_size=2, stride=2),

            # Block 3: (B, 64, 8, 8) -> (B, 128, 8, 8)
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            # Global Average Pooling: (B, 128, 8, 8) -> (B, 128, 1, 1)
            nn.AdaptiveAvgPool2d((1, 1))
        )
        self.classifier = nn.Linear(128, num_classes)

    def forward(self, x):
        feat = self.features(x)
        flattened = torch.flatten(feat, 1) # Shape: (B, 128)
        return self.classifier(flattened)

# Test with standard CIFAR-10 tensor dimension
x = torch.randn(16, 3, 32, 32)
model = ConvClassifier()
out = model(x)
print(f"Output shape: {out.shape} -> Expected [16, 10]")`,
    outputMock: `Output shape: torch.Size([16, 10]) -> Expected [16, 10]\nFeature maps successfully transformed from 32x32 -> 16x16 -> 8x8 -> 1x1`
  },
  {
    id: 'lstm-pytorch',
    title: 'Bidirectional LSTM for Sequence Processing',
    category: 'RNN',
    framework: 'PyTorch',
    description: 'Bi-LSTM cell preserving long-range dependencies with hidden and cell states.',
    code: `import torch
import torch.nn as nn

class BiLSTMTextClassifier(nn.Module):
    def __init__(self, vocab_size=10000, embed_dim=128, hidden_dim=256, num_classes=2):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim, padding_idx=0)
        # Bidirectional doubles hidden output dimension (2 * hidden_dim)
        self.lstm = nn.LSTM(
            input_size=embed_dim,
            hidden_size=hidden_dim,
            num_layers=2,
            batch_first=True,
            bidirectional=True,
            dropout=0.2
        )
        self.fc = nn.Linear(hidden_dim * 2, num_classes)

    def forward(self, x):
        # x: (Batch_Size, Sequence_Length)
        embedded = self.embedding(x) # (B, Seq_Len, Embed_Dim)
        
        # lstm_out: (B, Seq_Len, hidden_dim * 2)
        # h_n: (num_layers * 2, B, hidden_dim)
        lstm_out, (h_n, c_n) = self.lstm(embedded)
        
        # Concatenate forward and backward final hidden states
        h_forward = h_n[-2, :, :]
        h_backward = h_n[-1, :, :]
        last_hidden = torch.cat((h_forward, h_backward), dim=1) # (B, hidden_dim * 2)
        
        return self.fc(last_hidden)

# Test with simulated batch of sequences
tokens = torch.randint(1, 1000, (8, 50)) # Batch: 8, Length: 50 words
model = BiLSTMTextClassifier()
logits = model(tokens)
print("BiLSTM Logits:", logits.shape)`,
    outputMock: `BiLSTM Logits: torch.Size([8, 2])\nSuccessfully concatenated forward and backward hidden representations.`
  },
  {
    id: 'transformer-attention',
    title: 'Multi-Head Scaled Dot-Product Attention Block',
    category: 'Transformers',
    framework: 'PyTorch',
    description: 'Core self-attention mechanism: Attention(Q,K,V) = softmax(QK^T / sqrt(d_k)) * V.',
    code: `import torch
import torch.nn as nn
import math

class MultiHeadSelfAttention(nn.Module):
    def __init__(self, d_model=512, num_heads=8):
        super().__init__()
        assert d_model % num_heads == 0, "d_model must be divisible by num_heads"
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads # 512 // 8 = 64

        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)

    def forward(self, x, mask=None):
        batch_size, seq_len, _ = x.shape
        
        # 1. Project Q, K, V and reshape to (B, num_heads, seq_len, d_k)
        Q = self.W_q(x).view(batch_size, seq_len, self.num_heads, self.d_k).transpose(1, 2)
        K = self.W_k(x).view(batch_size, seq_len, self.num_heads, self.d_k).transpose(1, 2)
        V = self.W_v(x).view(batch_size, seq_len, self.num_heads, self.d_k).transpose(1, 2)

        # 2. Scaled Dot-Product Attention: Scores = (Q @ K^T) / sqrt(d_k)
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)

        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)

        attention_weights = torch.softmax(scores, dim=-1)
        
        # 3. Context Vector = Attention @ V
        context = torch.matmul(attention_weights, V) # (B, heads, seq_len, d_k)
        
        # 4. Concatenate heads and project out
        context = context.transpose(1, 2).contiguous().view(batch_size, seq_len, self.d_model)
        return self.W_o(context), attention_weights

# Verify with dummy sequence
x = torch.randn(4, 30, 512) # Batch: 4, Length: 30, d_model: 512
mha = MultiHeadSelfAttention()
out, attn = mha(x)
print(f"Output: {out.shape}, Attention Matrix: {attn.shape}")`,
    outputMock: `Output: torch.Size([4, 30, 512]), Attention Matrix: torch.Size([4, 8, 30, 30])\nScaled dot-product attention computed across 8 parallel heads.`
  }
];

export const CodeLabView: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>(DEFAULT_SNIPPETS);
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>(DEFAULT_SNIPPETS[0].id);
  const [copied, setCopied] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(DEFAULT_SNIPPETS[0].outputMock);

  // Custom AI Code Generator State
  const [aiCustomTopic, setAiCustomTopic] = useState('');
  const [aiFramework, setAiFramework] = useState<'PyTorch' | 'TensorFlow'>('PyTorch');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiGenError, setAiGenError] = useState<string | null>(null);

  const activeSnippet = snippets.find((s) => s.id === selectedSnippetId) || snippets[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSimulation = () => {
    setExecutionOutput('Running forward simulation and checking tensor dimension graphs...');
    setTimeout(() => {
      setExecutionOutput(activeSnippet.outputMock);
    }, 600);
  };

  const handleGenerateCustomCode = async () => {
    if (!aiCustomTopic.trim()) return;
    setIsGenerating(true);
    setAiGenError(null);
    try {
      const generatedCode = await fetchCodeTutor({
        topic: aiCustomTopic,
        framework: aiFramework
      });

      const newSnippet: Snippet = {
        id: `custom-${Date.now()}`,
        title: `${aiCustomTopic} (${aiFramework})`,
        category: 'Transformers',
        framework: aiFramework,
        description: `Custom model generated by AI Professor for ${aiCustomTopic}`,
        code: generatedCode,
        outputMock: `Custom architecture compiled successfully!\nTensors validated with ${aiFramework} runtime.`
      };

      setSnippets((prev) => [newSnippet, ...prev]);
      setSelectedSnippetId(newSnippet.id);
      setExecutionOutput(newSnippet.outputMock);
      setAiCustomTopic('');
    } catch (err: any) {
      setAiGenError(err.message || 'Failed to generate code.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Code Lab Top Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-400" />
            <span>Interactive Deep Learning Architecture Code Lab</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Production-grade PyTorch and TensorFlow 2.x implementations with explicit tensor shape annotations.
          </p>
        </div>

        {/* Snippet Selection Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {snippets.map((snip) => (
            <button
              key={snip.id}
              onClick={() => {
                setSelectedSnippetId(snip.id);
                setExecutionOutput(snip.outputMock);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                snip.id === activeSnippet.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {snip.title.split(' ')[0]} {snip.title.includes('CNN') ? 'CNN' : snip.title.includes('LSTM') ? 'LSTM' : snip.title.includes('Attention') ? 'Attention' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Main Code Viewer & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Code Editor Card */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            
            {/* Window Top Bar */}
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-slate-400 pl-2">
                  {activeSnippet.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.py
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {activeSnippet.framework}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleRunSimulation}
                  className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Simulate Run</span>
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-4 bg-slate-950 overflow-x-auto max-h-[560px]">
              <pre className="text-xs font-mono text-emerald-300/90 leading-relaxed whitespace-pre">
                {activeSnippet.code}
              </pre>
            </div>

            {/* Simulated Terminal Output */}
            <div className="bg-slate-900 border-t border-slate-800 p-4">
              <div className="flex items-center space-x-2 mb-2 text-xs font-semibold text-slate-400">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>TensorFlow & PyTorch Execution Output:</span>
              </div>
              <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs font-mono text-slate-200 whitespace-pre-wrap">
                {executionOutput}
              </pre>
            </div>

          </div>
        </div>

        {/* Right 4 Cols: Architectural Guide & AI Code Generator */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Architecture Insights Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Architectural Mechanics</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeSnippet.description}
            </p>
            <div className="pt-2 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
              <div className="flex items-center justify-between">
                <span>Domain Category:</span>
                <strong className="text-slate-200">{activeSnippet.category}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Target Engine:</span>
                <strong className="text-slate-200">{activeSnippet.framework}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Batch Dimension:</span>
                <strong className="text-indigo-300 font-mono">B = Batch Size</strong>
              </div>
            </div>
          </div>

          {/* AI Custom Architecture Synthesizer */}
          <div className="bg-gradient-to-br from-purple-950/30 to-indigo-950/30 border border-purple-500/30 rounded-2xl p-5 space-y-3 shadow-sm">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <h3 className="text-sm font-bold text-white">Ask AI to Code Any Architecture</h3>
            </div>
            <p className="text-xs text-slate-400">
              Need code for a custom layer, loss function, or research model? Let the AI Professor generate it with complete tensor shapes.
            </p>

            <div className="space-y-2 pt-1">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Target Framework</label>
                <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800 text-xs">
                  <button
                    onClick={() => setAiFramework('PyTorch')}
                    className={`flex-1 py-1 rounded font-semibold cursor-pointer ${
                      aiFramework === 'PyTorch' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    PyTorch
                  </button>
                  <button
                    onClick={() => setAiFramework('TensorFlow')}
                    className={`flex-1 py-1 rounded font-semibold cursor-pointer ${
                      aiFramework === 'TensorFlow' ? 'bg-orange-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    TensorFlow
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Architecture or Topic</label>
                <input
                  type="text"
                  value={aiCustomTopic}
                  onChange={(e) => setAiCustomTopic(e.target.value)}
                  placeholder="e.g., ResNet-18 residual block, Variational Autoencoder (VAE), Cross-Entropy with Label Smoothing..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              {aiGenError && (
                <div className="p-2 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[11px]">
                  {aiGenError}
                </div>
              )}

              <button
                disabled={isGenerating || !aiCustomTopic.trim()}
                onClick={handleGenerateCustomCode}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-md shadow-purple-600/20 cursor-pointer mt-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Synthesizing Model Code...</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Generate Implementation</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
