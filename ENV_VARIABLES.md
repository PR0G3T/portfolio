# Variables d'Environnement

Ce fichier documente les variables d'environnement disponibles pour configurer l'application.

## Configuration de l'Application

### VITE_APP_NAME
- **Description** : Nom de l'application
- **Valeur par défaut** : `Portfolio Professionnel`
- **Exemple** : `VITE_APP_NAME=Mon Portfolio`

### VITE_APP_VERSION
- **Description** : Version de l'application
- **Valeur par défaut** : `1.0.0`
- **Exemple** : `VITE_APP_VERSION=1.2.0`

### VITE_APP_DESCRIPTION
- **Description** : Description de l'application (utilisée pour le SEO)
- **Valeur par défaut** : `Portfolio moderne développé avec Vue.js 3 et TypeScript`
- **Exemple** : `VITE_APP_DESCRIPTION=Portfolio de développeur full stack`

### VITE_APP_AUTHOR
- **Description** : Nom de l'auteur
- **Valeur par défaut** : `Votre Nom`
- **Exemple** : `VITE_APP_AUTHOR=John Doe`

## Configuration de l'API (Optionnel)

### VITE_API_BASE_URL
- **Description** : URL de base de l'API
- **Valeur par défaut** : `''` (vide)
- **Exemple** : `VITE_API_BASE_URL=https://api.example.com`

### VITE_API_TIMEOUT
- **Description** : Timeout des requêtes API en millisecondes
- **Valeur par défaut** : `5000`
- **Exemple** : `VITE_API_TIMEOUT=10000`

## Configuration de l'Analytics (Optionnel)

### VITE_ANALYTICS_ENABLED
- **Description** : Active ou désactive l'analytics
- **Valeur par défaut** : `false`
- **Exemple** : `VITE_ANALYTICS_ENABLED=true`

### VITE_ANALYTICS_PROVIDER
- **Description** : Fournisseur d'analytics (`google` ou `plausible`)
- **Valeur par défaut** : `google`
- **Exemple** : `VITE_ANALYTICS_PROVIDER=plausible`

### VITE_ANALYTICS_TRACKING_ID
- **Description** : ID de suivi Google Analytics
- **Valeur par défaut** : `''` (vide)
- **Exemple** : `VITE_ANALYTICS_TRACKING_ID=GA_MEASUREMENT_ID`

### VITE_ANALYTICS_DOMAIN
- **Description** : Domaine pour Plausible Analytics
- **Valeur par défaut** : `''` (vide)
- **Exemple** : `VITE_ANALYTICS_DOMAIN=example.com`

## Configuration du Déploiement

### VITE_BASE_URL
- **Description** : URL de base pour le déploiement
- **Valeur par défaut** : `/CV/`
- **Exemple** : `VITE_BASE_URL=/mon-portfolio/`

## Utilisation

1. Créez un fichier `.env` à la racine du projet
2. Copiez les variables nécessaires depuis ce fichier
3. Modifiez les valeurs selon vos besoins

### Exemple de fichier `.env`

```env
# Configuration de l'application
VITE_APP_NAME=Mon Portfolio
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Portfolio de développeur full stack
VITE_APP_AUTHOR=John Doe

# Configuration de l'analytics
VITE_ANALYTICS_ENABLED=true
VITE_ANALYTICS_PROVIDER=google
VITE_ANALYTICS_TRACKING_ID=GA_MEASUREMENT_ID

# Configuration du déploiement
VITE_BASE_URL=/mon-portfolio/
```

## Notes

- Toutes les variables d'environnement doivent commencer par `VITE_` pour être accessibles dans l'application
- Les variables non définies utiliseront leurs valeurs par défaut
- Le fichier `.env` ne doit pas être commité dans le repository (il est déjà dans `.gitignore`)