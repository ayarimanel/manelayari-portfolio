import type { Project } from "../types";
import { video } from "../media";

import heroHeadline from "@media/lafricaine/details/hero-headline-cta.jpg";
import heroPhoto from "@media/lafricaine/details/hero-photo.jpg";
import bannerSquiggles from "@media/lafricaine/details/banner-squiggles.jpg";
import waveFooter from "@media/lafricaine/details/wave-footer.jpg";
import figmaHomeTop from "@media/lafricaine/figma-home-top.jpg";
import liveHome from "@media/lafricaine/live-home.png";

const DOMAIN = "editionapa.tn";
const v = (name: string) => video("lafricaine", name, 1280, 800);

export const lafricaine: Project = {
  slug: "lafricaine",
  title: "L'Africaine de Prod Artistique",
  theme: "lafricaine",
  cardLabel: "Client project · Website · Live",
  heroLabel: { number: "02", text: "Client project · Website" },
  summary:
    "Website, shop and admin back-office for a Tunisian children's book publisher — designed in Figma, now live.",
  lead: "A website, shop and admin back-office for a Tunisian children's book publisher — designed in Figma, now live.",
  metaDescription:
    "Case study: the website, shop and admin back-office Manel Ayari designed in Figma for L'Africaine de Prod Artistique, a Tunisian children's book publisher. Now live at editionapa.tn.",
  readingTime: "3 min read",
  cardStickers: ["Figma", "UX/UI design", "Live site"],
  cardTab: { title: "L'Africaine", kind: "website" },
  cardNote: "Figma → live site (developed by a teammate)",
  cardVisual: {
    kind: "sheets",
    front: { image: liveHome, alt: "The live editionapa.tn homepage hero, built from the design" },
    back: { image: figmaHomeTop, alt: "" },
    domain: DOMAIN,
  },
  hero: {
    kind: "browser",
    domain: DOMAIN,
    screen: { video: v("01-home-scroll"), label: "Scrolling through the L'Africaine homepage design in Figma" },
    caption: "Homepage, Figma mockup. Book covers and logos are placeholders throughout.",
  },
  facts: [
    { label: "Role", value: "UX/UI design and all Figma mockups" },
    {
      label: "Context",
      value: "Client project, designed within the project team at Optima Junior Entreprise; developed by a teammate",
    },
    { label: "Year", value: "2025" },
    {
      label: "Status",
      value: "Live — editionapa.tn",
      href: "https://editionapa.tn",
      linkLabel: "Live site (catalogue being added)",
    },
  ],
  sections: [
    {
      id: "client",
      heading: "The client and the goal",
      body: [
        "L'Africaine de Production Artistique publishes children's books. They needed a site that presents the catalogue, sells books online and lets the team manage content themselves.",
      ],
    },
    {
      id: "brand",
      heading: "Brand foundation",
      body: ["The design builds on the publisher's gold logo with deep purple, a lighter purple and gold, set in Poppins."],
      blocks: [{ kind: "custom", name: "swatches" }],
    },
    {
      id: "structure",
      heading: "Site structure",
      body: ["Three areas: the public site for families, the shop, and an admin back-office for the publisher's team."],
      blocks: [{ kind: "custom", name: "siteMap" }],
    },
    {
      id: "shopping",
      heading: "The shopping journey",
      blocks: [
        {
          kind: "browser",
          domain: DOMAIN,
          screen: {
            video: v("02-shop-to-product-scroll"),
            label: "Shop page with filters, then a product page, in the Figma mockup",
          },
          caption: "Shop → product.",
        },
        {
          kind: "browser",
          domain: DOMAIN,
          screen: { video: v("03-order-form-scroll"), label: "Scrolling through the order form in the Figma mockup" },
          caption: "Order form.",
        },
      ],
      notes: [
        {
          number: 1,
          title: "Filters that match how parents choose",
          block: 0,
          body: "Parents pick books by their child's age and home language, so the shop filters by category, language, reading level and author, and each book links to its other language editions.",
        },
        {
          number: 2,
          title: "A simple order form",
          body: "One page with personal details, order details and cash on delivery, the payment method most families expect.",
        },
      ],
    },
    {
      id: "admin",
      heading: "The admin back-office",
      body: ["The publisher's team manages books, orders, news and filters from one place."],
      blocks: [{ kind: "custom", name: "adminSwitcher" }],
      notes: [
        {
          number: 3,
          title: "An admin that prevents mistakes",
          body: "Adding, editing and deleting each have their own screen, and every delete asks for confirmation, so staff never lose content by accident.",
        },
      ],
    },
    {
      id: "details",
      heading: "Design details",
      blocks: [
        {
          kind: "gallery",
          frame: "card",
          columns: 2,
          aspect: "4 / 3",
          items: [
            {
              image: heroHeadline,
              alt: "Close-up: purple Poppins headline and the gold “Découvrir notre collection” button",
              caption: "Gold call to action",
            },
            {
              image: heroPhoto,
              alt: "Close-up: the hero photo of a child reading, cropped into a soft round shape with gold and white blobs",
              caption: "Round hero photo",
            },
            {
              image: bannerSquiggles,
              alt: "Close-up: purple banner “Apprendre en s'amusant !” with a gold and a white hand-drawn squiggle",
              caption: "Squiggles",
            },
            {
              image: waveFooter,
              alt: "Close-up: gold gradient footer with logo, contact details and a purple squiggle",
              caption: "Wave footer",
            },
          ],
        },
      ],
      notes: [
        {
          number: 4,
          title: "Fun for kids, clear for parents",
          body: "Purple and gold, squiggles and round shapes make the site feel like a children's book, while prices, filters and buttons stay plain for the parents who buy.",
        },
      ],
    },
    {
      id: "figma-to-live",
      heading: "From Figma to live",
      band: true,
      body: ["Drag the handle to compare my Figma homepage with the live site."],
      blocks: [
        {
          kind: "compare",
          frame: "browser",
          domain: DOMAIN,
          before: { image: figmaHomeTop, label: "Figma", alt: "Figma mockup of the L'Africaine homepage hero" },
          after: {
            image: liveHome,
            label: "Live site",
            alt: "The live editionapa.tn homepage hero, built from the design",
          },
        },
      ],
    },
    {
      id: "closing",
      heading: "Looking back",
      body: [
        "Designing for a real client meant balancing a playful brand for children with a shop and admin that parents and staff can use without thinking.",
      ],
    },
  ],
  credits: [
    "UX/UI design and Figma mockups by Manel Ayari.",
    "Site developed by a teammate at Optima Junior Entreprise.",
  ],
  live: { href: "https://editionapa.tn", label: "Visit the live site" },
  next: "value",
  ogImage: "/og/lafricaine.png",
};
