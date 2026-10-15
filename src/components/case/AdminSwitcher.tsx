"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { BrowserFrame } from "../BrowserFrame";
import styles from "./AdminSwitcher.module.css";

import dashboard from "@media/lafricaine/admin/dashboard.png";
import articlesList from "@media/lafricaine/admin/articles-list.png";
import articlesAdd from "@media/lafricaine/admin/articles-add.png";
import articlesDelete from "@media/lafricaine/admin/articles-delete.png";
import ordersList from "@media/lafricaine/admin/orders-list.png";
import ordersEdit from "@media/lafricaine/admin/orders-edit.png";
import ordersDelete from "@media/lafricaine/admin/orders-delete.png";
import newsList from "@media/lafricaine/admin/news-list.png";
import newsEdit from "@media/lafricaine/admin/news-edit.png";
import newsDelete from "@media/lafricaine/admin/news-delete.png";
import filtersList from "@media/lafricaine/admin/filters-list.png";
import filtersAdd from "@media/lafricaine/admin/filters-add.png";
import filtersEdit from "@media/lafricaine/admin/filters-edit.png";
import filtersDelete from "@media/lafricaine/admin/filters-delete.png";

type State = "Overview" | "List" | "Add" | "Edit" | "Delete";
type Shot = { image: StaticImageData; alt: string };

const modules: { name: string; states: Partial<Record<State, Shot>> }[] = [
  {
    name: "Dashboard",
    states: {
      Overview: {
        image: dashboard,
        alt: "Admin dashboard: welcome line, six stat cards, a news card, top products, revenue and visitor charts",
      },
    },
  },
  {
    name: "Articles",
    states: {
      List: {
        image: articlesList,
        alt: "Articles list: a table of books with ISBN, title, status, category, date and price, with filters and an add button",
      },
      Add: {
        image: articlesAdd,
        alt: "Add article form: title, author, publisher, ISBN, category, sub-category, recommended age and language",
      },
      Delete: {
        image: articlesDelete,
        alt: "Delete confirmation over the articles list: “Are you sure you want to delete this?” with No and Yes",
      },
    },
  },
  {
    name: "Orders",
    states: {
      List: {
        image: ordersList,
        alt: "Orders list: a table with reference, order status, payment status, date and total, with filters",
      },
      Edit: {
        image: ordersEdit,
        alt: "Edit order form with tabs for order info, client, items, payment, delivery and notes",
      },
      Delete: { image: ordersDelete, alt: "Delete confirmation over the orders list, with No and Yes" },
    },
  },
  {
    name: "News",
    states: {
      List: {
        image: newsList,
        alt: "News list: a table with title, category, status, publication date and author, and an add button",
      },
      Edit: { image: newsEdit, alt: "Edit news form: title, subtitle, category, publication date, author and body" },
      Delete: { image: newsDelete, alt: "Delete confirmation over the news list, with No and Yes" },
    },
  },
  {
    name: "Filters",
    states: {
      List: { image: filtersList, alt: "Filters table: filter name, number of items and status, with an add button" },
      Add: { image: filtersAdd, alt: "Add filter form: filter name, active or inactive status, and number of items" },
      Edit: { image: filtersEdit, alt: "Edit filter form for the Language filter, with Save and Cancel" },
      Delete: { image: filtersDelete, alt: "Delete confirmation over the filters table, with No and Yes" },
    },
  },
];

const allStates: State[] = ["List", "Add", "Edit", "Delete"];

/** Every screen in order, for the ‹ › arrows. */
const screens = modules.flatMap((m, i) =>
  (["Overview", ...allStates] as State[]).filter((s) => m.states[s]).map((s) => ({ moduleIndex: i, state: s })),
);

/** One browser window over the admin mockups: pick a module, then a state, or step through with the arrows. */
export function AdminSwitcher() {
  const [moduleIndex, setModuleIndex] = useState(0);
  const [state, setState] = useState<State>("Overview");
  const current = modules[moduleIndex];
  const shot = current.states[state]!;
  const position = screens.findIndex((s) => s.moduleIndex === moduleIndex && s.state === state);

  function pickModule(i: number) {
    setModuleIndex(i);
    const states = modules[i].states;
    if (!states[state]) setState(states.Overview ? "Overview" : "List");
  }

  function step(by: number) {
    const next = screens[(position + by + screens.length) % screens.length];
    setModuleIndex(next.moduleIndex);
    setState(next.state);
  }

  return (
    <figure className={styles.switcher}>
      <p className={styles.hint} aria-hidden="true">
        It&rsquo;s clickable, have a look around ↓
      </p>
      <div className={styles.controls}>
        <div className={styles.modules} role="group" aria-label="Admin section">
          {modules.map((m, i) => (
            <button
              key={m.name}
              type="button"
              className={styles.module}
              aria-pressed={i === moduleIndex}
              onClick={() => pickModule(i)}
            >
              {m.name}
            </button>
          ))}
        </div>
        {!current.states.Overview && (
          <div className={styles.states} role="group" aria-label="Screen state">
            {allStates.map((s) => (
              <button
                key={s}
                type="button"
                className={styles.state}
                data-state={s}
                aria-pressed={s === state}
                disabled={!current.states[s]}
                onClick={() => setState(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className={styles.stage}>
        <BrowserFrame domain="editionapa.tn">
          <div className={styles.sheet} key={`${moduleIndex}-${state}`}>
            <Image src={shot.image} alt={shot.alt} sizes="(max-width: 900px) 100vw, 860px" />
          </div>
        </BrowserFrame>
        <button type="button" className={`${styles.arrow} ${styles.prev}`} onClick={() => step(-1)}>
          <span aria-hidden="true">‹</span>
          <span className="visually-hidden">Previous admin screen</span>
        </button>
        <button type="button" className={`${styles.arrow} ${styles.next}`} onClick={() => step(1)}>
          <span aria-hidden="true">›</span>
          <span className="visually-hidden">Next admin screen</span>
        </button>
      </div>
      <figcaption className={styles.caption} aria-live="polite">
        <span className={styles.count}>
          {position + 1} / {screens.length}
        </span>
        {current.name}
        {state !== "Overview" && ` — ${state.toLowerCase()}`}. Figma mockups with mock data.
      </figcaption>
    </figure>
  );
}
