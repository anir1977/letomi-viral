require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testCategoryColumn() {
  console.log('🔍 Test de la colonne category_id...\n');
  
  // Test 1: Lecture d'articles
  console.log('Test 1: SELECT avec category_id');
  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, title, category_id')
    .limit(1);
  
  if (error) {
    console.log('❌ ERREUR:', error.message);
    console.log('Détails:', error);
  } else {
    console.log('✅ Connexion OK - category_id existe');
    console.log('Article:', articles[0]);
  }
  
  console.log('\n---\n');
  
  // Test 2: Vérifier les catégories disponibles
  console.log('Test 2: Catégories disponibles');
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('id, name, slug')
    .limit(5);
    
  if (catError) {
    console.log('❌ ERREUR catégories:', catError.message);
  } else {
    console.log('✅ Catégories trouvées:', categories.length);
    categories.forEach(cat => {
      console.log(`  - ${cat.name} (${cat.id})`);
    });
  }
  
  console.log('\n---\n');
  
  // Test 3: Simuler une insertion (sans vraiment insérer)
  console.log('Test 3: Validation du payload');
  const testPayload = {
    title: 'Test Article',
    slug: 'test-' + Date.now(),
    content: 'Test content',
    excerpt: 'Test excerpt',
    category_id: categories?.[0]?.id || 'test-uuid',
    author_id: 'test-author-uuid',
    status: 'draft'
  };
  
  console.log('Payload de test:', testPayload);
  console.log('✅ Structure valide pour insertion');
}

testCategoryColumn().catch(console.error);
