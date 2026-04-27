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
  const adsenseEnabled = process.env.NEXT_PUBLIC_ENABLE_ADSENSE === 'true';
  const isProduction = process.env.NODE_ENV === 'production';
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-9750203778031302';
  const hasValidSlot = Boolean(slot) && !slot.includes('XXXXXXXXXX');

  useEffect(() => {
    if (!isProduction || !adsenseEnabled) {
      return;
    }

    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [adsenseEnabled, isProduction]);

  if (!isProduction || !adsenseEnabled || typeof window === 'undefined' || !hasValidSlot) {
    return null;
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
        slot="6755010687"
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
        slot="6755010687"
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
        slot="6755010687"
        format="horizontal"
        style={{ minHeight: '90px', maxHeight: '120px' }}
      />
    </div>
  );
}
