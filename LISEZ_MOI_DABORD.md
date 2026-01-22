# 🚨 ACTION REQUISE - Lisez Ceci d'Abord! 🚨

## Problème

Votre dashboard affiche des données de démo au lieu des vraies données, et le bouton AI ne fonctionne pas.

**Cause:** La table `categories` n'existe pas dans votre base de données Supabase.

## ✅ Solution (2 minutes)

### 1️⃣ Ouvrez Supabase SQL Editor

Cliquez ici: **https://lbyrkhqnhkmwywhwtlwe.supabase.co/project/_/sql**

### 2️⃣ Cliquez sur "New Query"

Dans l'éditeur SQL de Supabase

### 3️⃣ Copiez Tout le Script

Dans VS Code, ouvrez `supabase/SETUP_COMPLETE.sql` et copiez TOUT le contenu (Ctrl+A, Ctrl+C)

### 4️⃣ Collez dans Supabase

Collez dans le SQL Editor de Supabase

### 5️⃣ Exécutez

Cliquez sur **"Run"** (ou appuyez sur Ctrl+Enter)

**Résultat attendu:**
```
✓ Table "categories" créée
✓ 10 catégories insérées
✓ Affichage des catégories avec leurs icônes
```

### 6️⃣ Redémarrez l'Application

Dans le terminal VS Code:
```bash
npm run dev
```

## ✅ C'est Fini!

Testez maintenant:
- **AI Writer:** http://localhost:3000/admin/ai-writer
- **Dashboard:** http://localhost:3000/admin
- **Articles:** http://localhost:3000/admin/articles

✅ Le bouton devrait fonctionner
✅ Les catégories s'affichent
✅ Les vrais articles (pas les démos) apparaissent

---

## 🔍 Ce Que le Script Fait

1. **Crée la table `categories`** (si elle n'existe pas)
2. **Configure les permissions RLS** (lecture publique)
3. **Insère 10 catégories par défaut** (Science, Tech, etc.)
4. **Affiche le résultat** pour vérification

**Important:** Le script est **idempotent** - vous pouvez l'exécuter plusieurs fois sans problème!

---

## 🆘 Besoin d'Aide?

### Test Rapide
```bash
node scripts/apply-rls-policies.js
```

Si vous voyez:
- ✅ `Categories loaded: [10]` → Tout fonctionne!
- ❌ `Invalid API key` → Exécutez le script SQL ci-dessus

### Encore des Erreurs?

Consultez:
- `SOLUTION_COMPLETE.md` - Guide détaillé
- `AI_WRITER_FIX.md` - Débogage technique

---

**TL;DR:** Copiez tout `supabase/SETUP_COMPLETE.sql` → Collez dans Supabase SQL Editor → Run → Redémarrez l'app ✨
