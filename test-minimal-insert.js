const { createClient } = require('@supabase/supabase-js');

// Nouvelle clé API valide
const supabaseUrl = 'https://lbyrkhqnhkmwywhwtlwe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxieXJraHFuaGttd3l3aHd0bHdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDE1OTMsImV4cCI6MjA4NDQ3NzU5M30.WIAdYjzJNafIqdoBg0K33CBTRI8S71DeqIMqyXaElsY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testMinimalInsert() {
  console.log('🧪 Test d\'insertion avec payload MINIMAL...\n');
  
  // Payload EXACTEMENT comme dans le code
  const testData = {
    title: 'Test Article ' + Date.now(),
    slug: 'test-' + Date.now().toString(36),
    excerpt: 'Test excerpt for minimal payload',
    content: 'Test content with minimal fields',
    status: 'draft'
  };
  
  console.log('📦 Payload:');
  console.log(JSON.stringify(testData, null, 2));
  console.log('\n🚀 Tentative d\'insertion...\n');
  
  const { data, error } = await supabase
    .from('articles')
    .insert(testData)
    .select();
  
  if (error) {
    console.log('❌ ÉCHEC!\n');
    console.log('Message:', error.message);
    console.log('Code:', error.code);
    console.log('Details:', error.details);
    console.log('Hint:', error.hint);
    console.log('\n📋 Erreur complète:');
    console.log(JSON.stringify(error, null, 2));
  } else {
    console.log('✅ SUCCÈS!\n');
    console.log('Article créé:', data[0].id);
    console.log('Slug:', data[0].slug);
    console.log('\n🗑️ Nettoyage...');
    await supabase.from('articles').delete().eq('id', data[0].id);
    console.log('✅ Article de test supprimé');
  }
}

testMinimalInsert().catch(console.error);
