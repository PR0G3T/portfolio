<template>
  <header class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="profile-section">
          <div class="profile-image">
            <div class="avatar-placeholder">
              <span>👤</span>
            </div>
          </div>
          <h1 class="name">{{ profile.name }}</h1>
          <p class="title">{{ profile.title }}</p>
          <p class="description">{{ profile.description }}</p>
          <div class="contact-info">
            <a :href="`mailto:${profile.email}`" class="contact-link">
              📧 {{ profile.email }}
            </a>
            <a :href="profile.linkedin" target="_blank" rel="noopener" class="contact-link">
              💼 LinkedIn
            </a>
            <a :href="profile.github" target="_blank" rel="noopener" class="contact-link">
              🐙 GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { Profile } from '@/stores/profile'

defineProps<{
  profile: Profile
}>()
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: var(--light-text);
  padding: 4rem 0;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.profile-image {
  margin-bottom: 2rem;
}

.avatar-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 3rem;
}

.name {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.title {
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  opacity: 0.9;
}

.description {
  font-size: 1.1rem;
  margin: 0 0 2rem 0;
  opacity: 0.8;
}

.contact-info {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.contact-link {
  color: var(--light-text);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.contact-link:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .name {
    font-size: 2rem;
  }
  
  .title {
    font-size: 1.2rem;
  }
  
  .contact-info {
    flex-direction: column;
    align-items: center;
  }
}
</style>