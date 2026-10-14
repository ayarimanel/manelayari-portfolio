import type { Project } from "../types";

import homeTop from "@media/value/home-top.jpg";
import homeAbout from "@media/value/home-about.jpg";
import homeSolutions from "@media/value/home-solutions.jpg";
import homeExpertise from "@media/value/home-expertise.jpg";
import homeWhy from "@media/value/home-why.jpg";
import homeCta from "@media/value/home-cta.jpg";
import careersTop from "@media/value/careers-top.jpg";
import careersJoin from "@media/value/careers-join.jpg";
import careersBenefits from "@media/value/careers-benefits.jpg";
import careersForm from "@media/value/careers-form.jpg";
import liveHome from "@media/value/live-home.png";
import liveCareers from "@media/value/live-careers.png";

const DOMAIN = "value.com.tn";

export const value: Project = {
  slug: "value",
  title: "Value",
  theme: "value",
  cardLabel: "Client project · Website redesign · Live",
  heroLabel: { number: "03", text: "Client project · Website redesign" },
  summary:
    "Redesign mockups for a Tunisian consulting, AI and data company. I led the mockups with the marketing team, designed the homepage and careers page, and presented them to the client.",
  lead: "Redesign mockups for Value, a Tunisian consulting, AI and data company. I led the team's mockup work and designed the homepage and the careers page myself.",
  metaDescription:
    "Case study: Manel Ayari led the redesign mockups for Value (value.com.tn) at Optima Junior Entreprise and designed its homepage and careers page.",
  readingTime: "3 min read",
  cardStickers: ["UX/UI design", "Mockups", "Team lead"],
  cardVisual: {
    kind: "browserImage",
    image: homeTop,
    alt: "Value homepage mockup: “Committed Talents, Creating VALUE” over a dark network background, with two buttons",
    domain: DOMAIN,
    note: "My homepage mockup",
  },
  hero: {
    kind: "browser",
    domain: DOMAIN,
    screen: {
      image: homeTop,
      alt: "Value homepage mockup: “Committed Talents, Creating VALUE” over a dark network background, with two buttons",
    },
    caption: "Homepage, my mockup.",
  },
  facts: [
    {
      label: "Role",
      value:
        "Led the redesign mockups (maquettage) with the Optima marketing team; designed the homepage and careers page; presented the mockups to the client",
    },
    { label: "Context", value: "Client project at Optima Junior Entreprise, with the marketing team" },
    { label: "Year", value: "2025" },
    {
      label: "Status",
      value: "Live — value.com.tn",
      href: "https://value.com.tn",
      linkLabel: "Live site (adapted from the mockups)",
    },
  ],
  sections: [
    {
      id: "client",
      heading: "The client and the brief",
      body: [
        "Value is a Tunisian digital services company working in consulting, AI, data and digital transformation. They asked Optima Junior Entreprise to redesign their website, starting with mockups of the new pages.",
      ],
    },
    {
      id: "lead",
      heading: "Leading the mockups",
      body: [
        "I was the project lead for the mockups. I split the site's pages between members of the marketing team, reviewed each page and asked for changes, presented the mockups to Value and brought their feedback back to the team.",
        "The other pages are my teammates' work, so this case study only shows the two pages I designed: the homepage and the careers page.",
      ],
      blocks: [
        {
          kind: "stickers",
          label: "What I did as project lead",
          items: ["Split the pages", "Reviewed and gave feedback", "Client contact"],
        },
      ],
    },
    {
      id: "home",
      heading: "The homepage",
      body: [
        "The homepage introduces Value, shows what they do and ends with a clear way to get in touch. Photos are placeholders; the figures are Value's own.",
      ],
      blocks: [
        {
          kind: "image",
          image: homeAbout,
          alt: "“Qui nous sommes” introduction with a Discover button, beside key figures: over 10 years of experience, 150 clients and 300 AI projects",
          caption: "Who we are, with key figures.",
          framed: true,
        },
        {
          kind: "image",
          image: homeSolutions,
          alt: "“Ce que nous faisons” carousel of five solution cards, the selected Advisory card larger and darker",
          caption: "Solutions carousel.",
          framed: true,
        },
        {
          kind: "image",
          image: homeExpertise,
          alt: "Dark “Domaines d'expertise” section: six cards for data engineering, machine learning, cloud, cybersecurity, automation and business intelligence",
          caption: "Areas of expertise.",
          framed: true,
        },
        {
          kind: "gallery",
          frame: "card",
          columns: 2,
          items: [
            {
              image: homeWhy,
              alt: "“Votre partenaire de confiance” section: a short text with three points beside four reason cards",
              caption: "Why Value",
            },
            {
              image: homeCta,
              alt: "Closing call to action on a teal photo: “Besoin de discuter avec nos experts?” with an orange Contact button",
              caption: "Closing call to action",
            },
          ],
        },
      ],
      notes: [
        {
          number: 1,
          title: "Track record next to the introduction",
          block: 0,
          body: "The “Who we are” block puts a short introduction beside Value's figures: over 10 years of experience, 150 clients and 300 AI projects.",
        },
        {
          number: 2,
          title: "Five solutions, one focus",
          block: 1,
          body: "The five solutions sit in one carousel with the selected card enlarged, so the section stays compact and each solution gets its moment.",
        },
        {
          number: 3,
          title: "Orange where it matters",
          block: 2,
          body: "Dark and light sections alternate down the page, and Value's orange is kept for section labels and buttons, so the next step is always easy to find.",
        },
      ],
    },
    {
      id: "careers",
      heading: "The careers page",
      body: [
        "The careers page tells candidates what working at Value is like, then lets them apply on the spot. The form's copy is placeholder text.",
      ],
      blocks: [
        {
          kind: "gallery",
          frame: "card",
          columns: 2,
          items: [
            {
              image: careersTop,
              alt: "Careers page mockup: “Carrières” on an orange-to-teal gradient with circuit lines and an orange button",
              caption: "Careers hero",
            },
            {
              image: careersJoin,
              alt: "Large office photo of a smiling employee with headphones, under a teal “Rejoignez-nous !” banner",
              caption: "“Rejoignez-nous !” banner",
            },
          ],
        },
        {
          kind: "image",
          image: careersBenefits,
          alt: "“Travailler chez VALUE c'est :” beside four cards: being part of a big family, high-impact projects, thinking big, feeling valued",
          caption: "Four reasons to join.",
          framed: true,
        },
        {
          kind: "image",
          image: careersForm,
          alt: "Teal application section: a form with name, email, phone and message fields beside a photo",
          caption: "Application form (placeholder copy).",
          framed: true,
        },
      ],
      notes: [
        {
          number: 4,
          title: "Four reasons, four cards",
          block: 1,
          body: "What working at Value means is split into four short cards, each with its own icon, so candidates can take it in at a glance.",
        },
        {
          number: 5,
          title: "Apply without leaving the page",
          body: "The application form closes the page, so a candidate can apply right after reading why to join.",
        },
      ],
    },
    {
      id: "mockup-to-live",
      heading: "From mockup to live",
      band: true,
      body: [
        "The mockups were changed before development, and the site that went live is simpler. It still follows the structure and content of my two pages. Drag the handles to compare.",
      ],
      blocks: [
        {
          kind: "compare",
          frame: "browser",
          domain: DOMAIN,
          before: { image: homeTop, label: "My mockup", alt: "My Value homepage mockup, above the fold" },
          after: {
            image: liveHome,
            label: "Live site",
            alt: "The live value.com.tn homepage: “Committed talents, creating Value” over a sea photo, with two buttons",
          },
          caption: "Homepage, above the fold.",
        },
        {
          kind: "compare",
          frame: "browser",
          domain: DOMAIN,
          before: { image: careersTop, label: "My mockup", alt: "My Value careers page mockup, above the fold" },
          after: {
            image: liveCareers,
            label: "Live site",
            alt: "The live value.com.tn careers page: “Join Us” on a dark band, then a typed hashtag and “Join us!”",
          },
          caption: "Careers page, above the fold.",
        },
        {
          kind: "table",
          caption: "What carried over to the live site",
          columns: ["Section", "My mockup", "Live site"],
          rows: [
            [
              "Homepage hero",
              "“Committed Talents, Creating VALUE” with two buttons",
              "Same line and two buttons, over a sea photo",
            ],
            [
              "Who we are",
              "Introduction, “Discover more” and key figures",
              "Introduction and “Discover more”, without the figures",
            ],
            ["Solutions", "The five solutions in a carousel", "The same five solutions as cards"],
            ["Video", "A video section about Value's vision", "A “Get to know us” video section"],
            ["Careers hero", "“Carrières” on an orange-to-teal gradient", "“Join Us” on a dark band"],
            [
              "Why join",
              "A hashtag tag, a big title and four reason cards",
              "A typed hashtag, “Join us!” and the same four reasons as a list, with the same photo",
            ],
            ["Application", "Form at the end of the page", "Form at the end of the page, with a CV upload"],
          ],
        },
      ],
    },
  ],
  credits: [
    "Homepage and careers page mockups by Manel Ayari, who also led the mockup project.",
    "Other pages designed by the marketing team at Optima Junior Entreprise.",
    "Site redesign delivered through Optima Junior Entreprise.",
  ],
  live: { href: "https://value.com.tn", label: "Visit the live site" },
  next: "glutenia",
  ogImage: "/og/value.png",
};
