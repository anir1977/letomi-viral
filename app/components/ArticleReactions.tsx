'use client';

import { useState, useEffect } from 'react';

interface ArticleReactionsProps {
  articleSlug: string;
}

type ReactionType = 'mindblowing' | 'surprising' | 'smart' | 'loved';

interface Reactions {
  mindblowing: number;
  surprising: number;
  smart: number;
  loved: number;
}

export default function ArticleReactions({ articleSlug }: ArticleReactionsProps) {
  const [reactions, setReactions] = useState<Reactions>({
    mindblowing: 0,
    surprising: 0,
    smart: 0,
    loved: 0
  });
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);

  // Load reactions from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(`reactions-${articleSlug}`);
    if (stored) {
      setReactions(JSON.parse(stored));
    }
    
    const userStored = localStorage.getItem(`user-reaction-${articleSlug}`);
    if (userStored) {
      setUserReaction(userStored as ReactionType);
    }
  }, [articleSlug]);

  const handleReaction = (type: ReactionType) => {
    // Remove previous reaction
    if (userReaction) {
      setReactions(prev => ({
        ...prev,
        [userReaction]: Math.max(0, prev[userReaction] - 1)
      }));
    }

    // Add new reaction (or remove if clicking same one)
    if (userReaction === type) {
      setUserReaction(null);
      localStorage.removeItem(`user-reaction-${articleSlug}`);
    } else {
      const newReactions = {
        ...reactions,
        [type]: reactions[type] + 1
      };
      setReactions(newReactions);
      setUserReaction(type);
      localStorage.setItem(`reactions-${articleSlug}`, JSON.stringify(newReactions));
      localStorage.setItem(`user-reaction-${articleSlug}`, type);
    }
  };

  const reactionButtons = [
    { type: 'mindblowing' as ReactionType, emoji: '🤯', label: 'Mind-Blowing', color: 'from-orange-500 to-red-500' },
    { type: 'surprising' as ReactionType, emoji: '😮', label: 'Surprising', color: 'from-yellow-500 to-orange-500' },
    { type: 'smart' as ReactionType, emoji: '🧠', label: 'Smart', color: 'from-purple-500 to-pink-500' },
    { type: 'loved' as ReactionType, emoji: '❤️', label: 'Loved It', color: 'from-pink-500 to-red-500' }
  ];

  return (
    <div className="my-8 p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
        How did this article make you feel?
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {reactionButtons.map(({ type, emoji, label, color }) => (
          <button
            key={type}
            onClick={() => handleReaction(type)}
            className={`
              relative flex flex-col items-center gap-2 p-4 rounded-xl font-semibold
              transition-all transform hover:scale-105 active:scale-95
              focus:outline-none focus:ring-4 focus:ring-purple-300
              ${userReaction === type 
                ? `bg-gradient-to-br ${color} text-white shadow-lg` 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
            `}
            aria-label={`React with ${label}`}
          >
            <span className="text-4xl drop-shadow-lg">{emoji}</span>
            <span className="text-sm">{label}</span>
            {reactions[type] > 0 && (
              <span className={`
                absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold
                ${userReaction === type ? 'bg-white text-gray-900' : 'bg-purple-600 text-white'}
              `}>
                {reactions[type]}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
