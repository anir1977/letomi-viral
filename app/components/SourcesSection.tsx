interface Source {
  title: string;
  url: string;
  publisher?: string;
}

interface SourcesSectionProps {
  sources: Source[];
  lastUpdated?: string;
}

export default function SourcesSection({ sources, lastUpdated }: SourcesSectionProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="my-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-green-600 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-md">
            <span>✓</span>
            <span>Fact-Checked</span>
          </div>
          {lastUpdated && (
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
          )}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span>📚</span>
        <span>Sources & Further Reading</span>
      </h3>
      
      <ul className="space-y-3">
        {sources.map((source, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-purple-600 dark:text-purple-400 font-bold mt-1">•</span>
            <div>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline font-medium"
              >
                {source.title}
              </a>
              {source.publisher && (
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                  — {source.publisher}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
      
      <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
          All facts on CurioSpark are verified by our editorial team using peer-reviewed research and authoritative sources.{' '}
          <a href="/about/fact-checking" className="text-purple-600 dark:text-purple-400 hover:underline font-medium">
            Learn about our fact-checking process
          </a>
        </p>
      </div>
    </div>
  );
}
