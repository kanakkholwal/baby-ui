import { PRODUCT_SHOTS } from "./media";

/** Each bundled shot in both themes, so the viewer has a real set to step through. */
export const IMAGE_VIEWER_SAMPLES = Object.values(PRODUCT_SHOTS).flatMap((shot) => [
	{ src: shot.light, alt: `${shot.alt}, light`, width: shot.width, height: shot.height },
	{ src: shot.dark, alt: `${shot.alt}, dark`, width: shot.width, height: shot.height },
]);

export const IMAGE_GALLERY_SAMPLES = IMAGE_VIEWER_SAMPLES.map((image) => ({
	...image,
	caption: `${image.width} × ${image.height}`,
}));
