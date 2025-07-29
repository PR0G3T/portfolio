<template>
  <div class="home">
    <Header :profile="profileStore.profile" />

    <main class="main-content">
      <div class="container">
        <section class="section">
          <h2>À propos</h2>
          <div class="card">
            <p>{{ profileStore.profile.about }}</p>
          </div>
        </section>

        <section class="section">
          <h2>Compétences</h2>
          <div class="skills-grid">
            <div v-for="skill in profileStore.skills" :key="skill.category" class="skill-category card">
              <h3>{{ skill.category }}</h3>
              <div class="skill-tags">
                <span v-for="tech in skill.technologies" :key="tech" class="skill-tag">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>Expérience Professionnelle</h2>
          <div class="timeline">
            <div v-for="experience in profileStore.experiences" :key="experience.id" class="timeline-item card">
              <div class="timeline-header">
                <h3>{{ experience.position }}</h3>
                <span class="company">{{ experience.company }}</span>
                <span class="period">{{ experience.period }}</span>
              </div>
              <p class="description">{{ experience.description }}</p>
              <ul class="achievements">
                <li v-for="achievement in experience.achievements" :key="achievement">
                  {{ achievement }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>Formation</h2>
          <div class="education-grid">
            <div v-for="education in profileStore.education" :key="education.id" class="education-item card">
              <h3>{{ education.degree }}</h3>
              <p class="institution">{{ education.institution }}</p>
              <p class="period">{{ education.period }}</p>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>Projets</h2>
          <div class="projects-grid">
            <div v-for="project in profileStore.projects" :key="project.id" class="project-card card">
              <h3>{{ project.name }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tech">
                <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
                  {{ tech }}
                </span>
              </div>
              <div class="project-links">
                <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="btn btn-small">
                  Code
                </a>
                <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener" class="btn btn-small">
                  Demo
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { updateSEO } from '@/utils/seo'
import Header from '@/components/Header.vue'

const profileStore = useProfileStore()

onMounted(() => {
  updateSEO({
    title: `${profileStore.profile.name} - ${profileStore.profile.title}`,
    description: profileStore.profile.description,
    keywords: ['développeur', 'full stack', 'vue.js', 'typescript', 'portfolio'],
    author: profileStore.profile.name,
    ogUrl: window.location.href
  })
})
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.main-content {
  padding: 4rem 0;
}

.section {
  margin-bottom: 4rem;
}

.section h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--light-text);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.skill-category h3 {
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: var(--primary-color);
  color: var(--light-text);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.timeline-header h3 {
  margin: 0;
  color: var(--primary-color);
}

.company {
  font-weight: 600;
  color: var(--secondary-color);
}

.period {
  background: var(--primary-color);
  color: var(--light-text);
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.9rem;
}

.achievements {
  margin: 1rem 0 0 0;
  padding-left: 1.5rem;
}

.achievements li {
  margin-bottom: 0.5rem;
}

.education-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.education-item h3 {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.institution {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.project-description {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background: var(--secondary-color);
  color: var(--light-text);
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .timeline-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .section h2 {
    font-size: 2rem;
  }
}
</style>