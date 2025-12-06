<script lang="ts">
	import cv from '$lib/data/cv';
	import Header from '$lib/components/Header.svelte';
	import ExperienceItem from '$lib/components/ExperienceItem.svelte';
	import EducationItem from '$lib/components/EducationItem.svelte';
	import ProjectItem from '$lib/components/ProjectItem.svelte';
	import CertificationItem from '$lib/components/CertificationItem.svelte';
</script>

<main class="container">
	<Header />

	<div class="cv-layout">
		<div class="cv-main">
			<section class="main-section grid gap-4" aria-labelledby="experience-title">
				<h2 id="experience-title" class="section-title">Experience</h2>
				<div>
					{#each cv.experience as exp (exp.company + exp.role)}
						<ExperienceItem {exp} />
					{/each}
				</div>
			</section>

			{#if cv.projects?.length}
				<section class="main-section grid gap-4" aria-labelledby="projects-title">
					<h2 id="projects-title" class="section-title">Projects</h2>
					<div>
						{#each cv.projects as project (project.name)}
							<ProjectItem {project} />
						{/each}
					</div>
				</section>
			{/if}

			{#if cv.education?.length}
				<section class="main-section grid gap-4" aria-labelledby="education-title">
					<h2 id="education-title" class="section-title">Education</h2>
					<div>
						{#each cv.education as edu (edu.school + edu.degree)}
							<EducationItem {edu} />
						{/each}
					</div>
				</section>
			{/if}

			{#if cv.certifications?.length}
				<section class="main-section grid gap-4" aria-labelledby="licenses-title">
					<h2 id="licenses-title" class="section-title">Licenses & certifications</h2>
					<div>
						{#each cv.certifications as cert (cert.name)}
							<CertificationItem {cert} />
						{/each}
					</div>
				</section>
			{/if}
		</div>

		<aside class="cv-sidebar">
			<section aria-labelledby="about-title">
				<h2 id="about-title" class="section-title">About</h2>
				<p class="description">{cv.summary}</p>
			</section>

			<div class="section-sep-sm"></div>

			<section class="grid gap-2" aria-labelledby="skills-title">
				<h2 id="skills-title" class="section-title">Skills</h2>
				<div class="sidebar-tags">
					{#each cv.skills as skill (skill)}
						<span class="tag">{skill}</span>
					{/each}
				</div>
			</section>

			{#if cv.languages?.length}
				<div class="section-sep-sm"></div>
				<section aria-labelledby="languages-title">
					<h2 id="languages-title" class="section-title">Languages</h2>
					<div class="languages-grid">
						{#each cv.languages as lang (lang.language)}
							<div class="language-item">
								<span class="language-name">{lang.language}</span>
								<span class="language-level">{lang.proficiency}</span>
							</div>
						{/each}
					</div>
				</section>
			{/if}
		</aside>
	</div>

	<footer class="footer-space">
		<p class="muted text-xs">Last updated {new Date().getFullYear()}</p>
	</footer>
</main>
