# Sketchbook entrance

The homepage entrance is inspired by the composition and interaction of
[AA’s Sketchbook](https://aarice.github.io/ArielMu/index.html): generous white
space, a typewriter greeting, and an interactive pencil tree. Its HTML, CSS,
snow simulation, and navigation behavior are newly implemented for this site.
The reference site's source and tree image have not been copied.

`images/entrance-tree.png` is a new graphite illustration made with the built-in
image generation tool, with a transparent background. The generation brief was:

> A single tall leafless old winter tree as a delicate black graphite sketchbook
> drawing. Full roots, a sinuous gnarled trunk, crosshatched flowing bark,
> asymmetrical boughs, and a finely ramified airy canopy. Portrait composition,
> all branches within the frame. Pure grayscale, transparent negative space,
> no landscape, text, leaves, baked-in snow, border, or watermark.

Special Elite is bundled locally with its Apache 2.0 license in
`assets/fonts/special-elite/LICENSE.txt`.

The entrance appears on a new tab's first visit to the English homepage root.
Section links, Chinese and legacy English paths, and subsequent visits in the
same tab go straight to the homepage. The tree button plays a brief sway and
snow animation; direct-entry links and Escape skip it. Reduced motion is
respected. Without JavaScript, the original homepage remains available.

The homepage background is the user-supplied `images/winter-background.jpg`,
rotated in CSS, fitted to the viewport, and blended over white at 24% opacity.
The original uploaded pixels remain intact.
