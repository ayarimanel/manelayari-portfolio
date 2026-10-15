import type { Project } from "../types";

import homeTop from "@media/value/home-top.jpg";
import homeSolutions from "@media/value/home-solutions.jpg";
import homeExpertise from "@media/value/home-expertise.jpg";
import careersTop from "@media/value/careers-top.jpg";
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
  readingTime: "2 min read",
  cardStickers: ["UX/UI design", "Mockups", "Team lead"],
  cardTab: { title: "Value", kind: "redesign" },
  cardNote: "Led the mockups, presented to the client",
  cardVisual: {
    kind: "sheets",
    front: {
      image: homeTop,
      alt: "Value homepage mockup: “Committed Talents, Creating VALUE” over a dark network background, with two buttons",
    },
    back: { image: careersTop, alt: "" },
    domain: DOMAIN,
  },
  hero: {
    kind: "browser",
    domain: DOMAIN,
    screen: {
      image: homeTop,
      alt: "Value homepage mockup: “Committed Talents, Creating VALUE” over a dark network background, with two buttons",
    },
    caption: "Homepage, my mockup. Photos and form copy are placeholders.",
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
        "Value is a Tunisian company working in consulting, AI, data and digital transformation. They asked Optima Junior Entreprise to redesign their website, starting with mockups.",
      ],
    },
    {
      id: "lead",
      heading: "Leading the mockups",
      body: [
        "I split the pages between the marketing team, reviewed each one, presented the mockups to Value and brought their feedback back. Other pages are my teammates' work, so this case study shows only the two I designed.",
      ],
    },
    {
      id: "home",
      heading: "The homepage",
      body: ["The homepage introduces Value, shows what they do and ends with a clear way to get in touch."],
      blocks: [
        {
          kind: "gallery",
          frame: "card",
          columns: 2,
          items: [
            {
              image: homeSolutions,
              alt: "“Ce que nous faisons” carousel of five solution cards, the selected Advisory card larger and darker",
              caption: "Solutions carousel",
            },
            {
              image: homeExpertise,
              alt: "Dark “Domaines d'expertise” section: six cards for data engineering, machine learning, cloud, cybersecurity, automation and business intelligence",
              caption: "Areas of expertise",
            },
          ],
        },
      ],
      notes: [
        {
          number: 1,
          title: "Five solutions, one focus",
          body: "The five solutions sit in one carousel with the selected card enlarged, so the section stays compact.",
        },
        {
          number: 2,
          title: "Orange where it matters",
          body: "Dark and light sections alternate, and Value's orange is kept for labels and buttons, so the next step is always easy to find.",
        },
      ],
    },
    {
      id: "careers",
      heading: "The careers page",
      body: ["It tells candidates what working at Value is like, then lets them apply on the spot."],
      blocks: [
        {
          kind: "gallery",
          frame: "card",
          columns: 2,
          items: [
            {
              image: careersBenefits,
              alt: "“Travailler chez VALUE c'est :” beside four cards: being part of a big family, high-impact projects, thinking big, feeling valued",
              caption: "Four reasons to join",
            },
            {
              image: careersForm,
              alt: "Teal application section: a form with name, email, phone and message fields beside a photo",
              caption: "Application form",
            },
          ],
        },
      ],
      notes: [
        {
          number: 3,
          title: "Read, then apply",
          body: "Four short cards say why to join, and the form closes the page, so a candidate can apply right after reading.",
        },
      ],
    },
    {
      id: "mockup-to-live",
      heading: "From mockup to live",
      band: true,
      body: ["The live site is simpler, but it keeps the structure and content of my two pages. Drag the handles to compare."],
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
          caption: "Homepage.",
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
          caption: "Careers page.",
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
