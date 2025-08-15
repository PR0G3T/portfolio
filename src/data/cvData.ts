import type { CVData } from '@/types/cv'

export const cvData: CVData = {
  nom: 'Killian OTT',
  titre: 'AI Engineer',
  email: 'killianott4@gmail.com',
  adresse: 'Lyon, Auvergne-Rhône-Alpes, France',
  linkedin: 'https://www.linkedin.com/in/killian-ott/',
  github: 'https://github.com/PR0G3T',

  profil:
    'Passionate AI Engineer and Full Stack Developer with expertise in machine learning, deep learning, and modern web technologies. I specialize in developing intelligent applications that solve real-world problems. My goal is to create innovative AI solutions that have a meaningful impact on society.',

  competences: {
    top: ['Artificial Intelligence (AI)', 'Computer Science', 'Cybersecurity'],
    techniques: [
      'Python',
      'Machine Learning',
      'Deep Learning',
      'TensorFlow',
      'PyTorch',
      'JavaScript',
      'TypeScript',
      'React',
      'Vue.js',
      'Node.js',
      'PostgreSQL',
      'MongoDB',
      'AWS',
      'Docker',
      'Git',
      'REST APIs',
      'GraphQL',
    ],
    soft: [
      'AI Strategy',
      'Problem Solving',
      'Research & Innovation',
      'Communication',
      'Agile/Scrum',
      'Team Leadership',
      'Project Management',
    ],
  },

  experience: [
    {
      poste: 'Chief Executive Officer',
      entreprise: 'Team Cardinalis',
      periode: 'Jul 2020 - Present',
      description: [
        'Established in 2020, Team Cardinalis stands as an international organisation where eSports converge to inspire and unite',
        'Led innovation management and data engineering initiatives',
        'Managed international operations and strategic partnerships',
        'Oversaw organizational growth and development in the eSports industry',
      ],
      logo: '/images/companies/team-cardinalis.png',
    },
    {
      poste: 'Developer (Internship)',
      entreprise: 'Körber Supply Chain Software',
      periode: 'May 2024 - Jul 2024',
      description: [
        'German company specializing in automation and logistics technologies, founded in 1946',
        'Provided innovative solutions for supply chain management and digital transformation',
        'Focused on web development and data engineering projects',
        'Worked in Lyon, Auvergne-Rhône-Alpes, France',
      ],
      logo: '/images/companies/korber.png',
    },
    {
      poste: 'Ethical Hacker | Bounty Hunter',
      entreprise: 'Freelance',
      periode: 'May 2019 - Jun 2021',
      description: [
        'Individuals with solid computer-science expertise and a strong spirit of curiosity can excel as bounty hunters',
        'No age requirement for entry; sustained success requires continuous learning',
        'Specialized in cybersecurity and penetration testing',
        'Remote work based in France',
      ],
    },
    {
      poste: 'Chief Executive Officer',
      entreprise: 'StarSpace Studio',
      periode: 'Sep 2017 - May 2019',
      description: [
        'Autonomous game development studio employing Unreal Engine 4.22 for game development endeavors',
        'Led development team and managed project timelines',
        'Remote work based in France',
        'Oversaw all aspects of game development from concept to release',
      ],
    },
  ],

  formation: [
    {
      diplome: 'Artificial Intelligence, Computer Science & Cybersecurity',
      ecole: 'University of Helsinki - Open University',
      annee: '2025',
      specialisation:
        'Advanced courses in AI, machine learning, computer science fundamentals, and cybersecurity',
      logo: '/images/companies/university-of-helsinki.png',
    },
    {
      diplome: 'Mathematics and Computer Science',
      ecole: 'MITx Online',
      annee: '2025',
      specialisation:
        'Advanced mathematics with focus on algorithms, data structures, and computational complexity',
      logo: '/images/companies/mit.png',
    },
    {
      diplome: 'Bachelor in Business, Management, Marketing',
      ecole: 'Gaming Business School',
      annee: '2023 - 2025',
      specialisation:
        'Business fundamentals with focus on technology industry and digital marketing',
      logo: '/images/companies/gaming-business-school.png',
    },
    {
      diplome: 'High School Diploma - Science and Technology',
      ecole: 'Lycée Polyvalent Louis Armand',
      annee: '2021 - 2023',
      specialisation: 'Science and Technology of Industry and Sustainable Development',
    },
  ],

  langues: [
    { langue: 'English', niveau: 'Professional working proficiency' },
    { langue: 'French', niveau: 'Native or bilingual proficiency' },
    { langue: 'French Sign Language', niveau: 'Elementary proficiency' },
    { langue: 'Spanish', niveau: 'Elementary proficiency' },
  ],

  certifications: [
    {
      nom: 'Deep Learning Institute',
      organisation: 'NVIDIA',
      date: 'Mar 2025',
      skills: ['Artificial Intelligence'],
      specialisations: [
        'Deep Learning',
        'Building Real-Time Video AI Applications',
        'Disaster Risk Monitoring Using Satellite Imagery',
      ],
      logo: '/images/companies/nvidia.png',
      links: [
        {
          nom: 'Deep Learning',
          url: 'https://learn.nvidia.com/certificates?id=Pxo6ElBlT6qkvVatGYfYtw#',
        },
        {
          nom: 'Building Real-Time Video AI Applications',
          url: 'https://learn.nvidia.com/certificates?id=TPWJvK2jT0yGPr51LTv8zQ',
        },
        {
          nom: 'Disaster Risk Monitoring Using Satellite Imagery',
          url: 'https://learn.nvidia.com/certificates?id=w-ff9Q14Tj6-8BJz4JLEtA',
        },
        {
          nom: 'Building RAG Agents with LLMs',
          url: 'https://learn.nvidia.com/certificates?id=cMgd0NssQaKil3NExWHiig',
        },
        {
          nom: 'Getting Started with AI on Jetson Nano',
          url: 'https://learn.nvidia.com/certificates?id=ZYDksGXWRimS0ipFbytFlg',
        },
      ],
    },
    {
      nom: 'Open Science',
      organisation: 'NASA',
      date: 'Dec 2024',
      skills: ['Open Science'],
      logo: '/images/companies/nasa.png',
      links: [
        {
          nom: 'ORCID',
          url: 'https://orcid.org/0009-0001-2059-565X',
        },
      ],
    },
    {
      nom: 'Bootcamps',
      organisation: 'OpenCV University',
      date: 'Mar-Apr 2025',
      skills: ['Artificial Intelligence'],
      specialisations: [
        'PyTorch',
        'TensorFlow',
        'Keras',
        'OpenCV',
        'Deep Learning',
        'Machine Learning',
        'Computer Vision',
      ],
      logo: '/images/companies/opencv-university.png',
      links: [
        {
          nom: 'PyTorch Bootcamp',
          url: 'https://courses.opencv.org/certificates/29adf5ff263049309dc86205387732c1?latest72',
        },
        {
          nom: 'TensorFlow Keras Bootcamp',
          url: 'https://courses.opencv.org/certificates/cc17cd96a154426ea3049980d06530a9?latest60',
        },
        {
          nom: 'OpenCV Bootcamp',
          url: 'https://courses.opencv.org/certificates/24ebc0ebf8cb46faafa05e9cd48df8c4?latest77',
        },
      ],
    },
    {
      nom: 'Cybersecurity',
      organisation: 'ANSSI',
      date: 'Jun 2024',
      skills: ['Cybersecurity'],
      logo: '/images/companies/anssi.png',
    },
    {
      nom: 'French Driver License',
      organisation: 'France Titres (ANTS)',
      date: 'Sep 2023 – Sep 2028',
      skills: [],
    },
    {
      nom: 'ROCm Star - Application Developer Certificate',
      organisation: 'AMD',
      date: 'Jun 2025',
      skills: ['Artificial Intelligence'],
      specialisations: ['ROCm Star'],
      logo: '/images/companies/amd.png',
      links: [
        {
          nom: 'Certificate',
          url: 'https://learning.amd.com/certs/11279/75330EE494E744348CCD3344A06D856265062.pdf',
        },
      ],
    },
    {
      nom: 'Applied Remote Sensing Training',
      organisation: 'NASA',
      skills: [],
      specialisations: ['Fundamentals of Remote Sensing'],
      logo: '/images/companies/nasa.png',
      certificationImage: '/certifications/fundamentals_of_remote_sensing.png',
    },
    {
      nom: 'Challenges',
      organisation: 'Root-Me',
      skills: ['Cybersecurity'],
      logo: '/images/companies/root-me.png',
    },
    {
      nom: 'Cloud Infrastructure 2025',
      organisation: 'Oracle',
      skills: [],
      specialisations: ['AI Foundations Associate', 'Foundations Associate'],
      logo: '/images/companies/oracle.png',
    },
    {
      nom: 'CyberSecurity',
      organisation: 'TryHackMe',
      skills: ['Cybersecurity'],
      logo: '/images/companies/tryhackme.png',
    },
    {
      nom: 'Developer',
      organisation: 'Google',
      skills: ['Artificial Intelligence'],
      specialisations: ['Google Cloud Skills Boost', 'Google Developer Program'],
      logo: '/images/companies/google.png',
    },
    {
      nom: 'Education',
      organisation: 'Linux Foundation',
      skills: ['Artificial Intelligence'],
      logo: '/images/companies/the-linux-foundation.png',
    },
    {
      nom: 'Foundation',
      organisation: 'GitHub',
      skills: ['GitHub'],
      logo: '/images/companies/github.png',
    },
    {
      nom: 'Learn',
      organisation: 'Microsoft',
      skills: ['GitHub', 'Artificial Intelligence'],
      logo: '/images/companies/microsoft.png',
    },
    {
      nom: 'Learn',
      organisation: 'Hugging Face',
      skills: ['Artificial Intelligence'],
      specialisations: [
        'Deep Reinforcement Learning',
        'Fundamentals of LLMs',
        'Fundamentals of GRPO',
      ],
      logo: '/images/companies/huggingface.png',
    },
    {
      nom: 'Learning',
      organisation: 'LinkedIn',
      skills: ['Artificial Intelligence'],
      specialisations: ['Introduction to Artificial Intelligence'],
      logo: '/images/companies/linkedin.png',
    },
    {
      nom: 'Network Academy',
      organisation: 'Cisco',
      skills: ['Cybersecurity'],
      specialisations: ['Ethical Hacker'],
      logo: '/images/companies/cisco.png',
    },
    {
      nom: 'Online Courses',
      organisation: 'Coursera',
      skills: ['Artificial Intelligence', 'Network Engineering', 'Cybersecurity'],
      logo: '/images/companies/coursera.png',
    },
    {
      nom: 'Open University',
      organisation: 'University of Helsinki',
      skills: ['Artificial Intelligence', 'Computer Science', 'Cybersecurity'],
      specialisations: ['Building AI', 'Elements of AI', 'Advanced Course in Programming'],
      logo: '/images/companies/university-of-helsinki.png',
    },
    {
      nom: 'Research Academy',
      organisation: 'Elsevier',
      skills: ['Open Science'],
      specialisations: ['Open Science', 'Research Metrics', 'Certified Peer Reviewer'],
      logo: '/images/companies/elsevier.png',
    },
    {
      nom: 'Skills',
      organisation: 'Credly by Pearson',
      skills: [],
      logo: '/images/companies/credly.png',
    },
    {
      nom: 'Skills Build',
      organisation: 'IBM',
      skills: ['Artificial Intelligence', 'Cybersecurity'],
      specialisations: ['Certification Badges'],
      logo: '/images/companies/ibm.png',
    },
    {
      nom: 'Wireless Academy',
      organisation: 'Qualcomm',
      skills: ['Network Engineering'],
      specialisations: ['Qualcomm 5G Introductory-Level'],
      logo: '/images/companies/qualcomm.png',
    },
  ],
}
