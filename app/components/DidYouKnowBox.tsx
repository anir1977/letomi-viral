'use client';

import { Lightbulb } from 'lucide-react';

interface DidYouKnowBoxProps {
  fact: string;
}

export default function DidYouKnowBox({ fact }: DidYouKnowBoxProps) {
  return (
    <div className="my-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-l-4 border-purple-600 rounded-lg p-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 bg-purple-600 text-white p-2 rounded-lg">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            💡 Did You Know?
          </h4>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {fact}
          </p>
        </div>
      </div>
    </div>
  );
}
