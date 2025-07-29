<template>
  <div id="app">
    <header class="header">
      <nav class="nav">
        <div class="nav-brand">Mon Portfolio</div>
        <ul class="nav-menu">
          <li><a href="#accueil" @click="scrollToSection('accueil')">Accueil</a></li>
          <li><a href="#apropos" @click="scrollToSection('apropos')">À propos</a></li>
          <li><a href="#competences" @click="scrollToSection('competences')">Compétences</a></li>
          <li><a href="#projets" @click="scrollToSection('projets')">Projets</a></li>
          <li><a href="#contact" @click="scrollToSection('contact')">Contact</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section id="accueil" class="hero">
        <div class="hero-content">
          <h1>Bienvenue sur mon Portfolio</h1>
          <p>Développeur passionné par les technologies web modernes</p>
          <button class="cta-button" @click="scrollToSection('apropos')">
            Découvrir mon travail
          </button>
        </div>
      </section>

      <section id="apropos" class="section">
        <div class="container">
          <h2>À propos de moi</h2>
          <div class="about-content">
            <div class="about-text">
              <p>
                Je suis un développeur web passionné par la création d'applications modernes et performantes. 
                J'aime travailler avec les dernières technologies et frameworks pour offrir la meilleure 
                expérience utilisateur possible.
              </p>
              <p>
                Mon expertise couvre le développement frontend et backend, avec une spécialisation 
                dans les frameworks JavaScript modernes comme Vue.js, React et Node.js.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="competences" class="section">
        <div class="container">
          <h2>Mes Compétences</h2>
          <div class="skills-grid">
            <div class="skill-card" v-for="skill in skills" :key="skill.name">
              <h3>{{ skill.name }}</h3>
              <div class="skill-level">
                <div class="skill-bar" :style="{ width: skill.level + '%' }"></div>
              </div>
              <p>{{ skill.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="projets" class="section">
        <div class="container">
          <h2>Mes Projets</h2>
          <div class="projects-grid">
            <div class="project-card" v-for="project in projects" :key="project.id">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="project-tech">
                <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" class="section">
        <div class="container">
          <h2>Contact</h2>
          <div class="contact-content">
            <p>Vous souhaitez collaborer sur un projet ? N'hésitez pas à me contacter !</p>
            <div class="contact-info">
              <div class="contact-item">
                <strong>Email:</strong> votre.email@example.com
              </div>
              <div class="contact-item">
                <strong>GitHub:</strong> 
                <a href="https://github.com/votre-username" target="_blank">github.com/votre-username</a>
              </div>
              <div class="contact-item">
                <strong>LinkedIn:</strong> 
                <a href="https://linkedin.com/in/votre-profile" target="_blank">linkedin.com/in/votre-profile</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 Mon Portfolio. Développé avec Vue.js et déployé sur GitHub Pages.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      skills: [
        {
          name: 'Vue.js',
          level: 90,
          description: 'Framework JavaScript progressif pour construire des interfaces utilisateur'
        },
        {
          name: 'JavaScript',
          level: 85,
          description: 'Langage de programmation principal pour le développement web'
        },
        {
          name: 'HTML/CSS',
          level: 95,
          description: 'Technologies de base pour la structure et le style des pages web'
        },
        {
          name: 'Node.js',
          level: 75,
          description: 'Runtime JavaScript pour le développement backend'
        },
        {
          name: 'Git',
          level: 80,
          description: 'Système de contrôle de version distribué'
        },
        {
          name: 'Docker',
          level: 70,
          description: 'Plateforme de conteneurisation pour le déploiement'
        }
      ],
      projects: [
        {
          id: 1,
          title: 'Portfolio Personnel',
          description: 'Site web personnel développé avec Vue.js et déployé sur GitHub Pages avec CI/CD automatisé.',
          technologies: ['Vue.js', 'GitHub Actions', 'CSS3']
        },
        {
          id: 2,
          title: 'Application E-commerce',
          description: 'Plateforme de vente en ligne avec panier d\'achat et système de paiement.',
          technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe']
        },
        {
          id: 3,
          title: 'Dashboard Analytics',
          description: 'Interface d\'administration avec graphiques et statistiques en temps réel.',
          technologies: ['Vue.js', 'Chart.js', 'WebSocket', 'Express.js']
        }
      ]
    }
  },
  methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
.header {
  background: #2c3e50;
  color: white;
  padding: 1rem 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-menu a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-menu a:hover {
  color: #3498db;
}

/* Hero Section */
.hero {
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding-top: 80px;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.cta-button {
  background: #3498db;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.cta-button:hover {
  background: #2980b9;
}

/* Sections */
.section {
  padding: 5rem 0;
}

.section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2c3e50;
}

/* About Section */
.about-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.about-text p {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  line-height: 1.8;
}

/* Skills Section */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.skill-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.skill-card:hover {
  transform: translateY(-5px);
}

.skill-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.skill-level {
  background: #ecf0f1;
  height: 10px;
  border-radius: 5px;
  margin: 1rem 0;
  overflow: hidden;
}

.skill-bar {
  background: linear-gradient(90deg, #3498db, #2980b9);
  height: 100%;
  border-radius: 5px;
  transition: width 1s ease-in-out;
}

/* Projects Section */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.project-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.project-tech {
  margin-top: 1rem;
}

.tech-tag {
  background: #3498db;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-block;
}

/* Contact Section */
.contact-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.contact-info {
  margin-top: 2rem;
}

.contact-item {
  margin: 1rem 0;
  font-size: 1.1rem;
}

.contact-item a {
  color: #3498db;
  text-decoration: none;
}

.contact-item a:hover {
  text-decoration: underline;
}

/* Footer */
.footer {
  background: #2c3e50;
  color: white;
  text-align: center;
  padding: 2rem 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .section h2 {
    font-size: 2rem;
  }
  
  .skills-grid,
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>