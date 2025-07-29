export interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  author: string
  ogImage?: string
  ogUrl?: string
}

export function updateSEO(config: SEOConfig): void {
  // Mise à jour du titre
  document.title = config.title

  // Mise à jour de la description
  let metaDescription = document.querySelector('meta[name="description"]')
  if (!metaDescription) {
    metaDescription = document.createElement('meta')
    metaDescription.setAttribute('name', 'description')
    document.head.appendChild(metaDescription)
  }
  metaDescription.setAttribute('content', config.description)

  // Mise à jour des mots-clés
  let metaKeywords = document.querySelector('meta[name="keywords"]')
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta')
    metaKeywords.setAttribute('name', 'keywords')
    document.head.appendChild(metaKeywords)
  }
  metaKeywords.setAttribute('content', config.keywords.join(', '))

  // Mise à jour de l'auteur
  let metaAuthor = document.querySelector('meta[name="author"]')
  if (!metaAuthor) {
    metaAuthor = document.createElement('meta')
    metaAuthor.setAttribute('name', 'author')
    document.head.appendChild(metaAuthor)
  }
  metaAuthor.setAttribute('content', config.author)

  // Mise à jour des Open Graph tags
  updateOpenGraph(config)
}

function updateOpenGraph(config: SEOConfig): void {
  const ogTags = [
    { property: 'og:title', content: config.title },
    { property: 'og:description', content: config.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:author', content: config.author }
  ]

  if (config.ogImage) {
    ogTags.push({ property: 'og:image', content: config.ogImage })
  }

  if (config.ogUrl) {
    ogTags.push({ property: 'og:url', content: config.ogUrl })
  }

  ogTags.forEach(tag => {
    let metaTag = document.querySelector(`meta[property="${tag.property}"]`)
    if (!metaTag) {
      metaTag = document.createElement('meta')
      metaTag.setAttribute('property', tag.property)
      document.head.appendChild(metaTag)
    }
    metaTag.setAttribute('content', tag.content)
  })
}