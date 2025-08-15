<script lang="ts">
	import cv from '$lib/data/cv';
	import { base } from '$app/paths';

	const openInNewTab = (href: string | undefined) => {
		if (!href) return;
		window.open(href, '_blank', 'noopener,noreferrer');
	};

	// Known logo mappings for companies with custom filenames
	const companyLogoMap: Record<string, string> = {
		'Körber Supply Chain Software': 'korber',
		'Team Cardinalis': 'teamcardinalis'
	};

	// Brand-specific casing overrides
	const brandCaseMap: Record<string, string> = {
		'Körber Supply Chain Software': 'KÖRBER Supply Chain Software'
	};
	const displayCompany = (name: string): string => brandCaseMap[name] ?? name;

	const getLogoPath = (company: string): string => {
		const override = companyLogoMap[company];
		return override ? `${base}/images/companies/${override}.png` : `${base}/images/companies/default.png`;
	};

	const handleImgError = (event: Event) => {
		const target = event.currentTarget as HTMLImageElement | null;
		if (target) target.src = `${base}/images/companies/default.png`;
	};

	const schoolLogoMap: Record<string, string> = {
		'University of Helsinki': 'university-of-helsinki',
		'MITx Courses': 'mitx_courses'
	};

	const getSchoolLogoPath = (school: string): string => {
		const override = schoolLogoMap[school];
		return override ? `${base}/images/schools/${override}.png` : `${base}/images/schools/default.png`;
	};
</script>

<main class="container">
	<section style="padding-top: 3rem; padding-bottom: 1.5rem;" class="fade-in">
		<div style="display:flex; align-items:center; gap:1.5rem; flex-wrap: wrap;">
			<img src={`${base}/images/profile.png`} alt={cv.name} width="80" height="80" style="width:80px; height:80px; border-radius: 50%; border: 1px solid var(--divider); object-fit: cover; background:#fff;" />
			<h1 style="font-size: 1.9rem; font-weight: 700; letter-spacing: -0.01em;">
				{cv.name}
			</h1>
		</div>
		<p class="muted" style="margin-top: 0.25rem">{cv.title}</p>

		<nav style="margin-top: 0.75rem; display:flex; align-items:center; gap:1rem;">
			<a class="icon-link" href="https://www.linkedin.com/in/killian-ott/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
				<span class="svg-icon linkedin-mask" style={`--mask-url: url('${base}/icons/linkedin.svg')` } aria-hidden="true"></span>
			</a>
			<a class="icon-link github" href="https://github.com/PR0G3T" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
				<span class="svg-icon" style={`--mask-url: url('${base}/icons/github.svg')` } aria-hidden="true"></span>
			</a>
		</nav>
	</section>

	<div class="section-sep"></div>

	<section class="grid-2" aria-labelledby="about-title">
		<h2 id="about-title" class="section-title">About</h2>
		<p class="prose" style="line-height: 1.7">{cv.summary}</p>
	</section>

	<div class="section-sep"></div>

	<section class="grid-2" aria-labelledby="skills-title">
		<h2 id="skills-title" class="section-title">Skills</h2>
		<div>
			{#each cv.skills as skill}
				<span class="tag">{skill}</span>
			{/each}
		</div>
	</section>

	<div class="section-sep"></div>

	<section class="grid-2" aria-labelledby="experience-title">
		<h2 id="experience-title" class="section-title">Experience</h2>
		<div>
			{#each cv.experience as exp}
				<article style="margin-bottom: 2rem;">
					<header>
						<div style="display:flex; gap:0.5rem; align-items: center; flex-wrap: wrap;">
							<img src={getLogoPath(exp.company)} alt={exp.company} width="24" height="24" on:error={handleImgError}
								style="width:24px; height:24px; object-fit: contain; border-radius:4px; border:1px solid var(--divider); background:#fff;" />
							<h3 style="font-weight: 600;">{exp.role}</h3>
							<span class="muted">@ {displayCompany(exp.company)}</span>
						</div>
						<p class="muted" style="font-size: 0.9rem;">{exp.period}{exp.location ? ` - ${exp.location}` : ''}</p>
					</header>
					<ul class="list-compact" style="margin-top: 0.5rem;">
						{#each exp.items as item}
							<li>{item}</li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>
	</section>

	{#if cv.projects?.length}
		<div class="section-sep"></div>
		<section class="grid-2" aria-labelledby="projects-title">
			<h2 id="projects-title" class="section-title">Projects</h2>
			<div>
				{#each cv.projects as project}
					<article style="margin-bottom: 1.25rem;">
						<header style="display:flex; align-items: baseline; gap:0.5rem; flex-wrap: wrap;">
							<h3 style="font-weight:600;">{project.name}</h3>
							{#if project.link}
								<a class="link" href={project.link} rel="noopener noreferrer" target="_blank">Link</a>
							{/if}
						</header>
						<p class="muted" style="margin-top: 0.25rem">{project.description}</p>
					</article>
				{/each}
			</div>
		</section>
	{/if}

	{#if cv.education?.length}
		<div class="section-sep"></div>
		<section class="grid-2" aria-labelledby="education-title">
			<h2 id="education-title" class="section-title">Education</h2>
			<div>
				{#each cv.education as edu}
					<article style="margin-bottom: 2rem;">
						<div style="display:flex; align-items:center; gap:0.5rem; flex-wrap: wrap;">
							<img src={getSchoolLogoPath(edu.school)} alt={edu.school} width="20" height="20" on:error={handleImgError}
								style="width:20px; height:20px; object-fit: contain; border-radius:4px; border:1px solid var(--divider); background:#fff;" />
							<h3 style="font-weight:600;">{edu.degree}</h3>
						</div>
						<p class="muted">{edu.school} - {edu.period}</p>
						{#if edu.details}
							<p class="muted" style="font-size: 0.9rem; margin-top: 0.25rem;">{edu.details}</p>
						{/if}
					</article>
				{/each}
			</div>
		</section>
	{/if}

	{#if cv.certifications?.length}
		<div class="section-sep"></div>
		<section class="grid-2" aria-labelledby="licenses-title">
			<h2 id="licenses-title" class="section-title">Licenses & certifications</h2>
			<div>
				{#each cv.certifications as cert}
					<p style="margin-bottom: 0.35rem;">
						<strong>{cert.name}</strong>
						<span class="muted"> - {cert.issuer}{cert.year ? `, ${cert.year}` : ''}</span>
					</p>
				{/each}
			</div>
		</section>
	{/if}

	<footer style="margin: 3rem 0 4rem;">
		<p class="muted" style="font-size: 0.85rem">Last updated {new Date().getFullYear()}</p>
	</footer>
</main>
