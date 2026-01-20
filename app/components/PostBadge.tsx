import { TrendingUp, Star } from 'lucide-react';

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
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-sm">
          <TrendingUp className="w-3 h-3" />
          Trending
        </span>
      )}
      {isFeatured && (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-sm">
          <Star className="w-3 h-3" />
          Readers' Favorite
        </span>
      )}
    </div>
  );
}
