#!/usr/bin/env node

/**
 * Ping Search Engines Script
 * Notifie Google & Bing des nouveaux articles
 * 
 * GRATUIT - Pas besoin d'API key
 * Accélère l'indexation de ton contenu
 */

import https from 'https';

const SITE_URL = 'https://curiospark.org';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

// Ping services
const PING_SERVICES = [
  {
    name: 'Google',
    url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
  },
  {
    name: 'Bing',
    url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
  }
];

function pingService(service) {
  return new Promise((resolve, reject) => {
    console.log(`📡 Pinging ${service.name}...`);
    
    https.get(service.url, (res) => {
      if (res.statusCode === 200) {
        console.log(`✅ ${service.name}: Sitemap pinged successfully!`);
        resolve(true);
      } else {
        console.log(`⚠️  ${service.name}: Response code ${res.statusCode}`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`❌ ${service.name}: ${err.message}`);
      reject(err);
    });
  });
}

async function pingAll() {
  console.log('🚀 Starting search engine ping...\n');
  console.log(`📍 Sitemap: ${SITEMAP_URL}\n`);
  
  for (const service of PING_SERVICES) {
    try {
      await pingService(service);
    } catch (error) {
      // Continue to next service
    }
  }
  
  console.log('\n✨ Done! Your new content will be indexed faster.');
  console.log('💡 Tip: Run this script after publishing new articles.');
}

// Run
pingAll();
