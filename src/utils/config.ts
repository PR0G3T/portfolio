// Configuration de l'environnement
export const config = {
  // Configuration de l'application
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Portfolio Professionnel',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    description: import.meta.env.VITE_APP_DESCRIPTION || 'Portfolio moderne développé avec Vue.js 3 et TypeScript',
    author: import.meta.env.VITE_APP_AUTHOR || 'Votre Nom'
  },

  // Configuration de l'API (si nécessaire)
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || '',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '5000')
  },

  // Configuration de l'analytics
  analytics: {
    enabled: import.meta.env.VITE_ANALYTICS_ENABLED === 'true',
    provider: import.meta.env.VITE_ANALYTICS_PROVIDER || 'google',
    trackingId: import.meta.env.VITE_ANALYTICS_TRACKING_ID || '',
    domain: import.meta.env.VITE_ANALYTICS_DOMAIN || ''
  },

  // Configuration du déploiement
  deployment: {
    baseUrl: import.meta.env.VITE_BASE_URL || '/CV/',
    isProduction: import.meta.env.PROD,
    isDevelopment: import.meta.env.DEV
  }
} as const

// Validation de la configuration
export function validateConfig(): void {
  const requiredEnvVars = [
    // Ajoutez ici les variables d'environnement requises
  ]

  const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName])
  
  if (missingVars.length > 0) {
    console.warn('Variables d\'environnement manquantes:', missingVars)
  }
}

// Export des types pour TypeScript
export type AppConfig = typeof config.app
export type ApiConfig = typeof config.api
export type AnalyticsConfig = typeof config.analytics
export type DeploymentConfig = typeof config.deployment