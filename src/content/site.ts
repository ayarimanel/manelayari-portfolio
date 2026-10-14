import type { StaticImageData } from "next/image";

export type Site = {
  name: string;
  role: string;
  roleLine: string;
  email: string;
  location: string;
  url: string;
  description: string;
  /** Optional — rendered only when filled in. */
  linkedin?: string;
  /** Optional — a URL or a path under /public, e.g. "/manel-ayari-cv.pdf". */
  cvUrl?: string;
  /** Optional — import a photo (e.g. `import photo from "@media/manel.jpg"`) to replace the initials polaroid. */
  photo?: StaticImageData;
};

export const site: Site = {
  name: "Manel Ayari",
  role: "UX/UI Designer & Full-Stack Developer",
  roleLine: "UX/UI Designer & Full-Stack Developer. I design mockups and prototypes, and building them is my bonus.",
  email: "manelayari04@gmail.com",
  location: "Bardo, Tunis",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://manelayari.vercel.app",
  description:
    "UX/UI Designer & Full-Stack Developer based in Tunis. I design mockups and clickable prototypes in Figma for websites and apps. My bonus: I can also build them with React Native, Next.js and Node.js. Case studies: Glutenia, L'Africaine de Prod Artistique and Value.",
  linkedin: undefined,
  cvUrl: "/manel-ayari-cv.pdf",
  photo: undefined,
};

export const tools = [
  "Figma",
  "Photoshop",
  "Illustrator",
  "React Native",
  "Expo",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "Remotion",
];

/** Search keywords, from the CV. */
export const keywords = [
  "UX/UI designer",
  "full-stack developer",
  "product designer",
  "Figma",
  "prototyping",
  "React Native",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
];

/** Career summary, adapted from the CV. */
export const summary =
  "Computer Science graduate. I map users and flows and design high-fidelity mockups and interactive prototypes in Figma. My bonus: I can also build them with React Native and Next.js on a Node.js, Express and MongoDB back end.";

export const openTo = "Open to UX/UI, Product Designer and Full-Stack Developer roles.";

/** Skill groups, copied from the CV. */
export const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "UX & UI",
    items: [
      "User flows",
      "information architecture",
      "wireframes and mockups (maquettage)",
      "high-fidelity UI",
      "interactive prototyping",
      "mobile and responsive web design",
      "style guides",
      "UI states",
      "design hand-off",
    ],
  },
  { title: "Design tools", items: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Canva"] },
  {
    title: "Front-end",
    items: ["React Native", "Expo", "React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    title: "Back-end",
    items: ["Node.js", "Express", "MongoDB", "REST APIs", "JWT authentication", "SQL", "AI APIs (Gemini, Groq)"],
  },
  {
    title: "Tools & methods",
    items: ["Git", "GitHub", "Postman", "Remotion", "Scrum / Agile", "teamwork, client and developer collaboration"],
  },
  { title: "Languages", items: ["Arabic (native)", "French (fluent)", "English (advanced, C1)"] },
];
