/**
 * AdSense Component - Production Ready
 * Dynamic ad injection with lazy loading
 */

'use client';

import { useEffect, useRef } from 'react';

interface AdSlotProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  style?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
}

export default function AdSense({
  slot,
  format = 'auto',
  style,
  className = '',
  responsive = true,
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isProduction = process.env.NODE_ENV === 'production';
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-9750203778031302';
  const hasValidSlot = Boolean(slot) && !slot.includes('XXXXXXXXXX');

  useEffect(() => {
    if (!isProduction) {
      // Don't load ads in development
      return;
    }

    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [isProduction]);

  // Don't render ads during SSR, in development, or if slot is not configured.
  if (!isProduction || typeof window === 'undefined' || !hasValidSlot) {
    return (
      <div
        className={`bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg flex items-center justify-center ${className}`}
        style={{ minHeight: '250px', ...style }}
      >
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Ad Placeholder (Dev Mode)
        </p>
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      ></ins>
    </div>
  );
}

/**
 * In-Article Ad Component
 * Injects ad between article paragraphs
 */
export function InArticleAd() {
  return (
    <div className="my-8">
      <AdSense
        slot="XXXXXXXXXX"
        format="auto"
        className="text-center"
        style={{ minHeight: '250px' }}
      />
    </div>
  );
}

/**
 * Sidebar Ad Component
 */
export function SidebarAd() {
  return (
    <div className="sticky top-4">
      <AdSense
        slot="XXXXXXXXXX"
        format="vertical"
        className="mb-6"
        style={{ minHeight: '600px' }}
      />
    </div>
  );
}

/**
 * Homepage Banner Ad
 */
export function BannerAd() {
  return (
    <div className="my-8">
      <AdSense
        slot="XXXXXXXXXX"
        format="horizontal"
        style={{ minHeight: '90px', maxHeight: '120px' }}
      />
    </div>
  );
}
