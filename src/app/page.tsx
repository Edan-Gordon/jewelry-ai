'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

const JewelryQuiz = dynamic(() => import('../components/JewelryQuiz'), {
  ssr: false,
});

const JewelryResults = dynamic(() => import('../components/JewelryResults'), {
  ssr: false,
});

// Mock data for demonstration - in a real app, this would come from an API
const mockRecommendations = [
  {
    id: '1',
    name: 'Vintage Rose Gold Diamond Ring',
    description: 'A stunning vintage-inspired ring featuring a 1-carat diamond in rose gold setting',
    price: 2499,
    image: 'https://via.placeholder.com/400x400.png?text=Vintage+Ring',
    style: 'vintage',
    metal: 'rose-gold',
  },
  {
    id: '2',
    name: 'Modern Minimalist Platinum Necklace',
    description: 'Clean lines and contemporary design define this elegant platinum pendant',
    price: 1899,
    image: 'https://via.placeholder.com/400x400.png?text=Modern+Necklace',
    style: 'minimal',
    metal: 'platinum',
  },
  {
    id: '3',
    name: 'Nature-Inspired Gold Bracelet',
    description: 'Delicate leaf patterns crafted in yellow gold with diamond accents',
    price: 1599,
    image: 'https://via.placeholder.com/400x400.png?text=Nature+Bracelet',
    style: 'nature',
    metal: 'yellow-gold',
  },
];

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuizComplete = async (answers: Record<number, string>) => {
    setIsLoading(true);
    // Simulate API call to get recommendations
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setShowResults(true);
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-cream-white">
      <header className="bg-soft-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display text-center mb-4"
          >
            Discover Your Perfect Jewelry
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-center text-gray-300"
          >
            Let our AI help you find pieces that match your unique style
          </motion.p>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {!showResults && !isLoading && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <JewelryQuiz onComplete={handleQuizComplete} />
          </motion.div>
        )}

        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[400px]"
          >
            <div className="w-16 h-16 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-lg text-soft-black">
              Curating your perfect collection...
            </p>
          </motion.div>
        )}

        {showResults && !isLoading && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <JewelryResults recommendations={mockRecommendations} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
} 