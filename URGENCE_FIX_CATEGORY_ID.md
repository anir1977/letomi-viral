# 🚨 CORRECTION URGENTE : category_id manquant

## ❌ Erreur
```
Could not find the 'category_id' column of 'articles' in the schema cache
```

## 🔍 Cause
La colonne `category_id` n'existe **PAS** dans votre table `articles` sur Supabase.

---

## ✅ SOLUTION (2 minutes)

### Étape 1 : Ajouter la Colonne dans Supabase

1. **Ouvrez Supabase SQL Editor** :
   ```
   https://lbyrkhqnhkmwywhwtlwe.supabase.co/project/_/sql
   ```

2. **Copiez et exécutez ce code SQL** :

```sql
-- Ajouter category_id à la table articles
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- Créer l'index
CREATE INDEX IF NOT EXISTS idx_articles_category_id ON articles(category_id);
```

3. **Cliquez sur "RUN"** ✅

4. **Vérifiez** que la colonne existe :
```sql
SELECT column_name, data_type 
FROM information_schema.columns
WHERE table_name = 'articles' AND column_name = 'category_id';
```

Résultat attendu :
```
column_name  | data_type
category_id  | uuid
```

---

### Étape 2 : Configurer les RLS Policies

Après avoir ajouté la colonne, exécutez :

```sql
-- Fichier: supabase/ARTICLES_RLS_SETUP.sql

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can insert articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can update articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can read all articles" ON articles;

CREATE POLICY "Authenticated users can insert articles"
  ON articles FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles"
  ON articles FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can read all articles"
  ON articles FOR SELECT TO authenticated
  USING (true);
```

---

### Étape 3 : Tester

1. **Retournez sur** : https://curiospark.org/admin/ai-writer

2. **Rafraîchissez** : `Ctrl+Shift+R`

3. **Générez un article**

4. **Cliquez "Créer un brouillon"**

5. ✅ **Devrait fonctionner maintenant !**

---

## 🎯 Checklist Complète

- [ ] Exécuter `ADD_CATEGORY_ID.sql` dans Supabase
- [ ] Vérifier que la colonne existe
- [ ] Exécuter `ARTICLES_RLS_SETUP.sql`
- [ ] Vérifier que 3+ policies existent
- [ ] Tester la sauvegarde sur curiospark.org

---

## 📋 Fichiers à Exécuter (dans l'ordre)

1. **`supabase/ADD_CATEGORY_ID.sql`** ← COMMENCER ICI
2. **`supabase/ARTICLES_RLS_SETUP.sql`**

---

## 💡 Pourquoi cette erreur ?

Le schéma TypeScript (`types/database.ts`) définit `category_id`, mais la **vraie table Supabase** ne l'avait pas. Il faut synchroniser les deux.

Une fois la colonne ajoutée dans Supabase, tout fonctionnera ! 🚀
