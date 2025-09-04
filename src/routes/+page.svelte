<script lang="ts">
    import cv from '$lib/data/cv';
    import { base } from '$app/paths';

    // Build safe asset URLs that respect `paths.base` during prerender
    // - In dev (base = ''), return relative paths like `images/...`
    // - In prod (base = '/CV'), return absolute like `/CV/images/...`
    const assetUrl = (p: string): string => {
        const clean = p.replace(/^\//, '');
        return base ? `${base}/${clean}` : clean;
    };

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
        return assetUrl(`images/companies/${override ?? 'default'}.png`);
    };

    const handleImgError = (event: Event) => {
        const target = event.currentTarget as HTMLImageElement | null;
        if (target) target.src = assetUrl('images/companies/default.png');
    };

    const schoolLogoMap: Record<string, string> = {
        'University of Helsinki': 'university-of-helsinki',
        'MITx Courses': 'mitx_courses',
        'Lycée Polyvalent Louis Armand': 'default'
    };

    const getSchoolLogoPath = (school: string): string => {
        const override = schoolLogoMap[school];
        return assetUrl(`images/schools/${override ?? 'default'}.png`);
    };

    // Issuer logos for certifications (fallback to companies/default)
	const issuerLogoMap: Record<string, string> = {
		'Google Cloud': 'google',
		'NVIDIA Deep Learning Institute': 'nvidia',
		'NASA - National Aeronautics and Space Administration': 'nasa',
		'MITx': 'mitx'
	};
    const getIssuerLogoPath = (issuer: string): string => {
        const override = issuerLogoMap[issuer];
        return assetUrl(`images/companies/${override ?? 'default'}.png`);
    };
</script>

<main class="container">
    <section class="fade-in pt-12 pb-6">
        <div class="row-between">
            <div class="row-center-lg flex-auto-min-240">
                <img src={assetUrl('images/profile.png')} alt={cv.name} width="112" height="112" class="avatar" />
                <div>
                    <h1 class="page-title">
                        {cv.name}
                    </h1>
                    <p class="muted mt-1">{cv.title}</p>
                </div>
            </div>
            <nav class="row-center ml-auto gap-4">
                <a class="icon-link linkedin" href="https://www.linkedin.com/in/killian-ott/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <span class="svg-icon linkedin-mask" style={`--mask-url: url('${assetUrl('icons/linkedin.svg')}')`} aria-hidden="true"></span>
                </a>
                <a class="icon-link github" href="https://github.com/PR0G3T" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <span class="svg-icon" style={`--mask-url: url('${assetUrl('icons/github.svg')}')`} aria-hidden="true"></span>
                </a>
                <a class="icon-link instagram" href="https://www.instagram.com/pr0g3t/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <span class="svg-icon" style={`--mask-url: url('${assetUrl('icons/instagram.svg')}')`} aria-hidden="true"></span>
                </a>
                <a class="icon-link facebook" href="https://www.facebook.com/PR0G3T/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <span class="svg-icon" style={`--mask-url: url('${assetUrl('icons/facebook.svg')}')`} aria-hidden="true"></span>
                </a>
            </nav>
        </div>
    </section>

    <div class="section-sep"></div>

    <section class="grid-2" aria-labelledby="about-title">
        <h2 id="about-title" class="section-title">About</h2>
        <p class="prose text-sm leading-relaxed">{cv.summary}</p>
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
                <article class="item-block">
                    <header>
                        <div class="row-center">
                            <img src={getLogoPath(exp.company)} alt={exp.company} width="28" height="28" on:error={handleImgError} class="logo" />
                            <h3>{exp.role}</h3>
                            <span class="muted">@ {displayCompany(exp.company)}</span>
                        </div>
                        <p class="muted item-meta">{exp.period}</p>
                        {#if exp.location}
                            <p class="muted item-meta">{exp.location}</p>
                        {/if}
                    </header>
                    <div>
                        {#each exp.items as item}
                            <p class="muted item-text">{item}</p>
                        {/each}
                    </div>
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
                    <article class="item-block">
                        <header class="row-baseline">
                            <h3>{project.name}</h3>
                            {#if project.link}
                                <a class="link" href={project.link} rel="noopener noreferrer" target="_blank">Link</a>
                            {/if}
                        </header>
                        <p class="muted item-text">{project.description}</p>
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
                    <article class="item-block">
                        <div class="row-center">
                            <img src={getSchoolLogoPath(edu.school)} alt={edu.school} width="28" height="28" on:error={handleImgError} class="logo" />
                            <h3>{edu.degree}</h3>
                        </div>
                        <p class="muted">{edu.school}</p>
                        <p class="muted item-meta">{edu.period}</p>
                        {#if edu.details}
                            <p class="muted item-text">{edu.details}</p>
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
                    <article class="item-block">
                        <header>
                            <div class="row-center">
                                <img src={getIssuerLogoPath(cert.issuer)} alt={cert.issuer} width="28" height="28" on:error={handleImgError} class="logo" />
                                <h3>{cert.name}</h3>
                                {#if cert.link}
                                    <!-- Verify link moved below -->
                                {/if}
                            </div>
                            <p class="muted">{cert.issuer}</p>
                            {#if cert.year}
                                <p class="muted item-meta">{cert.year}</p>
                            {/if}
                            {#if cert.link}
                                <a class="link cred-link inline-block" href={cert.link} rel="noopener noreferrer" target="_blank">Credentials →</a>
                            {/if}
                        </header>
                    </article>
                {/each}
            </div>
        </section>
    {/if}

    {#if cv.languages?.length}
        <div class="section-sep"></div>
        <section class="grid-2" aria-labelledby="languages-title">
            <h2 id="languages-title" class="section-title">Languages</h2>
            <div>
                {#each cv.languages as lang}
                    <article class="item-block">
                        <h3>{lang.language}</h3>
                        <p class="muted text-sm">{lang.proficiency}</p>
                    </article>
                {/each}
            </div>
        </section>
    {/if}

    <footer class="footer-space">
        <p class="muted text-xs">Last updated {new Date().getFullYear()}</p>
    </footer>
</main>
