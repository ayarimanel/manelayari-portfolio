import type { Project } from "../types";
import { glutenia } from "./glutenia";
import { lafricaine } from "./lafricaine";

/** Order shown on the homepage. Adding a project = adding one file and listing it here. */
export const projects: Project[] = [glutenia, lafricaine];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
