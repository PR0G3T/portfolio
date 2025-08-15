<script setup lang="ts">
import { ref } from 'vue'
import { cvData } from '@/data/cvData'

const error = ref<string | null>(null)
const loading = ref<boolean>(false)

function reloadPage(): void {
  window.location.reload()
}
</script>

<template>
  <div id="app">
    <div v-if="error" class="error-container">
      <h1>Something went wrong</h1>
      <p>We're sorry, but something unexpected happened. Please try refreshing the page.</p>
      <button @click="error = null" class="retry-button">Try Again</button>
      <details class="error-details">
        <summary>Error Details</summary>
        <pre>{{ error }}</pre>
      </details>
    </div>

    <main v-else class="container">
      <div v-if="loading" class="loading">
        <p>Loading CV...</p>
      </div>

      <div v-else-if="error" class="error">
        <h2>Error Loading CV</h2>
        <p>{{ error }}</p>
        <button @click="reloadPage" class="retry-button">Reload Page</button>
      </div>

      <div v-else>
        <!-- CV Header -->
        <header class="header">
          <div class="banner-container">
            <img
              src="/images/banner.png"
              alt="Professional banner"
              class="banner-image"
              loading="lazy"
            />
          </div>
          <div class="header-content">
            <div class="header-left">
              <div class="profile-section">
                <div class="profile-photo">
                  <img
                    src="/images/profile.png"
                    :alt="`Profile photo of ${cvData.nom}`"
                    class="profile-image"
                    loading="lazy"
                  />
                </div>
                <div class="profile-info">
                  <h1 class="name">{{ cvData.nom }}</h1>
                  <h2 class="title">{{ cvData.titre }}</h2>
                </div>
              </div>
            </div>
            <div class="header-right">
              <div class="contact-info">
                <p>
                  <img src="/icons/gmail.svg" alt="Email" class="contact-icon" loading="lazy" />
                  <a :href="`mailto:${cvData.email}`" class="contact-link">{{ cvData.email }}</a>
                </p>

                <p>
                  <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                    />
                  </svg>
                  <span>{{ cvData.adresse }}</span>
                </p>
                <p>
                  <img
                    src="/icons/linkedin.svg"
                    alt="LinkedIn"
                    class="contact-icon"
                    loading="lazy"
                  />
                  <a
                    :href="cvData.linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="contact-link"
                  >
                    {{ cvData.linkedin.replace('https://www.linkedin.com/in/', '') }}
                  </a>
                </p>
                <p>
                  <img src="/icons/github.svg" alt="GitHub" class="contact-icon" loading="lazy" />
                  <a
                    :href="cvData.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="contact-link"
                  >
                    {{ cvData.github.replace('https://github.com/', '') }}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </header>
      </div>
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
