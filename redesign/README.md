# Yashashvi Advertising homepage redesign

This is a standalone Next.js app. It has its own dependencies, lockfile and build configuration under `redesign/`.

## Preview locally

From the repository root:

```powershell
cd redesign
npm install
npm run dev
```

Open the local URL printed by Next.js (usually `http://localhost:3000`). To create and preview a production build, run `npm run build` followed by `npm start` from this directory.

## Preview as a separate Vercel project

Create a new Vercel project for this redesign and set **Root Directory** to `redesign`. Keep that project separate from the existing production project; do not attach it to the current production deployment. Vercel will use the package and lockfile in this folder, run `npm run build`, and serve the Next.js app.

## Assets and reference notes

The `public/assets/` folder contains copies of Yashashvi Advertising's logo and local campaign photos from the existing project. No reference agency logo, campaign image or copy is used. Scroll behavior, reference URLs, measured layouts and verification limits are documented in [REFERENCE-SPEC.md](./REFERENCE-SPEC.md).

## Gallery media

Add loose media files to the repository's existing `public/Gallery/` folder (the folder beside `redesign/`). Do not add them to `redesign/public/gallery/`; that folder is generated for the standalone app. Supported image extensions are `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif` and `.avif`. Supported video extensions are `.mp4` and `.webm`. ZIP archives are ignored; extract supported files into `public/Gallery/`.

The gallery is discovered in natural, numeric filename order. The homepage shows the first six photos in that order; videos are reserved for the full gallery at `/gallery`. When `npm run dev` is running, its folder watcher copies additions and updates the generated gallery manifest, and Next.js refreshes the page. A server restart also performs a fresh sync. `npm run build` syncs the folder before building. New deployed media therefore appears after the next build and redeploy; there is no separate upload system.

The footer artwork is bundled at `redesign/public/footer.png`, so clean checkouts and standalone deployments have the required asset. When the repository's root `public/footer.png` is present, it takes precedence during development/build sync and replaces the bundled copy. The watcher updates the content-hashed image URL and aspect-ratio metadata and triggers the page to refresh. Restarting the dev server performs a fresh sync; `npm run build` also syncs the latest artwork. A deployed replacement appears after the next build and redeploy. The required artwork format is PNG.
# Preview asset notes

The local gallery photos and brand mark are copied into `public/assets/` for this standalone app. Some images are used as illustrative work samples.

The original project does not include approved case-study titles or written project summaries linked to each image. The labels and short descriptions shown in the Our work rail are descriptive placeholders based on the visible project imagery; replace them with verified client/project copy when available. No reference-agency text or images are used.
