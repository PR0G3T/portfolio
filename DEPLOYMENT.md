# Guide de Déploiement

Ce guide explique comment déployer le portfolio sur GitHub Pages avec déploiement automatique.

## Prérequis

1. **Repository GitHub** : Assurez-vous que votre code est dans un repository GitHub
2. **GitHub Pages activé** : GitHub Pages doit être activé dans les paramètres du repository
3. **Permissions GitHub Actions** : Les GitHub Actions doivent avoir les permissions nécessaires

## Configuration GitHub Pages

### 1. Activer GitHub Pages

1. Allez dans votre repository GitHub
2. Cliquez sur **Settings** (Paramètres)
3. Dans le menu de gauche, cliquez sur **Pages**
4. Dans la section **Source**, sélectionnez :
   - **Source** : `Deploy from a branch`
   - **Branch** : `gh-pages`
   - **Folder** : `/ (root)`
5. Cliquez sur **Save**

### 2. Configurer les Permissions GitHub Actions

1. Dans **Settings** > **Actions** > **General**
2. Dans la section **Workflow permissions** :
   - Sélectionnez **Read and write permissions**
   - Cochez **Allow GitHub Actions to create and approve pull requests**
3. Cliquez sur **Save**

## Configuration du Projet

### 1. Variables d'Environnement

Créez un fichier `.env` à la racine du projet avec vos informations :

```env
VITE_APP_NAME=Votre Nom
VITE_APP_DESCRIPTION=Votre description professionnelle
VITE_APP_AUTHOR=Votre Nom
VITE_BASE_URL=/CV/
```

### 2. Personnalisation des Données

Modifiez le fichier `src/stores/profile.ts` avec vos informations personnelles :

```typescript
const profile = ref<Profile>({
  name: 'Votre Nom',
  title: 'Votre Titre',
  description: 'Votre description',
  email: 'votre.email@example.com',
  linkedin: 'https://linkedin.com/in/votre-profil',
  github: 'https://github.com/votre-username',
  about: 'Votre texte de présentation'
})
```

### 3. Configuration de l'URL de Base

Si votre repository a un nom différent de `CV`, modifiez :

- `vite.config.ts` : `base: '/VOTRE_REPO_NAME/'`
- `index.html` : `base href="/VOTRE_REPO_NAME/"`
- `package.json` : `"homepage": "https://votre-username.github.io/VOTRE_REPO_NAME"`

## Déploiement Automatique

### 1. Workflow GitHub Actions

Le fichier `.github/workflows/deploy.yml` est déjà configuré pour :

- Se déclencher à chaque push sur la branche `main`
- Installer les dépendances
- Compiler le projet
- Déployer automatiquement sur GitHub Pages

### 2. Première Déploiement

1. Committez et poussez vos changements :
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Vérifiez le déploiement :
   - Allez dans l'onglet **Actions** de votre repository
   - Vérifiez que le workflow `Deploy to GitHub Pages` s'exécute correctement
   - Attendez que le statut devienne vert

3. Accédez à votre site :
   - Votre site sera disponible à : `https://votre-username.github.io/VOTRE_REPO_NAME`

## Mise à Jour du Site

### Déploiement Continu

À chaque fois que vous poussez des changements sur la branche `main`, le site sera automatiquement mis à jour.

```bash
git add .
git commit -m "Mise à jour du portfolio"
git push origin main
```

### Vérification du Déploiement

1. **Actions** : Vérifiez que le workflow s'exécute correctement
2. **Pages** : Vérifiez que la branche `gh-pages` est mise à jour
3. **Site** : Vérifiez que les changements apparaissent sur le site

## Dépannage

### Problèmes Courants

1. **Workflow échoue** :
   - Vérifiez les logs dans l'onglet **Actions**
   - Assurez-vous que toutes les dépendances sont installées
   - Vérifiez la syntaxe TypeScript

2. **Site ne se met pas à jour** :
   - Vérifiez que GitHub Pages pointe vers la branche `gh-pages`
   - Attendez quelques minutes (le déploiement peut prendre du temps)
   - Videz le cache de votre navigateur

3. **Erreurs de build** :
   - Testez localement avec `npm run build`
   - Vérifiez les erreurs TypeScript avec `npm run type-check`

### Logs et Debugging

- **Actions** : Consultez les logs détaillés dans l'onglet Actions
- **Local** : Testez avec `npm run dev` et `npm run build`
- **Console** : Vérifiez la console du navigateur pour les erreurs JavaScript

## Optimisations

### Performance

Le build est déjà optimisé avec :
- Code splitting automatique
- Minification avec Terser
- Compression gzip
- Chunks séparés pour les vendors

### SEO

Le site inclut :
- Métadonnées dynamiques
- Open Graph tags
- Structure HTML sémantique
- URLs optimisées

### Analytics (Optionnel)

Pour ajouter Google Analytics :

1. Ajoutez vos variables d'environnement :
   ```env
   VITE_ANALYTICS_ENABLED=true
   VITE_ANALYTICS_PROVIDER=google
   VITE_ANALYTICS_TRACKING_ID=VOTRE_GA_ID
   ```

2. Le tracking sera automatiquement initialisé

## Support

Pour toute question ou problème :
1. Consultez les logs GitHub Actions
2. Vérifiez la documentation Vue.js et Vite
3. Ouvrez une issue sur GitHub si nécessaire
