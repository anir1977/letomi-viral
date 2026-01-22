-- ============================================
-- FORCER LE RELOAD DU SCHEMA CACHE
-- ============================================
-- Exécutez ce script dans Supabase SQL Editor
-- pour forcer PostgREST à recharger le schéma
-- ============================================

-- Cette commande force PostgREST à recharger son cache
NOTIFY pgrst, 'reload schema';

-- Vérification : la colonne existe bien
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  '✅ Colonne existe' as status
FROM information_schema.columns
WHERE table_name = 'articles' 
  AND column_name = 'category_id';

-- ============================================
-- RÉSULTAT ATTENDU
-- ============================================
-- Vous devriez voir :
-- 1. "NOTIFY" - Notification envoyée
-- 2. category_id | uuid | YES | ✅ Colonne existe
--
-- Après ça, ATTENDEZ 30 SECONDES puis retestez !
-- ============================================
