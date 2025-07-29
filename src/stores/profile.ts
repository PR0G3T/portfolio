import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Profile {
  name: string
  title: string
  description: string
  email: string
  linkedin: string
  github: string
  about: string
}

export interface Skill {
  category: string
  technologies: string[]
}

export interface Experience {
  id: number
  position: string
  company: string
  period: string
  description: string
  achievements: string[]
}

export interface Education {
  id: number
  degree: string
  institution: string
  period: string
}

export interface Project {
  id: number
  name: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
}

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<Profile>({
    name: 'Votre Nom',
    title: 'Développeur Full Stack',
    description: 'Passionné par les technologies web modernes et l\'innovation',
    email: 'votre.email@example.com',
    linkedin: 'https://linkedin.com/in/votre-profil',
    github: 'https://github.com/votre-username',
    about: 'Développeur expérimenté avec une passion pour créer des applications web performantes et intuitives. Spécialisé dans les technologies modernes et les bonnes pratiques de développement.'
  })

  const skills = ref<Skill[]>([
    {
      category: 'Frontend',
      technologies: ['Vue.js', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Sass']
    },
    {
      category: 'Backend',
      technologies: ['Node.js', 'Python', 'Java', 'PHP', 'Express.js', 'Django']
    },
    {
      category: 'Base de données',
      technologies: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis']
    },
    {
      category: 'Outils & DevOps',
      technologies: ['Git', 'Docker', 'AWS', 'CI/CD', 'Webpack', 'Vite']
    }
  ])

  const experiences = ref<Experience[]>([
    {
      id: 1,
      position: 'Développeur Full Stack Senior',
      company: 'Entreprise Tech',
      period: '2022 - Présent',
      description: 'Développement d\'applications web complexes avec Vue.js et Node.js',
      achievements: [
        'Architecture et développement d\'une plateforme SaaS',
        'Optimisation des performances (réduction de 40% du temps de chargement)',
        'Mentorat d\'une équipe de 3 développeurs juniors'
      ]
    },
    {
      id: 2,
      position: 'Développeur Frontend',
      company: 'Startup Innovation',
      period: '2020 - 2022',
      description: 'Création d\'interfaces utilisateur modernes et responsives',
      achievements: [
        'Refonte complète de l\'interface utilisateur',
        'Implémentation de tests automatisés',
        'Intégration d\'APIs REST et GraphQL'
      ]
    }
  ])

  const education = ref<Education[]>([
    {
      id: 1,
      degree: 'Master en Informatique',
      institution: 'Université de Technologie',
      period: '2018 - 2020'
    },
    {
      id: 2,
      degree: 'Licence en Développement Web',
      institution: 'École Supérieure du Digital',
      period: '2015 - 2018'
    }
  ])

  const projects = ref<Project[]>([
    {
      id: 1,
      name: 'Application E-commerce',
      description: 'Plateforme e-commerce complète avec gestion des stocks et paiements',
      technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'Stripe'],
      github: 'https://github.com/votre-username/ecommerce-app',
      demo: 'https://demo-ecommerce.com'
    },
    {
      id: 2,
      name: 'Dashboard Analytics',
      description: 'Tableau de bord pour visualisation de données en temps réel',
      technologies: ['React', 'TypeScript', 'D3.js', 'Express.js'],
      github: 'https://github.com/votre-username/analytics-dashboard'
    }
  ])

  return {
    profile,
    skills,
    experiences,
    education,
    projects
  }
})