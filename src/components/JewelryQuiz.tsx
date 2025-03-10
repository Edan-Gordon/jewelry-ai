'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Progress from '@radix-ui/react-progress';

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    image?: string;
  }[];
}

interface JewelryQuizProps {
  onComplete: (answers: Record<number, string>) => void;
}

const questions: Question[] = [
  {
    id: 1,
    text: "What's your preferred jewelry style?",
    options: [
      { id: 'minimal', text: 'Minimalist & Modern' },
      { id: 'vintage', text: 'Vintage & Classic' },
      { id: 'bold', text: 'Bold & Statement' },
      { id: 'nature', text: 'Nature-Inspired' },
    ],
  },
  {
    id: 2,
    text: 'Which metal tone speaks to you?',
    options: [
      { id: 'yellow-gold', text: 'Yellow Gold' },
      { id: 'white-gold', text: 'White Gold' },
      { id: 'rose-gold', text: 'Rose Gold' },
      { id: 'platinum', text: 'Platinum' },
    ],
  },
  {
    id: 3,
    text: 'What type of gemstones do you prefer?',
    options: [
      { id: 'diamond', text: 'Diamonds' },
      { id: 'colored', text: 'Colored Gemstones' },
      { id: 'pearl', text: 'Pearls' },
      { id: 'none', text: 'No Gemstones' },
    ],
  },
];

export default function JewelryQuiz({ onComplete }: JewelryQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (questionId: number, answerId: string) => {
    const newAnswers = { ...answers, [questionId]: answerId };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 500);
    } else {
      onComplete(newAnswers);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Progress.Root
        className="relative h-2 w-full overflow-hidden rounded-full bg-cream-white"
        value={progress}
      >
        <Progress.Indicator
          className="h-full bg-luxury-gold transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
      
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mt-8"
      >
        <h2 className="text-3xl font-display text-soft-black mb-8">
          {questions[currentQuestion].text}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {questions[currentQuestion].options.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(questions[currentQuestion].id, option.id)}
              className={`p-6 rounded-lg border-2 transition-all ${
                answers[questions[currentQuestion].id] === option.id
                  ? 'border-luxury-gold bg-luxury-gold/10'
                  : 'border-cream-white hover:border-luxury-gold/50'
              }`}
            >
              <span className="text-lg font-display">{option.text}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 