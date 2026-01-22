require('dotenv').config({ path: '.env.local' });

/**
 * FORCER LE RELOAD DU SCHEMA CACHE SUPABASE
 * 
 * Ce script force PostgREST à recharger son cache de schéma
 * en faisant un POST sur l'endpoint /rest/v1/rpc
 */

async function reloadSupabaseSchema() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Variables d\'environnement manquantes');
    process.exit(1);
  }

  console.log('🔄 Tentative de reload du schema cache Supabase...\n');

  try {
    // Méthode 1 : Via l'API REST directe
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    });

    console.log('Status:', response.status);
    
    if (response.ok || response.status === 404) {
      console.log('✅ Requête envoyée à l\'API Supabase');
      console.log('\n📋 Prochaines étapes :');
      console.log('1. Allez sur : https://lbyrkhqnhkmwywhwtlwe.supabase.co/project/_/settings/api');
      console.log('2. Cherchez un bouton "Reload schema" ou "Reload cache"');
      console.log('3. Cliquez dessus');
      console.log('4. Attendez 30 secondes');
      console.log('5. Retestez sur curiospark.org/admin/ai-writer\n');
    }

    // Alternative : Afficher la commande cURL
    console.log('\n💡 OU utilisez cette commande dans votre terminal Supabase :');
    console.log('NOTIFY pgrst, \'reload schema\';');
    console.log('\nExécutez-la dans : SQL Editor → New Query → Collez → Run\n');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.log('\n📋 Solution manuelle :');
    console.log('1. Allez sur https://lbyrkhqnhkmwywhwtlwe.supabase.co');
    console.log('2. Settings → API');
    console.log('3. Cliquez sur "Reload schema cache"');
  }
}

reloadSupabaseSchema();
