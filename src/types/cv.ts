export interface CVData {
  nom: string
  titre: string
  email: string
  adresse: string
  linkedin: string
  github: string
  profil: string
  competences: Skills
  experience: Experience[]
  formation: Education[]
  langues: Language[]
  certifications: Certification[]
}

export interface Skills {
  top: string[]
  techniques: string[]
  soft: string[]
}

export interface Experience {
  poste: string
  entreprise: string
  periode: string
  description: string[]
  logo?: string
}

export interface Education {
  diplome: string
  ecole: string
  annee: string
  specialisation: string
  logo?: string
}

export interface Language {
  langue: string
  niveau: string
}

export interface Certification {
  nom: string
  organisation: string
  date?: string
  credentialId?: string
  skills: string[]
  specialisations?: string[]
  logo?: string
  certificationImage?: string
  links?: Array<{
    nom: string
    url: string
  }>
}
