import type { CvData } from '#lib/cv/types.js';

// Single source of truth for every CV surface (portfolio, print view, exports).
const cv: CvData = {
	name: 'Killian OTT',
	title: 'PR0G3T',
	summary:
		'I stand in awe of the sheer scale of human potential. A privileged witness to our unfolding evolution, I seek not merely to watch, but to act, to leave a legacy that outlasts my time, forever inscribed in the collective consciousness.',
	location: 'Lyon, Auvergne-Rhône-Alpes, France',
	email: 'killianott4@gmail.com',
	phone: '0783637398',
	socials: [
		{ type: 'linkedin', href: 'https://www.linkedin.com/in/killian-ott/', label: 'LinkedIn' },
		{ type: 'github', href: 'https://github.com/PR0G3T', label: 'GitHub' },
		{ type: 'orcid', href: 'https://orcid.org/0009-0001-2059-565X', label: 'ORCID' }
	],
	skills: [
		'Artificial Intelligence (AI)',
		'Computer Science',
		'Cybersecurity',
		'Web Development',
		'Desktop Application Development'
	],
	experience: [
		{
			company: 'Hussard Group',
			role: 'Chairman & Chief Executive Officer',
			period: 'Jan 2025 - Present',
			location: 'Lyon, Auvergne-Rhône-Alpes, France',
			items: []
		},
		{
			company: 'Hussard AI',
			role: 'Chairman & Chief Executive Officer',
			period: 'Jan 2025 - Present',
			location: 'Lyon, Auvergne-Rhône-Alpes, France',
			items: []
		},
		{
			company: "Sup de Vinci - école d'informatique",
			role: 'Instructor (Freelance)',
			period: 'Dec 2025 - Present',
			location: 'Bordeaux, Nouvelle-Aquitaine, France',
			items: [
				'French higher education institution specializing in computer science, software development, and cybersecurity.'
			]
		},
		{
			company: 'Team Cardinalis',
			role: 'Chairman & Chief Executive Officer',
			period: 'Jul 2020 - Present',
			items: [
				'International eSport organisation, established in 2020, where innovations and social initiatives converge to inspire and unite.'
			]
		},
		{
			company: 'Körber Supply Chain Software',
			role: 'Developer (Internship)',
			period: 'May 2024 - Jul 2024',
			location: 'Lyon, Auvergne-Rhône-Alpes, France',
			items: [
				'German company specializing in automation and logistics technologies, founded in 1946. It provides innovative solutions for supply chain management and digital transformation.'
			]
		},
		{
			company: 'Freelance',
			role: 'Ethical Hacker | Bounty Hunter',
			period: 'May 2019 - Jun 2021',
			location: 'France - Remote',
			items: [
				'Individuals with solid computer-science expertise and a strong spirit of curiosity can excel as bounty hunters.',
				'There is no age requirement for entry; the essential prerequisite for sustained success is a commitment to continuous learning.'
			]
		},
		{
			company: 'StarSpace Studio',
			role: 'Chairman & Chief Executive Officer',
			period: 'Sep 2017 - May 2019',
			location: 'France - Remote',
			items: [
				'Autonomous game development studio employing Unreal Engine 4.22 for game development endeavors.'
			]
		}
	],
	projects: [],
	education: [
		{
			school: 'University of Helsinki',
			degree: 'Mathematics & Computer Science',
			period: 'Apr 2023 - Present',
			link: 'https://www.helsinki.fi/en',
			credential: '/credentials/university-of-helsinki/Opiskelutodistus.pdf',
			credentialLabel: 'Opiskelutodistus',
			details:
				'Whether your goal is to strengthen your professional competence, switch careers or graduate faster, the Open University is there for you. Be open to new thinking.'
		},
		{
			school: 'MITx Courses',
			degree: 'Mathematics & Data Engineering',
			period: 'Apr 2025 - Present',
			link: 'https://mitxonline.mit.edu/',
			credentials: [
				{
					label: 'Linear Algebra and NxN Systems',
					href: 'https://mitxonline.mit.edu/certificate/da79f264-b4a4-4c64-997c-5374659f540d/'
				},
				{
					label: 'Multivariable Calculus 3: Theorems and Applications',
					href: 'https://mitxonline.mit.edu/certificate/84ec49d0-889b-42f6-abc6-3b5bffd44a1b/'
				}
			],
			details:
				'MITx offers various types of courses and programs to learn from MIT faculty and instructors.'
		},
		{
			school: 'Lycée Polyvalent Louis Armand',
			degree: 'Baccalaureate, Science and Technology of Industry and Sustainable Development',
			period: 'Sep 2021 - Jul 2023',
			details:
				'Grade: Fairly Good. Secondary school in Villefranche-sur-Saône, part of the Lyon education authority.'
		},
		{
			school: 'LYCEE POLYVALENT AIGUERANDE',
			degree: 'General',
			period: 'Sep 2020 - Sep 2021'
		}
	],
	certifications: [
		{
			name: 'Python Computer Vision',
			issuer: 'OpenCV University',
			featured: true,
			subCertifications: [{ name: 'PyTorch' }, { name: 'TensorFlow' }, { name: 'OpenCV' }]
		},
		{
			name: 'ANSSI Cybersecurity MOOC',
			issuer: "ANSSI - Agence nationale de la sécurité des systèmes d'information",
			year: 'Jun 2024',
			credentialId: 'xaMeiBhKKiUhGR4FUs4hllm0KluAsnVkLHNap7UNBSYzNwEsRiCx9a5VMWb_001354_28062024',
			featured: true,
			subCertifications: [{ name: 'MOOC Certificate' }]
		},
		{
			name: 'French Driver License',
			issuer: 'France Titres - Agence nationale des titres sécurisés - ANTS',
			year: 'Sep 2023 - Sep 2028',
			credentialId: '23AS46014'
		},
		{
			name: 'NVIDIA Deep Learning Institute',
			issuer: 'NVIDIA',
			year: 'Mar 2025',
			featured: true,
			subCertifications: [
				{ name: 'Deep Learning' },
				{ name: 'Building Real-Time Video AI Applications' },
				{ name: 'Disaster Risk Monitoring Using Satellite Imagery' },
				{ name: 'Building RAG Agents with LLMs' },
				{ name: 'Getting Started with AI on Jetson Nano' }
			]
		},
		{
			name: 'Open Science',
			issuer: 'NASA - National Aeronautics and Space Administration',
			credentialId: '0009-0001-2059-565X',
			subCertifications: [{ name: 'Open Science Essentials' }, { name: 'Open Science 101' }]
		},
		{
			name: 'Linux Foundation Education',
			issuer: 'The Linux Foundation'
		},
		{
			name: 'IBM SkillsBuild',
			issuer: 'IBM'
		},
		{
			name: 'Developer Program',
			issuer: 'Google',
			featured: true,
			subCertifications: [
				{ name: 'Google Cloud Skills Boost' },
				{ name: 'Google Developer Program' }
			]
		},
		{
			name: 'Hugging Face Learn',
			issuer: 'Hugging Face',
			subCertifications: [
				{ name: 'Deep Reinforcement Learning' },
				{ name: 'Fundamentals of LLMs' },
				{ name: 'Fundamentals of GRPO' }
			]
		},
		{
			name: 'Cloud Infrastructure 2025',
			issuer: 'Oracle',
			subCertifications: [{ name: 'AI Foundations Associate' }, { name: 'Foundations Associate' }]
		},
		{
			name: 'Microsoft Learn',
			issuer: 'Microsoft'
		},
		{
			name: 'TryHackMe Top 1%',
			issuer: 'TryHackMe',
			featured: true
		},
		{
			name: 'Computer Vision Foundations',
			issuer: 'Ultralytics',
			credentialId: '0c5bf1b2-12b0-4ae8-9faf-db4fab734e3a'
		},
		{
			name: 'NVIDIA Academy',
			issuer: 'NVIDIA',
			subCertifications: [
				{ name: 'Introduction to Networking' },
				{ name: 'AI for All From Basics to Gen AI Practice' }
			]
		},
		{
			name: 'MathWorks Academy',
			issuer: 'MathWorks',
			subCertifications: [
				{ name: 'Reinforcement Learning Onramp' },
				{ name: 'Computer Vision Onramp' },
				{ name: 'Deep Learning Onramp' }
			]
		},
		{
			name: 'Anthropic Skilljar',
			issuer: 'Anthropic',
			subCertifications: [
				{ name: 'Introduction to Model Context Protocol' },
				{ name: 'Model Context Protocol : Advanced Topics' },
				{ name: 'AI Fluency : Framework & Foundations' }
			]
		},
		{
			name: 'Application Developer',
			issuer: 'AMD',
			year: '2025',
			link: 'https://learning.amd.com/certs/11279/75330EE494E744348CCD3344A06D856265062.pdf',
			credentialId: '11279/75330EE494E744348CCD3344A06D856265062',
			featured: true
		},
		{
			name: 'Root-Me Challenges',
			issuer: 'Root-Me'
		},
		{
			name: 'Online Courses',
			issuer: 'Coursera',
			year: '2025',
			link: 'https://www.coursera.org/learner/killian-ott'
		},
		{
			name: 'Wireless Academy',
			issuer: 'Qualcomm',
			year: '2025',
			credentialId: 'QFNFY74C',
			featured: true,
			subCertifications: [
				{
					name: '5G Introductory Level',
					link: '/credentials/qualcomm/5g-introductory-level.webp'
				},
				{
					name: 'AI Upskilling Certificate - Technical Foundation',
					link: '/credentials/qualcomm/ai-upskilling-certificate-technical-foundation.webp'
				}
			]
		},
		{
			name: 'GitHub Foundation',
			issuer: 'GitHub'
		},
		{
			name: 'Applied Remote Sensing Training',
			issuer: 'NASA - National Aeronautics and Space Administration',
			year: '2025',
			credentialId: '9554993775KO',
			featured: true,
			subCertifications: [
				{
					name: 'Fundamentals of Remote Sensing',
					link: '/credentials/arset/fundamentals-of-remote-sensing.webp'
				},
				{
					name: 'Hyperspectral Data for Land and Coastal Systems',
					link: '/credentials/arset/hyperspectral-data-for-land-and-coastal-systems.webp'
				}
			]
		}
	],
	languages: [
		{ language: 'English', proficiency: 'Professional working proficiency' },
		{ language: 'Finnish', proficiency: 'Elementary proficiency' },
		{ language: 'French', proficiency: 'Native or bilingual proficiency' },
		{ language: 'French Sign Languages', proficiency: 'Elementary proficiency' },
		{ language: 'Spanish', proficiency: 'Elementary proficiency' }
	]
};

export default cv;
