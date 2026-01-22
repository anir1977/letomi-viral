-- ============================================
-- SCRIPT COMPLET - TOUT EN UN
-- ============================================
-- Exécutez ce script UNE SEULE FOIS dans Supabase SQL Editor
-- https://lbyrkhqnhkmwywhwtlwe.supabase.co/project/_/sql
-- 
-- Ce script fait TOUT :
-- 1. Ajoute la colonne category_id
-- 2. Configure les RLS policies
-- 3. Vérifie que tout fonctionne
-- ============================================

-- ============================================
-- PARTIE 1 : AJOUTER LA COLONNE category_id
-- ============================================

-- Ajouter la colonne si elle n'existe pas
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- Créer l'index pour les performances
CREATE INDEX IF NOT EXISTS idx_articles_category_id ON articles(category_id);

-- ============================================
-- PARTIE 2 : ACTIVER ROW LEVEL SECURITY
-- ============================================

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PARTIE 3 : SUPPRIMER LES ANCIENNES POLICIES
-- ============================================

DROP POLICY IF EXISTS "Public users can read published articles" ON articles;
DROP POLICY IF EXISTS "Admin users can insert articles" ON articles;
DROP POLICY IF EXISTS "Admin users can update articles" ON articles;
DROP POLICY IF EXISTS "Admin users can delete articles" ON articles;
DROP POLICY IF EXISTS "Admin users have full access to articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can insert articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can update articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can delete articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can read all articles" ON articles;

-- ============================================
-- PARTIE 4 : CRÉER LES NOUVELLES POLICIES
-- ============================================

-- Policy 1 : Public peut lire les articles publiés
CREATE POLICY "Public users can read published articles"
  ON articles
  FOR SELECT
  TO public
  USING (status = 'published');

-- Policy 2 : Authentifiés peuvent lire tous les articles
CREATE POLICY "Authenticated users can read all articles"
  ON articles
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy 3 : Authentifiés peuvent créer des articles
CREATE POLICY "Authenticated users can insert articles"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy 4 : Authentifiés peuvent modifier des articles
CREATE POLICY "Authenticated users can update articles"
  ON articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy 5 : Authentifiés peuvent supprimer des articles
CREATE POLICY "Authenticated users can delete articles"
  ON articles
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- PARTIE 5 : VÉRIFICATIONS
-- ============================================

-- Vérification 1 : La colonne category_id existe
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  '✅ Colonne category_id existe' as status
FROM information_schema.columns
WHERE table_name = 'articles' 
  AND column_name = 'category_id';

-- Vérification 2 : RLS est activé
SELECT 
  tablename,
  rowsecurity,
  CASE 
    WHEN rowsecurity THEN '✅ RLS activé'
    ELSE '❌ RLS désactivé'
  END as status
FROM pg_tables
WHERE tablename = 'articles'
  AND schemaname = 'public';

-- Vérification 3 : Lister toutes les policies
SELECT 
  policyname,
  cmd,
  roles,
  '✅ Policy active' as status
FROM pg_policies 
WHERE tablename = 'articles'
ORDER BY policyname;

-- Vérification 4 : Compter les policies (devrait être 5)
SELECT 
  COUNT(*) as total_policies,
  CASE 
    WHEN COUNT(*) >= 5 THEN '✅ Toutes les policies créées'
    ELSE '⚠️ Policies manquantes'
  END as status
FROM pg_policies 
WHERE tablename = 'articles';

-- ============================================
-- RÉSULTAT ATTENDU
-- ============================================
-- Vous devriez voir 4 blocs de résultats :
-- 
-- Bloc 1 : category_id | uuid | YES | ✅ Colonne category_id existe
-- Bloc 2 : articles | true | ✅ RLS activé  
-- Bloc 3 : Liste de 5 policies
-- Bloc 4 : 5 | ✅ Toutes les policies créées
--
-- Si vous voyez ces résultats, TOUT EST BON ! ✅
-- ============================================
