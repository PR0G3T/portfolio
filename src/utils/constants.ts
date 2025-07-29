// Configuration de l'application
export const APP_CONFIG = {
  name: 'Portfolio Professionnel',
  version: '1.0.0',
  description: 'Portfolio moderne développé avec Vue.js 3 et TypeScript',
  author: 'Votre Nom',
  contact: {
    email: 'votre.email@example.com',
    linkedin: 'https://linkedin.com/in/votre-profil',
    github: 'https://github.com/votre-username'
  }
} as const

// Configuration des couleurs
export const COLORS = {
  primary: '#667eea',
  secondary: '#764ba2',
  text: '#2c3e50',
  lightText: '#ffffff',
  background: '#ffffff',
  shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  transition: 'all 0.3s ease'
} as const

// Configuration des breakpoints
export const BREAKPOINTS = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1200px'
} as const

// Configuration SEO par défaut
export const DEFAULT_SEO = {
  title: 'Portfolio Professionnel',
  description: 'Portfolio moderne développé avec Vue.js 3 et TypeScript',
  keywords: ['développeur', 'full stack', 'vue.js', 'typescript', 'portfolio'],
  author: 'Votre Nom'
} as const