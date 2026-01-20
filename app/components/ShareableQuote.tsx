'use client';

interface ShareableQuoteProps {
  quote: string;
  author?: string;
}

export default function ShareableQuote({ quote, author = "CurioSpark" }: ShareableQuoteProps) {
  return (
    <div className="my-8 relative">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 shadow-xl">
        <div className="absolute top-4 left-4 text-6xl opacity-20">"</div>
        <div className="relative z-10">
          <p className="text-xl md:text-2xl font-semibold leading-relaxed mb-4 italic">
            {quote}
          </p>
          <p className="text-right text-purple-100 font-medium">
            — {author}
          </p>
        </div>
        <div className="absolute bottom-4 right-4 text-6xl opacity-20">"</div>
      </div>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
        💬 Perfect for sharing on social media
      </p>
    </div>
  );
}
