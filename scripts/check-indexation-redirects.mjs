#!/usr/bin/env node

/**
 * Check indexation blockers from sitemap URLs.
 * - Fetches sitemap.xml
 * - Tests each URL with redirect=manual
 * - Reports redirects (3xx), errors (4xx/5xx), and non-200 responses
 */

const DEFAULT_SITEMAP_URL = 'https://curiospark.org/sitemap.xml';
const CONCURRENCY = 8;

function getArg(name) {
  const prefixed = `--${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefixed));
  return found ? found.slice(prefixed.length) : null;
}

function parseSitemapUrls(xml) {
  const locRegex = /<loc>(.*?)<\/loc>/g;
  const urls = [];
  let match;

  while ((match = locRegex.exec(xml)) !== null) {
    urls.push(match[1].trim());
  }

  return urls;
}

async function fetchText(url) {
  const response = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'User-Agent': 'CurioSpark-SEO-Checker/1.0',
      'Accept': 'application/xml,text/xml,*/*',
    },
  });

  if (!response.ok) {
    throw new Error(`Impossible de charger le sitemap (${response.status})`);
  }

  return response.text();
}

async function checkUrl(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'manual',
      headers: {
        'User-Agent': 'CurioSpark-SEO-Checker/1.0',
      },
    });

    return {
      url,
      status: response.status,
      location: response.headers.get('location') || null,
      ok: response.status === 200,
    };
  } catch (error) {
    return {
      url,
      status: null,
      location: null,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function runWithConcurrency(items, worker, concurrency) {
  const results = new Array(items.length);
  let index = 0;

  async function runner() {
    while (true) {
      const current = index;
      index += 1;
      if (current >= items.length) break;
      results[current] = await worker(items[current]);
    }
  }

  const runners = Array.from({ length: Math.min(concurrency, items.length) }, () => runner());
  await Promise.all(runners);
  return results;
}

function printReport(sitemapUrl, results) {
  const redirects = results.filter((r) => r.status && r.status >= 300 && r.status < 400);
  const errors = results.filter((r) => (r.status && r.status >= 400) || r.error);
  const non200 = results.filter((r) => r.status !== 200);

  console.log('🔎 Vérification indexation (sitemap)');
  console.log(`📍 Sitemap: ${sitemapUrl}`);
  console.log(`📄 URLs testées: ${results.length}`);
  console.log(`✅ 200 OK: ${results.length - non200.length}`);
  console.log(`↪️  Redirections (3xx): ${redirects.length}`);
  console.log(`❌ Erreurs (4xx/5xx/réseau): ${errors.length}`);

  if (redirects.length > 0) {
    console.log('\n--- URLs en redirection (problème GSC: "Page avec redirection") ---');
    for (const item of redirects) {
      const target = item.location ? ` -> ${item.location}` : '';
      console.log(`[${item.status}] ${item.url}${target}`);
    }
  }

  if (errors.length > 0) {
    console.log('\n--- URLs en erreur ---');
    for (const item of errors) {
      if (item.error) {
        console.log(`[ERR] ${item.url} :: ${item.error}`);
      } else {
        console.log(`[${item.status}] ${item.url}`);
      }
    }
  }

  if (non200.length === 0) {
    console.log('\n🎉 Aucun bloqueur détecté dans les URLs du sitemap (tout est en 200).');
  }
}

async function main() {
  const sitemapUrl = getArg('sitemap') || DEFAULT_SITEMAP_URL;

  console.log('⏳ Chargement du sitemap...');
  const xml = await fetchText(sitemapUrl);
  const urls = parseSitemapUrls(xml);

  if (urls.length === 0) {
    throw new Error('Aucune URL trouvée dans le sitemap.');
  }

  console.log(`⏳ Test de ${urls.length} URLs...`);
  const results = await runWithConcurrency(urls, checkUrl, CONCURRENCY);
  printReport(sitemapUrl, results);

  const hasBlockingIssues = results.some((r) => r.status !== 200);
  process.exitCode = hasBlockingIssues ? 1 : 0;
}

main().catch((error) => {
  console.error(`❌ ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
