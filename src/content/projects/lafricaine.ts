import type { Project } from "../types";
import { video } from "../media";

import dashboard from "@media/lafricaine/admin/dashboard.png";
import articlesList from "@media/lafricaine/admin/articles-list.png";
import articlesAdd from "@media/lafricaine/admin/articles-add.png";
import articlesDelete from "@media/lafricaine/admin/articles-delete.png";
import ordersEdit from "@media/lafricaine/admin/orders-edit.png";
import newsEdit from "@media/lafricaine/admin/news-edit.png";
import filtersAdd from "@media/lafricaine/admin/filters-add.png";
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
  cardVisual: {
    kind: "browser",
    video: v("01-home-scroll"),
    label: "Scrolling through the L'Africaine homepage design in Figma",
    domain: DOMAIN,
    note: "Mockup with placeholder content",
  },
  hero: {
    kind: "browser",
    domain: DOMAIN,
    screen: { video: v("01-home-scroll"), label: "Scrolling through the L'Africaine homepage design in Figma" },
    caption: "Homepage, Figma mockup with placeholder content (book covers and partner logos).",
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
        "L'Africaine de Production Artistique publishes books that spark children's imagination and support their learning. They needed a site that presents the catalogue, sells books online and lets the team manage content themselves.",
      ],
    },
    {
      id: "brand",
      heading: "Brand foundation",
      body: [
        "The design builds on the publisher's gold logo with a deep purple, a lighter purple and gold, set in Poppins. Hand-drawn squiggles and a wavy gold footer repeat across the pages.",
      ],
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
          caption: "Shop → product. Figma mockup with placeholder content (third-party book covers).",
        },
        {
          kind: "browser",
          domain: DOMAIN,
          screen: { video: v("03-order-form-scroll"), label: "Scrolling through the order form in the Figma mockup" },
          caption: "Order form. Figma mockup.",
        },
      ],
      notes: [
        {
          number: 2,
          title: "Filters that match how parents choose",
          block: 0,
          body: "The shop filters by category, language (French, English, Arabic), reading level and author, because parents pick books by their child's age and the language spoken at home.",
        },
        {
          number: 3,
          title: "“Available in another language”",
          block: 0,
          body: "The product page links to the same book in other languages, so a family finds the right edition without searching again.",
        },
        {
          number: 4,
          title: "A simple order form",
          body: "One page with personal details, order details and cash on delivery, the payment method most families expect.",
        },
      ],
    },
    {
      id: "admin",
      heading: "The admin back-office",
      body: [
        "The publisher's team manages articles (books), orders, news and shop filters from one dashboard. All data shown is mock data.",
      ],
      blocks: [
        {
          kind: "image",
          image: dashboard,
          alt: "Admin dashboard mockup: welcome line, six stat cards, a news card, top products, revenue and visitor charts",
          caption: "Admin dashboard, Figma mockup with mock data.",
          framed: true,
        },
        {
          kind: "browser",
          domain: DOMAIN,
          screen: {
            video: v("04-admin-states"),
            label: "Admin mockups: dashboard, articles list, add and edit forms, and delete confirmations",
          },
          caption: "Moving through the admin states. Figma mockup.",
        },
      ],
      notes: [
        {
          number: 5,
          title: "An admin that prevents mistakes",
          body: "Adding, editing and deleting each have their own screen, and every delete asks for confirmation, so staff never lose content by accident.",
        },
      ],
    },
    {
      id: "states",
      heading: "Designing every state",
      blocks: [
        {
          kind: "gallery",
          frame: "card",
          columns: 3,
          items: [
            {
              image: articlesList,
              alt: "Articles list: a table of books with ISBN, title, status, category, date and price, with filters and an add button",
              caption: "Articles — list with filters",
            },
            {
              image: articlesAdd,
              alt: "Add article form: title, author, publisher, ISBN, category, sub-category, recommended age and language",
              caption: "Articles — add",
            },
            {
              image: articlesDelete,
              alt: "Delete confirmation over the articles list: “Are you sure you want to delete this?” with No and Yes",
              caption: "Articles — delete confirmation",
            },
            {
              image: ordersEdit,
              alt: "Edit order form with tabs for order info, client, items, payment, delivery and notes",
              caption: "Orders — edit",
            },
            {
              image: newsEdit,
              alt: "Edit news form: title, subtitle, category, publication date, author and body",
              caption: "News — edit",
            },
            {
              image: filtersAdd,
              alt: "Add filter form: filter name, active or inactive status, and number of items",
              caption: "Filters — add",
            },
          ],
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
          number: 1,
          title: "Fun for kids, clear for parents",
          body: "Purple and gold, playful squiggles, round shapes and large book covers make the site feel like a children's book. Prices, filters and buttons stay plain and readable for the parents who buy.",
        },
      ],
    },
    {
      id: "figma-to-live",
      heading: "From Figma to live",
      band: true,
      body: ["Drag the handle to compare my Figma homepage with the live site's first screen."],
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
          caption: "Homepage, above the fold.",
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
  next: "glutenia",
  ogImage: "/og/lafricaine.png",
};
