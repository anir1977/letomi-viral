-- ============================================
-- FIX: Categories RLS Policies
-- ============================================
-- La table categories n'avait pas de policies RLS
-- Ce qui empêchait le chargement des catégories dans AI Writer

-- Activer RLS sur la table categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Permettre à tout le monde de LIRE les catégories (public)
CREATE POLICY "Anyone can read categories"
  ON categories
  FOR SELECT
  USING (true);

-- Seuls les admins peuvent créer des catégories
CREATE POLICY "Admin users can insert categories"
  ON categories
  FOR INSERT
  WITH CHECK (
    auth.jwt() ->> 'email' = 'yuba1977@gmail.com'
  );

-- Seuls les admins peuvent modifier des catégories
CREATE POLICY "Admin users can update categories"
  ON categories
  FOR UPDATE
  USING (
    auth.jwt() ->> 'email' = 'yuba1977@gmail.com'
  );

-- Seuls les admins peuvent supprimer des catégories
CREATE POLICY "Admin users can delete categories"
  ON categories
  FOR DELETE
  USING (
    auth.jwt() ->> 'email' = 'yuba1977@gmail.com'
  );

-- ============================================
-- VERIFICATION
-- ============================================
-- Après avoir exécuté ce script dans Supabase SQL Editor:
-- 1. Allez sur https://lbyrkhqnhkmwywhwtlwe.supabase.co
-- 2. Authentication & API > Policies
-- 3. Vérifiez que la table 'categories' a 4 policies
-- 4. Testez avec: SELECT * FROM categories; (devrait fonctionner)
