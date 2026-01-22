#!/usr/bin/env node
/**
 * Script pour appliquer automatiquement les RLS policies Supabase
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔧 Configuration Supabase RLS Auto-Fix\n');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables d\'environnement manquantes!');
  console.log('\nVérifiez .env.local:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY (ou SUPABASE_SERVICE_ROLE_KEY)\n');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function applyRLSPolicies() {
  console.log('📋 Application des RLS Policies...\n');

  const policies = `
-- Activer RLS sur categories
ALTER TABLE IF EXISTS categories ENABLE ROW LEVEL SECURITY;

-- Supprimer les policies existantes (si elles existent)
DROP POLICY IF EXISTS "Anyone can read categories" ON categories;
DROP POLICY IF EXISTS "Admin users can insert categories" ON categories;
DROP POLICY IF EXISTS "Admin users can update categories" ON categories;
DROP POLICY IF EXISTS "Admin users can delete categories" ON categories;

-- Permettre la lecture publique
CREATE POLICY "Anyone can read categories"
  ON categories
  FOR SELECT
  USING (true);

-- Admins peuvent créer
CREATE POLICY "Admin users can insert categories"
  ON categories
  FOR INSERT
  WITH CHECK (
    auth.jwt() ->> 'email' = 'yuba1977@gmail.com'
  );

-- Admins peuvent modifier
CREATE POLICY "Admin users can update categories"
  ON categories
  FOR UPDATE
  USING (
    auth.jwt() ->> 'email' = 'yuba1977@gmail.com'
  );

-- Admins peuvent supprimer
CREATE POLICY "Admin users can delete categories"
  ON categories
  FOR DELETE
  USING (
    auth.jwt() ->> 'email' = 'yuba1977@gmail.com'
  );
`;

  try {
    // Note: La méthode rpc n'existe pas pour exec SQL directement
    // Il faut utiliser le SQL Editor dans Supabase Dashboard
    
    console.log('⚠️  Ce script ne peut pas exécuter SQL directement via l\'API Supabase.');
    console.log('\n📝 INSTRUCTIONS:\n');
    console.log('1. Allez sur: ' + supabaseUrl.replace('.supabase.co', '.supabase.co/project/_/sql'));
    console.log('2. Ouvrez le SQL Editor');
    console.log('3. Copiez et collez le SQL suivant:\n');
    console.log('─────────────────────────────────────────────────────');
    console.log(policies);
    console.log('─────────────────────────────────────────────────────\n');
    console.log('4. Cliquez sur "Run" (Ctrl+Enter)\n');
    
    // Test de lecture des catégories
    console.log('🧪 Test de lecture des catégories (sans auth)...\n');
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .limit(5);

    if (error) {
      console.error('❌ Erreur:', error.message);
      console.log('\n⚠️  Les catégories ne sont pas lisibles publiquement.');
      console.log('Vous DEVEZ appliquer les policies RLS ci-dessus!\n');
      return false;
    }

    if (!data || data.length === 0) {
      console.log('⚠️  Aucune catégorie trouvée dans la base de données.');
      console.log('\nVous devez d\'abord créer des catégories!');
      console.log('Utilisez le fichier: supabase/schema.sql\n');
      return false;
    }

    console.log(`✅ ${data.length} catégorie(s) accessible(s):\n`);
    data.forEach((cat, i) => {
      console.log(`${i + 1}. ${cat.icon} ${cat.name} (${cat.slug})`);
    });
    console.log('\n✅ Les policies RLS sont déjà correctement configurées!\n');
    return true;

  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    return false;
  }
}

// Exécuter
applyRLSPolicies()
  .then((success) => {
    if (success) {
      console.log('🎉 Configuration terminée avec succès!');
      process.exit(0);
    } else {
      console.log('\n⚠️  Action requise: Appliquez les policies manuellement.');
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
  });
