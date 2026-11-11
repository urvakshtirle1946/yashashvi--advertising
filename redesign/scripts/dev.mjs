import { spawn } from "node:child_process";
import { watch } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { syncAssets, syncFooter, syncGallery } from "./sync-gallery.mjs";

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = resolve(appRoot, "..", "public", "Gallery");
const sourcePublic = resolve(appRoot, "..", "public");
const nextBin = resolve(appRoot, "node_modules", "next", "dist", "bin", "next");
const supported = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".mp4", ".webm"]);

await syncAssets();

let syncTimer;
let footerSyncTimer;
let watcher;
let footerWatcher;
try {
  watcher = watch(sourceRoot, { recursive: true }, (_event, filename) => {
    if (filename && !supported.has(extname(String(filename)).toLowerCase())) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(() => {
      syncGallery()
        .then(({ count, manifestChanged }) => {
          if (manifestChanged) console.log(`Gallery refreshed: ${count} media files discovered.`);
        })
        .catch((error) => console.error("Gallery watcher sync failed:", error));
    }, 250);
  });
} catch (error) {
  console.warn(`Gallery live watching is unavailable (${error.message}); run npm run dev again after adding media.`);
}

try {
  footerWatcher = watch(sourcePublic, (_event, filename) => {
    if (String(filename) !== "footer.png") return;
    clearTimeout(footerSyncTimer);
    footerSyncTimer = setTimeout(async () => {
      for (let attempt = 0; attempt < 6; attempt += 1) {
        try {
          const result = await syncFooter();
          if (result.copied) console.log("Footer artwork refreshed from public/footer.png.");
          return;
        } catch (error) {
          if (attempt === 5) console.error("Footer artwork sync failed:", error);
          else await new Promise((resolveDelay) => setTimeout(resolveDelay, 200));
        }
      }
    }, 300);
  });
} catch (error) {
  console.warn(`Footer live watching is unavailable (${error.message}); restart npm run dev after replacing public/footer.png.`);
}

const next = spawn(process.execPath, [nextBin, "dev", ...process.argv.slice(2)], {
  cwd: appRoot,
  env: process.env,
  stdio: "inherit",
  windowsHide: true,
});

let stopping = false;
function stop(signal) {
  if (stopping) return;
  stopping = true;
  clearTimeout(syncTimer);
  clearTimeout(footerSyncTimer);
  watcher?.close();
  footerWatcher?.close();
  if (next.exitCode === null) next.kill(signal);
}

process.on("SIGINT", () => stop("SIGINT"));
process.on("SIGTERM", () => stop("SIGTERM"));

next.on("error", (error) => {
  console.error("Unable to start Next.js:", error);
  process.exitCode = 1;
  stop("SIGTERM");
});
next.on("exit", (code, signal) => {
  clearTimeout(syncTimer);
  clearTimeout(footerSyncTimer);
  watcher?.close();
  footerWatcher?.close();
  if (signal && !stopping) process.exitCode = 1;
  else process.exitCode = code ?? 0;
});
