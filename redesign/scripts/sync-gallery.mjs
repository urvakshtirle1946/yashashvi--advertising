import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = resolve(appRoot, "..", "public", "Gallery");
const rootFooterSource = resolve(appRoot, "..", "public", "footer.png");
const bundledFooterSource = resolve(appRoot, "public", "footer.png");
const publicRoot = resolve(appRoot, "public", "gallery");
const manifestPath = resolve(appRoot, "app", "gallery-media.json");
const footerDestination = resolve(appRoot, "public", "footer.png");
const footerManifestPath = resolve(appRoot, "app", "footer-media.json");
const imageTypes = new Map([
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".png", "image/png"],
  [".webp", "image/webp"],
  [".gif", "image/gif"],
  [".avif", "image/avif"],
]);
const videoTypes = new Map([
  [".mp4", "video/mp4"],
  [".webm", "video/webm"],
]);
const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

function containedPath(root, relativePath) {
  const target = resolve(root, relativePath);
  if (!target.startsWith(`${root}${sep}`)) {
    throw new Error(`Refusing path outside managed folder: ${relativePath}`);
  }
  return target;
}

async function findMedia(directory, parent = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  entries.sort((a, b) => collator.compare(a.name, b.name));
  const found = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const relativePath = parent ? join(parent, entry.name) : entry.name;
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      found.push(...await findMedia(absolutePath, relativePath));
      continue;
    }
    if (!entry.isFile()) continue;

    const extension = extname(entry.name).toLowerCase();
    const mimeType = imageTypes.get(extension) ?? videoTypes.get(extension);
    if (!mimeType) continue;
    found.push({ absolutePath, relativePath, extension, mimeType, type: imageTypes.has(extension) ? "image" : "video" });
  }
  return found;
}

function displayLabel(relativePath) {
  return relativePath
    .replace(/\\/g, "/")
    .split("/")
    .pop()
    .replace(/\.[^.]+$/, "")
    .replace(/^WhatsApp\s+(?:Image|Video)\s*/i, "")
    .replace(/^\d{4}-\d{2}-\d{2}\s+at\s+/i, "")
    .replace(/\s+\(\d+\)$/, "")
    .replace(/[_-]+/g, " ")
    .trim();
}

async function readPreviousManifest() {
  try {
    return JSON.parse(await readFile(manifestPath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function writeIfChanged(path, contents) {
  try {
    if (await readFile(path, "utf8") === contents) return false;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, contents, "utf8");
  return true;
}

export async function syncGallery({ quiet = false } = {}) {
  const previous = await readPreviousManifest();
  const oldByPath = new Map(previous.map((item) => [item.relativePath, item]));
  const sourceFiles = await findMedia(sourceRoot);
  sourceFiles.sort((a, b) => collator.compare(a.relativePath.replace(/\\/g, "/"), b.relativePath.replace(/\\/g, "/")));
  const nextManifest = [];

  await mkdir(publicRoot, { recursive: true });
  for (const file of sourceFiles) {
    const sourceStat = await stat(file.absolutePath);
    const bytes = await readFile(file.absolutePath);
    const checksum = createHash("sha256").update(bytes).digest("hex");
    const relativePath = file.relativePath.split(sep).join("/");
    const destination = containedPath(publicRoot, file.relativePath);
    const previousItem = oldByPath.get(relativePath);

    let destinationExists = true;
    try {
      await stat(destination);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      destinationExists = false;
    }
    if (!destinationExists || previousItem?.checksum !== checksum) {
      await mkdir(dirname(destination), { recursive: true });
      await copyFile(file.absolutePath, destination);
    }

    const title = displayLabel(relativePath) || (file.type === "video" ? "Campaign video" : "Gallery photo");
    const encodedPath = relativePath.split("/").map(encodeURIComponent).join("/");
    nextManifest.push({
      relativePath,
      name: file.relativePath.split(/[\\/]/).pop(),
      type: file.type,
      mimeType: file.mimeType,
      title,
      alt: `Yashashvi Advertising portfolio ${file.type}: ${title}`,
      src: `/gallery/${encodedPath}?v=${checksum.slice(0, 12)}`,
      checksum,
      modified: Math.trunc(sourceStat.mtimeMs),
    });
  }

  const activePaths = new Set(nextManifest.map((item) => item.relativePath));
  for (const oldItem of previous) {
    if (activePaths.has(oldItem.relativePath)) continue;
    await rm(containedPath(publicRoot, oldItem.relativePath), { force: true });
  }

  const manifestChanged = await writeIfChanged(manifestPath, `${JSON.stringify(nextManifest, null, 2)}\n`);
  if (!quiet && manifestChanged) {
    console.log(`Gallery sync: ${nextManifest.length} media files from ${sourceRoot}`);
  }
  return { count: nextManifest.length, manifestChanged };
}

async function findFooterSource() {
  for (const candidate of [rootFooterSource, bundledFooterSource]) {
    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  throw new Error(`Required footer artwork is missing. Expected ${rootFooterSource} or ${bundledFooterSource}.`);
}

export async function syncFooter({ quiet = false, source, destination = footerDestination, manifest = footerManifestPath } = {}) {
  const selectedSource = source ?? await findFooterSource();
  const bytes = await readFile(selectedSource);
  if (bytes.length < 24 || bytes.toString("hex", 0, 8) !== "89504e470d0a1a0a") {
    throw new Error(`Footer artwork must be a valid PNG: ${selectedSource}`);
  }
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  if (!width || !height) throw new Error(`Footer artwork has invalid dimensions: ${source}`);

  const checksum = createHash("sha256").update(bytes).digest("hex");
  let destinationChecksum = "";
  try {
    destinationChecksum = createHash("sha256").update(await readFile(destination)).digest("hex");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (destinationChecksum !== checksum) {
    await mkdir(dirname(destination), { recursive: true });
    await copyFile(selectedSource, destination);
  }

  const footerManifest = {
    src: `/footer.png?v=${checksum.slice(0, 12)}`,
    checksum,
    width,
    height,
    heightVw: `${(height / width * 100).toFixed(5)}vw`,
  };
  const manifestChanged = await writeIfChanged(manifest, `${JSON.stringify(footerManifest, null, 2)}\n`);
  if (!quiet && (manifestChanged || destinationChecksum !== checksum)) {
    console.log(`Footer sync: ${width}x${height} (${checksum.slice(0, 12)}) from ${selectedSource}`);
  }
  return { checksum, width, height, manifestChanged, copied: destinationChecksum !== checksum };
}

export async function syncAssets(options = {}) {
  const [gallery, footer] = await Promise.all([syncGallery(options), syncFooter(options)]);
  return { gallery, footer };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  syncAssets().catch((error) => {
    console.error("Asset sync failed:", error);
    process.exitCode = 1;
  });
}
