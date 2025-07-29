<script setup lang="ts">
import { ref, onMounted } from 'vue'
import './styles/main.scss'

// CV Data
const cvData = ref({
  personal: {
    name: 'John Doe',
    title: 'Senior Software Engineer',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    website: 'johndoe.dev'
  },
  summary: 'Experienced software engineer with 8+ years of expertise in full-stack development, specializing in Vue.js, React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading development teams.',
  experience: [
    {
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      period: '2021 - Present',
      location: 'San Francisco, CA',
      logo: '/images/companies/techcorp.svg',
      description: 'Lead development of enterprise web applications using Vue.js and Node.js. Mentored junior developers and implemented best practices.',
      achievements: [
        'Reduced application load time by 40% through optimization',
        'Led a team of 5 developers on a major product launch',
        'Implemented CI/CD pipeline reducing deployment time by 60%'
      ]
    },
    {
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      period: '2019 - 2021',
      location: 'New York, NY',
      logo: '/images/companies/startupxyz.svg',
      description: 'Developed and maintained multiple web applications using modern JavaScript frameworks and cloud services.',
      achievements: [
        'Built scalable microservices architecture',
        'Improved user engagement by 25% through UI/UX enhancements',
        'Reduced bug reports by 30% through comprehensive testing'
      ]
    },
    {
      company: 'Digital Solutions',
      position: 'Frontend Developer',
      period: '2017 - 2019',
      location: 'Austin, TX',
      logo: '/images/companies/digital-solutions.svg',
      description: 'Created responsive web interfaces and implemented modern frontend technologies.',
      achievements: [
        'Developed 10+ client websites with 100% client satisfaction',
        'Implemented responsive design principles across all projects',
        'Optimized website performance achieving 95+ Lighthouse scores'
      ]
    }
  ],
  education: [
    {
      degree: 'Artificial Intelligence, Computer Science & Cybersecurity',
      school: 'University of Helsinki - Open University',
      period: 'Apr 2025',
      location: 'Helsinki, Finland',
      logo: '/images/companies/university-of-helsinki.png',
      description: 'The open university provides University of Helsinki\'s courses for everyone interested in them, offering the opportunity to strengthen your skills',
      skills: ['Artificial Intelligence (AI)', 'Computer Science', 'Cybersecurity'],
      website: 'https://www.helsinki.fi/en/admissions-and-education/open-university'
    },
    {
      degree: 'Mathematics',
      school: 'MITx Courses',
      period: 'Apr 2025',
      location: 'Online',
      logo: '/images/companies/mit.png',
      description: 'MITx offers various types of courses and programs to learn from MIT faculty and instructors. You can access free open-licensed educational materials, online professional credentials, blended learning experiences, and original content on emerging technologies.',
      skills: ['Mathematics'],
      website: 'https://mitxonline.mit.edu/'
    },
    {
      degree: 'Bachelor, Business, Management, Marketing',
      school: 'Gaming Business School',
      period: 'Oct 2023 - May 2025',
      location: 'Lyon, France',
      logo: '/images/companies/gaming-campus.svg',
      description: 'Located in the heart of Lyon, the Gaming Campus school has been designed to create optimal learning conditions for the video game industry.',
      skills: ['Business', 'Management', 'Marketing', 'Gaming Industry'],
      website: 'https://gamingcampus.com/'
    },
    {
      degree: 'Baccalaureate, Science and Technology of Industry and Sustainable Development',
      school: 'Lycée Polyvalent Louis Armand',
      period: 'Sep 2021 - Jul 2023',
      location: 'Villefranche-sur-Saône, France',
      logo: '/images/companies/lycee-louis-armand.svg',
      description: 'Secondary school in Villefranche-sur-Saône, part of the Lyon education authority.',
      grade: 'Fairly Good',
      skills: ['Science', 'Technology', 'Industry', 'Sustainable Development'],
      website: 'https://lyc-louis-armand-villefranche.ent.auvergnerhonealpes.fr/'
    }
  ],
  skills: {
    technical: [
      'Vue.js', 'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python',
      'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'Redis',
      'Git', 'CI/CD', 'REST APIs', 'GraphQL', 'Microservices'
    ],
    soft: [
      'Team Leadership', 'Project Management', 'Agile/Scrum', 'Problem Solving',
      'Communication', 'Mentoring', 'Technical Writing', 'Cross-functional Collaboration'
    ]
  },
  certifications: [
    'AWS Certified Solutions Architect',
    'Google Cloud Professional Developer',
    'Certified Scrum Master (CSM)'
  ],
  languages: [
    { language: 'English', level: 'Native' },
    { language: 'Spanish', level: 'Fluent' },
    { language: 'French', level: 'Intermediate' }
  ]
})

const activeSection = ref('about')

const scrollToSection = (section: string) => {
  activeSection.value = section
  const element = document.getElementById(section)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  // Add scroll spy functionality
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '-20% 0px -80% 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, observerOptions)

  document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section)
  })
})
</script>

<template>
  <div class="cv-container">
    <!-- Navigation -->
    <nav class="navbar">
      <div class="nav-content">
        <div class="nav-brand">
          <h2>{{ cvData.personal.name }}</h2>
        </div>
        <ul class="nav-menu">
          <li><a @click="scrollToSection('about')" :class="{ active: activeSection === 'about' }">About</a></li>
          <li><a @click="scrollToSection('experience')" :class="{ active: activeSection === 'experience' }">Experience</a></li>
          <li><a @click="scrollToSection('skills')" :class="{ active: activeSection === 'skills' }">Skills</a></li>
          <li><a @click="scrollToSection('education')" :class="{ active: activeSection === 'education' }">Education</a></li>
          <li><a @click="scrollToSection('contact')" :class="{ active: activeSection === 'contact' }">Contact</a></li>
        </ul>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="about" class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1>{{ cvData.personal.name }}</h1>
          <h2>{{ cvData.personal.title }}</h2>
          <p class="hero-summary">{{ cvData.summary }}</p>
          <div class="hero-actions">
            <a href="#contact" class="btn btn-primary">Get In Touch</a>
            <a href="#" class="btn btn-secondary">Download CV</a>
          </div>
        </div>
        <div class="hero-image">
          <img src="/images/profile.png" alt="Photo de profil" class="profile-photo">
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="section">
      <div class="container">
        <h2 class="section-title">Professional Experience</h2>
        <div class="timeline">
          <div v-for="(job, index) in cvData.experience" :key="index" class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="job-header">
                <div class="job-company">
                  <img v-if="job.logo" :src="job.logo" :alt="job.company + ' logo'" class="company-logo">
                  <h3>{{ job.position }}</h3>
                  <h4>{{ job.company }}</h4>
                </div>
                <div class="job-meta">
                  <span class="job-period">{{ job.period }}</span>
                  <span class="job-location">{{ job.location }}</span>
                </div>
              </div>
              <p class="job-description">{{ job.description }}</p>
              <ul class="job-achievements">
                <li v-for="achievement in job.achievements" :key="achievement">{{ achievement }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="section">
      <div class="container">
        <h2 class="section-title">Skills & Expertise</h2>
        <div class="skills-grid">
          <div class="skills-category">
            <h3>Technical Skills</h3>
            <div class="skills-list">
              <span v-for="skill in cvData.skills.technical" :key="skill" class="skill-tag">{{ skill }}</span>
            </div>
          </div>
          <div class="skills-category">
            <h3>Soft Skills</h3>
            <div class="skills-list">
              <span v-for="skill in cvData.skills.soft" :key="skill" class="skill-tag">{{ skill }}</span>
            </div>
          </div>
        </div>
        
        <div class="certifications-section">
          <h3>Certifications</h3>
          <div class="certifications-list">
            <div v-for="cert in cvData.certifications" :key="cert" class="certification-item">
              <svg class="cert-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2l2.5 7.5H20l-5 4 2.5 7.5L10 16l-7.5 7.5L5 16 0 11.5h7.5L10 4z" fill="#f59e0b"/>
              </svg>
              <span>{{ cert }}</span>
            </div>
          </div>
        </div>

        <div class="languages-section">
          <h3>Languages</h3>
          <div class="languages-list">
            <div v-for="lang in cvData.languages" :key="lang.language" class="language-item">
              <span class="language-name">{{ lang.language }}</span>
              <span class="language-level">{{ lang.level }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section id="education" class="section">
      <div class="container">
        <h2 class="section-title">Education</h2>
        <div class="education-grid">
          <div v-for="(edu, index) in cvData.education" :key="index" class="education-card">
            <div class="education-logo">
              <img v-if="edu.logo" :src="edu.logo" :alt="edu.school + ' logo'" class="institution-logo">
            </div>
            <div class="education-content">
              <h3>{{ edu.degree }}</h3>
              <h4>{{ edu.school }}</h4>
              <div class="education-meta">
                <span>{{ edu.period }}</span>
                <span>{{ edu.location }}</span>
                <span v-if="edu.grade" class="education-grade">{{ edu.grade }}</span>
              </div>
              <p v-if="edu.description" class="education-description">{{ edu.description }}</p>
              <div v-if="edu.skills && edu.skills.length" class="education-skills">
                <span v-for="skill in edu.skills" :key="skill" class="skill-tag">{{ skill }}</span>
              </div>
              <a v-if="edu.website" :href="edu.website" target="_blank" class="education-website">
                Visit Website ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section">
      <div class="container">
        <h2 class="section-title">Get In Touch</h2>
        <div class="contact-content">
          <div class="contact-info">
            <div class="contact-item">
              <svg class="contact-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div>
                <h4>Email</h4>
                <a :href="`mailto:${cvData.personal.email}`">{{ cvData.personal.email }}</a>
              </div>
            </div>
            <div class="contact-item">
              <svg class="contact-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div>
                <h4>Phone</h4>
                <a :href="`tel:${cvData.personal.phone}`">{{ cvData.personal.phone }}</a>
              </div>
            </div>
            <div class="contact-item">
              <svg class="contact-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div>
                <h4>Location</h4>
                <span>{{ cvData.personal.location }}</span>
              </div>
            </div>
            <div class="contact-item">
              <svg class="contact-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="2" y="9" width="4" height="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="4" cy="4" r="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div>
                <h4>LinkedIn</h4>
                <a :href="`https://${cvData.personal.linkedin}`" target="_blank">{{ cvData.personal.linkedin }}</a>
              </div>
            </div>
            <div class="contact-item">
              <svg class="contact-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div>
                <h4>GitHub</h4>
                <a :href="`https://${cvData.personal.github}`" target="_blank">{{ cvData.personal.github }}</a>
              </div>
            </div>
            <div class="contact-item">
              <svg class="contact-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div>
                <h4>Website</h4>
                <a :href="`https://${cvData.personal.website}`" target="_blank">{{ cvData.personal.website }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} {{ cvData.personal.name }}. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
