import type { Project } from "../types";
import { video } from "../media";

import appHome from "@media/glutenia/app/home.png";
import appCatalog from "@media/glutenia/app/catalog.png";
import appMap from "@media/glutenia/app/map-live.png";
import appBadges from "@media/glutenia/app/badges.png";
import appResultGluten from "@media/glutenia/app/ai-result-gluten.png";
import appFlagged from "@media/glutenia/app/ai-flagged-ingredients.png";
import figmaHome from "@media/glutenia/figma/home.png";
import figmaProducts from "@media/glutenia/figma/products.png";
import figmaMap from "@media/glutenia/figma/map.png";
import sprint1 from "@media/glutenia/deck/23-sprint1-auth-screens.jpg";
import sprint2 from "@media/glutenia/deck/27-sprint2-scan-shop-screens.jpg";
import sprint3 from "@media/glutenia/deck/31-sprint3-community-admin-screens.jpg";
import glutitanHero from "@media/glutenia/mascot/glutitan-hero.png";

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
  readingTime: "5 min read",
  cardStickers: ["Figma", "React Native", "AI label scan"],
  cardVisual: {
    kind: "fan",
    left: { image: appMap, alt: "Glutenia map screen with gluten-free places pinned around Tunis" },
    center: {
      video: video("glutenia", "promo-vertical", 720, 1280, { webm: false }),
      label: "Glutenia promo film, vertical cut",
    },
    right: { image: appBadges, alt: "Glutenia badges screen: 3 of 19 badges earned" },
    mascot: { image: glutitanHero, alt: "" },
  },
  hero: {
    kind: "film",
    video: video("glutenia", "promo-landscape", 1920, 1080, { webm: false }),
    label: "Glutenia promo film: the problem of decoding labels, then the app's scan, map, shop and badges",
    captions: "/media/glutenia/video/promo-landscape.vtt",
  },
  facts: [
    { label: "Role", value: "UX/UI design and full-stack development (solo)" },
    {
      label: "Context",
      value:
        "Final-year project, BSc Computer Science (GLSI), Faculté des Sciences de Tunis — hosted by RedStart Tunisie",
    },
    { label: "Timeline", value: "Mar–Sep 2026 · 3 Scrum sprints" },
    { label: "Tools", value: "Figma, React Native, Expo, Node.js, MongoDB, Gemini, Groq, Remotion" },
  ],
  sections: [
    {
      id: "problem",
      heading: "The problem",
      body: [
        "For people living gluten-free, every product is a label to decode. Ingredient lists are long, mix Arabic, French and English, hide gluten behind names like barley malt extract, and often end with “may contain traces”.",
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
      id: "existing",
      heading: "What already exists",
      body: [
        "Useful apps exist, but each covers one part of the journey, and none of the four reviewed reads a photo of an ingredient label with AI.",
      ],
      blocks: [{ kind: "custom", name: "competitorTable" }],
    },
    {
      id: "process",
      heading: "My role and process",
      body: [
        "I worked as the product's designer and its only developer, in a Scrum team with a product owner and a scrum master, over three sprints.",
      ],
      blocks: [
        {
          kind: "strip",
          label: "Screens delivered in each sprint",
          items: [
            {
              image: sprint1,
              alt: "Presentation slide, sprint 1: five built screens — register, pending approval, admin review of professional requests, onboarding and profile with XP",
              caption: "Sprint 1 — authentication and user management",
            },
            {
              image: sprint2,
              alt: "Presentation slide, sprint 2: five built screens — barcode scanner, product found, catalog, cart and order placed",
              caption: "Sprint 2 — catalog, shopping and AI label scanning",
            },
            {
              image: sprint3,
              alt: "Presentation slide, sprint 3: five built screens — admin dashboard, my establishment, gluten-free map, community event and badge unlocked",
              caption: "Sprint 3 — professionals, community and administration",
            },
          ],
        },
      ],
    },
    {
      id: "structure",
      heading: "Structure and navigation",
      body: [
        "The bottom bar holds the app's five main places. Each one opens onto a small set of screens, so nothing is more than two taps away. The cart sits in the header, reachable from every screen.",
      ],
      blocks: [{ kind: "custom", name: "navMap" }],
      notes: [
        {
          number: 1,
          title: "Scan sits in the centre",
          body: "The scan button is raised and green in the middle of the bottom bar. Checking a product is the task people repeat most, often in a shop aisle with one hand.",
        },
      ],
    },
    {
      id: "scan",
      heading: "Designing the scan",
      blocks: [
        { kind: "custom", name: "scanFlow" },
        {
          kind: "phones",
          items: [
            { video: v("01-barcode-scan"), label: "Scanning a product barcode in Glutenia", caption: "Barcode scan" },
            {
              video: v("02-ai-label-scan"),
              label: "Photographing an ingredient label and getting the AI verdict",
              caption: "AI label scan",
            },
          ],
        },
      ],
      notes: [
        {
          number: 2,
          title: "Barcode first, AI second",
          body: "A barcode gives an instant answer for known products. Only when a product is unknown does the app ask for a photo of the ingredient label, so the AI is used where it adds value.",
        },
        {
          number: 3,
          title: "The answer explains itself",
          body: "The result lists each flagged ingredient with the reason, such as “Wheat flour: contains wheat, a primary source of gluten”. People understand the verdict instead of just trusting it, and the app presents it as decision support, not medical advice.",
        },
      ],
    },
    {
      id: "states",
      heading: "Four answers, four states",
      layout: "pair",
      blocks: [
        {
          kind: "phones",
          items: [
            {
              image: appResultGluten,
              alt: "Glutenia result screen: “Contains gluten” with three flagged ingredients and +10 XP",
            },
            {
              image: appFlagged,
              alt: "Glutenia flagged ingredients: enriched wheat flour, wheat flour and malted barley flour, each with the reason, above the extracted label text",
            },
          ],
        },
        { kind: "custom", name: "resultStates" },
      ],
      notes: [
        {
          number: 4,
          title: "Four states, never colour alone",
          body: "No danger, gluten detected, caution and unreadable label each have their own colour, icon and words, so the result is clear at a glance and for colour-blind users.",
        },
      ],
    },
    {
      id: "glutitan",
      heading: "Meet Glutitan",
      band: true,
      body: [
        "Glutitan — gluten plus titan — is Glutenia's mascot. His story: people living with celiac disease are warriors who stay strong with a restriction they never chose. He motivates, helps and celebrates; he never lectures.",
      ],
      blocks: [{ kind: "custom", name: "glutitan" }],
      notes: [
        {
          number: 6,
          title: "Calm and friendly look",
          body: "Soft green, white cards, rounded shapes and Glutitan keep a stressful health topic light and encouraging.",
        },
      ],
    },
    {
      id: "shop-map-events",
      heading: "Shop, map and events",
      body: [
        "Once a product is checked, the rest of the app helps people act on it: order certified products, find a place to eat or shop, and meet others at community events.",
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
          ],
        },
      ],
      notes: [
        {
          number: 5,
          title: "A map built around needs",
          body: "Filter chips separate stores, bakeries and pharmacies, because each answers a different need. A “Certified gluten-free” badge, distance and price on every card help people decide before they travel.",
        },
      ],
    },
    {
      id: "level-up",
      heading: "Level up",
      layout: "pair",
      body: [
        "Scanning, ordering and joining events earn XP. Progress moves you along a five-step journey, and the app has 19 badges to collect.",
      ],
      blocks: [
        {
          kind: "phones",
          items: [{ video: v("07-journey-badges"), label: "Profile journey and badges screens in Glutenia" }],
        },
        { kind: "custom", name: "xpTable" },
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
              caption: "Products",
              before: { image: figmaProducts, label: "Figma", alt: "Figma mockup of the gluten-free products screen" },
              after: {
                image: appCatalog,
                label: "Built app",
                alt: "Built catalog screen with search bar and food-type categories",
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
        {
          kind: "table",
          caption: "Changes from Figma to the built app, and why",
          columns: ["Screen", "Change", "Why"],
          rows: [
            [
              "Home",
              "Added “Recently scanned” with a red mark on unsafe items",
              "Re-check a product without scanning again; spot unsafe items at a glance",
            ],
            ["Home", "Added an XP level bar", "Makes progress visible and gives a reason to come back"],
            ["Header", "Added a cart icon", "The shop is reachable from every screen"],
            [
              "Products",
              "Search bar and food-type categories (bread, flour, pasta, snacks, sweets)",
              "People shop by what they want to eat; search is faster for a known product",
            ],
            ["Products", "Quick “+” button on each card", "Add to cart without opening the product page"],
            [
              "Map",
              "Filter chips, favourites and a certified badge",
              "Find the right kind of place fast and trust it before going",
            ],
            [
              "Language",
              "Mostly French became English with translation support",
              "Labels in Tunisia mix languages, so the app is ready to switch",
            ],
          ],
        },
      ],
    },
    {
      id: "under-the-hood",
      heading: "Under the hood",
      body: [
        "The app is built with React Native and Expo, with translations through i18next. A Node.js and Express API with MongoDB handles accounts (JWT), products, orders, places and events, and documents itself with Swagger. Label reading uses Google Gemini and Groq. The backend runs on Render. I also made the promo film in code with Remotion.",
      ],
      blocks: [
        {
          kind: "stickers",
          label: "Stack",
          items: [
            "React Native",
            "Expo",
            "i18next",
            "Node.js",
            "Express",
            "MongoDB",
            "JWT",
            "Swagger",
            "Gemini",
            "Groq",
            "Render",
            "Remotion",
          ],
        },
        { kind: "custom", name: "architecture" },
      ],
    },
    {
      id: "next",
      heading: "What's next",
      body: ["Verified places, an iPhone version, and infrastructure ready to scale."],
    },
  ],
  credits: ["Designed and built by Manel Ayari.", "Character concept, name and story by Manel."],
  next: "lafricaine",
  ogImage: "/og/glutenia.png",
};
