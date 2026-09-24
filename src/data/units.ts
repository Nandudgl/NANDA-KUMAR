import { Unit } from '../types';

export const initialUnits: Unit[] = [
  {
    id: 'unit-1',
    unitNumber: 1,
    code: 'UNIT I',
    unitTitle: 'INTRODUCTION TO DEEP LEARNING',
    description: 'Fundamentals of Artificial Intelligence, biological vs artificial neurons, Perceptron model, activation functions, loss functions, gradient descent, and backpropagation basics.',
    order: 1,
    status: 'active',
  },
  {
    id: 'unit-2',
    unitNumber: 2,
    code: 'UNIT II',
    unitTitle: 'DEEP NEURAL NETWORKS',
    description: 'Feedforward architectures, Multilayer Perceptrons (MLP), forward/backpropagation dynamics, optimizers (SGD, Momentum, Adam), Batch Normalization, Dropout, and regularization strategies.',
    order: 2,
    status: 'active',
  },
  {
    id: 'unit-3',
    unitNumber: 3,
    code: 'UNIT III',
    unitTitle: 'CONVOLUTIONAL NEURAL NETWORKS',
    description: 'Grid & spatial visual processing, convolution operation, kernels, stride, padding, pooling methods, feature maps, flattening, fully connected layers, CNN training and computer vision applications.',
    order: 3,
    status: 'active',
  },
  {
    id: 'unit-4',
    unitNumber: 4,
    code: 'UNIT IV',
    unitTitle: 'RECURRENT NEURAL NETWORKS',
    description: 'Sequential & temporal modeling, hidden state representations, Backpropagation Through Time (BPTT), vanishing/exploding gradients, Long Short-Term Memory (LSTM), GRU, and Bidirectional RNNs.',
    order: 4,
    status: 'active',
  },
  {
    id: 'unit-5',
    unitNumber: 5,
    code: 'UNIT V',
    unitTitle: 'ADVANCED DEEP LEARNING',
    description: 'Autoencoders, Variational Autoencoders (VAEs), Generative Adversarial Networks (GANs), Self-Attention Mechanisms, Transformer architectures, Transfer Learning, and state-of-the-art applications.',
    order: 5,
    status: 'active',
  },
];

export const units = initialUnits;
