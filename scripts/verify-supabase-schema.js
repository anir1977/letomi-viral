/**
 * Script de vérification du schéma Supabase
 * Teste que category_id existe et est accessible
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables d\'environnement Supabase manquantes!');
  console.log('Assurez-vous que .env.local contient:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySchema() {
  console.log('🔍 Vérification du schéma Supabase...\n');

  // Test 1: Vérifier les catégories
  console.log('1️⃣ Test des catégories...');
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('id, name, slug')
    .limit(1);

  if (catError) {
    console.error('❌ Erreur categories:', catError.message);
    return false;
  }
  console.log('✅ Categories OK -', categories?.length || 0, 'trouvée(s)');
  if (categories?.[0]) {
    console.log('   Exemple:', categories[0]);
  }

  // Test 2: Vérifier le schéma articles avec category_id
  console.log('\n2️⃣ Test du schéma articles avec category_id...');
  
  // Tenter une requête SELECT avec category_id
  const { data: articles, error: artError } = await supabase
    .from('articles')
    .select('id, title, slug, category_id')
    .limit(1);

  if (artError) {
    console.error('❌ Erreur SELECT articles:', artError.message);
    if (artError.message.includes('category_id')) {
      console.error('\n🚨 PROBLÈME: La colonne category_id n\'existe pas dans le schéma!');
      console.error('\n📋 SOLUTION:');
      console.error('1. Allez dans Supabase SQL Editor');
      console.error('2. Exécutez: ALTER TABLE articles ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id);');
      console.error('3. Réessayez ce script');
    }
    return false;
  }
  console.log('✅ Articles OK -', articles?.length || 0, 'trouvé(s)');
  if (articles?.[0]) {
    console.log('   Exemple:', articles[0]);
  }

  // Test 3: Tenter un INSERT minimal
  console.log('\n3️⃣ Test INSERT avec category_id...');
  
  if (!categories?.[0]) {
    console.warn('⚠️ Pas de catégorie disponible, création d\'une catégorie de test...');
    const { data: newCat, error: createCatError } = await supabase
      .from('categories')
      .insert({
        name: 'Test Category',
        slug: 'test-category-' + Date.now(),
        description: 'Catégorie de test',
        icon: '🧪',
        color: 'gray'
      })
      .select()
      .single();
    
    if (createCatError) {
      console.error('❌ Impossible de créer une catégorie de test:', createCatError.message);
      return false;
    }
    categories[0] = newCat;
    console.log('✅ Catégorie de test créée:', newCat.id);
  }

  const testArticle = {
    title: 'Test Article Schema Verification',
    slug: 'test-schema-' + Date.now(),
    excerpt: 'Article de test pour vérifier le schéma',
    content: 'Contenu de test',
    category_id: categories[0].id, // TEST CRITIQUE
    status: 'draft',
  };

  console.log('   Tentative d\'insertion avec category_id:', categories[0].id);

  const { data: inserted, error: insertError } = await supabase
    .from('articles')
    .insert(testArticle)
    .select()
    .single();

  if (insertError) {
    console.error('❌ Erreur INSERT:', insertError.message);
    console.error('\n📋 Détails:', insertError);
    
    if (insertError.message.includes('category_id')) {
      console.error('\n🚨 La colonne category_id pose problème!');
      console.error('Message:', insertError.message);
      console.error('Code:', insertError.code);
    }
    
    if (insertError.message.includes('violates row-level security')) {
      console.error('\n🔒 PROBLÈME RLS: Exécutez supabase/ARTICLES_RLS_SETUP.sql');
    }
    
    return false;
  }

  console.log('✅ INSERT réussi! Article ID:', inserted.id);

  // Cleanup: supprimer l'article de test
  console.log('\n4️⃣ Nettoyage...');
  await supabase.from('articles').delete().eq('id', inserted.id);
  console.log('✅ Article de test supprimé');

  return true;
}

verifySchema()
  .then((success) => {
    if (success) {
      console.log('\n✅ ✅ ✅ SCHÉMA SUPABASE VÉRIFIÉ AVEC SUCCÈS! ✅ ✅ ✅');
      console.log('\nLe client peut maintenant insérer des articles avec category_id.');
      process.exit(0);
    } else {
      console.log('\n❌ ❌ ❌ ÉCHEC DE VÉRIFICATION DU SCHÉMA ❌ ❌ ❌');
      console.log('\nCorrigez les erreurs ci-dessus avant de continuer.');
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error('\n💥 Erreur fatale:', err);
    process.exit(1);
  });
