<script setup lang="ts">
import { ref, onMounted } from 'vue'

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
      degree: 'Master of Science in Computer Science',
      school: 'Stanford University',
      period: '2015 - 2017',
      location: 'Stanford, CA'
    },
    {
      degree: 'Bachelor of Science in Software Engineering',
      school: 'University of California, Berkeley',
      period: '2011 - 2015',
      location: 'Berkeley, CA'
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
const isMenuOpen = ref(false)

const scrollToSection = (section: string) => {
  activeSection.value = section
  isMenuOpen.value = false
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
    <nav class="navbar" :class="{ 'nav-open': isMenuOpen }">
      <div class="nav-content">
        <div class="nav-brand">
          <h2>{{ cvData.personal.name }}</h2>
        </div>
        <div class="nav-toggle" @click="isMenuOpen = !isMenuOpen">
          <span></span>
          <span></span>
          <span></span>
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
                <h3>{{ job.position }}</h3>
                <h4>{{ job.company }}</h4>
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
              <span class="cert-icon">🏆</span>
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
            <div class="education-icon">🎓</div>
            <div class="education-content">
              <h3>{{ edu.degree }}</h3>
              <h4>{{ edu.school }}</h4>
              <div class="education-meta">
                <span>{{ edu.period }}</span>
                <span>{{ edu.location }}</span>
              </div>
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
              <span class="contact-icon">📧</span>
              <div>
                <h4>Email</h4>
                <a :href="`mailto:${cvData.personal.email}`">{{ cvData.personal.email }}</a>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📱</span>
              <div>
                <h4>Phone</h4>
                <a :href="`tel:${cvData.personal.phone}`">{{ cvData.personal.phone }}</a>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📍</span>
              <div>
                <h4>Location</h4>
                <span>{{ cvData.personal.location }}</span>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">🔗</span>
              <div>
                <h4>LinkedIn</h4>
                <a :href="`https://${cvData.personal.linkedin}`" target="_blank">{{ cvData.personal.linkedin }}</a>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">💻</span>
              <div>
                <h4>GitHub</h4>
                <a :href="`https://${cvData.personal.github}`" target="_blank">{{ cvData.personal.github }}</a>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">🌐</span>
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

<style scoped>
/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.cv-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
  background: #f8fafc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Navigation */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e2e8f0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.nav-brand h2 {
  color: #1e293b;
  font-weight: 700;
  font-size: 1.5rem;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-menu a {
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
  position: relative;
}

.nav-menu a:hover,
.nav-menu a.active {
  color: #3b82f6;
}

.nav-menu a.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #3b82f6;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 4px;
}

.nav-toggle span {
  width: 25px;
  height: 3px;
  background: #1e293b;
  transition: all 0.3s ease;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 120px 20px 80px;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-text h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.hero-text h2 {
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.hero-summary {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #667eea;
  transform: translateY(-2px);
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-photo {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.profile-photo:hover {
  transform: scale(1.05);
}

/* Sections */
.section {
  padding: 80px 0;
  background: white;
}

.section:nth-child(even) {
  background: #f8fafc;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #1e293b;
}

/* Timeline */
.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e2e8f0;
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  padding-left: 60px;
}

.timeline-marker {
  position: absolute;
  left: 11px;
  top: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  border: 4px solid white;
  box-shadow: 0 0 0 4px #e2e8f0;
}

.timeline-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.job-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.job-header h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #3b82f6;
  margin-bottom: 0.5rem;
}

.job-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #64748b;
}

.job-description {
  margin-bottom: 1rem;
  color: #475569;
  line-height: 1.6;
}

.job-achievements {
  list-style: none;
}

.job-achievements li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: #475569;
}

.job-achievements li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}

/* Skills */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.skills-category h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1e293b;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-tag {
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.skill-tag:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

.certifications-section,
.languages-section {
  margin-top: 3rem;
}

.certifications-section h3,
.languages-section h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1e293b;
}

.certifications-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.certification-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.certification-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.languages-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.language-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.language-name {
  font-weight: 600;
  color: #1e293b;
}

.language-level {
  color: #64748b;
  font-size: 0.9rem;
}

/* Education */
.education-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.education-card {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.education-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.education-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.education-content h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.education-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #3b82f6;
  margin-bottom: 0.5rem;
}

.education-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #64748b;
}

/* Contact */
.contact-content {
  max-width: 600px;
  margin: 0 auto;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.contact-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.contact-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.contact-item h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.contact-item a,
.contact-item span {
  color: #64748b;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-item a:hover {
  color: #3b82f6;
}

/* Footer */
.footer {
  background: #1e293b;
  color: white;
  text-align: center;
  padding: 2rem 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    top: 70px;
    left: -100%;
    width: 100%;
    height: calc(100vh - 70px);
    background: white;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 2rem;
    transition: left 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .nav-menu.active {
    left: 0;
  }

  .nav-toggle {
    display: flex;
  }

  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .hero-text h1 {
    font-size: 2.5rem;
  }

  .hero-actions {
    justify-content: center;
  }

  .profile-photo {
    width: 200px;
    height: 200px;
  }

  .section-title {
    font-size: 2rem;
  }

  .timeline::before {
    left: 15px;
  }

  .timeline-item {
    padding-left: 50px;
  }

  .timeline-marker {
    left: 6px;
    width: 18px;
    height: 18px;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .education-grid {
    grid-template-columns: 1fr;
  }

  .contact-info {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 100px 15px 60px;
  }

  .hero-text h1 {
    font-size: 2rem;
  }

  .hero-text h2 {
    font-size: 1.2rem;
  }

  .section {
    padding: 60px 0;
  }

  .container {
    padding: 0 15px;
  }

  .timeline-content {
    padding: 1.5rem;
  }

  .education-card {
    padding: 1.5rem;
  }

  .contact-item {
    padding: 1rem;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Loading animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section {
  animation: fadeInUp 0.6s ease-out;
}
</style>
