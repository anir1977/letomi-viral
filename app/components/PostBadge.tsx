import { Star, TrendingUp } from 'lucide-react';

interface PostBadgeProps {
  isTrending?: boolean;
  isFeatured?: boolean;
  className?: string;
}

export default function PostBadge({ isTrending, isFeatured, className = '' }: PostBadgeProps) {
  if (!isTrending && !isFeatured) return null;

  return (
    <div className={`flex gap-2 ${className}`}>
      {isTrending && (
        <span className="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-800">
          <TrendingUp className="w-3 h-3" />
          Selected
        </span>
      )}
      {isFeatured && (
        <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800">
          <Star className="w-3 h-3" />
          Featured
        </span>
      )}
    </div>
  );
}
