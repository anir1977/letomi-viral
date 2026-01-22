# Guide de Débogage - Bouton AI Writer

## Problème
Le bouton "Generate article with AI" ne fonctionne pas sur le dashboard admin.

## Solutions Appliquées

### ✅ Modifications Effectuées

1. **Ajout de logs de débogage** dans `/app/admin/ai-writer/page.tsx`:
   - Logs au clic du bouton
   - Logs lors du chargement des catégories
   - Logs de toutes les étapes de génération
   - Messages d'erreur en français

2. **Correction du bouton**:
   - Ajout de `type="button"` pour éviter la soumission de formulaire
   - Ajout de `e.preventDefault()` dans le onClick
   - Texte traduit en français

3. **Amélioration de la gestion d'erreurs**:
   - Messages d'alerte plus détaillés
   - Affichage du message d'erreur dans l'alerte
   - Alertes en français

## Comment Tester

### 1. Ouvrir la Console du Navigateur
1. Ouvrir Chrome/Firefox DevTools (F12)
2. Aller dans l'onglet "Console"
3. Aller sur `/admin/ai-writer`

### 2. Vérifier les Logs
Vous devriez voir:
```
🔄 Component mounted, loading categories...
📂 Fetching categories from database...
✅ Categories loaded: [...]
✓ Default category set: [category name]
```

### 3. Tester la Génération
1. Entrer un sujet (ex: "Le Futur de la Technologie")
2. Entrer des mots-clés (ex: "IA, innovation, technologie")
3. Sélectionner une catégorie
4. Cliquer sur "Générer l'Article avec l'IA"

Logs attendus:
```
🔘 Button clicked - starting generation
🚀 Generate button clicked!
Topic: Le Futur de la Technologie
Category ID: [uuid]
Keywords: IA, innovation, technologie
🎯 Starting AI generation...
📝 Keywords list: ['IA', 'innovation', 'technologie']
📂 Category: Technology
✅ Article generated successfully!
📊 SEO Score: 85
🏁 Generation process completed
```

## Problèmes Potentiels et Solutions

### ❌ Erreur: "No categories found"
**Cause**: La base de données ne contient pas de catégories

**Solution**:
```bash
# Vérifier les catégories
cd /workspaces/letomi-viral
node scripts/test-supabase.js
```

### ❌ Erreur: "Error loading categories"
**Cause**: Problème de connexion Supabase

**Solution**:
1. Vérifier `.env.local`:
```bash
cat .env.local | grep SUPABASE
```

2. Variables requises:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### ❌ Le bouton reste désactivé (grisé)
**Cause**: Validation des champs

**Vérifier**:
- [ ] Champ "Topic" rempli
- [ ] Champ "Keywords" rempli (optionnel mais recommandé)
- [ ] Une catégorie sélectionnée
- [ ] Pas de génération en cours (`isGenerating = false`)

### ❌ Erreur: "Failed to generate article"
**Cause**: Erreur dans la fonction `generateAIArticle`

**Solution**:
```bash
# Tester la fonction isolément
node test-ai-generator.js
```

## Commandes de Diagnostic

### Redémarrer le serveur
```bash
pkill -f "next dev"
npm run dev
```

### Vérifier les logs en temps réel
```bash
# Dans la console du navigateur
# Activer tous les logs
localStorage.debug = '*'
```

### Nettoyer le cache Next.js
```bash
rm -rf .next
npm run dev
```

## Vérification Post-Fix

### ✅ Checklist
- [ ] Le serveur démarre sans erreur
- [ ] La page `/admin/ai-writer` se charge
- [ ] Les catégories apparaissent dans le select
- [ ] Le bouton est cliquable (pas grisé)
- [ ] Les logs apparaissent dans la console au clic
- [ ] L'article est généré avec succès
- [ ] La prévisualisation s'affiche
- [ ] L'article peut être sauvegardé

## Informations Système

### Configuration Actuelle
- Framework: Next.js 14.2.15
- Database: Supabase
- AI Generator: Local (template-based)
- Node Version: vérifier avec `node -v`

### URLs Importantes
- Admin Dashboard: http://localhost:3000/admin
- AI Writer: http://localhost:3000/admin/ai-writer
- Supabase URL: https://lbyrkhqnhkmwywhwtlwe.supabase.co

## Prochaines Étapes

Si le problème persiste après ces corrections:

1. **Vérifier dans la console du navigateur** pour voir les logs
2. **Prendre une capture d'écran** des erreurs
3. **Vérifier la table categories** dans Supabase
4. **Tester avec un autre navigateur**

## Support

Pour plus d'aide:
- Vérifier `ADMIN_LOGIN_TROUBLESHOOTING.md`
- Vérifier `VERIFICATION_CHECKLIST.md`
- Consulter les logs Supabase: https://lbyrkhqnhkmwywhwtlwe.supabase.co
