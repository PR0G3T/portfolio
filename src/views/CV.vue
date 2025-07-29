<template>
  <div class="cv">
    <div class="container">
      <!-- Header Section -->
      <header class="header">
        <div class="header-content">
          <div class="profile-info">
            <h1 class="name">{{ cvData.name }}</h1>
            <p class="title">{{ cvData.title }}</p>
            <p class="location">{{ cvData.location }}</p>
          </div>
          <div class="contact-info">
            <div class="contact-item" v-for="contact in cvData.contact" :key="contact.type">
              <a :href="contact.link" target="_blank" rel="noopener noreferrer" class="contact-link">
                {{ contact.value }}
              </a>
            </div>
          </div>
        </div>
      </header>

      <!-- Summary Section -->
      <section class="section">
        <div class="card">
          <h2 class="section-title">Professional Summary</h2>
          <p class="summary">{{ cvData.summary }}</p>
        </div>
      </section>

      <!-- Experience Section -->
      <section class="section">
        <div class="card">
          <h2 class="section-title">Professional Experience</h2>
          <div class="experience-item" v-for="experience in cvData.experience" :key="experience.id">
            <div class="experience-header">
              <h3 class="job-title">{{ experience.title }}</h3>
              <span class="company">{{ experience.company }}</span>
              <span class="period">{{ experience.period }}</span>
            </div>
            <p class="job-description">{{ experience.description }}</p>
            <ul class="achievements" v-if="experience.achievements">
              <li v-for="achievement in experience.achievements" :key="achievement">{{ achievement }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Education Section -->
      <section class="section">
        <div class="card">
          <h2 class="section-title">Education</h2>
          <div class="education-item" v-for="education in cvData.education" :key="education.id">
            <div class="education-header">
              <h3 class="degree">{{ education.degree }}</h3>
              <span class="institution">{{ education.institution }}</span>
              <span class="year">{{ education.year }}</span>
            </div>
            <p class="education-description" v-if="education.description">{{ education.description }}</p>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="section">
        <div class="card">
          <h2 class="section-title">Skills & Technologies</h2>
          <div class="skills-grid">
            <div class="skill-category" v-for="category in cvData.skills" :key="category.name">
              <h3 class="skill-category-title">{{ category.name }}</h3>
              <div class="skill-tags">
                <span class="skill-tag" v-for="skill in category.items" :key="skill">{{ skill }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section class="section" v-if="cvData.projects">
        <div class="card">
          <h2 class="section-title">Projects</h2>
          <div class="projects-grid">
            <div class="project-item" v-for="project in cvData.projects" :key="project.id">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tech">
                <span class="skill-tag" v-for="tech in project.technologies" :key="tech">{{ tech }}</span>
              </div>
              <div class="project-links" v-if="project.links">
                <a :href="link.url" target="_blank" rel="noopener noreferrer" 
                   class="btn btn-secondary" v-for="link in project.links" :key="link.name">
                  {{ link.name }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Languages Section -->
      <section class="section" v-if="cvData.languages">
        <div class="card">
          <h2 class="section-title">Languages</h2>
          <div class="languages-grid">
            <div class="language-item" v-for="language in cvData.languages" :key="language.name">
              <span class="language-name">{{ language.name }}</span>
              <span class="language-level">{{ language.level }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CV',
  data() {
    return {
      cvData: {
        name: 'Your Name',
        title: 'Software Developer',
        location: 'City, Country',
        contact: [
          { type: 'email', value: 'your.email@example.com', link: 'mailto:your.email@example.com' },
          { type: 'phone', value: '+1 (555) 123-4567', link: 'tel:+15551234567' },
          { type: 'linkedin', value: 'linkedin.com/in/yourprofile', link: 'https://linkedin.com/in/yourprofile' },
          { type: 'github', value: 'github.com/yourusername', link: 'https://github.com/yourusername' }
        ],
        summary: 'Experienced software developer with a passion for creating efficient, scalable solutions. Skilled in modern web technologies and committed to writing clean, maintainable code. Strong problem-solving abilities and experience working in agile environments.',
        experience: [
          {
            id: 1,
            title: 'Senior Software Developer',
            company: 'Tech Company Inc.',
            period: '2022 - Present',
            description: 'Lead development of web applications using modern frameworks and technologies.',
            achievements: [
              'Led a team of 5 developers in building a customer portal',
              'Improved application performance by 40% through optimization',
              'Implemented CI/CD pipelines reducing deployment time by 60%'
            ]
          },
          {
            id: 2,
            title: 'Full Stack Developer',
            company: 'Startup Solutions',
            period: '2020 - 2022',
            description: 'Developed and maintained multiple web applications using Vue.js and Node.js.',
            achievements: [
              'Built 3 production applications from concept to deployment',
              'Reduced bug reports by 30% through improved testing practices',
              'Mentored junior developers and conducted code reviews'
            ]
          }
        ],
        education: [
          {
            id: 1,
            degree: 'Bachelor of Science in Computer Science',
            institution: 'University Name',
            year: '2016 - 2020',
            description: 'Graduated with honors. Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems.'
          }
        ],
        skills: [
          {
            name: 'Frontend',
            items: ['Vue.js', 'React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Sass']
          },
          {
            name: 'Backend',
            items: ['Node.js', 'Python', 'Express.js', 'Django', 'REST APIs', 'GraphQL']
          },
          {
            name: 'Database',
            items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase']
          },
          {
            name: 'Tools & DevOps',
            items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Webpack', 'Jest']
          }
        ],
        projects: [
          {
            id: 1,
            title: 'E-commerce Platform',
            description: 'A full-stack e-commerce solution with payment integration and admin dashboard.',
            technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
            links: [
              { name: 'Live Demo', url: 'https://demo.example.com' },
              { name: 'GitHub', url: 'https://github.com/yourusername/project' }
            ]
          },
          {
            id: 2,
            title: 'Task Management App',
            description: 'A collaborative task management application with real-time updates.',
            technologies: ['Vue.js', 'Firebase', 'Vuex', 'Vue Router'],
            links: [
              { name: 'Live Demo', url: 'https://demo.example.com' },
              { name: 'GitHub', url: 'https://github.com/yourusername/project' }
            ]
          }
        ],
        languages: [
          { name: 'English', level: 'Native' },
          { name: 'French', level: 'Fluent' },
          { name: 'Spanish', level: 'Intermediate' }
        ]
      }
    }
  }
}
</script>

<style scoped>
.cv {
  padding: 2rem 0;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0;
  margin-bottom: 2rem;
  border-radius: 12px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2rem;
}

.profile-info .name {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.profile-info .title {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  opacity: 0.9;
}

.profile-info .location {
  font-size: 1rem;
  opacity: 0.8;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-link {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  opacity: 0.9;
  transition: opacity 0.2s ease;
}

.contact-link:hover {
  opacity: 1;
}

.experience-item, .education-item {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.experience-item:last-child, .education-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.experience-header, .education-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.job-title, .degree {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.company, .institution {
  font-weight: 500;
  color: #3b82f6;
}

.period, .year {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

.job-description, .education-description {
  color: #475569;
  margin-bottom: 1rem;
  line-height: 1.7;
}

.achievements {
  list-style: none;
  padding-left: 0;
}

.achievements li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: #475569;
}

.achievements li::before {
  content: '•';
  color: #3b82f6;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.skill-category-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-item {
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #f8fafc;
}

.project-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.project-description {
  color: #475569;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.project-tech {
  margin-bottom: 1rem;
}

.project-links {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.languages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.language-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: #f8fafc;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.language-name {
  font-weight: 500;
  color: #1e293b;
}

.language-level {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .profile-info .name {
    font-size: 2rem;
  }
  
  .experience-header, .education-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .languages-grid {
    grid-template-columns: 1fr;
  }
}
</style>