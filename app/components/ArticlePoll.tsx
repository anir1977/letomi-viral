'use client';

import { useState } from 'react';

interface ArticlePollProps {
  question: string;
  articleSlug: string;
}

export default function ArticlePoll({ question, articleSlug }: ArticlePollProps) {
  const [voted, setVoted] = useState(false);
  const [results, setResults] = useState({
    yes: 45,
    no: 30,
    unsure: 25
  });
  const [userVote, setUserVote] = useState<string | null>(null);

  const handleVote = (choice: 'yes' | 'no' | 'unsure') => {
    if (voted) return;
    
    setUserVote(choice);
    setVoted(true);
    
    // Simulate vote count update
    setResults(prev => ({
      ...prev,
      [choice]: prev[choice] + 1
    }));
  };

  const total = results.yes + results.no + results.unsure;
  const getPercentage = (count: number) => Math.round((count / total) * 100);

  return (
    <div className="my-8 bg-white dark:bg-gray-800 rounded-xl border-2 border-purple-200 dark:border-purple-800 p-6 shadow-lg">
      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        📊 Quick Poll
      </h4>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        {question}
      </p>

      {!voted ? (
        <div className="space-y-3">
          <button
            onClick={() => handleVote('yes')}
            className="w-full bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-800 dark:text-green-300 py-3 px-4 rounded-lg font-semibold transition text-left"
          >
            👍 Yes
          </button>
          <button
            onClick={() => handleVote('no')}
            className="w-full bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-800 dark:text-red-300 py-3 px-4 rounded-lg font-semibold transition text-left"
          >
            👎 No
          </button>
          <button
            onClick={() => handleVote('unsure')}
            className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-300 py-3 px-4 rounded-lg font-semibold transition text-left"
          >
            🤔 I'm not sure
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-center text-green-600 dark:text-green-400 font-semibold mb-4">
            ✓ Thanks for voting!
          </p>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  👍 Yes {userVote === 'yes' && '(You)'}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {getPercentage(results.yes)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${getPercentage(results.yes)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  👎 No {userVote === 'no' && '(You)'}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {getPercentage(results.no)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-red-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${getPercentage(results.no)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  🤔 I'm not sure {userVote === 'unsure' && '(You)'}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {getPercentage(results.unsure)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gray-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${getPercentage(results.unsure)}%` }}
                />
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            {total} people have voted
          </p>
        </div>
      )}
    </div>
  );
}
