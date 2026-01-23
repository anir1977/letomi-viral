const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://lbyrkhqnhkmwywhwtlwe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxieXJraHFuaGttd3l3aHd0bHdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDE1OTMsImV4cCI6MjA4NDQ3NzU5M30.WIAdYjzJNafIqdoBg0K33CBTRI8S71DeqIMqyXaElsY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔌 Test de connexion Supabase...\n');
  
  // Test 1: Lecture publique
  console.log('📖 Test 1: SELECT sur articles (public)');
  const { data, error } = await supabase
    .from('articles')
    .select('id, title')
    .limit(1);
  
  if (error) {
    console.log('❌ ERREUR:', error.message);
    console.log(JSON.stringify(error, null, 2));
    return;
  }
  
  console.log('✅ Connexion OK -', data.length, 'articles trouvés');
  if (data[0]) {
    console.log('  Premier article:', data[0].title);
  }
  
  // Test 2: Vérifier l'authentification
  console.log('\n🔐 Test 2: Vérification auth');
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    console.log('✅ Session active:', session.user.email);
  } else {
    console.log('⚠️ Aucune session (normal pour anon key)');
  }
  
  console.log('\n📋 Conclusion:');
  console.log('La clé API fonctionne pour la lecture.');
  console.log('Pour l\'insertion, il faut être authentifié OU avoir les bonnes RLS policies.');
}

testConnection().catch(console.error);
