# Mon Portfolio - CV

Un portfolio personnel moderne développé avec Vue.js et déployé automatiquement sur GitHub Pages avec GitHub Actions.

## 🚀 Fonctionnalités

- **Design moderne et responsive** : Interface utilisateur élégante qui s'adapte à tous les écrans
- **Navigation fluide** : Défilement doux entre les sections
- **Sections complètes** : Accueil, À propos, Compétences, Projets et Contact
- **Déploiement automatique** : CI/CD avec GitHub Actions pour un déploiement à chaque commit
- **Performance optimisée** : Build optimisé pour la production

## 🛠️ Technologies utilisées

- **Vue.js 3** : Framework JavaScript progressif
- **GitHub Actions** : CI/CD automatisé
- **GitHub Pages** : Hébergement gratuit
- **CSS3** : Styles modernes avec animations
- **HTML5** : Structure sémantique

## 📦 Installation

### Prérequis

- Node.js (version 18 ou supérieure)
- npm (généralement installé avec Node.js)

### Installation locale

1. Clonez le repository :
```bash
git clone https://github.com/votre-username/CV.git
cd CV
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
npm run serve
```

4. Ouvrez votre navigateur à l'adresse `http://localhost:8080`

## 🚀 Scripts disponibles

- `npm run serve` : Lance le serveur de développement avec hot-reload
- `npm run build` : Compile le projet pour la production
- `npm run lint` : Vérifie et corrige les erreurs de style de code
- `npm run deploy` : Déploie manuellement sur GitHub Pages

## 🌐 Déploiement

### Déploiement automatique

Le projet est configuré pour se déployer automatiquement sur GitHub Pages à chaque push sur la branche `main`. Le workflow GitHub Actions :

1. Se déclenche à chaque push
2. Installe les dépendances
3. Compile le projet
4. Déploie sur GitHub Pages

### Configuration GitHub Pages

1. Allez dans les paramètres de votre repository GitHub
2. Naviguez vers "Pages" dans le menu de gauche
3. Sélectionnez "GitHub Actions" comme source
4. Le site sera disponible à l'adresse : `https://votre-username.github.io/CV/`

## 📁 Structure du projet

```
CV/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Configuration GitHub Actions
├── public/
│   └── index.html              # Template HTML principal
├── src/
│   ├── App.vue                 # Composant principal
│   └── main.js                 # Point d'entrée de l'application
├── package.json                # Dépendances et scripts
├── vue.config.js               # Configuration Vue.js
└── README.md                   # Documentation
```

## 🎨 Personnalisation

### Modifier le contenu

Le contenu du portfolio se trouve dans le fichier `src/App.vue`. Vous pouvez facilement modifier :

- **Informations personnelles** : Nom, description, compétences
- **Projets** : Ajouter, modifier ou supprimer des projets
- **Contact** : Mettre à jour les informations de contact
- **Styles** : Personnaliser les couleurs et le design

### Ajouter de nouvelles sections

Pour ajouter une nouvelle section :

1. Ajoutez le lien dans la navigation
2. Créez la section dans le template
3. Ajoutez les styles correspondants

## 🔧 Configuration avancée

### Modifier le chemin de base

Si vous changez le nom du repository, modifiez le `publicPath` dans `vue.config.js` :

```javascript
publicPath: process.env.NODE_ENV === 'production' ? '/nouveau-nom/' : '/'
```

### Personnaliser le workflow GitHub Actions

Le fichier `.github/workflows/deploy.yml` peut être modifié pour :

- Changer la version de Node.js
- Ajouter des étapes de test
- Modifier les conditions de déclenchement

## 📝 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📞 Support

Si vous avez des questions ou des problèmes :

- Ouvrez une issue sur GitHub
- Contactez-moi via les informations dans la section Contact du portfolio

---

**Développé avec ❤️ et Vue.js**