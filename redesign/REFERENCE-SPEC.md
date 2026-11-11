# Reference implementation specification

Inspection used an isolated Playwright Chromium browser on 2026-11-07. `https://www.ogilvy.com/` stayed on that URL; `https://koto.studio/` redirects to `https://koto.com/`. Captures are stored outside the repository in `C:\Users\HP\AppData\Local\Temp\yashashvi-pw\captures-final`.

## 1. Koto navigation

- Desktop starts with a small yellow Koto wordmark at the upper left and a single horizontal row of six compact uppercase links; local time and a grid control sit at the far right.
- Around 300–320 px of downward page scroll, the full row gives way to a dark translucent rounded pill at the upper left. The yellow mark stays at about x=16 px; the `HOME` label slides into the pill from the right. Samples show its x position moving from about 390 px at the top to 170 px at y=320, then to 72 px at y=340. The pill settles at roughly 190 px wide by y=360. Its label uses a 650 ms `cubic-bezier(.36,.54,0,.99)` transform transition. Scrolling up reverses the transition and restores the full row.
- Observation note: the compact pill stays anchored at the left edge; on downward scroll the label itself moves left into it (and moves right again on reverse scroll). The live page did not show the entire pill translating to the right.

## 2. Ogilvy hero

- Desktop is a saturated red, full-viewport canvas with a staggered field of campaign thumbnails behind an oversized white serif Ogilvy wordmark. The small black navigation sits at upper left, Contact at upper right. At 1440×900, the thumbnail field reads as roughly five columns by four visible rows, with small landscape tiles and generous horizontal and vertical gaps.
- As the page scrolls toward the next section, the image field and oversized wordmark recede; the centered white wordmark becomes the small fixed header mark. The clean red statement field is visible by about y=1700.
- Mobile (390×844) does not show the desktop collage/oversized mark. It opens directly into a single vertical campaign-image sequence with 20 px side margins, approximately 350×233 images, and about 20 px gaps. A fixed white header holds a hamburger at left and the red wordmark in the center.

## 3. Ogilvy statement

- Desktop uses a full-width red field and a large black editorial serif paragraph, left aligned at about 10% viewport inset and approximately 56 px at 1440 px width. At y≈1700 it is fully dark against red. Further down, the text lightens while the background washes from red through pale pink to white; the image grid emerges at the lower edge.
- This statement is not rendered in the inspected mobile composition; the mobile page goes from the header into the vertical image sequence.

## 4. Koto “Our work”

- Desktop uses a black field and five project panels in order: Instagram, Amazon, Microsoft Copilot+PC, Fitbit Ace LTE, Tripadvisor. At 1440 px, the left rail is about 36% wide (x≈28 px, content width≈505 px); the right media column starts at x≈541 px and is about 868×488 px (16:9), with roughly 12 px between panels.
- The left column is sticky at the viewport’s upper edge, with the “Our work” heading and the current project title around 30 vh. Each project title uses a sticky position: as the next panel approaches, the next title pushes the previous one upward. The project description and small thumbnail/year/category line change with that project. This is directly tied to normal scroll position; the media panels themselves continue scrolling and are not pinned. Scrolling upward restores the preceding title and copy at the same thresholds. No separate scroll-scrub easing was observed; motion follows the scroll position. Project videos continue playing independently, with a small pause affordance at the media edge.
- Hovering a desktop project panel reveals a small `↗ VIEW CASE` label at the pointer. The project media are links.
- Mobile is a plain vertical card list on black: 16 px side margins; at 390 px, media is about 358×269 px (4:3), with a compact title and subtitle below each image/video. The five projects stay in the same order. There is no sticky left rail; media and captions move with the page. The fixed header uses the compact Koto mark, Menu, and grid control.

## 5. Ogilvy photos grid

- Desktop transitions into a white, image-led, three-column masonry-like composition with approximately 20 px gutters and mixed image heights/ratios. The red-to-white wash overlaps the top of the grid. Hovering a work card replaces its image with a solid red panel and a centered white case title with a short horizontal rule.
- Mobile remains one column with the same roughly 350×233 crop and 20 px gaps, under the fixed hamburger/wordmark header. Scrolling back upward returns earlier campaign cards in order.

## Verification boundaries

- Inspected desktop at 1440×900 and mobile at 390×844; used automated down/up scroll checkpoints and viewport screenshots through the Koto project sequence and Ogilvy hero, statement, and grid.
- Koto’s scroll trigger and menu-label transition timing/easing were measured from sampled positions and computed CSS. Exact Ogilvy hero/statement interpolation easing and duration were not measured; samples establish the layouts and direction of the fade only.
- The current Koto hero showreel rendered as a black frame in headless Chromium, so its individual video imagery could not be captured reliably. The navbar and Our Work videos/captions were visible and inspectable.
- Cookie overlays were dismissed with reject/deny controls in the temporary browser; no reference-site account or settings were changed.
