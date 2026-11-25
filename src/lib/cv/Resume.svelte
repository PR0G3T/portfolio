<script lang="ts">
	import type { ResumeModel } from '#lib/cv/model.js';
	import type { UiStrings } from '#lib/i18n/ui.js';

	interface Props {
		model: ResumeModel;
		ui: UiStrings;
	}

	let { model, ui }: Props = $props();
</script>

<article class="resume" aria-labelledby="resume-name">
	<header class="identity">
		<div class="identity-text">
			<h1 id="resume-name">{model.name}</h1>
			<p class="headline">{model.title}</p>
			{#if model.location}
				<p class="location">{model.location}</p>
			{/if}
		</div>
		<ul class="contact" aria-label={ui.contact}>
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			{#each model.contacts as contact (contact.href)}
				<li>
					<a href={contact.href} rel="noopener noreferrer" target="_blank">{contact.display}</a>
				</li>
			{/each}
			<!-- eslint-enable svelte/no-navigation-without-resolve -->
		</ul>
	</header>

	<section class="section summary" aria-labelledby="resume-summary">
		<h2 id="resume-summary">{ui.profile}</h2>
		<p>{model.summary}</p>
	</section>

	<section class="section" aria-labelledby="resume-experience">
		<h2 id="resume-experience">{ui.experience}</h2>
		<div class="entries">
			{#each model.experience as experience (experience.company + experience.role)}
				<div class="entry">
					<div class="entry-head">
						<h3>{experience.role}</h3>
						<span class="period">{experience.period}</span>
					</div>
					<p class="organisation">
						{experience.company}{#if experience.location}
							· {experience.location}{/if}
					</p>
					{#if experience.highlight}
						<p class="highlight">{experience.highlight}</p>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	{#if model.projects.length > 0}
		<section class="section projects" aria-labelledby="resume-projects">
			<h2 id="resume-projects">{ui.projects}</h2>
			<div class="entries">
				{#each model.projects as project (project.name)}
					<div class="entry">
						<h3>{project.name}</h3>
						{#if project.description}
							<p class="project-description">{project.description}</p>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<section class="section" aria-labelledby="resume-education">
		<h2 id="resume-education">{ui.education}</h2>
		<div class="entries">
			{#each model.education as education (education.school + education.degree)}
				<div class="entry">
					<div class="entry-head">
						<h3>{education.degree}</h3>
						<span class="period">{education.period}</span>
					</div>
					<p class="organisation">{education.school}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="section" aria-labelledby="resume-certifications">
		<h2 id="resume-certifications">{ui.certifications}</h2>
		<div class="certifications">
			{#each model.certifications as certification (certification.name)}
				<div class="certification">
					<span class="certification-name">{certification.name}</span>
					<span class="certification-meta">{certification.meta}</span>
				</div>
			{/each}
		</div>
	</section>

	<div class="meta-grid">
		<section class="section meta-section" aria-labelledby="resume-skills">
			<h2 id="resume-skills">{ui.skills}</h2>
			<ul class="inline-list">
				{#each model.skills as skill (skill)}
					<li>{skill}</li>
				{/each}
			</ul>
		</section>

		{#if model.languages.length > 0}
			<section class="section meta-section" aria-labelledby="resume-languages">
				<h2 id="resume-languages">{ui.languages}</h2>
				<ul class="inline-list">
					{#each model.languages as language (language.language)}
						<li>{language.language} <span class="level">({language.proficiency})</span></li>
					{/each}
				</ul>
			</section>
		{/if}
	</div>
</article>

<style>
	.resume {
		font-family: 'Inter Print', 'Inter Display', ui-sans-serif, system-ui, sans-serif;
		font-size: var(--resume-font-size, 8.5pt);
		line-height: 1.38;
		color: #111;
		font-optical-sizing: auto;
		/* Chrome's PDF backend maps the 'calt' alternates for "(" and "-" to
		   private-use code points. Disabling contextual ligatures keeps the
		   text layer selectable, copyable and ATS-friendly. */
		font-variant-ligatures: none;
		font-feature-settings: 'calt' 0;
		overflow-wrap: break-word;
		text-rendering: optimizeLegibility;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	.identity {
		padding-bottom: 0.7em;
		border-bottom: 0.6pt solid #111;
	}

	h1 {
		margin: 0;
		font-size: 2.45em;
		line-height: 1.02;
		font-weight: 700;
		letter-spacing: -0.03em;
		text-wrap: balance;
	}

	.headline {
		margin: 0.32em 0 0;
		font-size: 0.82em;
		font-weight: 600;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		color: #555;
	}

	.location {
		margin: 0.25em 0 0;
		font-size: 0.7em;
		color: #555;
	}

	.contact {
		display: flex;
		flex-wrap: wrap;
		gap: 0.1em 0;
		margin: 0.5em 0 0;
		padding: 0;
		list-style: none;
		font-size: 0.7em;
		line-height: 1.45;
		color: #333;
	}

	.contact li {
		white-space: normal;
	}

	.contact a {
		overflow-wrap: anywhere;
	}

	.contact li:not(:last-child)::after {
		content: '·';
		margin: 0 0.5em;
		color: #aaa;
	}

	.contact a:hover {
		text-decoration: underline;
	}

	.section {
		margin-top: 1.05em;
		break-inside: avoid;
	}

	h2 {
		margin: 0 0 0.42em;
		padding-bottom: 0.16em;
		border-bottom: 0.5pt solid #d4d4d4;
		font-size: 0.7em;
		font-weight: 700;
		letter-spacing: 0.02em;
		line-height: 1.2;
		text-transform: uppercase;
	}

	.summary p {
		margin: 0;
		font-size: 0.88em;
		line-height: 1.45;
		color: #333;
		text-wrap: pretty;
	}

	.entries {
		display: flex;
		flex-direction: column;
	}

	.entry {
		break-inside: avoid;
	}

	.entry + .entry {
		margin-top: 0.55em;
	}

	.entry-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1em;
	}

	h3 {
		margin: 0;
		font-size: 0.98em;
		font-weight: 650;
		line-height: 1.3;
	}

	.period {
		flex: none;
		font-size: 0.76em;
		font-weight: 500;
		color: #555;
		white-space: nowrap;
	}

	.organisation {
		margin: 0.08em 0 0;
		font-size: 0.82em;
		font-weight: 500;
		color: #555;
	}

	.highlight,
	.project-description {
		margin: 0.2em 0 0;
		font-size: 0.84em;
		line-height: 1.42;
		color: #333;
		text-wrap: pretty;
	}

	.projects .entry {
		margin-top: 0.45em;
	}

	.certifications {
		display: flex;
		flex-direction: column;
		gap: 0.22em;
	}

	.certification {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1em;
		font-size: 0.84em;
		line-height: 1.38;
		break-inside: avoid;
	}

	.certification-name {
		font-weight: 600;
	}

	.certification-meta {
		flex: none;
		font-size: 0.92em;
		color: #555;
		text-align: right;
	}

	.meta-grid {
		display: grid;
		grid-template-columns: 1.15fr 1fr;
		gap: 1.5em;
	}

	.meta-section {
		margin-top: 1.05em;
	}

	.inline-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.1em 0;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: 0.84em;
		line-height: 1.42;
		color: #333;
	}

	.inline-list li:not(:last-child)::after {
		content: '·';
		margin: 0 0.45em;
		color: #aaa;
	}

	.level {
		color: #555;
	}

	/* Density is controlled synchronously by the fitter on .cv-page. */
	:global(.cv-page[data-density='compact']) .highlight,
	:global(.cv-page[data-density='minimal']) .highlight,
	:global(.cv-page[data-density='compact']) .project-description,
	:global(.cv-page[data-density='minimal']) .project-description,
	:global(.cv-page[data-density='minimal']) .summary,
	:global(.cv-page[data-density='minimal']) .projects {
		display: none;
	}

	@media print {
		.resume {
			color: #000;
		}

		a {
			color: #000;
		}
	}
</style>
