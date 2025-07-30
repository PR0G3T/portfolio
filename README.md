# CV - Portfolio Personnel

Ce projet est un portfolio personnel développé avec Vue 3 et Vite, déployé automatiquement sur GitHub Pages.

## 🚀 Déploiement Automatique

Ce projet utilise GitHub Actions pour un déploiement automatique sur GitHub Pages. À chaque push sur la branche `main` ou `master`, le site est automatiquement construit et déployé.

### Configuration GitHub Pages

1. Allez dans les **Settings** de votre repository
2. Naviguez vers **Pages** dans le menu de gauche
3. Dans **Source**, sélectionnez **GitHub Actions**
4. Le site sera accessible à l'adresse : `https://[votre-username].github.io/CV/`

## 🛠️ Développement Local

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
