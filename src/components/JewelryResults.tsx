'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Tooltip from '@radix-ui/react-tooltip';
import { HeartIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';

interface JewelryItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  style: string;
  metal: string;
}

interface JewelryResultsProps {
  recommendations: JewelryItem[];
}

export default function JewelryResults({ recommendations }: JewelryResultsProps) {
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleSaved = (itemId: string) => {
    const newSaved = new Set(savedItems);
    if (newSaved.has(itemId)) {
      newSaved.delete(itemId);
    } else {
      newSaved.add(itemId);
    }
    setSavedItems(newSaved);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-display text-soft-black mb-8 text-center">
        Your Personalized Collection
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendations.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <div className="relative aspect-square">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button
                        onClick={() => toggleSaved(item.id)}
                        className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                      >
                        <HeartIcon
                          className={`w-6 h-6 ${
                            savedItems.has(item.id)
                              ? 'text-rose-gold fill-current'
                              : 'text-soft-black'
                          }`}
                        />
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="bg-soft-black text-white px-3 py-1 rounded text-sm"
                        sideOffset={5}
                      >
                        {savedItems.has(item.id) ? 'Remove from favorites' : 'Save to favorites'}
                        <Tooltip.Arrow className="fill-soft-black" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>

                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button
                        onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                        className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                      >
                        <ArrowsPointingOutIcon className="w-6 h-6 text-soft-black" />
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="bg-soft-black text-white px-3 py-1 rounded text-sm"
                        sideOffset={5}
                      >
                        {expandedItem === item.id ? 'Close details' : 'View details'}
                        <Tooltip.Arrow className="fill-soft-black" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>
            </div>

            <motion.div
              className="p-6"
              animate={{
                height: expandedItem === item.id ? 'auto' : '200px',
              }}
            >
              <h3 className="text-xl font-display text-soft-black mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-luxury-gold text-xl font-semibold">
                  ${item.price.toLocaleString()}
                </span>
                <button className="bg-luxury-gold text-white px-6 py-2 rounded-full hover:bg-luxury-gold/90 transition-colors">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 