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
  role: "UX/UI designer",
  roleLine: "UX/UI designer. I design friendly apps and websites, then build them.",
  email: "manelayari04@gmail.com",
  location: "Bardo, Tunis",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://manel-ayari.vercel.app",
  description:
    "UX/UI designer based in Tunis. I design friendly apps and websites in Figma, then build them. Case studies: Glutenia and L'Africaine de Prod Artistique.",
  linkedin: undefined,
  cvUrl: undefined,
  photo: undefined,
};

export const tools = [
  "Figma",
  "Photoshop",
  "Illustrator",
  "React Native",
  "Expo",
  "Node.js",
  "Express",
  "MongoDB",
  "Remotion",
];
