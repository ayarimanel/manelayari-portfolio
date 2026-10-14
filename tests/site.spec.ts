import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = ["/", "/about", "/work/glutenia", "/work/lafricaine", "/work/value"];

/** Scrolls the whole page so lazy images load and reveals fire. */
async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle");
}

test.describe("routes", () => {
  for (const path of pages) {
    test(`${path} returns 200 and has one h1`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
    });
  }

  test("unknown URL returns 404 with one h1", async ({ page }) => {
    const res = await page.goto("/work/not-a-project");
    expect(res?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText("This page wandered off.");
  });
});

test.describe("links", () => {
  test("every internal link resolves and external links are valid", async ({ page, request }) => {
    // Visits five pages and calls the live site, which can be slow to answer.
    test.setTimeout(180_000);
    const internal = new Set<string>();
    const external = new Set<string>();
    for (const path of [...pages, "/missing-page"]) {
      // Links are in the server HTML, so there's no need to wait for images.
      await page.goto(path, { waitUntil: "domcontentloaded" });
      const hrefs = await page.locator("a[href]").evaluateAll((as) => as.map((a) => a.getAttribute("href")!));
      for (const href of hrefs) {
        expect(href, `empty or # link on ${path}`).not.toMatch(/^#?$/);
        if (href.startsWith("/")) internal.add(href.split("#")[0] || "/");
        else if (href.startsWith("#")) {
          const id = href.slice(1);
          await expect(page.locator(`[id="${id}"]`), `anchor ${href} on ${path}`).toHaveCount(1);
        } else external.add(href);
      }
    }
    for (const href of internal) {
      const res = await request.get(href);
      expect(res.status(), href).toBe(200);
    }
    for (const href of external) {
      if (href.startsWith("mailto:")) {
        expect(href).toBe("mailto:manelayari04@gmail.com");
      } else if (href.startsWith("https://mail.google.com/")) {
        // Gmail compose link: check the recipient, don't fetch (it redirects to a login page).
        expect(new URL(href).searchParams.get("to")).toBe("manelayari04@gmail.com");
      } else {
        expect(href).toMatch(/^https:\/\/(editionapa\.tn|value\.com\.tn)/);
        const res = await request.get(href, { timeout: 30_000 });
        expect(res.status(), href).toBeLessThan(400);
      }
    }
  });

  test("/#work anchor exists on the homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#work")).toHaveCount(1);
  });
});

test.describe("media and console", () => {
  for (const path of [...pages, "/missing-page"]) {
    test(`${path}: all images and video sources load, no console errors`, async ({ page, request }) => {
      const errors: string[] = [];
      const failed: string[] = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push(e.message));
      page.on(
        "response",
        (r) => r.status() >= 400 && !r.url().includes("/missing-page") && failed.push(`${r.status()} ${r.url()}`),
      );
      page.on("requestfailed", (r) => {
        // Videos are paused/aborted when they scroll out of view; that's expected.
        if (r.resourceType() !== "media") failed.push(`failed ${r.url()}`);
      });

      await page.goto(path);
      await scrollThrough(page);

      // Load every lazy image, then wait: the first AVIF/WebP conversion can be slow.
      await page
        .locator("img")
        .evaluateAll((imgs) => (imgs as HTMLImageElement[]).forEach((i) => (i.loading = "eager")));
      const broken = () =>
        page
          .locator("img")
          .evaluateAll((imgs) =>
            (imgs as HTMLImageElement[])
              .filter((i) => !i.complete || i.naturalWidth === 0)
              .map((i) => i.currentSrc || i.src),
          );
      await expect.poll(broken, { message: "broken images", timeout: 120_000, intervals: [1000] }).toEqual([]);

      // Posters load lazily: bring each clip near the screen and wait for its poster.
      const videos = page.locator("video");
      for (let i = 0; i < (await videos.count()); i++) {
        await videos.nth(i).scrollIntoViewIfNeeded();
        await expect(videos.nth(i), "video poster").toHaveAttribute("poster", /\S/);
      }

      // Videos use preload="none", so request every source and poster directly.
      const videoUrls = await page
        .locator("video")
        .evaluateAll((vs) =>
          vs.flatMap((v) => [
            v.getAttribute("poster")!,
            ...Array.from(v.querySelectorAll("source, track")).map((s) => s.getAttribute("src")!),
          ]),
        );
      for (const url of videoUrls) {
        const res = await request.head(url);
        expect(res.status(), url).toBe(200);
      }

      expect(failed, "failed requests").toEqual([]);
      // The 404 page's own document request logs a "404" resource error by design.
      const unexpected = errors.filter((e) => !(path === "/missing-page" && /404/.test(e)));
      expect(unexpected, "console errors").toEqual([]);
    });
  }
});

test.describe("interactions", () => {
  test("mobile menu opens and closes with the keyboard and traps focus", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const button = page.getByRole("button", { name: "Menu" });
    await button.focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();
    // Focus stays inside the dialog while tabbing.
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press("Tab");
      expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
    }
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(button).toBeFocused();
  });

  test("compare slider moves with arrow keys", async ({ page }) => {
    await page.goto("/work/glutenia");
    const slider = page.getByRole("slider").first();
    await slider.scrollIntoViewIfNeeded();
    await slider.focus();
    await expect(slider).toHaveValue("50");
    for (let i = 0; i < 5; i++) await page.keyboard.press("ArrowRight");
    await expect(slider).toHaveValue("55");
    await page.keyboard.press("ArrowLeft");
    await expect(slider).toHaveValue("54");
  });

  test("video play/pause button works", async ({ page }) => {
    await page.goto("/work/glutenia");
    const button = page.getByRole("button", { name: /video: Scanning a product barcode/ });
    await button.scrollIntoViewIfNeeded();
    const video = page.locator('video[aria-label="Scanning a product barcode in Glutenia"]');
    // Autoplays once in viewâ€¦
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused), { timeout: 15_000 }).toBe(true);
    await expect(button).toHaveAccessibleName(/^Pause video/);
    // Use the keyboard: a mouse click retried during the button's hover animation
    // scrolls the page, which (correctly) pauses the clip once it's half out of view.
    await button.focus();
    await page.keyboard.press("Enter");
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
    await expect(button).toHaveAccessibleName(/^Play video/);
    await page.keyboard.press("Enter");
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused), { timeout: 15_000 }).toBe(true);
    await expect(button).toHaveAccessibleName(/^Pause video/);
  });

  test("copy email announces success", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    await page.getByRole("button", { name: /copy email address/ }).click();
    await expect(page.getByRole("status").filter({ hasText: "Email copied" })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("manelayari04@gmail.com");
  });
});

test.describe("accessibility", () => {
  for (const path of [...pages, "/missing-page"]) {
    test(`${path} has no serious or critical axe violations`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      await scrollThrough(page);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      const bad = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(bad.map((v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(" ")).join(", ")})`)).toEqual([]);
    });
  }
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  for (const path of pages) {
    test(`${path}: no autoplaying videos, no reveal animations`, async ({ page }) => {
      await page.goto(path);
      await scrollThrough(page);
      await page.waitForTimeout(800);
      const playing = await page
        .locator("video")
        .evaluateAll((vs) => (vs as HTMLVideoElement[]).filter((v) => !v.paused).length);
      expect(playing).toBe(0);
      // Reveal targets are fully visible without any transition.
      const hidden = await page.locator("[data-reveal]").evaluateAll(
        (els) =>
          els.filter((e) => {
            const cs = getComputedStyle(e);
            return cs.opacity !== "1" || cs.transform !== "none";
          }).length,
      );
      expect(hidden).toBe(0);
    });
  }
});
