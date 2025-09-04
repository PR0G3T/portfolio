// Centralized CV data to keep the page markup minimal and DRY
// Replace placeholder values with your real information
export interface CvLink {
    label: string;
    href: string;
}

export interface CvExperienceItem {
    company: string;
    role: string;
    period: string;
    location?: string;
    items: string[];
    link?: string;
}

export interface CvProjectItem {
    name: string;
    description: string;
    link?: string;
}

export interface CvEducationItem {
    school: string;
    degree: string;
    period: string;
    details?: string;
    link?: string;
}

export interface CvCertificationItem {
    name: string;
    issuer: string;
    year?: string;
    link?: string;
}

export interface CvLanguageItem {
    language: string;
    proficiency: string;
}

export interface CvData {
    name: string;
    title: string;
    summary: string;
    location?: string;
    links: CvLink[];
    skills: string[];
    experience: CvExperienceItem[];
    projects?: CvProjectItem[];
    education?: CvEducationItem[];
    certifications?: CvCertificationItem[];
    languages?: CvLanguageItem[];
}

const cv: CvData = {
    name: 'Killian OTT',
    title: 'PR0G3T',
    summary:
        "I've always been fascinated by what humankind is capable of achieving. I love watching it grow, and I'm lucky enough to witness it. I intend to have a global impact, to be forever inscribed in history, and to be remembered by human consciousness.",
    location: '',
    links: [
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/killian-ott/' }
    ],
    skills: ['Artificial Intelligence (AI)', 'Computer Science', 'Cybersecurity'],
    experience: [
        {
            company: 'Team Cardinalis',
            role: 'Chief Executive Officer',
            period: 'Jul 2020 - Present',
            items: [
                'Established in 2020, Team Cardinalis stands as an international organisation where eSports converge to inspire and unite.'
            ]
        },
        {
            company: 'Körber Supply Chain Software',
            role: 'Developer (Internship)',
            period: 'May 2024 - Jul 2024',
            location: 'Lyon, Auvergne-Rhône-Alpes, France',
            items: [
                'German company specializing in automation and logistics technologies, founded in 1946.',
                'Provides innovative solutions for supply chain management and digital transformation.'
            ]
        },
        {
            company: 'Freelance',
            role: 'Ethical Hacker | Bounty Hunter',
            period: 'May 2019 - Jun 2021',
            location: 'France — Remote',
            items: [
                'Individuals with solid computer-science expertise and a strong spirit of curiosity can excel as bounty hunters.',
                'The essential prerequisite for sustained success is a commitment to continuous learning.'
            ]
        },
        {
            company: 'StarSpace Studio',
            role: 'Chief Executive Officer',
            period: 'Sep 2017 - May 2019',
            location: 'France — Remote',
            items: [
                'Autonomous game development studio employing Unreal Engine 4.22 for game development endeavors.'
            ]
        }
    ],
    projects: [],
    education: [
        {
            school: 'University of Helsinki',
            degree: 'Artificial Intelligence, Computer Science & Cybersecurity',
            period: 'Apr 2025',
            link: 'https://www.helsinki.fi/en',
            details:
                "The open university provides University of Helsinki's courses for everyone interested in them, offering the opportunity to strengthen your skills"
        },
        {
            school: 'MITx Courses',
            degree: 'Mathematics',
            period: 'Apr 2025',
            link: 'https://mitxonline.mit.edu/',
            details:
                'MITx offers various types of courses and programs to learn from MIT faculty and instructors. You can access free open-licensed educational materials, online professional credentials, blended learning experiences, and original content on emerging technologies.'
        },
        {
            school: 'Lycée Polyvalent Louis Armand',
            degree:
                'Baccalaureate, Science and Technology of Industry and Sustainable Development',
            period: 'Sep 2021 - Jul 2023',
            details:
                'Grade: Fairly Good. Secondary school in Villefranche-sur-Saône, part of the Lyon education authority.'
        }
    ],
    certifications: [
        { name: 'Deep Learning', issuer: 'NVIDIA Deep Learning Institute', year: 'Mar 2025', link: 'https://learn.nvidia.com/certificates?id=Pxo6ElBlT6qkvVatGYfYtw' },
        { name: 'Open Science', issuer: 'NASA - National Aeronautics and Space Administration', year: 'Dec 2024', link: 'https://orcid.org/0009-0001-2059-565X' },
        { name: 'Mathematics', issuer: 'MITx', year: 'Apr 2025', link: 'https://mitxonline.mit.edu/certificate/da79f264-b4a4-4c64-997c-5374659f540d/' }
    ],
    languages: [
        { language: 'English', proficiency: 'Professional working proficiency' },
        { language: 'French', proficiency: 'Native or bilingual proficiency' },
        { language: 'French Sign Languages', proficiency: 'Elementary proficiency' },
        { language: 'Spanish', proficiency: 'Elementary proficiency' }
    ]
};

export default cv;
