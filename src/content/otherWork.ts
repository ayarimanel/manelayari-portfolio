/**
 * Smaller projects shown as simple cards on the homepage (no case-study page).
 * To promote one to a full case study, add a file in ./projects, list it in
 * ./projects/index.ts and remove it from here.
 */
export type OtherWork = {
  title: string;
  role: string;
  context: string;
  date: string;
  points: string[];
  tags: string[];
};

export const otherWork: OtherWork[] = [
  {
    title: "Perfumty",
    role: "UI/UX Designer & Developer",
    context: "Academic project, team of 2",
    date: "March 2025",
    points: [
      "Designed the UI/UX in Figma, including a dynamic product configurator to blend scents and preview them in real time.",
      "Co-developed the app in Next.js and TypeScript with React-Hook-Form + Zod validation and JWT auth on Node.js.",
    ],
    tags: ["Figma", "Next.js", "TypeScript", "Node.js"],
  },
];
