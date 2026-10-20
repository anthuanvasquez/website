export const seoData = {
  title: `Anthuan Vasquez`,
  ogTitle: `Software Engineer, Problem Solver, and Web Enthusiast | Anthuan Vasquez`,
  description: `Hi I'm Anthuan. A Software Engineer with over 12+ years experience in software development.`,
  twitterDescription: `Anthuan Vasquez, where I play around with Nuxt, Vue, and more and showcase my blog, resources, etc.`,
  image: 'https://anthuanvasquez.net/yo.jpeg',
  mySite: 'https://anthuanvasquez.net',
  twitterHandle: '@anthuanvasquezm',
  mailAddress: 'me@anthuanvasquez.net',
};

export const socialLinks = {
  githubLink: 'https://github.com/anthuanvasquez',
  linkedinLink: 'https://www.linkedin.com/in/anthuanvasquez',
  twitterLink: 'https://x.com/anthuanvasquezm',
};

export const siteMetaData = [
  { name: 'description', content: seoData.description },
  { property: 'og:site_name', content: seoData.mySite },
  { property: 'og:type', content: 'website' },
  { property: 'og:url', content: seoData.mySite },
  { property: 'og:title', content: seoData.ogTitle },
  { property: 'og:description', content: seoData.description },
  { property: 'og:image', content: seoData.image },
  { name: 'twitter:site', content: seoData.twitterHandle },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:url', content: seoData.mySite },
  { name: 'twitter:title', content: seoData.ogTitle },
  { name: 'twitter:description', content: seoData.twitterDescription },
  { name: 'twitter:image', content: seoData.image },
];

export const navigationData = {
  resumeLink: '/resume',
  resumePdfUrl: 'https://shorturl.at/HLW6e',
  mainNavigation: [
    { name: 'Blog', href: '/blog', icon: 'i-lucide-book-open' },
    { name: 'Brain', href: '/brain', icon: 'i-lucide-brain' },
    {
      name: 'Resume',
      href: '/resume',
      icon: 'i-lucide-file-text',
    },
    {
      name: 'About',
      href: '/about',
      icon: 'i-lucide-info',
    },
    {
      name: 'Newsletter',
      href: 'https://anthuanvasquez.substack.com/',
      icon: 'i-simple-icons-substack',
      external: true,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/anthuanvasquez/',
      icon: 'i-simple-icons-linkedin',
      external: true,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/anthuanvasquez',
      icon: 'i-simple-icons-github',
      external: true,
    },
  ],
};

export const globalData = {
  copyEmail: {
    successTitle: 'Success',
    successDescription: 'Email copied to clipboard',
    buttonDefault: 'Get In Touch',
    buttonCopied: 'Email Copied!',
  },
};

export const homePageData = {
  hero: {
    headlineLine: 'Software Engineer',
    headlineTail: 'building modern web applications',
    roleLine1: 'Anthuan',
    roleLine2: 'Vásquez',
    description:
      'Architecting modern web applications, high-availability backends, and cloud systems with 12+ years of battle-tested production experience.',
    secondaryButton: "See what I've Built",
  },
  sections: {
    projects: { title: 'Projects', subtitle: 'Built' },
    services: { title: 'I Can Do', subtitle: 'What' },
    blog: {
      title: 'Latest Articles',
      subtitle: 'Blog',
      description:
        'Thoughts, tutorials, and deep dives into software architecture, full-stack engineering, and the modern web ecosystem.',
      actionLabel: 'View all articles',
    },
    brain: {
      title: 'Second Brain',
      subtitle: 'Digital Garden',
      description:
        'Atomic notes, mental models, and interconnected engineering concepts curated from my public Zettelkasten vault.',
      actionLabel: 'Explore Second Brain',
    },
    location: {
      title: "Where I'm Based",
      subtitle: 'Location',
      description:
        "I'm proudly located in the Dominican Republic, right in the heart of the Caribbean. From this tropical paradise, I collaborate with clients across time zones, bringing a global perspective and timely delivery to every project.",
      placesHeading: 'Places to Visit',
      placesSubtitle:
        'Visiting the Dominican Republic? Here are three iconic spots worth exploring:',
      places: [
        {
          name: 'Montecristi',
          region: 'Northwest Coast',
          coordinates: '',
          description:
            'Dramatic coastal cliffs at El Morro, natural mangroves, and serene uncrowded beaches.',
          href: 'https://www.godominicanrepublic.com/destinations/montecristi',
          isHomeBase: false,
        },
        {
          name: 'Santiago',
          region: 'Cibao Valley',
          coordinates: '',
          badge: 'Current Location',
          description:
            'The vibrant heart of the Cibao valley, surrounded by mountains, rich culture, and coffee trails.',
          href: 'https://www.godominicanrepublic.com/destinations/santiago-de-los-caballeros',
          isHomeBase: true,
        },
        {
          name: 'Santo Domingo',
          region: 'South Coast · Capital',
          coordinates: '',
          description:
            'Home to the historic Zona Colonial, 16th-century architecture, and coastal city life.',
          href: 'https://www.godominicanrepublic.com/destinations/santo-domingo',
          isHomeBase: false,
        },
      ],
    },
  },
  footer: {
    heading: 'Interested in working together',
    headingHighlight: '?',
    description:
      "Have a project in mind, need architectural guidance, or want to collaborate on a challenging web product? Let's connect and build something impactful.",
    copyright: 'All Rights Reserved.',
    developedBy: 'Developed with ♥ by',
    authorName: 'Anthuan',
  },
};

export const summaryData = {
  paragraphs: [
    "Hi, I'm Anthuan Vásquez, a {age} years old Developer.",
    "I'm a guy passionate for the technology, honest and a self-taught Front-End Developer. I consider myself as a person with initiative, who loves to take on new responsibilities, learning new things and face great challanges.",
    "With over {experience} years of experience in the web industry. I am qualified in evaluating business requirements and outreach plans for current and future success. I'm a self-taught Front-End Developer with an emphasis on scalability, robustness and high availability. I've been working with WordPress since January 2010 with version 2.9. I have worked in all versions since. In December 2014 I started my first steps in Magento version 1.9.",
    'I have worked with different brands, different needs and different roles, like to work with different aspects of the front-end.',
    'I specialize in the visual appearance of the websites or rather in their design, taking into account the technical requirements, functionality and user considerations, besides working with the back-end in the creation of modules / plugins in Magento and WordPress. As a Front-End developer, I have a great understanding of what it means, to provide high availability of Web applications and user experience.',
  ],
  currentlyHeading: "I'm Currently.",
  currentlyList: [
    { text: 'Working as a Freelance Front End Web Developer.', url: null },
    {
      text: 'Collaborating on some open-source projects.',
      url: 'https://github.com/anthuanvasquez',
    },
    {
      text: 'Producing music as Oido Perfecto.',
      url: 'https://oidoperfecto.net',
    },
    { text: 'Building my personal brand :).', url: null },
    {
      text: 'Reading',
      books: [
        {
          title: "You Don't JS",
          url: 'https://github.com/getify/You-Dont-Know-JS',
        },
        {
          title: 'JavaScript: The Good Parts',
          url: 'http://shop.oreilly.com/product/9780596517748.do',
        },
        { title: 'The One Thing', url: 'https://www.the1thing.com/' },
        {
          title: 'Elon Musk',
          url: 'https://www.amazon.com/Elon-Musk-SpaceX-Fantastic-Future-ebook/dp/B00KVI76ZS',
        },
      ],
    },
    { text: 'Fan of Dragon Ball Z, Super :)', url: null },
    { text: 'Being a father.', url: null },
    { text: 'Learning new things.', url: null },
  ],
};

export const aboutPageData = {
  eyebrow: 'Colophon & Profile',
  title: 'About this Website',
  paragraphs: [
    'This website serves as my personal portfolio, technical blog, public Second Brain (digital garden), and an active engineering sandbox. It is built with a strict focus on high performance, WCAG accessibility compliance, minimal external bloat, and modern web standards.',
    'Every article and Second Brain note is authored in plain Markdown and rendered through a lightweight Nitro engine, keeping the architecture fast, portable, and easy to evolve over time.',
  ],
  techStack: [
    { name: 'Nuxt 4', icon: 'i-simple-icons-nuxtdotjs' },
    { name: 'Vue 3', icon: 'i-simple-icons-vuedotjs' },
    { name: 'Tailwind CSS v4', icon: 'i-simple-icons-tailwindcss' },
    { name: 'TypeScript', icon: 'i-simple-icons-typescript' },
    { name: 'Nitro Engine', icon: 'i-lucide-zap' },
    { name: 'Mapbox GL', icon: 'i-simple-icons-mapbox' },
    { name: 'Vitest', icon: 'i-simple-icons-vitest' },
  ],
  aboutMe: {
    heading: 'About Me, Anthuan Vásquez',
    name: 'Anthuan Vásquez',
    role: 'Senior Software Engineer',
    location: 'Santiago, Dominican Republic',
    image: '/yo.jpeg',
    paragraphs: [
      "I'm a Senior Software Engineer based in Santiago, Dominican Republic, with over 12+ years of experience building scalable web applications, mission-critical financial platforms, and high-traffic e-commerce ecosystems.",
      'Throughout my career, I have led engineering teams, defined frontend and full-stack architecture standards, and worked across modern stacks including TypeScript, Vue, React, Angular, Node.js, Go, and Java EE.',
      'Beyond shipping production software, I enjoy building AI-powered developer tools, contributing to open-source projects, curating interconnected notes in my Second Brain, and producing music as Oído Perfecto.',
    ],
  },
  history: {
    heading: 'A Brief History about this Website',
    description:
      'Key milestones in the technical evolution of anthuanvasquez.net:',
    items: [
      {
        year: '2014–2018',
        event:
          'Launched the first static HTML, CSS, and vanilla JS version of AnthuanVasquez.net',
      },
      {
        year: '2019',
        event:
          'Initialized the Git-tracked repository and migrated the website into a universal Nuxt 2 application',
      },
      {
        year: '2024',
        event:
          'Completed a full platform rewrite migrating from Nuxt 2 to Vue 3 Composition API and Nuxt 3',
      },
      {
        year: '2025',
        event:
          'Decoupled data persistence into native Nitro server endpoints and introduced the first AI-powered conversational assistant',
      },
      {
        year: '2026',
        event:
          'Upgraded to Nuxt 4 and Tailwind CSS v4, launched the public Second Brain digital garden and Markdown blog, and completed a full WCAG accessibility overhaul',
      },
    ],
  },
  repositoryUrl: 'https://github.com/anthuanvasquez/website',
};
