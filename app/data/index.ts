export const seoData = {
  title: `Anthuan Vasquez | Anthuan Vasquez`,
  ogTitle: `Full Stack Engineer, Problem Solver, and Web Enthusiast | Anthuan Vasquez`,
  description: `Hi I'm Anthuan. A Full Stack Engineer with over 10+ years experience in software development.`,
  twitterDescription: `Anthuan Vasquez, where I play around with Nuxt, Vue, and more and showcase my blog, resources, etc.`,
  image:
    'https://res.cloudinary.com/dmecmyphj/image/upload/v1673548905/nuxt-blog/cover_ntgs6u.webp',
  mySite: 'https://anthuanvasquez.net',
  twitterHandle: '@qdnvubp',
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
  resumeLink:
    'https://docs.google.com/document/d/e/2PACX-1vQVSF3BtZPxneS-ceNizZ1ai4s9sRpMT39al5b-GA4OjiVWR6OOHP1qFPsq83WsJn34-mArGZC9FFYy/pub',
  mainNavigation: [
    { name: 'Blog', href: '/blog', icon: 'i-lucide-book-open' },
    { name: 'Brain', href: '/brain', icon: 'i-lucide-brain' },
    {
      name: 'Resume',
      href: 'https://docs.google.com/document/d/e/2PACX-1vQVSF3BtZPxneS-ceNizZ1ai4s9sRpMT39al5b-GA4OjiVWR6OOHP1qFPsq83WsJn34-mArGZC9FFYy/pub',
      icon: 'i-lucide-file-text',
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
  subNavigation: [
    { name: 'Knowledge', href: '#knowledge' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Location', href: '#location' },
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
    greeting: "Hey, I'm Anthuan",
    emoji: '👋',
    roleLine1: 'Full-Stack',
    roleLine2: 'Engineer',
    description:
      'A Full-Stack Engineer living in DR, and I focus on making digital experiences that are easy to use, enjoyable, and get the job done.',
    secondaryButton: 'Browse Projects',
  },
  sections: {
    knowledge: { title: 'Knowledge', subtitle: 'A Vast Of' },
    experiences: {
      title: 'Experiences',
      subtitle: 'Latest',
      footerNote:
        'This is a curated selection – view my full resume for additional experience.',
    },
    projects: { title: 'Projects', subtitle: 'Built' },
    services: { title: 'I Can Do', subtitle: 'What' },
    location: {
      title: "Where I'm Based",
      subtitle: 'Location',
      description:
        "I'm proudly located in the Dominican Republic, right in the heart of the Caribbean. From this tropical paradise, I collaborate with clients across time zones — bringing a global perspective and timely delivery to every project.",
    },
  },
  footer: {
    heading: 'Interested in working together',
    headingHighlight: '?',
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
