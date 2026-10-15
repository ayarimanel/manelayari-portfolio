import type { Project } from "../types";
import { video } from "../media";

import appHome from "@media/glutenia/app/home.png";
import appMap from "@media/glutenia/app/map-live.png";
import appBadges from "@media/glutenia/app/badges.png";
import appResultGluten from "@media/glutenia/app/ai-result-gluten.png";
import figmaHome from "@media/glutenia/figma/home.png";
import figmaMap from "@media/glutenia/figma/map.png";
import glutitanThumbsUp from "@media/glutenia/mascot/glutitan-thumbs-up.png";

const v = (name: string) => video("glutenia", name, 720, 1456);

export const glutenia: Project = {
  slug: "glutenia",
  title: "Glutenia",
  theme: "glutenia",
  cardLabel: "Academic project · Mobile app · Design + build",
  heroLabel: { number: "01", text: "Academic project · Mobile app" },
  summary: "A mobile app that helps people living gluten-free check products, shop safely and find gluten-free places.",
  lead: "A mobile app supporting a gluten-free lifestyle — designed and built from Figma to a working app.",
  metaDescription:
    "Case study: Glutenia, a mobile app for people living gluten-free — barcode and AI label scanning, a gluten-free shop, map and events. Designed in Figma and built in React Native by Manel Ayari.",
  readingTime: "4 min read",
  cardStickers: ["Figma", "React Native", "AI label scan"],
  cardTab: { title: "Glutenia", kind: "mobile app" },
  cardNote: "Designed it + built it, solo ✶",
  cardVisual: {
    kind: "phones",
    screens: [
      { image: appMap, alt: "Glutenia map screen with gluten-free places pinned around Tunis" },
      { image: appResultGluten, alt: "Glutenia scan result: “Contains gluten”, with the flagged ingredient" },
      { image: appBadges, alt: "Glutenia badges screen: 3 of 19 badges earned" },
    ],
    mascot: { image: glutitanThumbsUp, alt: "" },
  },
  hero: {
    kind: "film",
    video: video("glutenia", "promo-landscape", 1920, 1080, { webm: false }),
    label: "Glutenia promo film: the problem of decoding labels, then the app's scan, map, shop and badges",
    captions: "/media/glutenia/video/promo-landscape.vtt",
  },
  facts: [
    { label: "Role", value: "UX/UI Designer & Full-Stack Developer (solo)" },
    {
      label: "Context",
      value:
        "Final-year project, BSc Computer Science (GLSI), Faculté des Sciences de Tunis — hosted by RedStart Tunisie",
    },
    { label: "Timeline", value: "Mar–Sep 2026 · 3 Scrum sprints" },
    {
      label: "Stack",
      value:
        "Figma · React Native + Expo (TypeScript) · Node.js, Express and MongoDB REST API · JWT role-based access · AI label analysis with Gemini and Groq · Remotion",
    },
  ],
  sections: [
    {
      id: "problem",
      heading: "The problem",
      body: [
        "For people living gluten-free, every product is a label to decode: long ingredient lists in Arabic, French and English, gluten hidden behind names like barley malt extract, and “may contain traces”.",
      ],
      blocks: [
        { kind: "custom", name: "labelExample" },
        {
          kind: "quote",
          text: "How can a mobile app help gluten-free users evaluate products, find safe places and stay engaged?",
        },
      ],
    },
    {
      id: "users",
      heading: "Who it's for",
      body: ["The product owner lives with celiac disease, so the problem was never abstract."],
      blocks: [{ kind: "custom", name: "roleCards" }],
    },
    {
      id: "process",
      heading: "My role and process",
      body: [
        "I was the product's designer and its only developer, in a Scrum team with a product owner and a scrum master, over three sprints.",
      ],
      blocks: [{ kind: "custom", name: "sprints" }],
    },
    {
      id: "structure",
      heading: "Structure and navigation",
      body: ["The bottom bar holds the app's five main places, so nothing is more than two taps away."],
      blocks: [{ kind: "custom", name: "navMap" }],
      notes: [
        {
          number: 1,
          title: "Scan sits in the centre",
          body: "Checking a product is the task people repeat most, often in a shop aisle with one hand, so the scan button is raised and green in the middle of the bar.",
        },
      ],
    },
    {
      id: "scan",
      heading: "Designing the scan",
      blocks: [
        {
          kind: "phones",
          items: [
            { video: v("01-barcode-scan"), label: "Scanning a product barcode in Glutenia", caption: "Barcode scan", autoplay: true },
            {
              video: v("02-ai-label-scan"),
              label: "Photographing an ingredient label and getting the AI verdict",
              caption: "AI label scan",
              autoplay: true,
            },
          ],
        },
        { kind: "custom", name: "resultStates" },
      ],
      notes: [
        {
          number: 2,
          title: "Barcode first, AI second",
          block: 0,
          body: "A barcode gives an instant answer. Only unknown products ask for a photo of the label, so the AI is used where it adds value.",
        },
        {
          number: 3,
          title: "The answer explains itself",
          above: true,
          body: "Each flagged ingredient comes with its reason, so people understand the verdict instead of just trusting it. It is decision support, not medical advice.",
        },
      ],
    },
    {
      id: "glutitan",
      heading: "Meet Glutitan",
      band: true,
      body: ["Glutitan (gluten plus titan) is the app's mascot. He motivates, helps and celebrates; he never lectures."],
      blocks: [{ kind: "custom", name: "glutitan" }],
    },
    {
      id: "shop-map-events",
      heading: "Shop, map, events and badges",
      body: [
        "Once a product is checked, people can order it, find a place to eat or shop, and meet others at events. Each action earns XP towards 19 badges.",
      ],
      blocks: [
        {
          kind: "phones",
          items: [
            { video: v("03-shop-browse"), label: "Browsing the gluten-free shop by category", caption: "Shop" },
            {
              video: { ...v("05-map-places"), poster: "/media/glutenia/video/05-map-places-poster-app.jpg" },
              label: "Filtering places on the map and opening a pharmacy",
              caption: "Map",
            },
            { video: v("06-events"), label: "Browsing community events and opening one", caption: "Events" },
            { video: v("07-journey-badges"), label: "Profile journey and badges screens in Glutenia", caption: "Badges" },
          ],
        },
      ],
      notes: [
        {
          number: 4,
          title: "A map built around needs",
          body: "Filter chips separate stores, bakeries and pharmacies, and every card shows a “Certified gluten-free” badge, distance and price, so people decide before they travel.",
        },
      ],
    },
    {
      id: "figma-to-app",
      heading: "From Figma to the real app",
      band: true,
      body: ["Drag the handles to compare my Figma mockups with the built app."],
      blocks: [
        {
          kind: "compareSet",
          items: [
            {
              kind: "compare",
              frame: "phone",
              caption: "Home",
              before: { image: figmaHome, label: "Figma", alt: "Figma mockup of the Glutenia home screen" },
              after: {
                image: appHome,
                label: "Built app",
                alt: "Built Glutenia home screen with level bar and recently scanned products",
              },
            },
            {
              kind: "compare",
              frame: "phone",
              caption: "Map",
              before: { image: figmaMap, label: "Figma", alt: "Figma mockup of the collaborative map" },
              after: { image: appMap, label: "Built app", alt: "Built map screen with filter chips and favourites" },
            },
          ],
        },
      ],
    },
  ],
  credits: ["Designed and built by Manel Ayari.", "Character concept, name and story by Manel."],
  next: "lafricaine",
  ogImage: "/og/glutenia.png",
};
