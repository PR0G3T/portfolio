<script lang="ts">
	import Header from '#lib/components/Header.svelte';
	import { getLocaleContext } from '#lib/i18n/locale.svelte.js';
	import ExperienceItem from '#lib/components/ExperienceItem.svelte';
	import EducationItem from '#lib/components/EducationItem.svelte';
	import ProjectItem from '#lib/components/ProjectItem.svelte';
	import CertificationItem from '#lib/components/CertificationItem.svelte';

	const i18n = getLocaleContext();
	const data = $derived(i18n.cv);
	const ui = $derived(i18n.ui);
</script>

<main class="container">
	<Header {data} />

	<div class="cv-layout">
		<div class="cv-main">
			<section class="main-section grid gap-4" aria-labelledby="experience-title">
				<h2 id="experience-title" class="section-title">{ui.experience}</h2>
				<div>
					{#each data.experience as exp (exp.company + exp.role)}
						<ExperienceItem {exp} />
					{/each}
				</div>
			</section>

			{#if data.projects?.length}
				<section class="main-section grid gap-4" aria-labelledby="projects-title">
					<h2 id="projects-title" class="section-title">{ui.projects}</h2>
					<div>
						{#each data.projects as project (project.name)}
							<ProjectItem {project} />
						{/each}
					</div>
				</section>
			{/if}

			{#if data.education?.length}
				<section class="main-section grid gap-4" aria-labelledby="education-title">
					<h2 id="education-title" class="section-title">{ui.education}</h2>
					<div>
						{#each data.education as edu (edu.school + edu.degree)}
							<EducationItem {edu} />
						{/each}
					</div>
				</section>
			{/if}

			{#if data.certifications?.length}
				<section class="main-section grid gap-4" aria-labelledby="licenses-title">
					<h2 id="licenses-title" class="section-title">{ui.certifications}</h2>
					<div>
						{#each data.certifications as cert (cert.name)}
							<CertificationItem {cert} />
						{/each}
					</div>
				</section>
			{/if}
		</div>

		<aside class="cv-sidebar">
			<section aria-labelledby="about-title">
				<h2 id="about-title" class="section-title">{ui.about}</h2>
				<p class="description">{data.summary}</p>
			</section>

			<div class="section-sep-sm"></div>

			<section class="grid gap-2" aria-labelledby="skills-title">
				<h2 id="skills-title" class="section-title">{ui.skills}</h2>
				<div class="sidebar-tags">
					{#each data.skills as skill (skill)}
						<span class="tag">{skill}</span>
					{/each}
				</div>
			</section>

			{#if data.languages?.length}
				<div class="section-sep-sm"></div>
				<section aria-labelledby="languages-title">
					<h2 id="languages-title" class="section-title">{ui.languages}</h2>
					<div class="languages-grid">
						{#each data.languages as lang (lang.language)}
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
		<p class="muted text-xs">{ui.lastUpdated(new Date().getFullYear())}</p>
	</footer>
</main>
