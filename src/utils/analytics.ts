// Configuration pour l'analytics (optionnel)
export interface AnalyticsConfig {
  enabled: boolean
  provider: 'google' | 'plausible' | 'custom'
  trackingId?: string
  domain?: string
}

export const analyticsConfig: AnalyticsConfig = {
  enabled: false, // Désactivé par défaut
  provider: 'google',
  trackingId: '',
  domain: ''
}

export function initializeAnalytics(): void {
  if (!analyticsConfig.enabled) return

  switch (analyticsConfig.provider) {
    case 'google':
      initializeGoogleAnalytics()
      break
    case 'plausible':
      initializePlausibleAnalytics()
      break
    default:
      console.warn('Provider analytics non supporté')
  }
}

function initializeGoogleAnalytics(): void {
  if (!analyticsConfig.trackingId) {
    console.warn('Google Analytics: trackingId manquant')
    return
  }

  // Script Google Analytics
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.trackingId}`
  document.head.appendChild(script)

  // Configuration gtag
  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', analyticsConfig.trackingId)
}

function initializePlausibleAnalytics(): void {
  if (!analyticsConfig.domain) {
    console.warn('Plausible Analytics: domain manquant')
    return
  }

  // Script Plausible Analytics
  const script = document.createElement('script')
  script.async = true
  script.defer = true
  script.setAttribute('data-domain', analyticsConfig.domain)
  script.src = 'https://plausible.io/js/script.js'
  document.head.appendChild(script)
}

// Déclaration globale pour TypeScript
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}