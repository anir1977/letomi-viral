# 🚀 VERCEL DEPLOYMENT - ÉTAPES POST-PUSH

## ✅ Code est maintenant sur GitHub (commit 4730316)

Vercel va automatiquement déployer dans 2-3 minutes.

---

## ⚠️ PROBLÈME ATTENDU : Variables d'environnement manquantes

Après le nouveau déploiement, votre site va **crasher** si vous n'avez pas ajouté les variables d'environnement dans Vercel.

---

## 🔧 ACTIONS REQUISES DANS VERCEL DASHBOARD

### 1. Accéder aux Environment Variables

1. Aller sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionner votre projet `letomi-viral`
3. Cliquer **Settings** (à gauche)
4. Cliquer **Environment Variables**

### 2. Ajouter TOUTES ces variables

#### REQUIS (le site ne marchera PAS sans) :

```bash
NEXT_PUBLIC_SUPABASE_URL
Valeur : https://xxxxx.supabase.co
Environnement : Production, Preview, Development
```

```bash
NEXT_PUBLIC_SUPABASE_ANON_KEY
Valeur : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Environnement : Production, Preview, Development
```

```bash
NEXT_PUBLIC_SITE_URL
Valeur : https://votre-domaine.vercel.app
Environnement : Production
```

#### RECOMMANDÉ (pour images) :

```bash
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
Valeur : votre-cle-unsplash
Environnement : Production, Preview, Development
```

#### OPTIONNEL (pour plus tard) :

```bash
NEXT_PUBLIC_ADSENSE_CLIENT
Valeur : ca-pub-XXXXXXXXXXXXXXXX
Environnement : Production
```

```bash
NEXT_PUBLIC_GA_ID
Valeur : G-XXXXXXXXXX
Environnement : Production
```

### 3. Obtenir les clés Supabase

Si vous ne les avez pas :

1. Aller sur [supabase.com](https://supabase.com/dashboard)
2. Sélectionner votre projet
3. Cliquer **Settings** → **API**
4. Copier :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Obtenir la clé Unsplash (images)

1. Aller sur [unsplash.com/developers](https://unsplash.com/developers)
2. Créer une application
3. Copier **Access Key**
4. Coller dans `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY`

**Note** : Free tier = 50 requests/heure (suffisant pour commencer)

### 5. REDÉPLOYER

Après avoir ajouté les variables :

**Option A** : Dans Vercel Dashboard
1. Aller sur **Deployments**
2. Cliquer sur les **3 points** à côté du dernier déploiement
3. Cliquer **Redeploy**

**Option B** : Push un petit changement
```bash
git commit --allow-empty -m "chore: trigger redeploy with env vars"
git push origin main
```

---

## 🎯 VÉRIFICATION POST-DÉPLOIEMENT

### Test 1 : Homepage charge
- Visiter : `https://votre-domaine.vercel.app`
- **Attendu** : Page charge sans erreur
- **Si erreur** : Vérifier variables Supabase dans Vercel

### Test 2 : Dashboard accessible
- Visiter : `https://votre-domaine.vercel.app/admin`
- **Attendu** : Dashboard charge (peut être vide)
- **Si erreur "Cannot connect"** : Variables Supabase manquantes

### Test 3 : AI Writer fonctionne
- Aller sur `/admin/ai-writer`
- **Attendu** : Formulaire avec 5 modes + 4 tons visible
- **Test** : Générer un article test

### Test 4 : Database connectée
- Sur le dashboard, vérifier les stats
- **Attendu** : "0 articles" (si database vide) ou chiffres réels
- **Si "Loading..." infini** : Problème de connexion Supabase

---

## 🐛 TROUBLESHOOTING

### Erreur : "Supabase client error"
**Solution** :
1. Vérifier `NEXT_PUBLIC_SUPABASE_URL` dans Vercel
2. Vérifier `NEXT_PUBLIC_SUPABASE_ANON_KEY` dans Vercel
3. Vérifier que le projet Supabase est actif
4. Redéployer

### Erreur : "Failed to fetch categories"
**Solution** :
1. Aller sur Supabase Dashboard
2. SQL Editor
3. Exécuter `supabase/schema.sql`
4. Vérifier que la table `categories` a 8 lignes
5. Refresh le site

### Images ne s'affichent pas
**Solution** :
1. Ajouter `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY` dans Vercel
2. Ou accepter les placeholders pour le moment
3. Redéployer

### Dashboard vide (0 articles)
**C'est NORMAL** si vous n'avez pas encore créé d'articles.
**Action** :
1. Aller sur `/admin/ai-writer`
2. Générer premier article
3. Sauvegarder
4. Retourner au dashboard → les stats s'affichent

---

## ✅ CHECKLIST FINALE

Avant de valider que tout marche :

- [ ] Variables Supabase ajoutées dans Vercel
- [ ] Vercel a redéployé après ajout des variables
- [ ] Homepage charge sans erreur
- [ ] Dashboard `/admin` accessible
- [ ] AI Writer `/admin/ai-writer` fonctionne
- [ ] Schema.sql exécuté dans Supabase
- [ ] Au moins 1 article créé pour tester
- [ ] Sitemap accessible : `/sitemap.xml`
- [ ] Robots.txt accessible : `/robots.txt`

---

## 🎉 SI TOUT FONCTIONNE

Vous verrez :
- ✅ Dashboard avec **vraies statistiques** (pas de mocks)
- ✅ AI Writer avec **5 modes d'écriture**
- ✅ **Trending articles** dans le dashboard
- ✅ **Alerts** si articles sans images
- ✅ **Quick Actions** pour créer du contenu
- ✅ **SEO automatique** sur tous les articles

C'est TRÈS DIFFÉRENT de l'ancienne version avec données mockées !

---

## 📞 BESOIN D'AIDE ?

Si après avoir suivi ces étapes, vous avez toujours des problèmes :
1. Vérifier les logs Vercel (Deployment → View Function Logs)
2. Vérifier la console browser (F12 → Console)
3. Vérifier les logs Supabase (Logs → API)

Les erreurs les plus communes sont :
- Variables d'environnement mal copiées (espaces, caractères manquants)
- Schema.sql pas exécuté dans Supabase
- Projet Supabase en pause (free tier)

---

**RÉSUMÉ** : Le code est prêt, il faut juste configurer les variables d'environnement dans Vercel et Supabase pour que tout fonctionne. C'est une configuration one-time de 5 minutes maximum.
