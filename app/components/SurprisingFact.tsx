'use client';

interface SurprisingFactProps {
  fact: string;
}

export default function SurprisingFact({ fact }: SurprisingFactProps) {
  return (
    <div className="my-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-l-4 border-orange-500 rounded-lg p-6 shadow-lg">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 text-4xl">🤯</div>
        <div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Most Surprising Fact
          </h4>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
            {fact}
          </p>
        </div>
      </div>
    </div>
  );
}
