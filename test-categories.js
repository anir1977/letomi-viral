/**
 * Test de chargement des catégories depuis Supabase
 */

// Charger les variables d'environnement
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔧 Configuration Supabase:');
console.log('URL:', supabaseUrl || '✗ Manquante');
console.log('Key:', supabaseKey ? '✓ Configurée' : '✗ Manquante');
console.log('');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERREUR: Variables d\'environnement manquantes!');
  console.log('\nVérifiez que .env.local contient:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testCategories() {
  console.log('📂 Test de chargement des catégories...\n');

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('❌ Erreur Supabase:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.warn('⚠️ AVERTISSEMENT: Aucune catégorie trouvée dans la base de données!');
      console.log('\nSolutions:');
      console.log('1. Vérifier que la table "categories" existe dans Supabase');
      console.log('2. Ajouter des catégories via le tableau de bord Supabase');
      console.log('3. Vérifier les RLS policies pour la table categories\n');
      return;
    }

    console.log(`✅ ${data.length} catégorie(s) trouvée(s):\n`);
    
    data.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.icon} ${cat.name}`);
      console.log(`   ID: ${cat.id}`);
      console.log(`   Slug: ${cat.slug}`);
      console.log(`   Description: ${cat.description || 'N/A'}`);
      console.log('');
    });

    console.log('✅ Test réussi! Les catégories sont accessibles.');
    
  } catch (error) {
    console.error('\n❌ Erreur lors du test:', error.message);
    console.log('\nDébogage:');
    console.log('- Vérifiez que Supabase est en ligne');
    console.log('- Vérifiez les variables d\'environnement dans .env.local');
    console.log('- Vérifiez les permissions RLS dans Supabase');
  }
}

// Exécuter le test
testCategories()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
