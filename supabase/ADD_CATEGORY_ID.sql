-- ============================================
-- AJOUTER LA COLONNE category_id À LA TABLE articles
-- ============================================
-- Exécutez ce script dans Supabase SQL Editor
-- https://lbyrkhqnhkmwywhwtlwe.supabase.co/project/_/sql

-- Étape 1 : Ajouter la colonne category_id (si elle n'existe pas)
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- Étape 2 : Créer un index pour les performances
CREATE INDEX IF NOT EXISTS idx_articles_category_id ON articles(category_id);

-- Étape 3 : Vérifier que la colonne existe
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'articles' 
  AND column_name = 'category_id';

-- Résultat attendu :
-- column_name  | data_type | is_nullable
-- category_id  | uuid      | YES

-- Étape 4 : Tester un SELECT avec category_id
SELECT id, title, category_id 
FROM articles 
LIMIT 1;

-- Si cela fonctionne, la colonne est bien ajoutée !
