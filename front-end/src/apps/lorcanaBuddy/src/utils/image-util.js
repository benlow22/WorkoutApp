export function getImageUrl(name) {
	return new URL(`../pages/images/${name}`, import.meta.url).href;
}
