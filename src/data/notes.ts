import { Note } from '../types';

export const initialNotes: Note[] = [
  // UNIT 1: INTRODUCTION TO DEEP LEARNING
  {
    id: 'note-u1-dl',
    unitId: 'unit-1',
    unitNumber: 1,
    topicId: 'u1-t3',
    topicTitle: 'Deep Learning',
    title: 'Fundamentals of Deep Learning',
    definition: 'Deep Learning is a subset of Machine Learning based on Artificial Neural Networks with multiple hierarchical layers that learn representations of data with multiple levels of abstraction directly from raw inputs.',
    introduction: 'In traditional machine learning, human domain experts had to hand-craft features (such as edge detectors or frequency transforms) before feeding them into a classifier. Deep Learning revolutionizes this paradigm by automatically extracting low-level, mid-level, and high-level abstract features through successive interconnected non-linear processing layers.',
    content: `### 1. Hierarchical Feature Learning
Deep learning models decompose complex patterns into simpler representations:
- **Layer 1 (Low-Level):** Detects basic edges, lines, and color gradients.
- **Layer 2 (Mid-Level):** Combines edges to identify textures, corners, and contours.
- **Layer 3 (High-Level):** Assembles contours into semantic motifs (eyes, wheels, syllables).
- **Output Layer:** Integrates high-level motifs into object classes (e.g., "Automobile", "Human Face").

### 2. The Three Driving Forces of the Deep Learning Revolution
1. **Massive Datasets (Big Data):** Millions of labeled training instances (ImageNet, Common Crawl) enabling deep architectures with millions of parameters without immediately overfitting.
2. **High-Performance Compute (GPUs & TPUs):** Massively parallel matrix multiplication engines transforming training times from months to hours.
3. **Algorithmic Advances:** Innovations including Rectified Linear Units (ReLU), Dropout, Batch Normalization, and Adam optimizer overcoming the vanishing gradient barrier.`,
    working: `1. Input data (pixels, sound waves, word embeddings) is fed into the input layer tensor X.
2. Each hidden layer performs an affine linear transformation (Z = W * X + b) followed by a non-linear activation function a = sigma(Z).
3. The forward pass propagates signals layer-by-layer until reaching the final output layer, yielding prediction y_hat.
4. An objective loss function L(y, y_hat) computes the scalar penalty between prediction and ground truth.
5. Backpropagation computes the partial derivatives dL/dW and dL/db using the differential chain rule.
6. An optimization algorithm (e.g., SGD, Adam) iteratively updates the network parameters in the opposite direction of the gradient.`,
    formula: `Forward Pass Linear Combination:
Z^[l] = W^[l] · A^[l-1] + b^[l]

Activation Step:
A^[l] = g^[l](Z^[l])

Parameter Update Rule (Gradient Descent):
W^[l] := W^[l] - α · (∂L / ∂W^[l])
b^[l] := b^[l] - α · (∂L / ∂b^[l])`,
    example: 'In autonomous driving vision, raw 1920x1080 camera pixels enter a deep network. The first layers detect lane markings and asphalt contrast, intermediate layers outline vehicles and pedestrian silhouettes, and deeper layers forecast collision trajectories in 3D bounding boxes.',
    comparisonTable: {
      headers: ['Dimension', 'Traditional Machine Learning', 'Deep Learning'],
      rows: [
        ['Feature Extraction', 'Handcrafted by human domain experts', 'Learned automatically from raw data'],
        ['Dataset Scale', 'Performs well on small/moderate datasets', 'Requires large datasets to avoid overfitting'],
        ['Hardware Dependency', 'Standard multi-core CPUs suffice', 'Specialized parallel hardware (GPUs/TPUs) required'],
        ['Training Time', 'Minutes to hours', 'Hours to days or weeks'],
        ['Interpretability', 'Relatively transparent (Decision trees, Linear models)', 'Often treated as a "black box" computational graph']
      ]
    },
    advantages: [
      'Eliminates the tedious and error-prone process of manual feature engineering.',
      'Achieves superhuman accuracy on computer vision, speech recognition, and natural language tasks.',
      'Scales gracefully with massive increases in data volume and compute capacity.',
      'Enables end-to-end learning where all layers optimize jointly for the final objective.'
    ],
    limitations: [
      'Requires vast quantities of high-quality labeled training data.',
      'Computationally expensive and energy-intensive during training.',
      'Lack of theoretical interpretability and mathematical explainability (black-box problem).',
      'Susceptible to adversarial attacks and out-of-distribution hallucinations.'
    ],
    applications: [
      'Computer Vision: Object detection, semantic segmentation, medical imaging diagnosis.',
      'Natural Language Processing: Large Language Models, machine translation, sentiment analysis.',
      'Autonomous Systems: Self-driving vehicles, drone navigation, robotic manipulation.',
      'Speech & Audio: Voice assistants, real-time transcription, speech synthesis.'
    ],
    examPoints: [
      'Define Deep Learning as hierarchical feature representation learning via multi-layered ANNs.',
      'Highlight the key differentiator between ML and DL: Automated feature extraction vs manual feature engineering.',
      'Remember the 3 pillars: Big Data, Parallel GPU Compute, and Algorithmic Innovations (ReLU, Dropout, Adam).',
      'Be prepared to sketch the hierarchical representation diagram (Edges -> Textures -> Parts -> Objects).'
    ],
    summary: 'Deep Learning overcomes the scalability bottleneck of classical machine learning by learning layered representations directly from raw inputs. Supported by massive data and GPUs, it powers modern breakthroughs across vision, speech, and language.',
    relatedTopicIds: ['u1-t1', 'u1-t2', 'u1-t4', 'u1-t5', 'u1-t8'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'note-u1-perceptron',
    unitId: 'unit-1',
    unitNumber: 1,
    topicId: 'u1-t8',
    topicTitle: 'Perceptron',
    title: 'The Perceptron & Linear Classification',
    definition: 'A Perceptron is the simplest form of a supervised feedforward artificial neural network, invented by Frank Rosenblatt in 1958, consisting of a single neuron that classifies linearly separable binary patterns.',
    introduction: 'Inspired by the biological neuron, the Perceptron computes a linear combination of its real-valued inputs and applies a threshold activation function to output a binary decision (+1 or -1). While historic, its inability to solve non-linear problems like XOR triggered the first AI winter until multi-layer networks emerged.',
    content: `### 1. Mathematical Formulation
A Perceptron takes an input vector x = [x1, x2, ..., xn]^T, multiplies each feature by an adjustable weight w = [w1, w2, ..., wn]^T, adds a scalar bias b, and passes the sum through a hard-limit step function:
- Net input: z = ∑(w_i * x_i) + b = w^T * x + b
- Output: y = +1 if z >= 0, else -1 (or 0)

### 2. Geometric Interpretation: Linear Decision Boundary
The equation w^T * x + b = 0 defines an (n-1) dimensional hyperplane that bisects the input space into two half-spaces:
- Positive Class: w^T * x + b > 0
- Negative Class: w^T * x + b < 0

### 3. The Perceptron Learning Rule
The weights are updated whenever an error occurs:
- If prediction matches label: No update.
- If y_true = +1 and y_pred = -1: w := w + η * x, b := b + η
- If y_true = -1 and y_pred = +1: w := w - η * x, b := b - η
Where η is the learning rate (0 < η <= 1).

### 4. Perceptron Convergence Theorem & XOR Limitation
- **Convergence Theorem (Novikoff, 1962):** If the training dataset is linearly separable, the Perceptron learning algorithm is guaranteed to converge to a separating hyperplane in a finite number of steps.
- **Minsky & Papert (1969):** Proved that a single-layer perceptron cannot compute the XOR (exclusive OR) boolean function because XOR is non-linearly separable. Solving XOR requires at least one hidden layer.`,
    working: `1. Initialize weight vector w and bias b to zeros or small random numbers.
2. For each training sample (x_i, y_i):
   a. Compute linear sum z = w · x_i + b
   b. Calculate step output y_hat = Step(z)
   c. Calculate error e = y_i - y_hat
   d. Update weights: w := w + η · (y_i - y_hat) · x_i
   e. Update bias: b := b + η · (y_i - y_hat)
3. Repeat over all samples until no classification errors remain or max epochs are reached.`,
    formula: `Net Input:
z = \\sum_{i=1}^{n} w_i x_i + b = \\mathbf{w}^T \\mathbf{x} + b

Heaviside Step Function:
f(z) = \\begin{cases} 1 & \\text{if } z \\ge 0 \\\\ 0 & \\text{if } z < 0 \\end{cases}

Weight Update Equation:
w_j^{(t+1)} = w_j^{(t)} + \\eta (y - \\hat{y}) x_j`,
    example: 'Implementing an AND gate: Inputs (0,0)->0, (0,1)->0, (1,0)->0, (1,1)->1. Choosing weights w1=1, w2=1, bias b=-1.5 produces: (0,0)=> -1.5 (0); (0,1)=> -0.5 (0); (1,0)=> -0.5 (0); (1,1)=> +0.5 (1). The decision boundary perfectly separates the classes.',
    advantages: [
      'Simple mathematical formulation with very low computational overhead.',
      'Guaranteed to converge in finite steps if data is linearly separable.',
      'Lays the conceptual foundation for all modern multi-layer neural networks.'
    ],
    limitations: [
      'Strictly restricted to linearly separable problems; fails on XOR and parity tasks.',
      'Uses non-differentiable step activation function, preventing gradient-based backpropagation.',
      'Sensitive to learning rate and does not find the maximum-margin boundary (unlike SVM).'
    ],
    applications: [
      'Basic binary classification problems (e.g. spam detection on linearly separable bag-of-words).',
      'Logic gate simulation (AND, OR, NOT, NAND, NOR).',
      'Fundamental pedagogical building block in machine learning curricula.'
    ],
    examPoints: [
      'State Rosenblatt’s Perceptron learning rule equation clearly.',
      'Explain the Perceptron Convergence Theorem and its prerequisite: linear separability.',
      'Explain why a single Perceptron cannot solve XOR with geometric sketch and truth table.',
      'Write the difference between biological neuron and artificial perceptron components.'
    ],
    summary: 'The Perceptron is the pioneering single-neuron binary linear classifier. Although constrained by linear separability and the XOR barrier, it established the framework for modern deep architectures.',
    relatedTopicIds: ['u1-t5', 'u1-t6', 'u1-t7', 'u1-t9', 'u2-t2'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'note-u1-activations',
    unitId: 'unit-1',
    unitNumber: 1,
    topicId: 'u1-t9',
    topicTitle: 'Activation Functions',
    title: 'Activation Functions in Neural Networks',
    definition: 'An activation function is a mathematical non-linear function applied to a neuron’s linear net input (w^T*x + b) to determine its output signal, enabling neural networks to learn non-linear patterns and universal function approximations.',
    introduction: 'Without non-linear activation functions, stacking dozens of neural network layers is mathematically equivalent to a single linear regression model (since a linear combination of linear combinations remains linear). Non-linearities grant neural networks their expressive power.',
    content: `### 1. Key Activation Functions
#### A. Sigmoid (Logistic Function)
- Formula: σ(z) = 1 / (1 + e^(-z))
- Range: (0, 1)
- Pros: Smooth gradient, clear probabilistic interpretation for binary classification output layers.
- Cons: Saturates at tails causing the **Vanishing Gradient Problem** (derivative max is 0.25); outputs are not zero-centered.

#### B. Hyperbolic Tangent (Tanh)
- Formula: tanh(z) = (e^z - e^(-z)) / (e^z + e^(-z))
- Range: (-1, 1)
- Pros: Zero-centered activations, leading to faster gradient descent convergence than sigmoid.
- Cons: Still suffers from vanishing gradients when |z| is large.

#### C. Rectified Linear Unit (ReLU)
- Formula: f(z) = max(0, z)
- Range: [0, ∞)
- Pros: Computationally trivial (no exponentials); derivative is constant 1 for z > 0, completely avoiding vanishing gradients; induces sparse representations.
- Cons: **Dying ReLU problem** (neurons with z < 0 permanently output 0 with zero gradient, becoming inactive).

#### D. Leaky ReLU & Parametric ReLU (PReLU)
- Formula: f(z) = max(α*z, z), where typically α = 0.01
- Pros: Fixes the dying ReLU problem by maintaining a small positive slope for negative inputs.

#### E. Softmax
- Formula: Softmax(z_i) = e^(z_i) / ∑(e^(z_j))
- Range: (0, 1) such that ∑ Softmax(z_i) = 1
- Use: Final layer of multi-class classification networks to output calibrated class probabilities.`,
    working: `1. Input vectors are linearly multiplied by weights and added to bias: z = W*x + b.
2. The activation function g(z) is applied element-wise across all neurons in the layer.
3. During backpropagation, the local derivative g'(z) multiplies the upstream gradient via the chain rule to backpropagate error signals.`,
    formula: `Sigmoid: \\sigma(z) = \\frac{1}{1 + e^{-z}}, \\quad \\sigma'(z) = \\sigma(z)(1 - \\sigma(z))

Tanh: \\tanh(z) = \\frac{e^z - e^{-z}}{e^z + e^{-z}}, \\quad \\tanh'(z) = 1 - \\tanh^2(z)

ReLU: f(z) = \\max(0, z), \\quad f'(z) = \\begin{cases} 1 & z > 0 \\\\ 0 & z < 0 \\end{cases}

Softmax: P(y = i \\mid \\mathbf{z}) = \\frac{e^{z_i}}{\\sum_{j=1}^K e^{z_j}}`,
    example: 'In a 10-class handwritten digit classifier (MNIST), all hidden layers employ ReLU for rapid training, while the 10-unit output layer employs Softmax to convert raw logits [2.1, -1.0, 5.4, ...] into probabilities summing to 1.0.',
    comparisonTable: {
      headers: ['Function', 'Formula', 'Output Range', 'Zero Centered?', 'Vanishing Gradient?'],
      rows: [
        ['Sigmoid', '1 / (1 + e^-z)', '(0, 1)', 'No', 'Severe (max deriv = 0.25)'],
        ['Tanh', '(e^z - e^-z)/(e^z + e^-z)', '(-1, 1)', 'Yes', 'Moderate (max deriv = 1.0)'],
        ['ReLU', 'max(0, z)', '[0, ∞)', 'No', 'None for z > 0 (Dying ReLU risk)'],
        ['Leaky ReLU', 'max(0.01z, z)', '(-∞, ∞)', 'Nearly', 'None'],
        ['Softmax', 'e^z_i / ∑ e^z_j', '(0, 1)', 'No', 'Used only at output']
      ]
    },
    advantages: [
      'Enables neural networks to model non-linear boundaries and high-dimensional functions.',
      'Differentiable functions facilitate gradient-based optimization via backpropagation.',
      'ReLU significantly speeds up convergence compared to Sigmoid and Tanh.'
    ],
    limitations: [
      'Sigmoid and Tanh cause gradient saturation for deep architectures.',
      'Standard ReLU can cause dead neurons when inputs are predominantly negative.',
      'Improper activation choice can lead to exploding or vanishing activations.'
    ],
    applications: [
      'Hidden layers in Feedforward networks, CNNs, and Transformers (ReLU, GELU, Swish).',
      'Binary output units (Sigmoid).',
      'Multi-class classification heads (Softmax).',
      'Gating mechanisms in LSTMs and GRUs (Sigmoid and Tanh).'
    ],
    examPoints: [
      'Why is non-linearity mandatory in neural networks? (To prevent deep networks collapsing into a single linear model).',
      'Calculate derivative of Sigmoid: σ\'(z) = σ(z)(1 - σ(z)). Max value is 0.25 at z = 0.',
      'Explain the "Dying ReLU" phenomenon and how Leaky ReLU resolves it.',
      'Compare Sigmoid vs Tanh vs ReLU on range, vanishing gradient, and zero-centering.'
    ],
    summary: 'Activation functions introduce vital non-linearity into neural networks. While Sigmoid and Tanh paved the way, ReLU and its variants dominate modern hidden layers due to their resistance to vanishing gradients.',
    relatedTopicIds: ['u1-t8', 'u1-t10', 'u1-t11', 'u1-t12', 'u2-t2'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },

  // UNIT 2: DEEP NEURAL NETWORKS
  {
    id: 'note-u2-bp',
    unitId: 'unit-2',
    unitNumber: 2,
    topicId: 'u2-t4',
    topicTitle: 'Backpropagation in DNN',
    title: 'Backpropagation Algorithm & Gradient Flow',
    definition: 'Backpropagation (backward propagation of errors) is a supervised learning algorithm that efficiently computes the gradient of the loss function with respect to every weight and bias in an artificial neural network using the mathematical chain rule of calculus.',
    introduction: 'Popularized by Rumelhart, Hinton, and Williams in 1986, backpropagation made deep multi-layer neural network training computationally feasible. It runs in two distinct phases: forward propagation to compute predictions and loss, and backward propagation to propagate error gradients from output back to input.',
    content: `### 1. The Two-Phase Execution Cycle
1. **Forward Propagation Phase:**
   - Layer inputs are linearly combined: Z^[l] = W^[l] * A^[l-1] + b^[l]
   - Activation function applied: A^[l] = g^[l](Z^[l])
   - Continues until final output A^[L] is generated and loss L(y, A^[L]) is calculated.
   - All intermediate activations (Z^[l], A^[l]) are cached in memory for the backward pass.

2. **Backward Propagation Phase:**
   - Compute error delta at output layer: δ^[L] = ∂L/∂A^[L] ⊙ g'^[L](Z^[L])
   - Propagate delta backward through layer l: δ^[l] = ((W^[l+1])^T * δ^[l+1]) ⊙ g'^[l](Z^[l])
   - Compute weight gradients: ∂L/∂W^[l] = δ^[l] * (A^[l-1])^T
   - Compute bias gradients: ∂L/∂b^[l] = δ^[l]

### 2. The Chain Rule Principle
For a composite function f(g(x)), the derivative with respect to x is:
df/dx = (df/dg) * (dg/dx)
In a deep network with L layers, calculating the influence of a weight in layer 1 on the final loss is computed by multiplying local Jacobians backward:
∂L/∂W^[1] = (∂L/∂A^[L]) * (∂A^[L]/∂Z^[L]) * (∂Z^[L]/∂A^[L-1]) * ... * (∂Z^[1]/∂W^[1])`,
    working: `1. Input mini-batch X flows forward to calculate predictions Y_hat.
2. Scalar loss L is evaluated (e.g. Cross-Entropy Loss).
3. Compute the error sensitivity vector for the output layer.
4. Loop backwards from layer L down to layer 1:
   - Calculate parameter gradients for current layer weights and biases.
   - Propagate gradient to preceding layer using transposed weight matrix.
5. Optimizer adjusts all weights: W := W - α * (∂L/∂W).
6. Repeat for all training epochs until convergence.`,
    formula: `Output Layer Error Delta:
\\delta^{[L]} = \\nabla_{A^{[L]}} L \\odot {g^{[L]}}'(Z^{[L]})

General Hidden Layer Error Delta:
\\delta^{[l]} = \\left( (W^{[l+1]})^T \\delta^{[l+1]} \\right) \\odot {g^{[l]}}'(Z^{[l]})

Gradient with respect to Weights:
\\frac{\\partial L}{\\partial W^{[l]}} = \\delta^{[l]} (A^{[l-1]})^T

Gradient with respect to Biases:
\\frac{\\partial L}{\\partial b^{[l]}} = \\sum_{\\text{batch}} \\delta^{[l]}`,
    example: 'In a 3-layer network classifying dog vs cat images: the output error might be +0.4 (predicted 0.6 for cat, true label 1.0). Backprop calculates how adjusting each of the 50,000 weights in layers 3, 2, and 1 will decrease that 0.4 error.',
    advantages: [
      'Computationally optimal: time complexity scales linearly O(W) with the number of network weights.',
      'Generalizes to any network architecture (MLPs, CNNs, RNNs, Transformers).',
      'Enables end-to-end joint optimization of millions to billions of parameters simultaneously.'
    ],
    limitations: [
      'Requires substantial memory to cache activations Z^[l] and A^[l] during forward pass.',
      'Vulnerable to vanishing gradients in very deep networks using saturating activations.',
      'Susceptible to getting trapped in poor local minima or saddle point plateaus.'
    ],
    applications: [
      'Universal training engine for Multilayer Perceptrons, Convolutional Networks, and LSTMs.',
      'Gradient-based adversarial robustness attacks (e.g., FGSM).',
      'Neural style transfer and feature visualization.'
    ],
    examPoints: [
      'Derive the four fundamental equations of backpropagation using the calculus chain rule.',
      'Explain the role of caching activations during forward propagation for use in backprop.',
      'Explain the relationship between backpropagation and automatic reverse-mode differentiation.',
      'Identify causes of vanishing and exploding gradients during backward matrix multiplications.'
    ],
    summary: 'Backpropagation uses the calculus chain rule to compute exact parameter gradients efficiently across all network layers in reverse order, forming the mathematical backbone of modern deep learning training.',
    relatedTopicIds: ['u1-t11', 'u1-t12', 'u2-t2', 'u2-t3', 'u2-t10'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'note-u2-adam',
    unitId: 'unit-2',
    unitNumber: 2,
    topicId: 'u2-t10',
    topicTitle: 'Adam Optimizer',
    title: 'Adaptive Moment Estimation (Adam Optimizer)',
    definition: 'Adam (Adaptive Moment Estimation) is an advanced first-order optimization algorithm for gradient descent that computes individual adaptive learning rates for different parameters from estimates of both the first moment (mean) and second raw moment (uncentered variance) of the gradients.',
    introduction: 'Introduced by Diederik Kingma and Jimmy Ba in 2014, Adam combines the key advantages of two preceding optimization algorithms: AdaGrad (which works well with sparse gradients) and RMSprop (which handles non-stationary objectives well). It is the default optimizer for most deep learning applications.',
    content: `### 1. Mathematical Mechanics
Adam maintains moving exponential averages of past gradients (m_t) and past squared gradients (v_t):
1. **First Moment Vector (Moving Average of Gradients):**
   m_t = β1 * m_(t-1) + (1 - β1) * g_t
   (Captures directional momentum, standard default β1 = 0.9)

2. **Second Moment Vector (Moving Average of Squared Gradients):**
   v_t = β2 * v_(t-1) + (1 - β2) * (g_t)^2
   (Captures gradient scale/energy, standard default β2 = 0.999)

3. **Bias Correction:**
   Because m_0 and v_0 are initialized to zero vectors, they are biased toward zero, especially during early training steps. Adam corrects for this initialization bias:
   m_hat_t = m_t / (1 - (β1)^t)
   v_hat_t = v_t / (1 - (β2)^t)

4. **Parameter Update:**
   θ_t = θ_(t-1) - (α / (sqrt(v_hat_t) + ε)) * m_hat_t
   Where α is the learning rate (typically 0.001) and ε is a small constant (1e-8) preventing division by zero.`,
    working: `1. Gradient g_t is calculated at time step t.
2. First moment estimate m_t is updated with decay parameter β1.
3. Second moment estimate v_t is updated with decay parameter β2.
4. Analytical bias corrections are computed for both moments.
5. Parameters are adjusted: frequent/large gradients receive smaller effective steps, while infrequent/small gradients receive larger effective steps.`,
    formula: `First Moment:
m_t = \\beta_1 m_{t-1} + (1 - \\beta_1) g_t

Second Moment:
v_t = \\beta_2 v_{t-1} + (1 - \\beta_2) g_t^2

Bias-Corrected Estimates:
\\hat{m}_t = \\frac{m_t}{1 - \\beta_1^t}, \\quad \\hat{v}_t = \\frac{v_t}{1 - \\beta_2^t}

Weight Update:
\\theta_{t+1} = \\theta_t - \\frac{\\alpha}{\\sqrt{\\hat{v}_t} + \\epsilon} \\hat{m}_t`,
    example: 'In training a Transformer model, parameters in early embedding layers receive infrequent updates, while weights in later attention heads receive dense, turbulent gradients. Adam automatically boosts the step size for sparse parameters and dampens updates for noisy parameters.',
    advantages: [
      'Straightforward implementation with minimal memory overhead (stores two auxiliary vectors per parameter).',
      'Invariant to diagonal rescaling of gradients.',
      'Well-suited for problems with large datasets, noisy gradients, or high-dimensional parameter spaces.',
      'Hyperparameters require little tuning; default settings (α=0.001, β1=0.9, β2=0.999, ε=1e-8) work across diverse domains.'
    ],
    limitations: [
      'Requires twice as much optimizer state memory as vanilla SGD (storing m and v tensors).',
      'In certain computer vision benchmarks, properly tuned SGD with Momentum can achieve slightly superior generalization.',
      'Risk of non-convergence under specific pathological conditions (addressed by AdamW and AMSGrad).'
    ],
    applications: [
      'Standard training optimizer for Transformers (BERT, GPT, LLaMA).',
      'Generative models (GANs, Diffusion models, Variational Autoencoders).',
      'Reinforcement learning policy optimization and actor-critic networks.'
    ],
    examPoints: [
      'State the two algorithms synthesized by Adam (Momentum + RMSprop).',
      'Write out the exact bias correction equations for m_hat and v_hat, explaining why they are needed (initialization at 0).',
      'Explain the purpose of the epsilon parameter (prevents zero-division numerical instability).',
      'Compare Adam with Stochastic Gradient Descent (SGD) in terms of memory requirements and convergence speed.'
    ],
    summary: 'Adam computes individual adaptive learning rates using first and second gradient moments with bias correction, providing robust, rapid convergence with minimal hyperparameter tuning.',
    relatedTopicIds: ['u1-t11', 'u2-t7', 'u2-t8', 'u2-t9', 'u2-t11'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'note-u2-regularization',
    unitId: 'unit-2',
    unitNumber: 2,
    topicId: 'u2-t13',
    topicTitle: 'Dropout & Regularization',
    title: 'Dropout, Batch Normalization & Overfitting Control',
    definition: 'Regularization techniques are mathematical and structural modifications applied to machine learning algorithms intended to reduce generalization error (test error) without increasing training error.',
    introduction: 'Deep neural networks possess massive parameter capacity, making them prone to overfitting—memorizing idiosyncratic noise in the training set rather than discovering generalizable patterns. Modern deep learning relies heavily on Dropout and Batch Normalization to ensure robust generalization.',
    content: `### 1. Dropout (Srivastava et al., 2014)
- **Concept:** During each training iteration, individual hidden neurons are randomly deactivated ("dropped") with probability p (e.g. p = 0.5), along with all their incoming and outgoing connections.
- **Why it works:** Prevents neurons from co-adapting (relying on other specific neurons to fix their errors). Forces each neuron to learn features that are independently robust in diverse random contexts.
- **Ensemble Interpretation:** Dropping units trains an implicit ensemble of 2^N thinned sub-networks that share weights; at test time, all neurons are enabled and scaled by (1-p) or inverted dropout is used during training:
  y = (x * mask) / (1 - p) during training.

### 2. Batch Normalization (Ioffe & Szegedy, 2015)
- **Concept:** Normalizes the activations of each mini-batch to have zero mean and unit variance, followed by a learned affine transformation (scale γ and shift β).
- **Benefits:**
  - Reduces **Internal Covariate Shift** (the continuous drift in the distribution of layer inputs as preceding layers update).
  - Allows significantly higher learning rates without divergence.
  - Acts as a mild regularizer, frequently reducing the need for heavy dropout.

### 3. L1 and L2 Weight Regularization
- **L2 Regularization (Weight Decay):** Adds penalty term (λ/2) * ||W||_2^2 to the loss, penalizing extreme weight magnitudes and encouraging distributed representations.
- **L1 Regularization (Lasso):** Adds penalty λ * ||W||_1, driving non-essential weights to exact zero and inducing parameter sparsity.`,
    working: `1. Inverted Dropout: During forward pass in training, generate binary Bernoulli mask with keep probability (1-p). Multiply activations by mask and divide by (1-p). During inference, pass activations unchanged.
2. Batch Norm: Calculate mini-batch mean μ_B and variance σ_B^2. Normalize input x_hat = (x - μ_B) / sqrt(σ_B^2 + ε). Scale and shift y = γ * x_hat + β. Maintain running exponential averages for inference.`,
    formula: `Inverted Dropout Forward Pass:
r^{[l]} \\sim \\text{Bernoulli}(1 - p)
\\tilde{A}^{[l]} = \\frac{A^{[l]} \\odot r^{[l]}}{1 - p}

Batch Normalization Equations:
\\mu_B = \\frac{1}{m} \\sum_{i=1}^m x_i, \\quad \\sigma_B^2 = \\frac{1}{m} \\sum_{i=1}^m (x_i - \\mu_B)^2
\\hat{x}_i = \\frac{x_i - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}, \\quad y_i = \\gamma \\hat{x}_i + \\beta`,
    example: 'In training ResNet-50 on ImageNet, without Batch Normalization and Weight Decay, the model quickly overfits with 99% train accuracy and only 65% test accuracy. Applying Batch Norm and weight decay brings test accuracy to over 78%.',
    advantages: [
      'Substantially closes the gap between training and validation accuracy (mitigates overfitting).',
      'Batch Normalization smooths the loss landscape, allowing 10x faster convergence.',
      'Dropout breaks complex co-adaptations between neurons, leading to redundant, robust representations.'
    ],
    limitations: [
      'Dropout increases the number of training epochs required for convergence.',
      'Batch Normalization performance degrades with very small mini-batch sizes (e.g., batch size < 4).',
      'Requires separate behavior branches for training mode vs evaluation (eval) mode.'
    ],
    applications: [
      'Fully connected layers in vision classifiers and NLP classification heads (Dropout).',
      'Convolutional neural networks (Batch Normalization following Conv layers).',
      'High-capacity deep architectures prone to variance errors.'
    ],
    examPoints: [
      'Distinguish between Overfitting (High Variance) and Underfitting (High Bias).',
      'Explain Inverted Dropout and why test-time scaling is eliminated.',
      'Write the four mathematical steps of Batch Normalization including γ and β learnable parameters.',
      'Explain the difference between L1 (sparsity) and L2 (weight decay) regularization penalties.'
    ],
    summary: 'Dropout and Batch Normalization are foundational regularization tools in deep learning. Dropout prevents feature co-adaptation via stochastic pruning, while Batch Normalization stabilizes layer input distributions and accelerates convergence.',
    relatedTopicIds: ['u2-t5', 'u2-t12', 'u2-t14', 'u2-t15'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },

  // UNIT 3: CONVOLUTIONAL NEURAL NETWORKS
  {
    id: 'note-u3-cnn-arch',
    unitId: 'unit-3',
    unitNumber: 3,
    topicId: 'u3-t2',
    topicTitle: 'CNN Architecture',
    title: 'Architecture & Mechanics of Convolutional Neural Networks',
    definition: 'A Convolutional Neural Network (CNN) is a specialized class of deep feedforward artificial neural networks designed for processing grid-structured data (such as 2D images) by exploiting spatial locality, parameter sharing, and translation equivariance.',
    introduction: 'Standard fully connected networks fail on image inputs: a 1000x1000 RGB image fed into a 1000-neuron hidden layer requires 3 billion weight parameters, leading to immediate memory exhaustion and severe overfitting. CNNs solve this by using localized convolutional filters that share weights across the entire visual field.',
    content: `### 1. Fundamental Building Blocks of a CNN
A standard CNN architecture alternates between feature extraction stages and classification stages:
1. **Convolutional Layer (CONV):**
   - Applies sliding learnable filters over the input tensor.
   - Extracts localized feature maps (edges, textures, shapes).
   - Core concepts: **Filter size (f x f)**, **Stride (s)**, and **Padding (p)**.

2. **Non-Linear Activation Layer (ReLU):**
   - Applies element-wise activation max(0, x) to introduce non-linearity while preserving dimensional shape.

3. **Pooling Layer (POOL):**
   - Progressively reduces spatial dimensions (height & width) to decrease parameters and computation while achieving translation invariance.
   - Common types: **Max Pooling (2x2 with stride 2)** and **Average Pooling**.

4. **Flatten Layer:**
   - Reshapes the 3D feature tensor (H x W x C) into a 1D continuous feature vector.

5. **Fully Connected Layer (FC / Dense):**
   - Computes class logits and applies Softmax for final probabilistic classification.

### 2. Output Dimension Formula
Given input dimensions (W_in x H_in), filter size f, padding p, and stride s:
W_out = ⌊ (W_in - f + 2p) / s ⌋ + 1
H_out = ⌊ (H_in - f + 2p) / s ⌋ + 1`,
    working: `1. Input image (e.g. 224x224x3) enters the initial CONV layer.
2. Multiple filters (e.g. 64 filters of 3x3x3) slide across the image, computing dot products to produce 64 feature maps.
3. ReLU activates non-zero feature signals.
4. Max pooling downsamples spatial dimensions (e.g. from 224x224 to 112x112).
5. The CONV-ReLU-POOL pattern repeats with increasing filter depth (128, 256, 512) and shrinking spatial size.
6. The final feature tensor is flattened and passed through Dense layers to produce class predictions via Softmax.`,
    formula: `Spatial Output Dimension Formula:
O = \\left\\lfloor \\frac{I - K + 2P}{S} \\right\\rfloor + 1

Parameter Count in a Conv Layer:
\\text{Parameters} = (K_w \\times K_h \\times C_{\\text{in}} + 1) \\times C_{\\text{out}}

2D Discrete Convolution Operation:
S(i, j) = (I * K)(i, j) = \\sum_m \\sum_n I(i - m, j - n) K(m, n)`,
    example: 'Input: 32x32x3 image. Conv layer with 16 filters of size 5x5, stride 1, padding 0. Output size: ((32 - 5 + 0)/1) + 1 = 28x28x16. Max pooling 2x2 with stride 2 reduces this to 14x14x16.',
    comparisonTable: {
      headers: ['Feature', 'Fully Connected Network (MLP)', 'Convolutional Neural Network (CNN)'],
      rows: [
        ['Connectivity', 'Dense: Every input connects to every neuron', 'Sparse: Local receptive fields only'],
        ['Parameter Sharing', 'None: Every connection has a unique weight', 'Yes: Same filter weights slide across entire image'],
        ['Spatial Geometry', 'Destroys 2D grid structure via flattening', 'Preserves spatial relationships and 2D topology'],
        ['Input Scale Handling', 'Scales poorly to high-res images (O(N*M))', 'Scales efficiently with bounded kernel sizes'],
        ['Translation Invariance', 'Low: Pattern shifted in image requires retraining', 'High: Convolution + pooling detects patterns anywhere']
      ]
    },
    advantages: [
      'Massive parameter reduction via weight sharing and sparse connectivity.',
      'Built-in translation equivariance: detects features irrespective of their spatial location.',
      'Hierarchical feature extraction matches natural visual perception systems.',
      'State-of-the-art accuracy across visual processing benchmarks.'
    ],
    limitations: [
      'High GPU memory consumption during training for large batch sizes and feature maps.',
      'Poor performance on non-grid, graph-structured, or unordered permutation data.',
      'Loss of fine spatial coordinates due to aggressive pooling operations (addressed by U-Nets and FCNs).'
    ],
    applications: [
      'Image classification (ResNet, EfficientNet, VGG).',
      'Object detection and localization (YOLO, Faster R-CNN, SSD).',
      'Semantic image segmentation (U-Net, DeepLab).',
      'Medical diagnostic imaging (MRI, CT, X-ray lesion detection).'
    ],
    examPoints: [
      'Memorize and apply the output dimension formula: O = ⌊(I - f + 2p)/s⌋ + 1.',
      'Calculate exact parameter counts for a given Conv layer (include the +1 bias term per filter).',
      'Explain the two foundational principles of CNNs: Sparse Connectivity and Parameter Sharing.',
      'Sketch the classic CNN pipeline: Input -> [Conv -> ReLU -> Pool] x N -> Flatten -> Dense -> Softmax.'
    ],
    summary: 'CNNs process visual data by leveraging local receptive fields, shared weights, and pooling. This architecture dramatically cuts parameter counts while maintaining spatial relationships, dominating modern computer vision.',
    relatedTopicIds: ['u3-t1', 'u3-t3', 'u3-t6', 'u3-t7', 'u3-t11', 'u3-t14'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'note-u3-conv-ops',
    unitId: 'unit-3',
    unitNumber: 3,
    topicId: 'u3-t3',
    topicTitle: 'Convolution Operation',
    title: 'Convolution, Stride, Padding & Pooling Operations',
    definition: 'The convolution operation in deep learning is a mathematical linear operation that computes the sum of element-wise products between a learnable kernel matrix and overlapping local receptive windows across an input tensor.',
    introduction: 'Technically implemented as cross-correlation in deep learning frameworks (without spatial kernel flipping), convolution slides a filter across width and height dimensions. Stride controls sliding step size, padding handles border pixels, and pooling extracts dominant statistics.',
    content: `### 1. Convolution Mechanics
A filter of size (K_h x K_w x C_in) computes an inner product with a corresponding patch of the input tensor, adds a scalar bias, and assigns the result to a single cell in the output feature map.

### 2. Padding Types
- **Valid Padding (p = 0):** No border zero-padding. Output shrinks at every layer: O = (I - f + 1). Peripheral pixels participate in fewer convolutions than central pixels.
- **Same Padding:** Zeros are padded symmetrically around borders such that when stride s = 1, output spatial dimensions match input:
  p = (f - 1) / 2 (for odd filter sizes).
- **Causal Padding:** Used in 1D temporal convolutions (WaveNet) where output at time t only convolves over inputs at time t and earlier.

### 3. Stride (s)
The step size by which the kernel shifts across the input tensor:
- Stride s = 1: Standard overlapping convolution.
- Stride s = 2: Downsamples output spatial resolution by approximately half, serving as a learned alternative to pooling.

### 4. Pooling Operations
- **Max Pooling:** Selects the maximum value in each window. Retains the strongest feature detection response and provides local translation invariance.
- **Average Pooling:** Computes the arithmetic mean in each window. Smoothes features; commonly used as Global Average Pooling (GAP) before the output layer to eliminate millions of dense parameters.`,
    working: `1. The input image tensor and kernel tensor are aligned at the top-left boundary.
2. Element-wise multiplication is performed for all overlapping elements across all channels and summed with bias.
3. The kernel slides rightward by the stride amount s.
4. When reaching the right border, the kernel shifts down by stride s to the left edge.
5. This process continues until the entire input is converted into a 2D feature map.`,
    formula: `Same Padding Formula (for s = 1):
p = \\frac{f - 1}{2}

Max Pooling Operation:
P(i, j) = \\max_{0 \\le m < k_h, 0 \\le n < k_w} X(i \\cdot s + m, j \\cdot s + n)

Average Pooling Operation:
P(i, j) = \\frac{1}{k_h \\times k_w} \\sum_{m=0}^{k_h - 1} \\sum_{n=0}^{k_w - 1} X(i \\cdot s + m, j \\cdot s + n)`,
    example: 'Applying a 3x3 filter to a 5x5 image with Stride=1 and Padding=0 yields a 3x3 feature map. If Padding=1 (Same padding), the output remains 5x5. Max pooling 2x2 with Stride=2 then reduces it to 2x2.',
    advantages: [
      'Padding preserves edge information and prevents rapid spatial dimension shrinkage.',
      'Max pooling achieves translation invariance and reduces computational load.',
      'Strided convolution enables learnable downsampling without fixed heuristic pooling.'
    ],
    limitations: [
      'Zero-padding introduces artificial zero-boundary artifacts.',
      'Aggressive pooling permanently discards exact spatial coordinate information.',
      'Odd kernel sizes are mandatory for symmetric Same padding.'
    ],
    applications: [
      'Edge detection using Sobel / Prewitt kernels.',
      'Feature map downsampling in modern CNNs (ResNet, MobileNet).',
      'Global Average Pooling in modern classification backbones.'
    ],
    examPoints: [
      'Calculate required padding for "Same" convolution given input size and filter size.',
      'Contrast Max Pooling vs Average Pooling in terms of information preservation and use cases.',
      'Explain why deep learning frameworks implement cross-correlation rather than true mathematical convolution (weight learning absorbs kernel flipping).',
      'Show the arithmetic steps of a 2x2 Max Pooling operation on a sample 4x4 matrix.'
    ],
    summary: 'Convolution, padding, stride, and pooling work together to extract multiscale features from images while controlling spatial dimensions and parameter budgets.',
    relatedTopicIds: ['u3-t2', 'u3-t4', 'u3-t6', 'u3-t7', 'u3-t10', 'u3-t11'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },

  // UNIT 4: RECURRENT NEURAL NETWORKS
  {
    id: 'note-u4-rnn-basics',
    unitId: 'unit-4',
    unitNumber: 4,
    topicId: 'u4-t2',
    topicTitle: 'Introduction to RNN',
    title: 'Recurrent Neural Networks & Temporal Sequences',
    definition: 'A Recurrent Neural Network (RNN) is a class of artificial neural networks designed for processing sequential, time-series, or temporal data by maintaining an internal recurrent hidden state vector that serves as working memory across time steps.',
    introduction: 'Standard feedforward neural networks assume all inputs and outputs are independent of each other. This fails for sequential data such as natural language sentences, audio streams, or stock price histories, where the meaning of the current element depends heavily on previous context.',
    content: `### 1. The Recurrence Equation
At each discrete time step t:
- The network receives the current input vector x_t.
- It also receives the previous hidden state h_(t-1).
- It computes the new updated hidden state h_t using shared parameters:
  h_t = tanh(W_hh * h_(t-1) + W_xh * x_t + b_h)
- It computes the emission output y_t:
  y_t = Softmax(W_hy * h_t + b_y)

### 2. Parameter Sharing Across Time
Unlike feedforward networks which allocate separate weights per input dimension, an RNN reuses the exact same weight matrices (W_xh, W_hh, W_hy) at every single time step. This parameter sharing enables RNNs to generalize across variable-length sequences.

### 3. Backpropagation Through Time (BPTT)
To train an RNN:
- The recurrent graph is unrolled across time steps t = 1, 2, ..., T.
- Loss is summed across all steps: L = ∑ L_t.
- Gradients are propagated backward through the unrolled time chain.

### 4. The Vanishing & Exploding Gradient Dilemma
During BPTT, calculating the gradient with respect to initial hidden state h_0 involves multiplying T transposed weight matrices (W_hh)^T:
- If largest eigenvalue of W_hh < 1: Gradients decay exponentially to zero (**Vanishing Gradient Problem**), preventing the network from learning long-term temporal dependencies.
- If largest eigenvalue of W_hh > 1: Gradients explode exponentially to infinity (**Exploding Gradient Problem**), causing NaN numerical overflows.`,
    working: `1. Hidden state h_0 is initialized to zero.
2. At time step t=1, word vector x_1 enters; h_1 is computed combining x_1 and h_0.
3. At time step t=2, word vector x_2 enters; h_2 is computed combining x_2 and h_1.
4. This recurrence continues sequentially until the end of the sequence.
5. Error gradients are accumulated backwards across all time steps via BPTT to update shared matrices W_xh, W_hh, and W_hy.`,
    formula: `Hidden State Update Equation:
h_t = \\tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)

Output Prediction Equation:
\\hat{y}_t = \\text{softmax}(W_{hy} h_t + b_y)

Total Sequence Loss:
L = \\sum_{t=1}^T L_t(\\hat{y}_t, y_t)`,
    example: 'In part-of-speech tagging: The sentence "The bank can guarantee the deposit" vs "A river bank". In the first sentence, when reaching the word "bank", the preceding word "The" informs the hidden state h_t that "bank" is a noun rather than a river bank.',
    advantages: [
      'Processes variable-length sequential inputs without fixed-size padding constraints.',
      'Maintains sequential memory of past events through its hidden state.',
      'Parameter sharing keeps model size independent of sequence length.'
    ],
    limitations: [
      'Sequential computation is inherently non-parallelizable across time steps during training.',
      'Severe vanishing gradient problem restricts effective memory to roughly 10-15 time steps.',
      'Prone to exploding gradients requiring heuristic gradient clipping.'
    ],
    applications: [
      'Speech recognition and acoustic phoneme modeling.',
      'Natural language generation and language modeling.',
      'Time-series sensor forecasting and algorithmic trading.',
      'Video frame sequence action recognition.'
    ],
    examPoints: [
      'Write the fundamental recurrent hidden state equation: h_t = tanh(W_hh * h_(t-1) + W_xh * x_t + b_h).',
      'Explain how parameter sharing operates across time in an RNN.',
      'Explain Backpropagation Through Time (BPTT) and why vanishing gradients occur mathematically.',
      'Explain the method used to mitigate exploding gradients: Gradient Clipping (norm thresholding).'
    ],
    summary: 'RNNs process sequential inputs by looping an internal hidden state across time steps with shared weights. However, vanishing gradients in unrolled BPTT limit their ability to retain long-range context.',
    relatedTopicIds: ['u4-t1', 'u4-t3', 'u4-t4', 'u4-t6', 'u4-t7', 'u4-t9'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'note-u4-lstm',
    unitId: 'unit-4',
    unitNumber: 4,
    topicId: 'u4-t9',
    topicTitle: 'LSTM',
    title: 'Long Short-Term Memory (LSTM) Networks',
    definition: 'Long Short-Term Memory (LSTM) is an advanced gated recurrent neural network architecture designed by Hochreiter and Schmidhuber in 1997 that overcomes the vanishing gradient problem by maintaining an additive cell state channel regulated by three non-linear gates.',
    introduction: 'Standard RNNs fail when context from 50 or 100 steps earlier is needed to make a prediction. LSTMs solve this by establishing an uninterrupted "information highway" called the Cell State (C_t), where information can travel unchanged unless explicitly modified by specialized gating structures.',
    content: `### 1. The Anatomy of an LSTM Cell
An LSTM cell at time step t contains two state vectors:
- **Cell State (C_t):** Long-term memory channel running down the top of the cell.
- **Hidden State (h_t):** Short-term memory working vector.

### 2. The Three Gates of LSTM
1. **Forget Gate (f_t):**
   - Decides what percentage of old cell information to discard.
   - Formula: f_t = σ(W_f · [h_(t-1), x_t] + b_f)
   - Outputs values between 0 (completely forget) and 1 (completely keep).

2. **Input Gate (i_t) & Candidate State (C_tilde_t):**
   - Decides what new information to store in the cell state.
   - Input Gate: i_t = σ(W_i · [h_(t-1), x_t] + b_i)
   - Candidate State: C_tilde_t = tanh(W_c · [h_(t-1), x_t] + b_c)

3. **Cell State Update:**
   - C_t = f_t ⊙ C_(t-1) + i_t ⊙ C_tilde_t
   - Combines forgotten past with scaled candidate updates through **additive** operations rather than multiplicative chains, eliminating the vanishing gradient problem!

4. **Output Gate (o_t):**
   - Decides what parts of the cell state make it to the hidden state output.
   - o_t = σ(W_o · [h_(t-1), x_t] + b_o)
   - Final Hidden State: h_t = o_t ⊙ tanh(C_t)

### 3. Comparison with Gated Recurrent Unit (GRU)
GRU (Cho et al., 2014) simplifies the LSTM by merging the cell state and hidden state, using only two gates: **Update Gate (z_t)** and **Reset Gate (r_t)**, reducing parameter count by ~25% with comparable performance.`,
    working: `1. Input x_t and previous hidden state h_(t-1) enter the cell.
2. Forget gate evaluates which past memories in C_(t-1) are outdated.
3. Input gate and candidate tanh layer generate and filter new information.
4. Old cell state is multiplied by forget gate and added to the new candidate state to produce C_t.
5. Output gate filters tanh(C_t) to produce the visible hidden state h_t.
6. The updated C_t and h_t pass to time step t+1.`,
    formula: `1. Forget Gate:
f_t = \\sigma(W_f \\cdot [h_{t-1}, x_t] + b_f)

2. Input Gate:
i_t = \\sigma(W_i \\cdot [h_{t-1}, x_t] + b_i)

3. Candidate Cell State:
\\tilde{C}_t = \\tanh(W_c \\cdot [h_{t-1}, x_t] + b_c)

4. Cell State Update:
C_t = f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t

5. Output Gate:
o_t = \\sigma(W_o \\cdot [h_{t-1}, x_t] + b_o)

6. Hidden State:
h_t = o_t \\odot \\tanh(C_t)`,
    example: 'In analyzing long text: "Alice, who grew up in France and speaks fluent French, works as an engineer...". The forget gate retains Alice’s gender and language across 80 intervening words, so when the text reaches "...loves speaking [blank]", the network predicts "French".',
    advantages: [
      'Effectively learns dependencies across hundreds of sequential time steps.',
      'Additive cell state path prevents vanishing gradients during backpropagation.',
      'Flexible gating allows dynamic forgetting, updating, and output filtering.'
    ],
    limitations: [
      'Significantly higher parameter count (4x parameters of a vanilla RNN layer).',
      'Computationally slow due to sequential dependency across time steps (cannot parallelize training).',
      'Surpassed by Transformer architectures on large-scale NLP tasks.'
    ],
    applications: [
      'Machine translation (Seq2Seq with attention).',
      'Named Entity Recognition (BiLSTM-CRF).',
      'Medical ECG anomaly detection.',
      'Time-series stock and climate prediction.'
    ],
    examPoints: [
      'Write all 6 mathematical equations of the LSTM cell with dimensions and activation functions.',
      'Explain the purpose and range of each gate: Forget gate, Input gate, Output gate.',
      'Explain why the additive operation (C_t = f_t * C_(t-1) + i_t * C_tilde_t) prevents vanishing gradients.',
      'Compare LSTM vs GRU (3 gates vs 2 gates, parameter count, cell state presence).'
    ],
    summary: 'LSTMs resolve the vanishing gradient problem in sequential modeling through an additive cell state governed by Forget, Input, and Output gates, capturing long-range dependencies.',
    relatedTopicIds: ['u4-t2', 'u4-t6', 'u4-t7', 'u4-t10', 'u4-t11', 'u4-t12'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },

  // UNIT 5: ADVANCED DEEP LEARNING
  {
    id: 'note-u5-transformers',
    unitId: 'unit-5',
    unitNumber: 5,
    topicId: 'u5-t10',
    topicTitle: 'Transformers',
    title: 'The Transformer Architecture & Self-Attention',
    definition: 'A Transformer is a deep learning architecture introduced in the 2017 paper "Attention Is All You Need" (Vaswani et al.) that dispenses entirely with recurrence and convolutions, relying solely on multi-head self-attention mechanisms to process sequential data in parallel.',
    introduction: 'Prior to Transformers, state-of-the-art sequence models were based on recurrent networks (LSTMs). Because RNNs compute sequentially (h_t depends on h_(t-1)), training on massive web-scale corpora was painfully slow. Transformers enabled massive parallelization, laying the groundwork for modern LLMs (BERT, GPT, Claude, Gemini).',
    content: `### 1. The Core Principle: Scaled Dot-Product Attention
Attention maps a Query (Q) and a set of Key (K) - Value (V) pairs to an output:
- **Queries (Q):** What the current token is seeking.
- **Keys (K):** What identity/attributes other tokens offer.
- **Values (V):** The actual semantic content retrieved.
- Formula: Attention(Q, K, V) = Softmax( (Q * K^T) / sqrt(d_k) ) * V
The scaling factor 1/sqrt(d_k) prevents the dot products from growing excessively large for high dimensions, which would push the Softmax into regions with dangerously small gradients.

### 2. Multi-Head Attention (MHA)
Rather than computing a single attention function, Multi-Head Attention linearly projects Q, K, and V into h different representation subspaces:
- MHA(Q, K, V) = Concat(head_1, ..., head_h) * W_O
- Each head attends to information at different positions from different semantic perspectives (e.g., syntactic dependencies, co-reference, sentiment).

### 3. Positional Encoding
Because Transformers contain no recurrent loops or convolutions, they are permutation-invariant (treating words in any order identically). To inject word order awareness, fixed sinusoidal or learned positional embeddings are added directly to the input token embeddings:
- PE_(pos, 2i) = sin(pos / 10000^(2i/d_model))
- PE_(pos, 2i+1) = cos(pos / 10000^(2i/d_model))

### 4. Transformer Block Components
Each Transformer layer consists of:
1. Multi-Head Attention sublayer with Residual Connection & Layer Normalization (Add & Norm).
2. Position-wise Feedforward Network (FFN): two linear transformations with a non-linearity (ReLU / GELU) in between.
3. Second Residual Connection & Layer Normalization (Add & Norm).`,
    working: `1. Input tokens are converted into word embeddings and added to positional encodings.
2. The combined vectors pass into the Multi-Head Self-Attention layer.
3. Every token attends directly to every other token in the sequence simultaneously in O(1) sequential operations.
4. Residual addition (x + Sublayer(x)) and LayerNorm stabilize gradient flow.
5. Feedforward layers apply dense transformations independently to each position.
6. Stacking N such blocks yields rich contextual representations for generative decoders or classifiers.`,
    formula: `Scaled Dot-Product Attention:
\\text{Attention}(Q, K, V) = \\text{softmax}\\left( \\frac{Q K^T}{\\sqrt{d_k}} \\right) V

Multi-Head Attention:
\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h) W^O
\\quad \\text{where } \\text{head}_i = \\text{Attention}(Q W_i^Q, K W_i^K, V W_i^V)

Feed-Forward Network:
\\text{FFN}(x) = \\max(0, x W_1 + b_1) W_2 + b_2`,
    example: 'In machine translation: "The animal didn\'t cross the street because it was too tired". When processing the token "it", self-attention assigns the highest attention weight to "animal" (resolving coreference), rather than "street".',
    advantages: [
      'Massive parallelization across GPUs during training, bypassing the sequential bottleneck of RNNs.',
      'O(1) maximum path length between any two tokens in a sequence, eliminating long-term dependency degradation.',
      'Highly scalable: model performance improves reliably with increased compute and parameters (Scaling Laws).'
    ],
    limitations: [
      'Quadratic computational and memory complexity O(N^2) with respect to sequence length N.',
      'Lacks native inductive bias for locality (requires massive data to learn spatial/temporal priors).',
      'Requires substantial compute infrastructure and specialized training techniques.'
    ],
    applications: [
      'Large Language Models (GPT-4, Gemini, LLaMA, Claude).',
      'Vision Transformers (ViT) replacing CNNs in computer vision.',
      'Multimodal generative models processing text, audio, and video jointly.',
      'Protein structure prediction (AlphaFold 2).'
    ],
    examPoints: [
      'Write the mathematical formula for Scaled Dot-Product Attention and explain the purpose of 1/sqrt(d_k).',
      'Explain Multi-Head Attention and why multiple representation subspaces are beneficial.',
      'Explain why Positional Encodings are strictly required in Transformers and write the sinusoidal formulas.',
      'Compare Transformers with RNNs/LSTMs in terms of parallelization, time complexity, and memory scaling.'
    ],
    summary: 'Transformers rely entirely on self-attention mechanisms to model relationships between all tokens in parallel. Scaling gracefully with data and compute, they serve as the foundational architecture for modern AI.',
    relatedTopicIds: ['u4-t2', 'u4-t9', 'u5-t9', 'u5-t11', 'u5-t12'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'note-u5-gan',
    unitId: 'unit-5',
    unitNumber: 5,
    topicId: 'u5-t5',
    topicTitle: 'GAN',
    title: 'Generative Adversarial Networks (GANs)',
    definition: 'A Generative Adversarial Network (GAN) is a deep generative modeling framework formulated by Ian Goodfellow et al. in 2014, in which two neural networks—a Generator and a Discriminator—compete against each other in a zero-sum minimax game.',
    introduction: 'Before GANs, generative modeling relied on explicit probability density estimates (such as PixelRNN or Variational Autoencoders) which often produced blurry outputs. GANs pioneered implicit density modeling, training a generator to produce synthetic data so realistic that a discriminator cannot distinguish it from real training examples.',
    content: `### 1. The Two-Player Game
1. **The Generator G(z):**
   - Takes a random noise vector z drawn from a prior distribution p_z(z) (e.g., standard normal distribution N(0, I)).
   - Maps z through deconvolutional / transpose-convolutional layers to generate a synthetic sample G(z).
   - **Goal:** Fool the Discriminator into classifying G(z) as authentic real data.

2. **The Discriminator D(x):**
   - Takes an input sample x (either real data x ~ p_data(x) or fake data G(z)).
   - Outputs a scalar probability D(x) ∈ [0, 1] representing the likelihood that x came from real training data rather than G.
   - **Goal:** Correctly classify real samples as 1 and generated synthetic samples as 0.

### 2. Minimax Value Function
The objective is defined by the value function V(D, G):
min_G max_D V(D, G) = E_{x~p_data}[log D(x)] + E_{z~p_z}[log(1 - D(G(z)))]
- D tries to maximize V(D, G).
- G tries to minimize V(D, G) (or maximize log D(G(z)) to prevent vanishing gradients early in training).

### 3. Training Challenges
- **Mode Collapse:** The generator discovers a small number of realistic outputs that trick the discriminator and repeatedly produces only those samples, failing to capture the full diversity of the data distribution.
- **Vanishing Gradients:** If the discriminator becomes too proficient too early, D(G(z)) → 0, causing the generator's gradient to saturate.
- **Non-Convergence / Oscillations:** Because minimax optimization searches for a Nash equilibrium in non-convex game spaces rather than a local minimum, training can oscillate wildly without converging.
- **Wasserstein GAN (WGAN):** Uses Earth Mover's Distance (Wasserstein-1) with 1-Lipschitz continuity to provide smooth, non-saturating gradients everywhere.`,
    working: `1. Sample a mini-batch of real images {x_1, ..., x_m} from the dataset.
2. Sample a mini-batch of noise vectors {z_1, ..., z_m} from Gaussian prior.
3. Train Discriminator: Update D by ascending its stochastic gradient on real and generated samples.
4. Sample a fresh mini-batch of noise vectors.
5. Train Generator: Update G by descending its stochastic gradient (optimizing log(1 - D(G(z))) or -log(D(G(z)))).
6. Alternate updates until Nash equilibrium is reached, where D(x) = 0.5 everywhere.`,
    formula: `Minimax Objective Function:
\\min_G \\max_D V(D, G) = \\mathbb{E}_{x \\sim p_{\\text{data}}(x)}[\\log D(x)] + \\mathbb{E}_{z \\sim p_z(z)}[\\log(1 - D(G(z)))]

Optimal Discriminator:
D^*(x) = \\frac{p_{\\text{data}}(x)}{p_{\\text{data}}(x) + p_g(x)}

WGAN Value Function:
\\min_G \\max_{D \\in \\mathcal{D}_L} \\mathbb{E}_{x \\sim p_{\\text{data}}}[D(x)] - \\mathbb{E}_{z \\sim p_z}[D(G(z))]`,
    example: 'Generating photorealistic human faces (StyleGAN): The generator starts from random numbers and learns to synthesize realistic portraits with realistic skin pores, hair strands, and lighting variations.',
    advantages: [
      'Generates sharp, high-resolution synthetic imagery without blurriness.',
      'Requires no explicit mathematical density estimation or Markov chain sampling.',
      'Learns rich, disentangled latent representations useful for semi-supervised tasks.'
    ],
    limitations: [
      'Notoriously difficult and unstable to train (sensitive to hyperparameter choices).',
      'High risk of mode collapse where sample diversity vanishes.',
      'Objective loss value does not correlate with sample perceptual quality.'
    ],
    applications: [
      'Photorealistic image synthesis (StyleGAN, BigGAN).',
      'Image-to-image translation (Pix2Pix, CycleGAN for horse-to-zebra or day-to-night).',
      'Super-resolution (SRGAN) restoring detail to low-resolution photos.',
      'Data augmentation for training medical imaging models.'
    ],
    examPoints: [
      'State the complete minimax objective equation for GANs and explain each term.',
      'Describe the roles and architectures of the Generator and the Discriminator.',
      'Explain the "Mode Collapse" problem in GAN training and how modern variants (WGAN) tackle it.',
      'Explain why the Generator minimizes -log(D(G(z))) rather than log(1 - D(G(z))) in practice.'
    ],
    summary: 'GANs pit a Generator against a Discriminator in an adversarial zero-sum game. This framework produces sharp synthetic data without explicit density estimation, though it requires careful tuning to avoid mode collapse.',
    relatedTopicIds: ['u5-t1', 'u5-t4', 'u5-t6', 'u5-t7', 'u5-t8'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'note-u5-autoencoder',
    unitId: 'unit-5',
    unitNumber: 5,
    topicId: 'u5-t1',
    topicTitle: 'Autoencoders',
    title: 'Autoencoders & Representation Learning',
    definition: 'An Autoencoder is an unsupervised artificial neural network trained to reconstruct its input at its output layer by compressing the data into a low-dimensional bottleneck representation (latent space code).',
    introduction: 'Unlike supervised models that predict target labels, an autoencoder sets y = x. If allowed an identity mapping, this would be trivial; but by imposing a narrow bottleneck in the middle layer, the network is forced to discard noise and preserve only the most informative underlying generative factors.',
    content: `### 1. Architectural Components
1. **Encoder h = f(x):**
   - Compresses high-dimensional input x ∈ R^D into a lower-dimensional latent code h ∈ R^d (where d << D).
   - Typically consists of successive dense or convolutional downsampling layers with non-linear activations.

2. **Bottleneck (Latent Space / Code):**
   - The narrowest layer that holds the compressed representation.

3. **Decoder x_hat = g(h):**
   - Reconstructs an approximation x_hat of the original input from the latent vector h.
   - Typically mirrors the encoder architecture with upsampling or transpose convolutions.

### 2. Reconstruction Loss
The objective function minimizes the reconstruction discrepancy between input x and output x_hat:
- For real-valued continuous data: Mean Squared Error (MSE): L(x, x_hat) = ||x - x_hat||^2
- For binary / normalized data: Binary Cross-Entropy (BCE).

### 3. Specialized Autoencoder Variants
- **Undercomplete Autoencoder:** Bottleneck dimension is strictly smaller than input dimension. Forces non-linear dimensionality reduction (generalizing PCA).
- **Denoising Autoencoder (DAE):** Input is intentionally corrupted with noise (e.g. Gaussian noise or masking); the network is trained to reconstruct the original clean input, learning robust manifold structures.
- **Sparse Autoencoder:** Bottleneck has high dimensionality but includes an L1 or KL-divergence penalty on activations, encouraging sparse feature representations.
- **Variational Autoencoder (VAE):** Enforces a probabilistic prior (e.g. Gaussian) over the latent space, enabling random sampling for generative synthesis.`,
    working: `1. Input x is fed into the encoder network.
2. Successive layers compress the data into latent vector z.
3. The decoder takes vector z and expands it back to the original input dimensions, producing reconstruction x_hat.
4. Loss is evaluated between x and x_hat.
5. Backpropagation updates all encoder and decoder weights to minimize reconstruction error.`,
    formula: `Encoder:
\\mathbf{h} = f(\\mathbf{x}) = \\sigma(W_e \\mathbf{x} + b_e)

Decoder:
\\hat{\\mathbf{x}} = g(\\mathbf{h}) = \\sigma(W_d \\mathbf{h} + b_d)

Reconstruction Loss (MSE):
L(\\mathbf{x}, \\hat{\\mathbf{x}}) = \\frac{1}{2} \\|\\mathbf{x} - \\hat{\\mathbf{x}}\\|^2 = \\frac{1}{2} \\sum_{i} (x_i - \\hat{x}_i)^2`,
    example: 'Anomalous transaction detection in credit cards: An autoencoder is trained on millions of normal transactions. When presented with a fraudulent transaction, the network fails to reconstruct it accurately, producing a high reconstruction error that triggers a fraud alert.',
    advantages: [
      'Self-supervised/unsupervised: requires zero manual data labeling.',
      'Acts as an effective non-linear dimensionality reduction technique superior to linear PCA.',
      'Powerful tool for data denoising, compression, and out-of-distribution anomaly detection.'
    ],
    limitations: [
      'Standard autoencoders produce a disjointed, non-continuous latent space unsuitable for generative interpolation.',
      'Prone to learning trivial identity mappings if bottleneck capacity is too high.',
      'Reconstructed images tend to be somewhat blurry due to mean squared error averaging.'
    ],
    applications: [
      'Industrial and financial anomaly detection.',
      'Image denoising and signal artifact removal.',
      'Feature pre-training and self-supervised representation learning.',
      'Dimensionality reduction and latent data visualization.'
    ],
    examPoints: [
      'Diagram the Encoder -> Bottleneck -> Decoder pipeline and state the loss function.',
      'Explain the difference between linear PCA and non-linear Autoencoders.',
      'Explain how a Denoising Autoencoder operates and why corruption improves representation robustness.',
      'Explain the fundamental difference between standard Autoencoders and Variational Autoencoders (VAEs).'
    ],
    summary: 'Autoencoders compress input data into a lower-dimensional latent representation and reconstruct it back at the output. By constraining the bottleneck, they capture core features without manual supervision.',
    relatedTopicIds: ['u5-t2', 'u5-t3', 'u5-t4', 'u5-t5'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  }
];

export const notes = initialNotes;
