export default function Head() {
  const adsenseEnabled = process.env.NEXT_PUBLIC_ENABLE_ADSENSE === "true";

  return (
    <>
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
      {adsenseEnabled && (
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9750203778031302"
          crossOrigin="anonymous"
        ></script>
      )}
    </>
  );
}
