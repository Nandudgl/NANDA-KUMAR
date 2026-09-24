import { QuestionAnswer } from '../types';

export const initialQuestions: QuestionAnswer[] = [
  // ================= UNIT I: 2-MARK QUESTIONS (11 questions) =================
  {
    id: 'q-u1-2m-1',
    question: 'Define Deep Learning.',
    answer: 'Deep Learning is a subset of Machine Learning based on Artificial Neural Networks with multiple hierarchical layers that learn representations of data with multiple levels of abstraction. It automatically extracts low-level, mid-level, and high-level abstract features directly from raw datasets without manual feature engineering. Deep Learning is widely used in image recognition, natural language processing, and speech recognition.',
    marks: 2,
    unitId: 'unit-1',
    unitNumber: 1,
    topicId: 'u1-t3',
    topicTitle: 'Deep Learning',
    bloomLevel: 'K1',
    difficulty: 'Easy',
    tags: ['Definition', 'Basics'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u1-2m-2',
    question: 'State two key differences between Machine Learning and Deep Learning.',
    answer: '1. Feature Extraction: Classical Machine Learning requires manual, handcrafted feature engineering by human experts, whereas Deep Learning learns hierarchical features automatically from raw data.\n2. Data & Hardware Scaling: Machine Learning works well on small-to-moderate datasets with standard CPUs, whereas Deep Learning requires massive labeled datasets and high-performance parallel hardware (GPUs/TPUs) to converge effectively.',
    marks: 2,
    unitId: 'unit-1',
    unitNumber: 1,
    topicId: 'u1-t4',
    topicTitle: 'Machine Learning vs Deep Learning',
    bloomLevel: 'K2',
    difficulty: 'Easy',
    tags: ['ML vs DL', 'Differences'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u1-2m-3',
    question: 'What is a Perceptron? State its mathematical model.',
    answer: 'A Perceptron is the simplest form of a supervised feedforward artificial neural network, invented by Frank Rosenblatt in 1958 for binary classification of linearly separable inputs. Its mathematical model computes a linear combination of inputs: z = ∑(w_i * x_i) + b, followed by a hard-limit step activation function: y = +1 if z >= 0, and 0 (or -1) if z < 0.',
    marks: 2,
    unitId: 'unit-1',
    unitNumber: 1,
    topicId: 'u1-t8',
    topicTitle: 'Perceptron',
    bloomLevel: 'K1',
    difficulty: 'Easy',
    tags: ['Perceptron', 'Formula'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u1-2m-4',
    question: 'Why is non-linear activation necessary in deep neural networks?',
    answer: 'Without non-linear activation functions, stacking dozens of neural layers is mathematically equivalent to a single linear transformation (because the composition of linear functions is always linear). Non-linear activations introduce curvature into the hypothesis space, allowing neural networks to learn non-linear boundaries and serve as universal function approximators.',
    marks: 2,
    unitId: 'unit-1',
    unitNumber: 1,
    topicId: 'u1-t9',
    topicTitle: 'Activation Functions',
    bloomLevel: 'K2',
    difficulty: 'Medium',
    tags: ['Activation Functions', 'Non-linearity'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u1-2m-5',
    question: 'Define the Sigmoid activation function and state its derivative.',
    answer: 'The Sigmoid (logistic) function maps real numbers to the open range (0, 1): σ(z) = 1 / (1 + e^-z). Its derivative is σ\'(z) = σ(z) * (1 - σ(z)), with a maximum value of 0.25 at z = 0. It is primarily used in output units for binary classification problems.',
    marks: 2,
    unitId: 'unit-1',
    unitNumber: 1,
    topicId: 'u1-t9',
    topicTitle: 'Activation Functions',
    bloomLevel: 'K1',
    difficulty: 'Easy',
    tags: ['Sigmoid', 'Derivatives'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u1-2m-6',
    question: 'What is the "Dying ReLU" problem and how is it resolved?',
    answer: 'The Dying ReLU problem occurs when neurons enter a state where net input z < 0 for all training examples. Because the gradient of ReLU for negative inputs is exactly 0, backpropagation never updates the neuron\'s incoming weights, leaving it permanently inactive. It is resolved using Leaky ReLU (f(z) = max(0.01z, z)) or Parametric ReLU (PReLU).',
    marks: 2,
    unitId: 'unit-1',
    unitNumber: 1,
    topicId: 'u1-t9',
    topicTitle: 'Activation Functions',
    bloomLevel: 'K2',
    difficulty: 'Medium',
    tags: ['Dying ReLU', 'Leaky ReLU'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u1-2m-7',
    question: 'Define Categorical Cross-Entropy loss.',
    answer: 'Categorical Cross-Entropy is a convex loss function used for multi-class classification with one-hot encoded ground truth labels y and Softmax predictions y_hat. It is defined as L = - ∑_{c=1}^K y_c * log(y_hat_c). It heavily penalizes confident predictions that deviate from the true class.',
    marks: 2,
    unitId: 'unit-1',
    unitNumber: 1,
    topicId: 'u1-t10',
    topicTitle: 'Loss Functions',
    bloomLevel: 'K1',
    difficulty: 'Easy',
    tags: ['Cross-Entropy', 'Multi-class'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u1-2m-8',
    question: 'State the Gradient Descent weight update equation and explain the terms.',
    answer: 'The weight update equation is: W_{t+1} = W_t - α * ∇_W L(W_t), where W_t is the current weight vector, α is the learning rate (step size hyperparameter), and ∇_W L is the gradient vector of the loss function with respect to W. The negative sign ensures movement in the direction of steepest descent.',
    marks: 2,
    unitId: 'unit-1',
    unitNumber: 1,
    topicId: 'u1-t11',
    topicTitle: 'Gradient Descent',
    bloomLevel: 'K2',
    difficulty: 'Easy',
    tags: ['Gradient Descent', 'Equation'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u1-2m-9',
    question: 'What is Backpropagation? State its primary mathematical principle.',
    answer: 'Backpropagation is an efficient algorithm for computing the partial derivatives of an objective loss function with respect to every weight and bias in an artificial neural network. Its primary mathematical foundation is the differential chain rule of calculus, which recursively multiplies local Jacobian matrices backward from the output layer to the input layer.',
    marks: 2,
    unitId: 'unit-1',
    unitNumber: 1,
    topicId: 'u1-t12',
    topicTitle: 'Backpropagation',
    bloomLevel: 'K1',
    difficulty: 'Easy',
    tags: ['Backpropagation', 'Chain Rule'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u1-2m-10',
    question: 'State the biological analogues of inputs, weights, cell body, and output in an artificial neuron.',
    answer: '1. Inputs (x): Dendrites (receiving electrochemical signals).\n2. Weights (w): Synaptic connection strengths.\n3. Net Input & Bias: Soma / Cell body (accumulating potentials).\n4. Activation & Output (y): Axon and action potential firing.',
    marks: 2,
    unitId: 'unit-1',
    unitNumber: 1,
    topicId: 'u1-t6',
    topicTitle: 'Biological Neuron',
    bloomLevel: 'K2',
    difficulty: 'Easy',
    tags: ['Biological Neuron', 'Comparison'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u1-2m-11',
    question: 'Why does a single-layer perceptron fail on the XOR problem?',
    answer: 'A single-layer perceptron can only form a single linear decision hyperplane (w1*x1 + w2*x2 + b = 0). In the XOR truth table, the true outputs (0,1) and (1,0) cannot be separated from false outputs (0,0) and (1,1) by a single straight line. Solving XOR requires at least one hidden layer with non-linear activations.',
    marks: 2,
    unitId: 'unit-1',
    unitNumber: 1,
    topicId: 'u1-t8',
    topicTitle: 'Perceptron',
    bloomLevel: 'K4',
    difficulty: 'Medium',
    tags: ['XOR Problem', 'Linear Separability'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },

  // ================= UNIT I: LONG ANSWER QUESTIONS (5 questions: 5, 8, 13, 16 marks) =================
  {
    id: 'q-u1-long-1',
    question: 'Explain the working of Rosenblatt’s Perceptron with its architecture, learning algorithm, and the XOR limitation.',
    answer: `### 1. Introduction
The Perceptron, proposed by Frank Rosenblatt in 1958 at Cornell Aeronautical Laboratory, is the fundamental computational building block of artificial neural networks. It represents an early mathematical attempt to model how biological neurons process information.

### 2. Definition
A Perceptron is a single-neuron supervised learning algorithm designed for binary classification of linearly separable patterns, mapping real-valued inputs to a binary output (+1 or -1).

### 3. Architecture & Concept
A single-layer Perceptron consists of:
- Input vector: $\\mathbf{x} = [x_1, x_2, \\dots, x_n]^T$
- Adjustable synaptic weights: $\\mathbf{w} = [w_1, w_2, \\dots, w_n]^T$
- Scalar bias term: $b$ (which acts as a threshold shifter)
- Linear combination adder: $z = \\sum_{i=1}^n w_i x_i + b = \\mathbf{w}^T \\mathbf{x} + b$
- Heaviside Step Activation Function:
  $$f(z) = \\begin{cases} +1 & \\text{if } z \\ge 0 \\\\ -1 \\text{ (or } 0) & \\text{if } z < 0 \\end{cases}$$

### 4. Diagram
\`\`\`
   x1 ----(w1)----+
   x2 ----(w2)----+--> [ Sum: ∑(wi*xi) + b ] --> [ Step Function ] --> Output y
   xn ----(wn)----+
   b  ----( 1)----+
\`\`\`

### 5. Working Principle & Step-by-Step Learning Algorithm
1. **Initialization:** Set weight vector $\\mathbf{w}$ and bias $b$ to zero or small random values.
2. **Feedforward:** For each training instance $(\\mathbf{x}_k, y_k)$, compute the net input $z_k = \\mathbf{w}^T \\mathbf{x}_k + b$ and prediction $\\hat{y}_k = f(z_k)$.
3. **Error Calculation:** Compute error $e_k = y_k - \\hat{y}_k$.
4. **Weight Update Rule:**
   $$\\mathbf{w} := \\mathbf{w} + \\eta \\cdot (y_k - \\hat{y}_k) \\cdot \\mathbf{x}_k$$
   $$b := b + \\eta \\cdot (y_k - \\hat{y}_k)$$
   where $\\eta \\in (0, 1]$ is the learning rate.
5. **Epoch Loop:** Repeat steps 2-4 until zero classification errors occur over an entire epoch or maximum iterations are exceeded.

### 6. The XOR Limitation (Minsky & Papert, 1969)
For linearly separable boolean functions (AND, OR, NOT), a single hyperplane can segregate the classes. However, for the XOR function:
- $(0, 0) \\to 0$, $(1, 1) \\to 0$
- $(0, 1) \\to 1$, $(1, 0) \\to 1$
Geometrically, the points $(0,1)$ and $(1,0)$ lie diagonally across from $(0,0)$ and $(1,1)$. No single straight line can separate class 1 from class 0. Minsky and Papert mathematically proved that a single-layer perceptron cannot solve non-linearly separable problems like XOR, necessitating Multilayer Perceptrons (MLPs) with hidden layers.

### 7. Advantages
- Simple mathematical formulation with $O(N)$ execution time.
- Guaranteed convergence in finite steps if data is linearly separable (Novikoff\'s Theorem).

### 8. Limitations
- Fails completely on non-linearly separable distributions.
- Non-differentiable step function prevents backpropagation.

### 9. Applications
- Binary classification of linearly separable datasets.
- Logic gate modeling (AND, OR gates).

### 10. Conclusion
While bounded by linear separability, the Perceptron provided the foundational concepts—weights, biases, activations, and error-driven updates—upon which modern deep neural networks are built.`,
    marks: 13,
    unitId: 'unit-1',
    unitNumber: 1,
    topicId: 'u1-t8',
    topicTitle: 'Perceptron',
    bloomLevel: 'K3',
    difficulty: 'Medium',
    tags: ['Perceptron', '13 Marks', 'XOR Limitation'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u1-long-2',
    question: 'Compare and analyze different activation functions used in Deep Learning: Sigmoid, Tanh, ReLU, Leaky ReLU, and Softmax. Discuss their mathematical formulas, ranges, advantages, and limitations.',
    answer: `### 1. Introduction
Activation functions are mathematical non-linearities integrated into artificial neurons. Without them, stacking deep neural networks collapses mathematically into a single linear regression model.

### 2. Comprehensive Comparison Table
| Activation Function | Formula | Range | Zero-Centered? | Vanishing Gradient Risk | Primary Use Case |
|---|---|---|---|---|---|
| **Sigmoid** | $\\sigma(z) = \\frac{1}{1 + e^{-z}}$ | $(0, 1)$ | No | High (Max derivative = 0.25) | Binary output layer |
| **Tanh** | $\\frac{e^z - e^{-z}}{e^z + e^{-z}}$ | $(-1, 1)$ | Yes | Moderate (Saturates at tails) | Hidden layers, RNN states |
| **ReLU** | $\\max(0, z)$ | $[0, \\infty)$ | No | Zero for $z < 0$ (Dying ReLU) | Default for hidden layers |
| **Leaky ReLU** | $\\max(\\alpha z, z), \\alpha=0.01$ | $(-\\infty, \\infty)$ | Near | None | Robust hidden layers |
| **Softmax** | $\\frac{e^{z_i}}{\\sum_j e^{z_j}}$ | $(0, 1)$ | No | Output layer | Multi-class classification |

### 3. Detailed Analysis
#### A. Sigmoid Function
- **Formula:** $\\sigma(z) = \\frac{1}{1 + e^{-z}}$
- **Derivative:** $\\sigma'(z) = \\sigma(z)(1 - \\sigma(z))$. Maximum value is 0.25 at $z = 0$.
- **Limitations:** When $z$ is large positive or large negative, the curve saturates and gradients vanish ($\approx 0$), making deep backpropagation impossible. Outputs are non-zero-centered, inducing zig-zag gradient updates.

#### B. Hyperbolic Tangent (Tanh)
- **Formula:** $\\tanh(z) = \\frac{e^z - e^{-z}}{e^z + e^{-z}}$
- **Advantages:** Zero-centered output around 0 accelerates convergence compared to Sigmoid.
- **Limitations:** Still saturates for $|z| > 2$, causing vanishing gradients in deep networks.

#### C. Rectified Linear Unit (ReLU)
- **Formula:** $f(z) = \\max(0, z)$
- **Advantages:** Derivative is constant 1 for all $z > 0$, completely eliminating vanishing gradients; extremely fast computation (no exponentials); induces representational sparsity.
- **Limitations:** "Dying ReLU"—neurons receiving negative inputs permanently output 0 and receive 0 gradient, dying permanently.

#### D. Leaky ReLU
- **Formula:** $f(z) = \\max(0.01z, z)$
- **Advantages:** Assigns a small non-zero slope ($0.01$) to negative inputs, allowing gradients to flow and reviving inactive neurons.

#### E. Softmax
- Converts unnormalized logits $\\mathbf{z}$ into calibrated probabilities that sum to 1. Used exclusively at the output of multi-class classification networks.

### 4. Conclusion
While Sigmoid and Tanh historically established neural learning, ReLU and Leaky ReLU are the standard choices for deep hidden layers due to non-saturation and gradient stability.`,
    marks: 15,
    unitId: 'unit-1',
    unitNumber: 1,
    topicId: 'u1-t9',
    topicTitle: 'Activation Functions',
    bloomLevel: 'K4',
    difficulty: 'Hard',
    tags: ['Activation Functions', '15 Marks', 'Comparison'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u1-long-3',
    question: 'Explain the Backpropagation algorithm in detail with the derivation of the four fundamental equations using the calculus chain rule.',
    answer: `### 1. Introduction
Backpropagation (backward propagation of errors) is the supervised learning algorithm that computes partial derivatives of the scalar loss function $L$ with respect to every weight $W$ and bias $b$ across all network layers.

### 2. Network Notation
- Layer index: $l = 1, 2, \\dots, L$
- Pre-activation: $Z^{[l]} = W^{[l]} A^{[l-1]} + b^{[l]}$
- Post-activation: $A^{[l]} = g^{[l]}(Z^{[l]})$
- Error delta at layer $l$: $\\delta^{[l]} = \\frac{\\partial L}{\\partial Z^{[l]}}$

### 3. Derivation of the Four Fundamental Equations
#### Equation 1: Error delta at the Output Layer ($\delta^{[L]}$)
Using the chain rule:
$$\\delta^{[L]} = \\frac{\\partial L}{\\partial Z^{[L]}} = \\frac{\\partial L}{\\partial A^{[L]}} \\cdot \\frac{\\partial A^{[L]}}{\\partial Z^{[L]}} = \\nabla_{A^{[L]}} L \\odot {g^{[L]}}'(Z^{[L]})$$
For Mean Squared Error $L = \\frac{1}{2}(A^{[L]} - y)^2$, $\\nabla L = (A^{[L]} - y)$.
For Cross-Entropy with Softmax, this simplifies to $\\delta^{[L]} = A^{[L]} - y$.

#### Equation 2: Error delta at Hidden Layer $l$ in terms of layer $l+1$ ($\delta^{[l]}$)
Applying the multivariate chain rule from layer $l+1$ back to layer $l$:
$$\\delta^{[l]} = \\frac{\\partial L}{\\partial Z^{[l]}} = \\left( \\frac{\\partial Z^{[l+1]}}{\\partial Z^{[l]}} \\right)^T \\frac{\\partial L}{\\partial Z^{[l+1]}}$$
Since $Z^{[l+1]} = W^{[l+1]} g^{[l]}(Z^{[l]}) + b^{[l+1]}$, we get:
$$\\delta^{[l]} = \\left( (W^{[l+1]})^T \\delta^{[l+1]} \\right) \\odot {g^{[l]}}'(Z^{[l]})$$

#### Equation 3: Rate of Change of Loss with respect to Biases
$$\\frac{\\partial L}{\\partial b^{[l]}} = \\frac{\\partial L}{\\partial Z^{[l]}} \\cdot \\frac{\\partial Z^{[l]}}{\\partial b^{[l]}} = \\delta^{[l]} \\cdot 1 = \\delta^{[l]}$$

#### Equation 4: Rate of Change of Loss with respect to Weights
$$\\frac{\\partial L}{\\partial W^{[l]}} = \\frac{\\partial L}{\\partial Z^{[l]}} \\cdot \\frac{\\partial Z^{[l]}}{\\partial W^{[l]}} = \\delta^{[l]} (A^{[l-1]})^T$$

### 4. Step-by-Step Backpropagation Algorithm
1. **Forward Pass:** Compute $Z^{[l]}$ and $A^{[l]}$ for $l = 1, \\dots, L$, caching them in memory.
2. **Compute Output Error:** Evaluate $\\delta^{[L]}$ using Equation 1.
3. **Backpropagate Errors:** For $l = L-1, L-2, \\dots, 1$, compute $\\delta^{[l]}$ using Equation 2.
4. **Compute Gradients:** Evaluate $\\frac{\\partial L}{\\partial W^{[l]}}$ and $\\frac{\\partial L}{\\partial b^{[l]}}$ using Equations 3 and 4.
5. **Update Weights:** Adjust parameters via $W^{[l]} := W^{[l]} - \\alpha \\frac{\\partial L}{\\partial W^{[l]}}$.

### 5. Summary
The backpropagation algorithm achieves $O(W)$ linear computational complexity by recycling activations and propagating error deltas in reverse topological order.`,
    marks: 16,
    unitId: 'unit-1',
    unitNumber: 1,
    topicId: 'u1-t12',
    topicTitle: 'Backpropagation',
    bloomLevel: 'K4',
    difficulty: 'Hard',
    tags: ['Backpropagation', '16 Marks', 'Derivation'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u1-long-4',
    question: 'Explain Gradient Descent and compare Batch Gradient Descent, Stochastic Gradient Descent (SGD), and Mini-batch Gradient Descent.',
    answer: `### 1. Introduction
Gradient Descent is the foundational first-order optimization algorithm that iteratively minimizes an objective loss function $L(\\theta)$ by taking steps proportional to the negative gradient $-\\nabla L(\\theta)$.

### 2. Comparison of the Three Variants
| Property | Batch Gradient Descent | Stochastic Gradient Descent (SGD) | Mini-batch Gradient Descent |
|---|---|---|---|
| **Data per Update** | Entire training dataset ($N$ samples) | Exactly 1 sample | Mini-batch ($m$ samples, e.g. 32-256) |
| **Update Frequency** | Once per epoch | $N$ times per epoch | $N/m$ times per epoch |
| **Path to Minimum** | Smooth, deterministic trajectory | Extremely noisy, erratic fluctuations | Moderately smooth with healthy variance |
| **Memory Efficiency** | Low (entire dataset in memory) | Very high (1 sample) | High (fits comfortably in GPU RAM) |
| **Vectorization** | High | None | Excellent (massively parallel on GPU) |
| **Escape Saddle Points** | Easily trapped in shallow plateaus | High stochastic variance helps escape | Optimal trade-off |

### 3. Mathematical Equations
- **Batch GD:** $\\theta := \\theta - \\alpha \\cdot \\frac{1}{N} \\sum_{i=1}^N \\nabla L_i(\\theta)$
- **SGD:** $\\theta := \\theta - \\alpha \\cdot \\nabla L_i(\\theta)$ (for random sample $i$)
- **Mini-batch GD:** $\\theta := \\theta - \\alpha \\cdot \\frac{1}{m} \\sum_{j=1}^m \\nabla L_j(\\theta)$

### 4. Conclusion
Mini-batch Gradient Descent combines the hardware efficiency of vectorized batch computing with the noise-assisted exploration of SGD, making it the universal standard for deep neural network training.`,
    marks: 8,
    unitId: 'unit-1',
    unitNumber: 1,
    topicId: 'u1-t11',
    topicTitle: 'Gradient Descent',
    bloomLevel: 'K4',
    difficulty: 'Medium',
    tags: ['Gradient Descent', '8 Marks', 'Batch vs SGD'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u1-long-5',
    question: 'Discuss the structural and functional differences between Biological Neurons and Artificial Neurons.',
    answer: `### 1. Introduction
Artificial Neural Networks were originally inspired by neurobiology. Understanding the parallels and simplifications highlights both the elegance and the limitations of deep learning models.

### 2. Structural Mapping
1. **Dendrites $\\leftrightarrow$ Inputs ($x_1, \\dots, x_n$):** Biological dendrites receive chemical neurotransmitters from upstream cells; artificial inputs receive real-valued numeric data.
2. **Synapses $\\leftrightarrow$ Weights ($w_1, \\dots, w_n$):** Synaptic vesicle conductance regulates signal strength; artificial weights multiply inputs by adjustable scalar parameters.
3. **Soma (Cell Body) $\\leftrightarrow$ Summation and Bias ($z = \\mathbf{w}^T \\mathbf{x} + b$):** The biological soma integrates electro-chemical charge; artificial neurons compute a linear algebraic dot product.
4. **Axon Hillock & Axon $\\leftrightarrow$ Activation Function and Output ($y = g(z)$):** When voltage crosses a threshold (~ -55 mV), an action potential fires down the biological axon; artificial neurons pass net sum $z$ through a differentiable non-linear function.

### 3. Functional Differences
- **Signal Representation:** Biological neurons fire discrete, asynchronous spike trains; artificial neurons output continuous floating-point numbers.
- **Speed & Scale:** Biological neurons fire at ~100-200 Hz, but 86 billion neurons operate in massive parallel synchrony. Artificial neurons compute at gigahertz GPU clock frequencies but in structured layered matrices.
- **Learning Rule:** Biology uses local Hebbian and spike-timing plasticity; deep networks use global backpropagation.`,
    marks: 5,
    unitId: 'unit-1',
    unitNumber: 1,
    topicId: 'u1-t6',
    topicTitle: 'Biological Neuron',
    bloomLevel: 'K2',
    difficulty: 'Easy',
    tags: ['Biological vs Artificial', '5 Marks'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },

  // ================= UNIT II: 2-MARK QUESTIONS (11 questions) =================
  {
    id: 'q-u2-2m-1',
    question: 'What is a Multilayer Perceptron (MLP)?',
    answer: 'A Multilayer Perceptron (MLP) is a class of feedforward artificial neural networks consisting of at least three layers of nodes: an input layer, one or more hidden layers with non-linear activation functions, and an output layer. MLPs overcome the linear separability limitations of the single-layer perceptron through universal function approximation.',
    marks: 2,
    unitId: 'unit-2',
    unitNumber: 2,
    topicId: 'u2-t2',
    topicTitle: 'Multilayer Perceptron',
    bloomLevel: 'K1',
    difficulty: 'Easy',
    tags: ['MLP', 'Definition'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u2-2m-2',
    question: 'State the concept of Momentum in gradient descent.',
    answer: 'Momentum is an optimization technique that accelerates gradient vectors in the right directions, damping oscillations along ravines. It maintains a velocity vector $v_t = \\beta v_{t-1} + \\alpha \\nabla L$, adding an exponentially decaying moving average of past gradients to the current update step.',
    marks: 2,
    unitId: 'unit-2',
    unitNumber: 2,
    topicId: 'u2-t9',
    topicTitle: 'Momentum',
    bloomLevel: 'K2',
    difficulty: 'Medium',
    tags: ['Momentum', 'Optimization'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u2-2m-3',
    question: 'Why does Adam optimizer perform bias correction for its first and second moment vectors?',
    answer: 'Because the first and second moment vectors $m_0$ and $v_0$ are initialized to zero vectors, they are heavily biased toward zero, particularly during early training steps. Dividing by $(1 - \\beta_1^t)$ and $(1 - \\beta_2^t)$ rescales the estimates to reflect their true statistical expectations.',
    marks: 2,
    unitId: 'unit-2',
    unitNumber: 2,
    topicId: 'u2-t10',
    topicTitle: 'Adam Optimizer',
    bloomLevel: 'K4',
    difficulty: 'Hard',
    tags: ['Adam', 'Bias Correction'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u2-2m-4',
    question: 'Define Batch Normalization and state its mathematical equations.',
    answer: 'Batch Normalization is a technique that normalizes layer inputs across a mini-batch to have zero mean and unit variance: $\\hat{x}_i = (x_i - \\mu_B) / \\sqrt{\\sigma_B^2 + \\epsilon}$, followed by a learnable linear transform: $y_i = \\gamma \\hat{x}_i + \\beta$. It mitigates internal covariate shift and enables faster training.',
    marks: 2,
    unitId: 'unit-2',
    unitNumber: 2,
    topicId: 'u2-t12',
    topicTitle: 'Batch Normalization',
    bloomLevel: 'K1',
    difficulty: 'Medium',
    tags: ['Batch Normalization', 'Formula'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u2-2m-5',
    question: 'What is Dropout and how does it prevent overfitting?',
    answer: 'Dropout is a stochastic regularization technique where random hidden neurons are deactivated ("dropped") with probability $p$ during each training step. It prevents co-adaptation among neurons, forcing each neuron to learn robust, self-reliant features and implicitly training an ensemble of exponential sub-networks.',
    marks: 2,
    unitId: 'unit-2',
    unitNumber: 2,
    topicId: 'u2-t13',
    topicTitle: 'Dropout',
    bloomLevel: 'K2',
    difficulty: 'Easy',
    tags: ['Dropout', 'Regularization'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u2-2m-6',
    question: 'Differentiate between Overfitting and Underfitting.',
    answer: 'Overfitting (High Variance) occurs when a model memorizes noise in the training data, achieving low training error but poor validation error. Underfitting (High Bias) occurs when a model lacks sufficient complexity or training time, resulting in high error on both training and validation sets.',
    marks: 2,
    unitId: 'unit-2',
    unitNumber: 2,
    topicId: 'u2-t14',
    topicTitle: 'Overfitting',
    bloomLevel: 'K2',
    difficulty: 'Easy',
    tags: ['Bias vs Variance', 'Differences'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u2-2m-7',
    question: 'What is L2 Weight Regularization (Weight Decay)?',
    answer: 'L2 Regularization adds a squared magnitude penalty $(\\lambda / 2) \\|W\\|_2^2$ to the loss function. During gradient updates, it shrinks all weights by a fraction $(1 - \\alpha \\lambda)$ at every step, discouraging excessively large weights and preventing the network from fitting high-frequency noise.',
    marks: 2,
    unitId: 'unit-2',
    unitNumber: 2,
    topicId: 'u2-t13',
    topicTitle: 'Dropout',
    bloomLevel: 'K1',
    difficulty: 'Medium',
    tags: ['Weight Decay', 'L2'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u2-2m-8',
    question: 'State the difference between L1 and L2 regularization.',
    answer: 'L1 regularization adds $\\lambda \\sum |w_i|$ to the loss and drives less important weights to exact zero, producing sparse models and automatic feature selection. L2 regularization adds $(\\lambda / 2) \\sum w_i^2$ and shrinks weights toward zero without setting them to exact zeros, producing dense, distributed weights.',
    marks: 2,
    unitId: 'unit-2',
    unitNumber: 2,
    topicId: 'u2-t13',
    topicTitle: 'Dropout',
    bloomLevel: 'K4',
    difficulty: 'Medium',
    tags: ['L1 vs L2', 'Sparsity'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u2-2m-9',
    question: 'What is Early Stopping?',
    answer: 'Early Stopping is an algorithmic regularization strategy that monitors validation loss across training epochs. When validation loss ceases to improve and begins rising for a designated patience threshold, training is halted and the best performing checkpoint weights are retained, preventing overfitting.',
    marks: 2,
    unitId: 'unit-2',
    unitNumber: 2,
    topicId: 'u2-t5',
    topicTitle: 'Training Neural Networks',
    bloomLevel: 'K1',
    difficulty: 'Easy',
    tags: ['Early Stopping', 'Training'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u2-2m-10',
    question: 'Why should neural network weights NOT be initialized to all zeros?',
    answer: 'If all weights are initialized to zero (or any identical constant), all hidden neurons within a layer will compute identical activations and receive identical backpropagated gradients throughout training. This "Symmetry Problem" prevents the network from learning distinct, complementary features.',
    marks: 2,
    unitId: 'unit-2',
    unitNumber: 2,
    topicId: 'u2-t5',
    topicTitle: 'Training Neural Networks',
    bloomLevel: 'K4',
    difficulty: 'Medium',
    tags: ['Symmetry Breaking', 'Weight Initialization'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u2-2m-11',
    question: 'What is Xavier (Glorot) Initialization and when is it preferred?',
    answer: 'Xavier Initialization sets weight variance to $\\text{Var}(W) = 2 / (n_{in} + n_{out})$, designed to preserve activation variance and gradient variance across deep layers. It is specifically preferred for layers using Sigmoid or Tanh activation functions.',
    marks: 2,
    unitId: 'unit-2',
    unitNumber: 2,
    topicId: 'u2-t5',
    topicTitle: 'Training Neural Networks',
    bloomLevel: 'K2',
    difficulty: 'Medium',
    tags: ['Xavier', 'Initialization'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },

  // ================= UNIT II: LONG ANSWER QUESTIONS (5 questions) =================
  {
    id: 'q-u2-long-1',
    question: 'Explain the Adam (Adaptive Moment Estimation) optimization algorithm in detail. Include its equations, hyperparameter roles, bias correction mechanism, and advantages over SGD and RMSprop.',
    answer: `### 1. Introduction
Adaptive Moment Estimation (Adam), proposed by Diederik Kingma and Jimmy Ba in 2014, is one of the most widely used optimization algorithms in deep learning. It combines the strengths of AdaGrad (handling sparse gradients) and RMSprop (handling non-stationary objectives).

### 2. Definition
Adam is an adaptive learning rate optimization algorithm that computes individual parameter updates by maintaining exponentially decaying moving averages of both past gradients (first moment) and past squared gradients (second raw moment).

### 3. Mathematical Mechanics & Equations
At each iteration $t$:
1. **Compute Gradient:** $g_t = \\nabla_\\theta L(\\theta_{t-1})$
2. **Update First Moment Vector (Mean):**
   $$m_t = \\beta_1 m_{t-1} + (1 - \\beta_1) g_t$$
   Standard default $\\beta_1 = 0.9$. Acts as directional momentum.
3. **Update Second Moment Vector (Uncentered Variance):**
   $$v_t = \\beta_2 v_{t-1} + (1 - \\beta_2) g_t^2$$
   Standard default $\\beta_2 = 0.999$. Captures gradient energy.
4. **Compute Bias-Corrected Estimates:**
   $$\\hat{m}_t = \\frac{m_t}{1 - \\beta_1^t}, \\quad \\hat{v}_t = \\frac{v_t}{1 - \\beta_2^t}$$
5. **Update Parameters:**
   $$\\theta_t = \\theta_{t-1} - \\frac{\\alpha}{\\sqrt{\\hat{v}_t} + \\epsilon} \\hat{m}_t$$
   Standard default $\\alpha = 0.001$, $\\epsilon = 10^{-8}$.

### 4. Diagram
\`\`\`
   g_t (Gradient)
     |---> [ Exp Moving Avg: β1 ] ---> m_t ---> [ Bias Correction: 1/(1-β1^t) ] ---> m_hat
     |
     +---> [ Exp Moving Avg: β2 ] ---> v_t ---> [ Bias Correction: 1/(1-β2^t) ] ---> v_hat
                                                                                      |
               θ_{t} = θ_{t-1} - [ α / (sqrt(v_hat) + ε) ] * m_hat <-----------------+
\`\`\`

### 5. Why Bias Correction is Necessary
Because $m_0$ and $v_0$ are initialized to vectors of zeros, early estimates are biased toward zero. At $t=1$, $m_1 = (1 - \\beta_1) g_1 = 0.1 g_1$. Dividing by $(1 - 0.9^1) = 0.1$ restores $\\hat{m}_1 = g_1$, removing the initialization distortion. As $t \\to \\infty$, $(1 - \\beta^t) \\to 1$.

### 6. Comparison with Other Optimizers
- **SGD with Momentum:** Uses only first moment $m_t$; single global learning rate for all parameters.
- **RMSprop:** Uses second moment $v_t$ for adaptive scaling, but lacks momentum and bias correction.
- **Adam:** Combines both first and second moments with principled bias correction.

### 7. Advantages
- Adaptive step sizes naturally handle sparse gradients and non-stationary loss surfaces.
- Robust to hyperparameter choices; default parameters work across vision, NLP, and reinforcement learning.
- Invariant to diagonal rescaling of gradients.

### 8. Limitations
- Requires double the memory of vanilla SGD (stores two auxiliary state vectors $m$ and $v$ per parameter).
- In some computer vision models, well-tuned SGD with Momentum can yield slightly superior final generalization.

### 9. Applications
- Standard optimizer for Large Language Models (LLaMA, GPT, BERT) and Transformers.
- Diffusion models and Generative Adversarial Networks.

### 10. Conclusion
Adam provides fast, stable convergence by adapting learning rates per parameter, cementing its status as the default optimizer in modern deep learning frameworks.`,
    marks: 13,
    unitId: 'unit-2',
    unitNumber: 2,
    topicId: 'u2-t10',
    topicTitle: 'Adam Optimizer',
    bloomLevel: 'K4',
    difficulty: 'Hard',
    tags: ['Adam Optimizer', '13 Marks', 'Optimization'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u2-long-2',
    question: 'Discuss Batch Normalization and Dropout in detail. Explain how each functions during training and inference, and analyze why they prevent overfitting.',
    answer: `### 1. Introduction
Deep neural networks have millions of learnable parameters, making them susceptible to internal covariate shift and severe overfitting. Batch Normalization (Ioffe & Szegedy, 2015) and Dropout (Srivastava et al., 2014) are the two most foundational regularization techniques addressing these issues.

### 2. Batch Normalization
#### A. Concept
Normalizes the pre-activations of each mini-batch across training examples, stabilizing the input distribution to deeper layers.
#### B. Equations for Mini-batch $\\mathcal{B} = \\{x_1, \\dots, x_m\\}$:
1. **Mini-batch Mean:** $\\mu_B = \\frac{1}{m} \\sum_{i=1}^m x_i$
2. **Mini-batch Variance:** $\\sigma_B^2 = \\frac{1}{m} \\sum_{i=1}^m (x_i - \\mu_B)^2$
3. **Normalize:** $\\hat{x}_i = \\frac{x_i - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}$
4. **Scale and Shift:** $y_i = \\gamma \\hat{x}_i + \\beta$ (where $\\gamma, \\beta$ are learned via backpropagation).
#### C. Training vs. Inference
- **Training:** Uses current mini-batch $\\mu_B$ and $\\sigma_B^2$. Updates exponential moving averages $\\mu_{\\text{running}}$ and $\\sigma^2_{\\text{running}}$.
- **Inference:** Freezes batch calculations; uses fixed global $\\mu_{\\text{running}}$ and $\\sigma^2_{\\text{running}}$.

### 3. Dropout
#### A. Concept
Randomly deactivates a fraction $p$ of hidden neurons during each forward pass.
#### B. Inverted Dropout Implementation
During training:
$$r^{[l]} \\sim \\text{Bernoulli}(1 - p)$$
$$\\tilde{A}^{[l]} = \\frac{A^{[l]} \\odot r^{[l]}}{1 - p}$$
Dividing by $(1 - p)$ ensures the expected activation magnitude remains consistent.
#### C. Training vs. Inference
- **Training:** Neurons are randomly masked and scaled.
- **Inference:** All neurons are active without any masking or scaling modifications.

### 4. Overfitting Prevention Mechanisms
- **Dropout:** Prevents neurons from co-adapting, forcing redundant and distributed representations. Acts as training an ensemble of $2^N$ sub-networks.
- **Batch Normalization:** Normalization adds slight stochastic noise derived from other samples in the mini-batch, acting as an implicit regularizer.

### 5. Conclusion
Batch Normalization primarily stabilizes optimization and accelerates convergence, while Dropout explicitly combats co-adaptation. Together, they form the cornerstone of regularization in deep architectures.`,
    marks: 15,
    unitId: 'unit-2',
    unitNumber: 2,
    topicId: 'u2-t12',
    topicTitle: 'Batch Normalization',
    bloomLevel: 'K4',
    difficulty: 'Hard',
    tags: ['Batch Normalization', 'Dropout', '15 Marks'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u2-long-3',
    question: 'Analyze the Bias-Variance Tradeoff in Deep Neural Networks. Detail the diagnostic symptoms of High Bias vs High Variance and discuss five remedies for each.',
    answer: `### 1. Introduction
The Bias-Variance Tradeoff is a core concept in machine learning that characterizes model generalization error. In deep learning, achieving optimal performance requires systematically diagnosing and addressing High Bias (Underfitting) and High Variance (Overfitting).

### 2. Theoretical Breakdown
Total Expected Prediction Error decomposes into three terms:
$$\\text{Error} = \\text{Bias}^2 + \\text{Variance} + \\text{Irreducible Noise}$$
- **Bias:** Error introduced by approximating complex real-world relationships with an overly simplified model.
- **Variance:** Model sensitivity to random fluctuations and noise in the training dataset.

### 3. Diagnostic Matrix
| Diagnostic Metric | High Bias (Underfitting) | High Variance (Overfitting) | Optimal Balance |
|---|---|---|---|
| **Training Error** | High (e.g., 18%) | Very Low (e.g., 1%) | Low (e.g., 2%) |
| **Validation Error** | High (e.g., 20%) | High (e.g., 15%) | Low (e.g., 2.5%) |
| **Error Gap** | Minimal gap | Massive generalization gap | Small, consistent gap |

### 4. Five Remedies for High Bias (Underfitting)
1. **Increase Model Capacity:** Add more hidden layers and increase the number of hidden units per layer.
2. **Train Longer:** Increase the number of training epochs and relax early stopping thresholds.
3. **Improve Optimization:** Adopt advanced optimizers like Adam or RMSprop instead of poorly tuned vanilla SGD.
4. **Feature Engineering / Representation:** Switch from saturating activations (Sigmoid) to ReLU or GELU to facilitate gradient flow.
5. **Decrease Regularization:** Reduce Dropout rates and decrease L2 weight decay penalties $\\lambda$.

### 5. Five Remedies for High Variance (Overfitting)
1. **Collect More Training Data:** Acquire more diverse real-world labeled examples.
2. **Data Augmentation:** Apply synthetic transformations (rotations, crops, flips, noise injection) to increase training diversity.
3. **Regularization (L2 & Dropout):** Apply Inverted Dropout ($p = 0.2 - 0.5$) and L2 weight decay.
4. **Early Stopping:** Halt training when validation loss starts to rise.
5. **Model Pruning / Architecture Simplification:** Reduce redundant layers or use parameter-efficient architectures.

### 6. Conclusion
Modern deep learning navigates the bias-variance tradeoff by first building models with sufficient capacity to fit the training data (lowering bias), and subsequently applying regularization and data scaling to ensure generalization (controlling variance).`,
    marks: 16,
    unitId: 'unit-2',
    unitNumber: 2,
    topicId: 'u2-t14',
    topicTitle: 'Overfitting',
    bloomLevel: 'K5',
    difficulty: 'Hard',
    tags: ['Bias Variance', '16 Marks', 'Diagnostics'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u2-long-4',
    question: 'Explain weight initialization strategies in Deep Neural Networks. Compare Zero, Random Normal, Xavier (Glorot), and He (Kaiming) initializations.',
    answer: `### 1. Introduction
Proper weight initialization is critical for training deep neural networks. Poor initialization can cause activations and gradients to either vanish to zero or explode to infinity within the first few layers.

### 2. Initializations Comparison Table
| Strategy | Formula for Variance $\\text{Var}(W)$ | Distribution | Best Paired Activation |
|---|---|---|---|
| **Zero Initialization** | $W = 0$ | Constant | Fails (Symmetry problem) |
| **Small Random** | $\\sim \\mathcal{N}(0, 0.01^2)$ | Normal | Shallow networks only |
| **Xavier / Glorot** | $\\frac{2}{n_{in} + n_{out}}$ | Normal / Uniform | Sigmoid, Tanh |
| **He / Kaiming** | $\\frac{2}{n_{in}}$ | Normal / Uniform | ReLU, Leaky ReLU |

### 3. Detailed Derivation Principles
- **Xavier Initialization (2010):** Assumes linear activations centered at 0. Enforces that $\\text{Var}(y^{[l]}) = \\text{Var}(y^{[l-1]})$, yielding $\\text{Var}(W) = 2 / (n_{in} + n_{out})$.
- **He Initialization (2015):** Accounts for ReLU setting negative inputs to zero, which halves variance. To compensate, the variance factor is doubled to $2 / n_{in}$.

### 4. Conclusion
Using He initialization with ReLU activations prevents signal attenuation across deep layers, enabling networks with dozens of layers to train reliably from scratch.`,
    marks: 8,
    unitId: 'unit-2',
    unitNumber: 2,
    topicId: 'u2-t5',
    topicTitle: 'Training Neural Networks',
    bloomLevel: 'K4',
    difficulty: 'Medium',
    tags: ['Initialization', '8 Marks', 'He vs Xavier'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u2-long-5',
    question: 'Explain the working of Forward Propagation in a Deep Feedforward Neural Network with matrix notations.',
    answer: `### 1. Introduction
Forward Propagation is the execution phase where input features pass forward through successive layers to generate network predictions.

### 2. Matrix Formulation
For layer $l \\in \\{1, \\dots, L\\}$:
- Input activation from previous layer: $A^{[l-1]}$ of shape $(n^{[l-1]}, m)$ where $m$ is batch size.
- Weight matrix: $W^{[l]}$ of shape $(n^{[l]}, n^{[l-1]})$
- Bias vector: $b^{[l]}$ of shape $(n^{[l]}, 1)$
- Linear Combination:
  $$Z^{[l]} = W^{[l]} A^{[l-1]} + b^{[l]}$$
- Non-linear Activation:
  $$A^{[l]} = g^{[l]}(Z^{[l]})$$

### 3. Step-by-Step Flow
1. Set $A^{[0]} = X$ (input mini-batch).
2. For $l = 1$ to $L$:
   - Multiply weights by previous activations and broadcast add bias.
   - Apply layer activation function $g^{[l]}$.
   - Store $Z^{[l]}$ and $A^{[l]}$ in cache for backpropagation.
3. At layer $L$, output prediction $\\hat{Y} = A^{[L]}$ is evaluated against ground truth $Y$ using loss function $L(Y, \\hat{Y})$.`,
    marks: 5,
    unitId: 'unit-2',
    unitNumber: 2,
    topicId: 'u2-t3',
    topicTitle: 'Forward Propagation',
    bloomLevel: 'K2',
    difficulty: 'Easy',
    tags: ['Forward Propagation', '5 Marks', 'Matrix Operations'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },

  // ================= UNIT III: 2-MARK QUESTIONS (11 questions) =================
  {
    id: 'q-u3-2m-1',
    question: 'Define Convolutional Neural Network (CNN).',
    answer: 'A Convolutional Neural Network (CNN) is a deep learning architecture specialized for processing grid-structured data (like 2D images) by exploiting spatial locality, sparse connectivity, and parameter sharing through learnable sliding convolution kernels and pooling layers.',
    marks: 2,
    unitId: 'unit-3',
    unitNumber: 3,
    topicId: 'u3-t1',
    topicTitle: 'Introduction to CNN',
    bloomLevel: 'K1',
    difficulty: 'Easy',
    tags: ['CNN Definition', 'Computer Vision'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u3-2m-2',
    question: 'State the spatial output dimension formula for a convolutional layer.',
    answer: 'The spatial output dimension $O$ is given by: $O = \\lfloor \\frac{I - K + 2P}{S} \\rfloor + 1$, where $I$ is the input spatial dimension, $K$ is the kernel filter size, $P$ is the zero-padding size, and $S$ is the stride step size.',
    marks: 2,
    unitId: 'unit-3',
    unitNumber: 3,
    topicId: 'u3-t2',
    topicTitle: 'CNN Architecture',
    bloomLevel: 'K1',
    difficulty: 'Easy',
    tags: ['Formula', 'Output Dimension'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u3-2m-3',
    question: 'Differentiate between Valid Padding and Same Padding.',
    answer: 'Valid Padding sets padding $P = 0$, meaning no zero-padding is added; the output spatial dimension shrinks at each layer: $O = I - K + 1$. Same Padding pads border zeros symmetrically ($P = (K-1)/2$) such that when stride $S = 1$, output spatial dimensions match the input: $O = I$.',
    marks: 2,
    unitId: 'unit-3',
    unitNumber: 3,
    topicId: 'u3-t7',
    topicTitle: 'Padding',
    bloomLevel: 'K2',
    difficulty: 'Easy',
    tags: ['Padding', 'Valid vs Same'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u3-2m-4',
    question: 'What is Stride in a convolutional layer?',
    answer: 'Stride ($S$) is the step size by which the kernel window slides across the input tensor along the horizontal and vertical dimensions. A stride of $S = 1$ shifts the filter by 1 pixel, while a stride of $S = 2$ downsamples the output resolution by approximately half.',
    marks: 2,
    unitId: 'unit-3',
    unitNumber: 3,
    topicId: 'u3-t6',
    topicTitle: 'Stride',
    bloomLevel: 'K1',
    difficulty: 'Easy',
    tags: ['Stride', 'Definition'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u3-2m-5',
    question: 'What is Max Pooling and what is its primary benefit?',
    answer: 'Max Pooling is a non-linear downsampling operation that selects the maximum activation within a sliding spatial window. Its primary benefits are reducing spatial dimensionality, lowering computational cost and parameter count, and introducing local translation invariance.',
    marks: 2,
    unitId: 'unit-3',
    unitNumber: 3,
    topicId: 'u3-t11',
    topicTitle: 'Max Pooling',
    bloomLevel: 'K2',
    difficulty: 'Easy',
    tags: ['Max Pooling', 'Benefits'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u3-2m-6',
    question: 'Calculate the total parameters in a Conv layer with 64 filters of size 3x3 applied to an input with 16 channels.',
    answer: 'Each filter has $(3 \\times 3 \\times 16) = 144$ weights, plus 1 bias = 145 parameters. For 64 filters: $64 \\times 145 = 9,280$ total learnable parameters ($9,216$ weights + $64$ biases).',
    marks: 2,
    unitId: 'unit-3',
    unitNumber: 3,
    topicId: 'u3-t5',
    topicTitle: 'Filter',
    bloomLevel: 'K3',
    difficulty: 'Medium',
    tags: ['Parameter Calculation', 'Conv Layer'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u3-2m-7',
    question: 'What is the role of the Flatten layer in a CNN?',
    answer: 'The Flatten layer reshapes multi-dimensional feature tensors (Height x Width x Channels) into a 1D continuous feature vector without modifying data values, allowing extracted spatial features to feed directly into dense fully connected classification layers.',
    marks: 2,
    unitId: 'unit-3',
    unitNumber: 3,
    topicId: 'u3-t13',
    topicTitle: 'Flattening',
    bloomLevel: 'K1',
    difficulty: 'Easy',
    tags: ['Flattening', 'Tensor Reshape'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u3-2m-8',
    question: 'What is the purpose of a 1x1 convolution (Pointwise Convolution)?',
    answer: 'A 1x1 convolution computes a linear combination across channels at each spatial pixel. It is used to adjust channel depth (reducing or expanding dimensionality) with minimal computational cost, as seen in GoogLeNet Inception modules and ResNet bottlenecks.',
    marks: 2,
    unitId: 'unit-3',
    unitNumber: 3,
    topicId: 'u3-t3',
    topicTitle: 'Convolution Operation',
    bloomLevel: 'K2',
    difficulty: 'Medium',
    tags: ['1x1 Convolution', 'Pointwise'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u3-2m-9',
    question: 'What is Global Average Pooling (GAP) and why is it preferred over large Dense layers?',
    answer: 'Global Average Pooling computes the average value across each feature map, reducing each 2D channel to a single scalar. It is preferred over dense layers because it drastically cuts parameters (saving millions of weights) and eliminates a major source of overfitting.',
    marks: 2,
    unitId: 'unit-3',
    unitNumber: 3,
    topicId: 'u3-t12',
    topicTitle: 'Average Pooling',
    bloomLevel: 'K2',
    difficulty: 'Medium',
    tags: ['Global Average Pooling', 'GAP'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u3-2m-10',
    question: 'What is Translation Invariance in CNNs?',
    answer: 'Translation Invariance means the network can recognize an object regardless of where it appears in the visual field. Convolution detects features locally anywhere in the image, and pooling compresses spatial coordinates to preserve feature presence rather than precise pixel coordinates.',
    marks: 2,
    unitId: 'unit-3',
    unitNumber: 3,
    topicId: 'u3-t1',
    topicTitle: 'Introduction to CNN',
    bloomLevel: 'K2',
    difficulty: 'Easy',
    tags: ['Translation Invariance', 'Vision'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u3-2m-11',
    question: 'State two popular object detection architectures built on CNN backbones.',
    answer: '1. YOLO (You Only Look Once): A single-stage, real-time object detector that frames detection as a regression problem directly from full image pixels to bounding boxes.\n2. Faster R-CNN: A two-stage object detector using a Region Proposal Network (RPN) followed by ROI pooling for high-precision detection.',
    marks: 2,
    unitId: 'unit-3',
    unitNumber: 3,
    topicId: 'u3-t16',
    topicTitle: 'CNN Applications',
    bloomLevel: 'K1',
    difficulty: 'Easy',
    tags: ['YOLO', 'Faster R-CNN'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },

  // ================= UNIT III: LONG ANSWER QUESTIONS (5 questions) =================
  {
    id: 'q-u3-long-1',
    question: 'Explain the detailed architecture of a Convolutional Neural Network (CNN). Describe the role of Convolution, ReLU, Pooling, Flattening, and Fully Connected layers with formulas, diagrams, and parameter calculations.',
    answer: `### 1. Introduction
Convolutional Neural Networks (CNNs) are the foundational deep learning architecture for visual perception tasks. Introduced by Yann LeCun in LeNet-5 (1998) and scaled by AlexNet (2012), CNNs exploit the 2D spatial correlation of images through local receptive fields and parameter sharing.

### 2. Definition
A CNN is a feedforward artificial neural network comprised of alternating convolutional, activation, and pooling layers that extract hierarchical visual features, followed by dense classification layers.

### 3. Architecture & Concept
\`\`\`
[Input Image: 224x224x3]
       │
       ▼
[CONV Layer: 64 filters 3x3, Stride 1, Pad 1] ──> Feature Maps (224x224x64)
       │
       ▼
[ReLU Non-linear Activation]
       │
       ▼
[MAX POOL: 2x2, Stride 2] ───────────────────────> Downsampled (112x112x64)
       │
      ... (Repeated Conv-ReLU-Pool Blocks)
       ▼
[FLATTEN Layer] ─────────────────────────────────> 1D Feature Vector
       │
       ▼
[DENSE / Fully Connected Layer]
       │
       ▼
[SOFTMAX Output Layer] ──────────────────────────> Class Probabilities
\`\`\`

### 4. Working of Core Layers
1. **Convolutional Layer:** Learnable 3D filters slide across the input volume, computing element-wise dot products. The spatial dimension formula is:
   $$O = \\left\\lfloor \\frac{I - K + 2P}{S} \\right\\rfloor + 1$$
2. **ReLU Layer:** Applies $f(x) = \\max(0, x)$ element-wise, introducing non-linearity without altering tensor dimensions.
3. **Pooling Layer:** Computes summary statistics (maximum or average) over local spatial neighborhoods, providing translation invariance and reducing parameters:
   $$O = \\frac{I - K}{S} + 1$$
4. **Flatten Layer:** Unrolls the final $(H \\times W \\times C)$ volume into a single vector of length $H \\cdot W \\cdot C$.
5. **Fully Connected Layer:** Connects every extracted feature to every output class unit, concluding with Softmax for classification.

### 5. Parameter Calculation Example
Consider an input image of $32 \\times 32 \\times 3$:
- **Conv1 (16 filters, 3x3, Pad 1, Stride 1):**
  - Output shape: $32 \\times 32 \\times 16$
  - Weights: $(3 \\times 3 \\times 3) \\times 16 = 432$; Biases: $16$. Total = $448$ parameters.
- **Pool1 (2x2, Stride 2):** Output shape: $16 \\times 16 \\times 16$; $0$ parameters.
- **Conv2 (32 filters, 3x3, Pad 1, Stride 1):**
  - Output shape: $16 \\times 16 \\times 32$
  - Weights: $(3 \\times 3 \\times 16) \\times 32 = 4,608$; Biases: $32$. Total = $4,640$ parameters.

### 6. Advantages
- Parameter efficiency: Millions of connections reduced through shared kernel weights.
- Built-in translation equivariance and hierarchical visual abstraction.

### 7. Limitations
- Computationally demanding during training on high-resolution images.
- Rigid grid topology cannot handle non-Euclidean graph or point cloud data.

### 8. Applications
- Image classification (ResNet), object detection (YOLO), and autonomous driving perception.

### 9. Conclusion
By combining sparse connectivity with parameter sharing, CNNs form the visual backbone of modern computer vision systems.`,
    marks: 16,
    unitId: 'unit-3',
    unitNumber: 3,
    topicId: 'u3-t2',
    topicTitle: 'CNN Architecture',
    bloomLevel: 'K4',
    difficulty: 'Hard',
    tags: ['CNN Architecture', '16 Marks', 'Full Derivation'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u3-long-2',
    question: 'Explain the Residual Network (ResNet) architecture. How do skip connections solve the degradation problem in very deep networks?',
    answer: `### 1. Introduction
Prior to ResNet (He et al., 2015), stacking more than 20-30 layers caused model performance to degrade due to vanishing gradients and optimization hurdles. ResNet introduced identity shortcut connections, allowing training of networks with 152+ layers.

### 2. The Degradation Problem
As network depth increases, training accuracy plateaus and then degrades rapidly—not because of overfitting, but because deeper standard networks have higher training error than shallower counterparts due to vanishing gradients.

### 3. Residual Block Formulation
Instead of forcing layers to directly fit an underlying mapping $H(x)$, ResNet reformulates the layer to fit a residual mapping:
$$F(x) = H(x) - x$$
The original mapping is recast as:
$$H(x) = F(x) + x$$
Here, $x$ is an identity shortcut that bypasses one or more layers and is added element-wise to the output of the stacked non-linear layers.

### 4. Diagram of Residual Block
\`\`\`
          x (Input)
          │ ─────────────┐ (Identity Shortcut)
          ▼              │
    [ Weight Layer ]     │
          ▼              │
       [ ReLU ]          │
          ▼              │
    [ Weight Layer ]     │
          ▼              │
          + <────────────┘ (Element-wise Addition: F(x) + x)
          ▼
       [ ReLU ]
          ▼
       Output
\`\`\`

### 5. Why Skip Connections Preserve Gradient Flow
During backpropagation, the gradient with respect to input $x$ is:
$$\\frac{\\partial L}{\\partial x} = \\frac{\\partial L}{\\partial H} \\cdot \\frac{\\partial H}{\\partial x} = \\frac{\\partial L}{\\partial H} \\left( \\frac{\\partial F}{\\partial x} + 1 \\right) = \\frac{\\partial L}{\\partial H} \\frac{\\partial F}{\\partial x} + \\frac{\\partial L}{\\partial H}$$
The crucial term $+1$ ensures that the gradient $\\frac{\\partial L}{\\partial H}$ can flow directly backward to earlier layers unimpeded, even if $\\frac{\\partial F}{\\partial x}$ approaches zero!

### 6. Conclusion
ResNet solved the degradation problem through identity shortcut connections, fundamentally changing how deep architectures are designed and enabling models with hundreds of layers.`,
    marks: 13,
    unitId: 'unit-3',
    unitNumber: 3,
    topicId: 'u3-t2',
    topicTitle: 'CNN Architecture',
    bloomLevel: 'K4',
    difficulty: 'Hard',
    tags: ['ResNet', 'Skip Connections', '13 Marks'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u3-long-3',
    question: 'Compare Max Pooling and Average Pooling. Discuss their mathematical operations, effect on feature maps, and use cases.',
    answer: `### 1. Introduction
Pooling layers serve as spatial downsamplers in convolutional pipelines, reducing spatial dimensions while retaining essential feature activations.

### 2. Comparison Table
| Feature | Max Pooling | Average Pooling |
|---|---|---|
| **Mathematical Operation** | $P(i,j) = \\max_{m,n} X(i \\cdot s + m, j \\cdot s + n)$ | $P(i,j) = \\frac{1}{K^2} \\sum_{m,n} X(i \\cdot s + m, j \\cdot s + n)$ |
| **Feature Extraction** | Captures dominant, high-contrast signals (edges, spikes) | Smooths out noise by computing the mean value |
| **Translation Invariance** | High (preserves strongest signal regardless of offset) | Moderate |
| **Parameter Count** | Zero learnable parameters | Zero learnable parameters |
| **Primary Placement** | Intermediate downsampling blocks | Final classification stage (Global Average Pooling) |

### 3. Step-by-Step Calculation
Given a 4x4 matrix downsampled by 2x2 window with stride 2:
$$X = \\begin{bmatrix} 1 & 3 & 2 & 4 \\\\ 5 & 6 & 7 & 8 \\\\ 3 & 2 & 1 & 0 \\\\ 1 & 2 & 3 & 4 \\end{bmatrix}$$
- **Max Pooling Output:** $\\begin{bmatrix} \\max(1,3,5,6) & \\max(2,4,7,8) \\\\ \\max(3,2,1,2) & \\max(1,0,3,4) \\end{bmatrix} = \\begin{bmatrix} 6 & 8 \\\\ 3 & 4 \\end{bmatrix}$
- **Average Pooling Output:** $\\begin{bmatrix} 3.75 & 5.25 \\\\ 2.0 & 2.0 \\end{bmatrix}$

### 4. Conclusion
Max pooling is standard for intermediate feature extraction, while Global Average Pooling is widely used before the final output layer to eliminate millions of dense parameters.`,
    marks: 8,
    unitId: 'unit-3',
    unitNumber: 3,
    topicId: 'u3-t10',
    topicTitle: 'Pooling',
    bloomLevel: 'K4',
    difficulty: 'Medium',
    tags: ['Pooling', '8 Marks', 'Max vs Average'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u3-long-4',
    question: 'Explain the working of the U-Net architecture for biomedical image segmentation.',
    answer: `### 1. Introduction
U-Net (Ronneberger et al., 2015) is an encoder-decoder convolutional network specifically designed for semantic pixel-level segmentation on limited biomedical datasets.

### 2. Architecture Overview
U-Net has a distinctive symmetric "U" shape consisting of:
1. **Contracting Path (Encoder):** Repeated blocks of two 3x3 convolutions (followed by ReLU) and a 2x2 max pooling layer with stride 2 for downsampling, doubling feature channels at each step.
2. **Bottleneck:** Deepest layer capturing high-level context.
3. **Expansive Path (Decoder):** Up-convolutions (transpose convolutions) that halve feature channels and double spatial dimensions, followed by two 3x3 convolutions.
4. **Skip Connections:** Copies high-resolution feature maps directly from the contracting path to the corresponding expansive path, concatenating them along the channel dimension.

### 3. Role of Skip Connections
Because pooling discards precise pixel location information, standard autoencoders output blurry segmentations. U-Net\'s skip connections pass exact spatial coordinates directly to the decoder, enabling precise localization of cell boundaries.`,
    marks: 5,
    unitId: 'unit-3',
    unitNumber: 3,
    topicId: 'u3-t16',
    topicTitle: 'CNN Applications',
    bloomLevel: 'K2',
    difficulty: 'Medium',
    tags: ['U-Net', '5 Marks', 'Segmentation'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u3-long-5',
    question: 'Describe the YOLO (You Only Look Once) object detection framework and how it differs from two-stage detectors.',
    answer: `### 1. Introduction
YOLO (Redmon et al., 2016) revolutionized computer vision by reframing object detection from a two-stage classification pipeline into a single unified regression problem.

### 2. Working Mechanism
1. The input image is divided into an $S \\times S$ grid (e.g., $7 \\times 7$ or $13 \\times 13$).
2. If the center of an object falls into a grid cell, that cell is responsible for detecting that object.
3. Each grid cell predicts $B$ bounding boxes, where each box consists of 5 predictions: $x, y, w, h$, and a box confidence score $P(\\text{Object}) \\cdot \\text{IOU}$.
4. Simultaneously, each cell predicts conditional class probabilities $P(\\text{Class}_i | \\text{Object})$.
5. Non-Maximum Suppression (NMS) prunes redundant overlapping bounding boxes.

### 3. Comparison with Two-Stage Detectors (e.g., Faster R-CNN)
- **Speed:** YOLO processes images in real time (45-150 FPS), making it suitable for live video streams and autonomous vehicles.
- **Global Context:** YOLO sees the entire image during training and inference, reducing background false-positive errors.`,
    marks: 5,
    unitId: 'unit-3',
    unitNumber: 3,
    topicId: 'u3-t16',
    topicTitle: 'CNN Applications',
    bloomLevel: 'K2',
    difficulty: 'Easy',
    tags: ['YOLO', '5 Marks', 'Object Detection'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },

  // ================= UNIT IV: 2-MARK QUESTIONS (11 questions) =================
  {
    id: 'q-u4-2m-1',
    question: 'Define Recurrent Neural Network (RNN).',
    answer: 'A Recurrent Neural Network (RNN) is a class of artificial neural networks designed for modeling sequential data by maintaining an internal recurrent hidden state vector that serves as working memory, updating at each time step based on current input and previous state.',
    marks: 2,
    unitId: 'unit-4',
    unitNumber: 4,
    topicId: 'u4-t2',
    topicTitle: 'Introduction to RNN',
    bloomLevel: 'K1',
    difficulty: 'Easy',
    tags: ['RNN', 'Definition'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u4-2m-2',
    question: 'State the recurrence equation for computing the hidden state in a standard vanilla RNN.',
    answer: 'The recurrent hidden state is computed as: $h_t = \\tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)$, where $W_{hh}$ is the recurrent state-to-state weight matrix, $W_{xh}$ is the input-to-state weight matrix, and $b_h$ is the bias vector.',
    marks: 2,
    unitId: 'unit-4',
    unitNumber: 4,
    topicId: 'u4-t5',
    topicTitle: 'Forward Propagation in RNN',
    bloomLevel: 'K1',
    difficulty: 'Easy',
    tags: ['RNN Formula', 'Hidden State'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u4-2m-3',
    question: 'What is Backpropagation Through Time (BPTT)?',
    answer: 'Backpropagation Through Time (BPTT) is the adaptation of backpropagation for RNNs. The recurrent computational graph is unrolled across all discrete time steps ($t=1$ to $T$), and error gradients are accumulated backward through time to update the shared weight matrices.',
    marks: 2,
    unitId: 'unit-4',
    unitNumber: 4,
    topicId: 'u4-t6',
    topicTitle: 'Backpropagation Through Time',
    bloomLevel: 'K2',
    difficulty: 'Medium',
    tags: ['BPTT', 'Definition'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u4-2m-4',
    question: 'Why do vanilla RNNs suffer from the Vanishing Gradient Problem?',
    answer: 'In BPTT, computing gradients across $T$ steps involves multiplying $T$ instances of the recurrent weight matrix $W_{hh}^T$ and derivative terms. If the eigenvalues of $W_{hh}$ are less than 1, the gradient norm decays exponentially toward zero, preventing the network from learning long-term dependencies.',
    marks: 2,
    unitId: 'unit-4',
    unitNumber: 4,
    topicId: 'u4-t7',
    topicTitle: 'Vanishing Gradient Problem',
    bloomLevel: 'K4',
    difficulty: 'Hard',
    tags: ['Vanishing Gradient', 'RNN'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u4-2m-5',
    question: 'What is Gradient Clipping and what problem does it solve?',
    answer: 'Gradient Clipping rescales parameter gradients if their L2 norm exceeds a pre-defined threshold: $g := (\\text{threshold} / \\|g\\|) \\cdot g$. It solves the Exploding Gradient Problem in recurrent networks, preventing numerical NaN overflows.',
    marks: 2,
    unitId: 'unit-4',
    unitNumber: 4,
    topicId: 'u4-t8',
    topicTitle: 'Exploding Gradient Problem',
    bloomLevel: 'K2',
    difficulty: 'Medium',
    tags: ['Gradient Clipping', 'Exploding Gradients'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u4-2m-6',
    question: 'Name the three gates present in an LSTM cell.',
    answer: '1. Forget Gate ($f_t$): Decides what proportion of the previous cell state $C_{t-1}$ to discard.\n2. Input Gate ($i_t$): Decides what new candidate information to store in the cell state.\n3. Output Gate ($o_t$): Decides what filtered parts of the updated cell state $C_t$ to emit as hidden state $h_t$.',
    marks: 2,
    unitId: 'unit-4',
    unitNumber: 4,
    topicId: 'u4-t10',
    topicTitle: 'LSTM Gates',
    bloomLevel: 'K1',
    difficulty: 'Easy',
    tags: ['LSTM Gates', 'Listing'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u4-2m-7',
    question: 'State the Cell State update equation of an LSTM.',
    answer: 'The cell state update equation is: $C_t = f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t$, where $f_t$ is the forget gate, $C_{t-1}$ is the previous cell state, $i_t$ is the input gate, and $\\tilde{C}_t = \\tanh(W_c [h_{t-1}, x_t] + b_c)$ is the new candidate cell state.',
    marks: 2,
    unitId: 'unit-4',
    unitNumber: 4,
    topicId: 'u4-t10',
    topicTitle: 'LSTM Gates',
    bloomLevel: 'K1',
    difficulty: 'Medium',
    tags: ['Cell State', 'Equation'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u4-2m-8',
    question: 'How does Gated Recurrent Unit (GRU) differ from LSTM?',
    answer: 'GRU merges the cell state and hidden state into a single state vector $h_t$, and uses only two gates (Reset Gate and Update Gate) instead of LSTM\'s three gates. This reduces parameter count by ~25% and improves computational speed with comparable empirical accuracy.',
    marks: 2,
    unitId: 'unit-4',
    unitNumber: 4,
    topicId: 'u4-t11',
    topicTitle: 'GRU',
    bloomLevel: 'K2',
    difficulty: 'Medium',
    tags: ['GRU vs LSTM', 'Differences'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u4-2m-9',
    question: 'What is a Bidirectional RNN and why is it useful?',
    answer: 'A Bidirectional RNN processes a sequence simultaneously in two directions: forward (from past to future) and backward (from future to past), concatenating both hidden states at each step. This gives predictions full context of both past and upcoming words in tasks like Named Entity Recognition.',
    marks: 2,
    unitId: 'unit-4',
    unitNumber: 4,
    topicId: 'u4-t12',
    topicTitle: 'Bidirectional RNN',
    bloomLevel: 'K2',
    difficulty: 'Easy',
    tags: ['Bidirectional RNN', 'BiLSTM'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u4-2m-10',
    question: 'State two natural language processing tasks where RNNs/LSTMs are applied.',
    answer: '1. Machine Translation: Translating a sentence from a source language to a target language using an Encoder-Decoder Seq2Seq LSTM.\n2. Sentiment Analysis: Classifying customer review sequences into positive, negative, or neutral sentiment polarities.',
    marks: 2,
    unitId: 'unit-4',
    unitNumber: 4,
    topicId: 'u4-t13',
    topicTitle: 'RNN Applications',
    bloomLevel: 'K1',
    difficulty: 'Easy',
    tags: ['Applications', 'NLP'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u4-2m-11',
    question: 'What is the primary computational bottleneck of RNN architectures during GPU training?',
    answer: 'Sequential dependency across time steps: because the hidden state $h_t$ is a direct function of $h_{t-1}$, time steps must be computed serially one after another, preventing parallel processing across the sequence length on GPU hardware.',
    marks: 2,
    unitId: 'unit-4',
    unitNumber: 4,
    topicId: 'u4-t3',
    topicTitle: 'RNN Architecture',
    bloomLevel: 'K4',
    difficulty: 'Medium',
    tags: ['Sequential Bottleneck', 'GPU Parallelism'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },

  // ================= UNIT IV: LONG ANSWER QUESTIONS (5 questions) =================
  {
    id: 'q-u4-long-1',
    question: 'Explain Long Short-Term Memory (LSTM) networks in detail. Include architectural diagrams, mathematical equations for all gates, the cell state update rule, and explain how LSTMs solve the vanishing gradient problem.',
    answer: `### 1. Introduction
Long Short-Term Memory (LSTM) was designed by Sepp Hochreiter and Jürgen Schmidhuber in 1997 to overcome the vanishing gradient problem in standard recurrent neural networks. It has been a standard architecture for machine translation, speech recognition, and time-series modeling.

### 2. Definition
An LSTM is a gated recurrent neural network architecture that maintains a dedicated memory channel called the Cell State ($C_t$), whose updates are regulated by three non-linear gates: the Forget Gate, Input Gate, and Output Gate.

### 3. Architectural Diagram
\`\`\`
                         C_{t-1} ───────────────────(x)─────────────────(+)───────────────> C_t
                                                     ▲                   ▲
                                                     │                   │
                                                     │              [~C_t * i_t]
                                                     │                   │
                                               [f_t: Forget]     [i_t: Input] * [~C_t: Tanh]
                                                     ▲                   ▲
                                                     │                   │
  [h_{t-1}, x_t] ────────────────────────────────────┴───────────────────┴───> [o_t: Output]
                                                                                       │
                                                                                       ▼
                         h_t <──────────────────────────────────────────────────── [ o_t * tanh(C_t) ]
\`\`\`

### 4. Mathematical Equations for the 6 Core Operations
Given input $x_t$ and previous hidden state $h_{t-1}$:
1. **Forget Gate ($f_t$):**
   $$f_t = \\sigma(W_f \\cdot [h_{t-1}, x_t] + b_f)$$
2. **Input Gate ($i_t$):**
   $$i_t = \\sigma(W_i \\cdot [h_{t-1}, x_t] + b_i)$$
3. **Candidate Cell State ($\\tilde{C}_t$):**
   $$\\tilde{C}_t = \\tanh(W_c \\cdot [h_{t-1}, x_t] + b_c)$$
4. **Cell State Update ($C_t$):**
   $$C_t = f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t$$
5. **Output Gate ($o_t$):**
   $$o_t = \\sigma(W_o \\cdot [h_{t-1}, x_t] + b_o)$$
6. **Hidden State Output ($h_t$):**
   $$h_t = o_t \\odot \\tanh(C_t)$$

### 5. How LSTMs Solve the Vanishing Gradient Problem
In a standard RNN, $\\frac{\\partial h_t}{\\partial h_{t-1}}$ involves multiplying by weight matrix $W_{hh}^T$ and saturating $\\tanh'$ derivatives, causing gradients to vanish exponentially.
In an LSTM, the derivative of the cell state is:
$$\\frac{\\partial C_t}{\\partial C_{t-1}} = f_t$$
Because the cell state update is **additive**, error gradients propagate back through the cell state channel via multiplication by $f_t$. If the network learns to keep $f_t \\approx 1$, gradients flow across hundreds of time steps with zero exponential decay!

### 6. Advantages
- Bridges temporal dependencies across hundreds of time steps.
- Gating mechanisms dynamically regulate remembering and forgetting.

### 7. Limitations
- 4x more parameters than a vanilla RNN.
- Inherently sequential, preventing GPU parallelization during training.

### 8. Applications
- Machine translation, speech-to-text, and ECG anomaly detection.

### 9. Conclusion
By creating an additive cell state channel regulated by multiplicative gates, LSTMs solved the vanishing gradient problem, dominating sequential deep learning for two decades.`,
    marks: 16,
    unitId: 'unit-4',
    unitNumber: 4,
    topicId: 'u4-t9',
    topicTitle: 'LSTM',
    bloomLevel: 'K4',
    difficulty: 'Hard',
    tags: ['LSTM Architecture', '16 Marks', 'Full Equations'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u4-long-2',
    question: 'Explain Backpropagation Through Time (BPTT) in Recurrent Neural Networks and derive why the Vanishing and Exploding Gradient problems occur.',
    answer: `### 1. Introduction
Training Recurrent Neural Networks requires computing loss gradients with respect to shared weight matrices across temporal sequences. Backpropagation Through Time (BPTT) unrolls the recurrent loop over time to apply the calculus chain rule.

### 2. Recurrent Formulation & Unrolling
At step $t$:
$$h_t = \\tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)$$
Total loss over sequence of length $T$:
$$L = \\sum_{t=1}^T L_t$$

### 3. Derivation of the Gradient
To compute $\\frac{\\partial L}{\\partial W_{hh}}$:
$$\\frac{\\partial L}{\\partial W_{hh}} = \\sum_{t=1}^T \\frac{\\partial L_t}{\\partial W_{hh}} = \\sum_{t=1}^T \\sum_{k=1}^t \\frac{\\partial L_t}{\\partial h_t} \\frac{\\partial h_t}{\\partial h_k} \\frac{\\partial h_k}{\\partial W_{hh}}$$
The critical term is the temporal Jacobian chain:
$$\\frac{\\partial h_t}{\\partial h_k} = \\prod_{j=k+1}^t \\frac{\\partial h_j}{\\partial h_{j-1}} = \\prod_{j=k+1}^t W_{hh}^T \\text{diag}(1 - h_j^2)$$

### 4. Mathematical Origin of Vanishing & Exploding Gradients
Let $\\gamma$ denote the largest eigenvalue of $W_{hh}^T$:
- **Vanishing Gradient:** Since $|1 - h_j^2| \\le 1$, if $\\gamma < 1$, then $\\prod_{j=k+1}^t W_{hh}^T$ decays as $\\gamma^{t-k}$. For $t - k = 50$, $0.9^{50} \\approx 0.005$, causing early gradients to vanish completely.
- **Exploding Gradient:** If $\\gamma > 1$, the matrix power diverges as $\\gamma^{t-k} \\to \\infty$, causing numerical overflow (NaN).

### 5. Mitigation Strategies
- **Exploding Gradients:** Gradient Clipping.
- **Vanishing Gradients:** LSTM/GRU architectures with additive skip highways and orthogonal weight initialization.`,
    marks: 13,
    unitId: 'unit-4',
    unitNumber: 4,
    topicId: 'u4-t6',
    topicTitle: 'Backpropagation Through Time',
    bloomLevel: 'K4',
    difficulty: 'Hard',
    tags: ['BPTT', 'Vanishing Gradients', '13 Marks'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u4-long-3',
    question: 'Explain the Gated Recurrent Unit (GRU) architecture and compare it thoroughly with the LSTM architecture.',
    answer: `### 1. Introduction
The Gated Recurrent Unit (GRU), introduced by Kyunghyun Cho et al. in 2014, was designed as a simpler, more computationally efficient alternative to the LSTM.

### 2. GRU Mathematical Formulation
1. **Reset Gate ($r_t$):**
   $$r_t = \\sigma(W_r \\cdot [h_{t-1}, x_t] + b_r)$$
   Determines how much of the past hidden state to forget when computing candidate activations.
2. **Update Gate ($z_t$):**
   $$z_t = \\sigma(W_z \\cdot [h_{t-1}, x_t] + b_z)$$
   Acts simultaneously as both forget and input gate.
3. **Candidate Hidden State ($\\tilde{h}_t$):**
   $$\\tilde{h}_t = \\tanh(W_h \\cdot [r_t \\odot h_{t-1}, x_t] + b_h)$$
4. **Hidden State Output ($h_t$):**
   $$h_t = (1 - z_t) \\odot h_{t-1} + z_t \\odot \\tilde{h}_t$$

### 3. Comprehensive Comparison Table
| Feature | LSTM | GRU |
|---|---|---|
| **Number of Gates** | 3 (Forget, Input, Output) | 2 (Reset, Update) |
| **State Channels** | 2 separate states (Cell State $C_t$ and Hidden State $h_t$) | 1 unified state ($h_t$) |
| **Parameter Count** | $4 \\times (d + h) \\times h$ | $3 \\times (d + h) \\times h$ (~25% fewer) |
| **Computational Speed**| Slower due to more matrix multiplications | Faster execution and lower VRAM |
| **Performance** | Excels on long, complex dependency tasks | Comparable performance with faster training |

### 4. Conclusion
GRU achieves comparable modeling capability to LSTM while cutting parameter overhead and training time by roughly 25%.`,
    marks: 8,
    unitId: 'unit-4',
    unitNumber: 4,
    topicId: 'u4-t11',
    topicTitle: 'GRU',
    bloomLevel: 'K4',
    difficulty: 'Medium',
    tags: ['GRU vs LSTM', '8 Marks', 'Architecture'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u4-long-4',
    question: 'Explain the working of Bidirectional Recurrent Neural Networks (BiRNN) with diagrams and equations.',
    answer: `### 1. Concept & Architecture
Standard unidirectional RNNs only incorporate past information. A Bidirectional RNN runs two independent recurrent layers simultaneously:
1. **Forward RNN ($\overrightarrow{h}_t$):** Processes inputs chronologically from $t=1$ to $t=T$.
2. **Backward RNN ($\overleftarrow{h}_t$):** Processes inputs in reverse chronological order from $t=T$ down to $t=1$.

### 2. Equations
$$\\overrightarrow{h}_t = \\tanh(\\overrightarrow{W}_{xh} x_t + \\overrightarrow{W}_{hh} \\overrightarrow{h}_{t-1} + \\overrightarrow{b})$$
$$\\overleftarrow{h}_t = \\tanh(\\overleftarrow{W}_{xh} x_t + \\overleftarrow{W}_{hh} \\overleftarrow{h}_{t+1} + \\overleftarrow{b})$$
Combined representation:
$$h_t = [\\overrightarrow{h}_t ; \\overleftarrow{h}_t] \\quad (\\text{Concatenation})$$

### 3. Use Case Example
In speech or text recognition, recognizing a word depends heavily on subsequent words. BiRNN ensures every token has full awareness of both its past history and its future context.`,
    marks: 5,
    unitId: 'unit-4',
    unitNumber: 4,
    topicId: 'u4-t12',
    topicTitle: 'Bidirectional RNN',
    bloomLevel: 'K2',
    difficulty: 'Medium',
    tags: ['Bidirectional RNN', '5 Marks'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u4-long-5',
    question: 'Explain the Seq2Seq (Encoder-Decoder) architecture and describe how the Attention Mechanism resolves its limitations.',
    answer: `### 1. Seq2Seq Architecture
The Encoder-Decoder framework (Sutskever et al., 2014) maps variable-length input sequences to variable-length output sequences:
- **Encoder:** Reads the source sequence and condenses it into a single fixed-size context vector $c$ (the final hidden state).
- **Decoder:** Generates target tokens step by step, initialized with vector $c$.

### 2. The Information Bottleneck
Compressing a long 50-word sentence into a single 512-dimensional vector creates an informational bottleneck: details from earlier words are lost, causing translation quality to degrade sharply on longer sentences.

### 3. How Attention Resolves This
Instead of a single static vector, the Attention Mechanism (Bahdanau et al., 2014) creates dynamic context vectors:
- The decoder looks back at all intermediate encoder hidden states $h_1, \\dots, h_T$.
- Attention weights $\\alpha_{t,i}$ quantify the relevance of each source word to the current target word.
- Dynamic context vector: $c_t = \\sum_i \\alpha_{t,i} h_i$, eliminating the information bottleneck.`,
    marks: 5,
    unitId: 'unit-4',
    unitNumber: 4,
    topicId: 'u4-t13',
    topicTitle: 'RNN Applications',
    bloomLevel: 'K3',
    difficulty: 'Medium',
    tags: ['Seq2Seq', 'Attention', '5 Marks'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },

  // ================= UNIT V: 2-MARK QUESTIONS (11 questions) =================
  {
    id: 'q-u5-2m-1',
    question: 'Define an Autoencoder.',
    answer: 'An Autoencoder is an unsupervised artificial neural network trained to reconstruct its input at its output layer by compressing the data into a lower-dimensional latent bottleneck representation (code) through an Encoder-Decoder architecture.',
    marks: 2,
    unitId: 'unit-5',
    unitNumber: 5,
    topicId: 'u5-t1',
    topicTitle: 'Autoencoders',
    bloomLevel: 'K1',
    difficulty: 'Easy',
    tags: ['Autoencoder', 'Definition'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u5-2m-2',
    question: 'What is a Denoising Autoencoder (DAE)?',
    answer: 'A Denoising Autoencoder is trained by intentionally adding noise to the input data $\\tilde{x} \\sim q(\\tilde{x}|x)$ and tasking the network with reconstructing the original clean input $x$. This forces the autoencoder to learn robust manifold representations rather than a trivial identity function.',
    marks: 2,
    unitId: 'unit-5',
    unitNumber: 5,
    topicId: 'u5-t1',
    topicTitle: 'Autoencoders',
    bloomLevel: 'K2',
    difficulty: 'Medium',
    tags: ['Denoising Autoencoder', 'Manifold'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u5-2m-3',
    question: 'State the Two-Player Minimax game equation of GANs.',
    answer: 'The minimax objective function of GANs is: $\\min_G \\max_D V(D, G) = \\mathbb{E}_{x \\sim p_{\\text{data}}}[\\log D(x)] + \\mathbb{E}_{z \\sim p_z}[\\log(1 - D(G(z)))]$, where $D$ tries to maximize correct classification and $G$ tries to fool $D$.',
    marks: 2,
    unitId: 'unit-5',
    unitNumber: 5,
    topicId: 'u5-t5',
    topicTitle: 'GAN',
    bloomLevel: 'K1',
    difficulty: 'Medium',
    tags: ['GAN', 'Minimax Equation'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u5-2m-4',
    question: 'What is "Mode Collapse" in GAN training?',
    answer: 'Mode Collapse is a training failure mode where the Generator produces only a limited subset or single mode of realistic outputs (e.g. generating only one digit style) that tricks the Discriminator, failing to capture the full diversity of the real dataset distribution.',
    marks: 2,
    unitId: 'unit-5',
    unitNumber: 5,
    topicId: 'u5-t8',
    topicTitle: 'GAN Training',
    bloomLevel: 'K4',
    difficulty: 'Medium',
    tags: ['Mode Collapse', 'GAN'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u5-2m-5',
    question: 'State the Scaled Dot-Product Attention equation in Transformers.',
    answer: 'The Scaled Dot-Product Attention formula is: $\\text{Attention}(Q, K, V) = \\text{softmax}\\left( \\frac{Q K^T}{\\sqrt{d_k}} \\right) V$, where $Q$ is Queries, $K$ is Keys, $V$ is Values, and $d_k$ is the dimensionality of the key vectors.',
    marks: 2,
    unitId: 'unit-5',
    unitNumber: 5,
    topicId: 'u5-t9',
    topicTitle: 'Attention Mechanism',
    bloomLevel: 'K1',
    difficulty: 'Easy',
    tags: ['Attention Formula', 'Transformers'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u5-2m-6',
    question: 'Why are Positional Encodings required in Transformer models?',
    answer: 'Because self-attention operates on sets of tokens simultaneously without recurrence or convolution, the Transformer architecture is permutation-invariant. Positional Encodings inject sinusoidal or learned position vectors into token embeddings to inform the model of word order.',
    marks: 2,
    unitId: 'unit-5',
    unitNumber: 5,
    topicId: 'u5-t10',
    topicTitle: 'Transformers',
    bloomLevel: 'K2',
    difficulty: 'Medium',
    tags: ['Positional Encoding', 'Order Awareness'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u5-2m-7',
    question: 'What is Multi-Head Attention and what is its benefit?',
    answer: 'Multi-Head Attention linearly projects Queries, Keys, and Values into $h$ different subspaces, computes attention in parallel across each head, and concatenates the results. It allows the model to jointly attend to information from different representation subspaces (e.g., syntax, semantics, coreference) simultaneously.',
    marks: 2,
    unitId: 'unit-5',
    unitNumber: 5,
    topicId: 'u5-t10',
    topicTitle: 'Transformers',
    bloomLevel: 'K2',
    difficulty: 'Medium',
    tags: ['Multi-Head Attention', 'Subspaces'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u5-2m-8',
    question: 'What is the Reparameterization Trick in Variational Autoencoders (VAEs)?',
    answer: 'The Reparameterization Trick re-expresses the stochastic latent variable $z$ as a deterministic function: $z = \\mu(x) + \\sigma(x) \\odot \\epsilon$, where $\\epsilon \\sim \\mathcal{N}(0, I)$ is an external random noise vector. This allows backpropagation gradients to flow through $\\mu$ and $\\sigma$.',
    marks: 2,
    unitId: 'unit-5',
    unitNumber: 5,
    topicId: 'u5-t4',
    topicTitle: 'Variational Autoencoder',
    bloomLevel: 'K4',
    difficulty: 'Hard',
    tags: ['Reparameterization Trick', 'VAE'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u5-2m-9',
    question: 'Define Transfer Learning and state its primary advantage.',
    answer: 'Transfer Learning is a technique where a model pre-trained on a massive source dataset (e.g., ImageNet or Common Crawl) is reused and fine-tuned on a smaller target dataset. Its primary advantage is achieving high performance with limited target data while drastically reducing training time.',
    marks: 2,
    unitId: 'unit-5',
    unitNumber: 5,
    topicId: 'u5-t11',
    topicTitle: 'Transfer Learning',
    bloomLevel: 'K1',
    difficulty: 'Easy',
    tags: ['Transfer Learning', 'Advantages'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u5-2m-10',
    question: 'What is Self-Supervised Learning? Give one example.',
    answer: 'Self-Supervised Learning is a learning paradigm where supervisory labels are generated automatically from the raw data itself through a pretext task without human labeling. Example: Masked Language Modeling in BERT, where 15% of words are masked and the model learns to predict the missing words.',
    marks: 2,
    unitId: 'unit-5',
    unitNumber: 5,
    topicId: 'u5-t12',
    topicTitle: 'Self-Supervised Learning',
    bloomLevel: 'K2',
    difficulty: 'Medium',
    tags: ['Self-Supervised', 'BERT'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u5-2m-11',
    question: 'State two frontier real-world applications of deep learning.',
    answer: '1. Autonomous Driving: Real-time sensor fusion, 3D object detection, and path trajectory forecasting in self-driving vehicles.\n2. Structural Biology & Drug Discovery: AlphaFold 2 predicting 3D protein atomic folds to accelerate targeted medicine design.',
    marks: 2,
    unitId: 'unit-5',
    unitNumber: 5,
    topicId: 'u5-t13',
    topicTitle: 'Applications of Deep Learning',
    bloomLevel: 'K1',
    difficulty: 'Easy',
    tags: ['Applications', 'AlphaFold'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },

  // ================= UNIT V: LONG ANSWER QUESTIONS (5 questions) =================
  {
    id: 'q-u5-long-1',
    question: 'Explain the Transformer architecture in detail based on the paper "Attention Is All You Need". Detail the Multi-Head Attention mechanism, Positional Encoding, and Feed-Forward sublayers.',
    answer: `### 1. Introduction
The Transformer (Vaswani et al., 2017) revolutionized natural language processing and deep learning by completely eliminating recurrence and convolutions. By relying solely on self-attention mechanisms, Transformers enable massive GPU parallelization and serve as the backbone for modern LLMs (BERT, GPT, Claude, Gemini).

### 2. Definition
A Transformer is a sequence-to-sequence deep learning architecture composed of stacked Encoder and Decoder blocks that model dependencies between tokens in parallel through multi-head self-attention and position-wise feedforward networks.

### 3. Full Architectural Diagram
\`\`\`
          [ Output Probabilities ]
                     ▲
                 [ Softmax ]
                     ▲
             [ Linear Classifier ]
                     ▲
       ┌───────────────────────────┐
       │   Decoder Block (x N)     │
       │  - Masked MHA & Norm      │
       │  - Cross-MHA & Norm <─────┼────────┐
       │  - FFN & Norm             │        │
       └───────────────────────────┘        │
                     ▲                      │
       ┌───────────────────────────┐        │
       │   Encoder Block (x N)     │        │
       │  - Multi-Head Attn & Norm │        │
       │  - Feed-Forward & Norm    │────────┘
       └───────────────────────────┘
                     ▲
      [ Positional Encoding + Embeddings ]
\`\`\`

### 4. Key Architectural Components
#### A. Scaled Dot-Product Attention
$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left( \\frac{Q K^T}{\\sqrt{d_k}} \\right) V$$
- $Q$ (Query), $K$ (Key), $V$ (Value) are projected representations.
- Scaling factor $\\frac{1}{\\sqrt{d_k}}$ prevents large dot products from pushing Softmax into saturated regions with vanishing gradients.

#### B. Multi-Head Attention (MHA)
$$\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h) W^O$$
$$\\text{head}_i = \\text{Attention}(Q W_i^Q, K W_i^K, V W_i^V)$$
Allows the model to attend to information from different representation subspaces at different positions simultaneously.

#### C. Positional Encoding
Since self-attention is permutation-invariant, word order is encoded using fixed sinusoidal functions:
$$PE_{(pos, 2i)} = \\sin\\left( \\frac{pos}{10000^{2i/d_{\\text{model}}}} \\right)$$
$$PE_{(pos, 2i+1)} = \\cos\\left( \\frac{pos}{10000^{2i/d_{\\text{model}}}} \\right)$$

#### D. Position-Wise Feed-Forward Networks (FFN)
Each layer contains a fully connected feed-forward network applied to each position separately and identically:
$$\\text{FFN}(x) = \\max(0, x W_1 + b_1) W_2 + b_2$$

#### E. Residual Connections & Layer Normalization (Add & Norm)
Every sub-layer uses a residual connection followed by Layer Normalization: $\\text{LayerNorm}(x + \\text{Sublayer}(x))$.

### 5. Advantages
- Parallel training: Tokens process concurrently, eliminating the sequential bottleneck of RNNs.
- $O(1)$ path length between any two tokens in a sequence, eliminating long-term dependency decay.

### 6. Limitations
- Quadratic complexity $O(N^2)$ in time and memory with respect to sequence length $N$.

### 7. Conclusion
Transformers replaced recurrent networks by proving that self-attention mechanisms alone can model temporal dependencies, serving as the foundational architecture for modern generative AI.`,
    marks: 16,
    unitId: 'unit-5',
    unitNumber: 5,
    topicId: 'u5-t10',
    topicTitle: 'Transformers',
    bloomLevel: 'K4',
    difficulty: 'Hard',
    tags: ['Transformers', '16 Marks', 'Attention Is All You Need'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u5-long-2',
    question: 'Explain Generative Adversarial Networks (GANs) in detail. Include the roles of Generator and Discriminator, the minimax objective function, training procedure, and challenges such as mode collapse.',
    answer: `### 1. Introduction
Generative Adversarial Networks (GANs), proposed by Ian Goodfellow et al. in 2014, introduced a competitive game-theoretic framework for generative modeling that synthesizes photorealistic data without explicit probability density estimations.

### 2. Definition & Game Formulation
A GAN pits two neural networks against each other in a zero-sum minimax game:
1. **Generator $G(z)$:** Maps random noise $z \\sim p_z(z)$ to synthetic data $G(z)$, aiming to fool the Discriminator.
2. **Discriminator $D(x)$:** A binary classifier that estimates the probability that sample $x$ came from real training data rather than $G$.

### 3. Minimax Value Function
$$\\min_G \\max_D V(D, G) = \\mathbb{E}_{x \\sim p_{\\text{data}}(x)}[\\log D(x)] + \\mathbb{E}_{z \\sim p_z(z)}[\\log(1 - D(G(z)))]$$
- $D$ seeks to maximize $V(D, G)$, driving $D(x) \\to 1$ and $D(G(z)) \\to 0$.
- $G$ seeks to minimize $V(D, G)$, driving $D(G(z)) \\to 1$.

### 4. Diagram
\`\`\`
   Real Images x ───────┐
                        ▼
   Noise Vector z ──> [ Generator G ] ──> Fake Image G(z) ──> [ Discriminator D ] ──> Real (1) / Fake (0)
\`\`\`

### 5. Training Algorithm
1. **Train Discriminator:**
   - Sample mini-batch of real images $x^{(1)}, \\dots, x^{(m)}$.
   - Sample mini-batch of noise vectors $z^{(1)}, \\dots, z^{(m)}$.
   - Update $D$ by ascending stochastic gradient: $\\nabla_{\\theta_d} \\frac{1}{m} \\sum_{i=1}^m [\\log D(x^{(i)}) + \\log(1 - D(G(z^{(i)})))]$.
2. **Train Generator:**
   - Sample new mini-batch of noise vectors $z^{(1)}, \\dots, z^{(m)}$.
   - Update $G$ by descending gradient: $\\nabla_{\\theta_g} \\frac{1}{m} \\sum_{i=1}^m \\log(1 - D(G(z^{(i)})))$ (or maximizing $\\log D(G(z))$ to prevent early saturation).

### 6. Training Challenges
- **Mode Collapse:** The generator discovers a single output (or few outputs) that fools the discriminator and repeats it constantly, failing to capture dataset diversity.
- **Vanishing Gradients:** If $D$ learns too fast, $D(G(z)) \\to 0$ and gradients vanish for $G$.
- **Wasserstein GAN (WGAN) Solution:** Replaces Jensen-Shannon divergence with Earth Mover\'s Distance and enforces 1-Lipschitz continuity to maintain smooth gradients everywhere.

### 7. Applications
- Image synthesis (StyleGAN), image translation (Pix2Pix, CycleGAN), and super-resolution (SRGAN).`,
    marks: 13,
    unitId: 'unit-5',
    unitNumber: 5,
    topicId: 'u5-t5',
    topicTitle: 'GAN',
    bloomLevel: 'K4',
    difficulty: 'Hard',
    tags: ['GAN', 'Minimax', '13 Marks'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u5-long-3',
    question: 'Explain the working of Variational Autoencoders (VAEs). How do they differ from standard autoencoders, and why is the Reparameterization Trick needed?',
    answer: `### 1. Introduction
Standard Autoencoders compress inputs into deterministic latent points, leaving gaps in latent space that make random sampling ineffective for generation. Variational Autoencoders (Kingma & Welling, 2013) solve this by learning probabilistic distributions.

### 2. Architecture & Latent Distribution
Instead of mapping input $x$ to a single point $z$, the VAE encoder outputs parameters of a probability distribution:
- Mean vector $\\mu(x)$
- Variance / log-variance vector $\\sigma^2(x)$
The latent code is sampled as $z \\sim q_\\phi(z|x) = \\mathcal{N}(\\mu, \\sigma^2 I)$.

### 3. Loss Function (ELBO)
$$\\mathcal{L}_{\\text{VAE}} = \\mathbb{E}_{q_\\phi(z|x)}[\\log p_\\theta(x|z)] - D_{\\text{KL}}(q_\\phi(z|x) \\parallel p(z))$$
1. **Reconstruction Loss:** Ensures the decoded output $\\hat{x}$ closely resembles input $x$.
2. **Kullback-Leibler (KL) Divergence:** Acts as a regularizer, penalizing deviation from standard normal prior $p(z) = \\mathcal{N}(0, I)$ to keep latent space smooth and continuous.

### 4. The Reparameterization Trick
Direct random sampling $z \\sim \\mathcal{N}(\\mu, \\sigma^2)$ is non-differentiable (stochastic nodes block backpropagation).
The reparameterization trick rewrites sampling as:
$$z = \\mu + \\sigma \\odot \\epsilon, \\quad \\text{where } \\epsilon \\sim \\mathcal{N}(0, I)$$
Here, randomness comes from an auxiliary parameter $\\epsilon$. Since $\\mu$ and $\\sigma$ are now deterministic transformation nodes, gradients flow through them back into encoder weights.`,
    marks: 15,
    unitId: 'unit-5',
    unitNumber: 5,
    topicId: 'u5-t4',
    topicTitle: 'Variational Autoencoder',
    bloomLevel: 'K4',
    difficulty: 'Hard',
    tags: ['VAE', 'Reparameterization Trick', '15 Marks'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u5-long-4',
    question: 'Discuss Transfer Learning strategies in Deep Learning. When should a practitioner freeze backbone weights versus fine-tuning the entire network?',
    answer: `### 1. Introduction
Transfer Learning leverages knowledge acquired by a model trained on a massive source task (e.g., ImageNet with 1.4 million images) and applies it to a target task with limited training data.

### 2. Strategy Decision Matrix
The optimal transfer learning strategy depends on two factors: target dataset size and target dataset similarity to the source domain:
1. **Small Dataset, High Similarity:** Freeze the entire pre-trained backbone. Train only the newly attached linear classification head to avoid overfitting.
2. **Large Dataset, High Similarity:** Fine-tune all layers with a very small learning rate (e.g., $10^{-5}$) to gently adapt pre-trained features without catastrophic forgetting.
3. **Small Dataset, Low Similarity:** Challenging scenario. Freeze early layers (which capture general edges/shapes) and fine-tune intermediate and final layers.
4. **Large Dataset, Low Similarity:** Train the entire network from pre-trained weights with fine-tuning, or train from scratch if compute permits.

### 3. Conclusion
Transfer learning significantly lowers training cost, reduces data requirements, and accelerates convergence, making it a cornerstone of modern practical deep learning workflows.`,
    marks: 8,
    unitId: 'unit-5',
    unitNumber: 5,
    topicId: 'u5-t11',
    topicTitle: 'Transfer Learning',
    bloomLevel: 'K3',
    difficulty: 'Medium',
    tags: ['Transfer Learning', '8 Marks', 'Fine-Tuning'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'q-u5-long-5',
    question: 'Explain Self-Supervised Learning and describe contrastive learning and masked autoencoding.',
    answer: `### 1. Introduction
Supervised learning requires costly manual labeling. Self-Supervised Learning solves this by generating supervisory labels directly from unlabelled data through clever pretext tasks.

### 2. Core Approaches
1. **Masked Autoencoding (e.g., BERT, MAE):** Randomly hides a fraction of the input (words in text or patches in images) and trains the model to reconstruct the missing elements, forcing it to learn contextual semantics.
2. **Contrastive Learning (e.g., SimCLR, MoCo):** Creates two augmented views of the same image (positive pair) and compares them against different images (negative pairs), pulling positive views closer in latent space and pushing negative views apart.

### 3. Impact
Self-supervised pre-training enables foundation models (LLMs, Vision Transformers) to train on internet-scale data without manual annotation.`,
    marks: 5,
    unitId: 'unit-5',
    unitNumber: 5,
    topicId: 'u5-t12',
    topicTitle: 'Self-Supervised Learning',
    bloomLevel: 'K2',
    difficulty: 'Medium',
    tags: ['Self-Supervised Learning', '5 Marks'],
    status: 'published',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  }
];

export const questions = initialQuestions;
