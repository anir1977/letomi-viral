export default function Head() {
  const adsenseScriptEnabled =
    process.env.NEXT_PUBLIC_ADSENSE_SITE_VERIFICATION === "true" ||
    process.env.NEXT_PUBLIC_ENABLE_ADSENSE === "true";

  return (
    <>
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
      {adsenseScriptEnabled && (
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9750203778031302"
          crossOrigin="anonymous"
        ></script>
      )}
    </>
  );
}
