interface AdSlotProps {
  position: 'top' | 'mid-content' | 'end' | 'sidebar';
  className?: string;
}

export default function AdSlot({ position, className = '' }: AdSlotProps) {
  // This is a placeholder for future AdSense integration
  // Currently shows placeholder to maintain layout stability
  
  const heightClass = position === 'sidebar' 
    ? 'h-[600px]' 
    : position === 'top' 
    ? 'h-[90px]' 
    : 'h-[250px]';

  return (
    <div 
      className={`${heightClass} bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 ${className}`}
      data-ad-slot={position}
      aria-label={`Advertisement slot - ${position}`}
    >
      <div className="text-center px-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Advertisement Space
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {position.replace('-', ' ').toUpperCase()}
        </p>
      </div>
    </div>
  );
}
