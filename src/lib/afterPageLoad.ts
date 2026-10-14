"use client";

let ready: Promise<void> | null = null;

/**
 * Resolves once the page has finished loading and the browser is idle.
 * Autoplaying clips wait for this so their download never competes with
 * the first screen's images and fonts.
 */
export function afterPageLoad(): Promise<void> {
  ready ??= new Promise((resolve) => {
    const idle = () =>
      "requestIdleCallback" in window
        ? requestIdleCallback(() => resolve(), { timeout: 2000 })
        : setTimeout(resolve, 200);
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
  });
  return ready;
}
