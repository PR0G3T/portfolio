# Portfolio Professionnel

Un portfolio moderne et responsive développé avec Vue.js 3, TypeScript et Vite.

## 🚀 Fonctionnalités

- **Design moderne** : Interface utilisateur élégante avec animations fluides
- **Responsive** : Optimisé pour tous les appareils (desktop, tablette, mobile)
- **Performance** : Build optimisé avec Vite pour des temps de chargement rapides
- **TypeScript** : Code typé pour une meilleure maintenabilité
- **Déploiement automatique** : Intégration GitHub Actions pour un déploiement continu

## 🛠️ Technologies utilisées

- **Vue.js 3** - Framework JavaScript progressif
- **TypeScript** - Typage statique pour JavaScript
- **Vite** - Outil de build moderne et rapide
- **Vue Router** - Routage côté client
- **Pinia** - Gestion d'état
- **CSS3** - Styles modernes avec variables CSS et Grid/Flexbox

## 📦 Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/votre-username/CV.git
   cd CV
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 🏗️ Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile le projet pour la production
- `npm run preview` - Prévisualise le build de production
- `npm run lint` - Vérifie et corrige le code avec ESLint
- `npm run type-check` - Vérifie les types TypeScript

## 🚀 Déploiement

Le projet est configuré pour un déploiement automatique sur GitHub Pages via GitHub Actions.

### Configuration requise

1. **Activer GitHub Pages** dans les paramètres du repository
2. **Configurer la source** : Branch `gh-pages` / Folder `/ (root)`
3. **Donner les permissions** aux GitHub Actions :
   - Aller dans Settings > Actions > General
   - Sélectionner "Read and write permissions"
   - Cocher "Allow GitHub Actions to create and approve pull requests"

### Déploiement automatique

À chaque push sur la branche `main`, le workflow GitHub Actions :
1. Installe les dépendances
2. Compile le projet
3. Déploie automatiquement sur GitHub Pages

## 📝 Personnalisation

### Modifier les informations personnelles

Éditez le fichier `src/views/HomeView.vue` et modifiez les données dans la section `<script setup>` :

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

### Modifier les couleurs

Les couleurs principales sont définies dans `src/assets/main.css` avec les variables CSS :

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --text-color: #2c3e50;
  --light-text: #ffffff;
  --background-light: #ffffff;
}
```

## 📁 Structure du projet

```
CV/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Configuration GitHub Actions
├── src/
│   ├── assets/
│   │   └── main.css           # Styles globaux
│   ├── views/
│   │   └── HomeView.vue       # Page principale du CV
│   ├── App.vue                # Composant racine
│   └── main.ts                # Point d'entrée
├── index.html                 # Template HTML
├── package.json               # Dépendances et scripts
├── vite.config.ts            # Configuration Vite
├── tsconfig.json             # Configuration TypeScript
└── README.md                 # Documentation
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.