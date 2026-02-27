const ADS_TXT_CONTENT = "google.com, pub-9750203778031302, DIRECT, f08c47fec0942fa0\n";

export const dynamic = "force-static";

export async function GET() {
  return new Response(ADS_TXT_CONTENT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
