import { onDestroy } from "svelte";

const QUERY = "(min-width: 768px)";

/** SSR/first-paint default is desktop; corrects to the real value once mounted. */
export function useIsMobile() {
	let isMobile = $state(false);

	if (typeof window !== "undefined") {
		const mql = window.matchMedia(QUERY);
		isMobile = !mql.matches;
		const onChange = () => {
			isMobile = !mql.matches;
		};
		mql.addEventListener("change", onChange);
		onDestroy(() => mql.removeEventListener("change", onChange));
	}

	return {
		get current() {
			return isMobile;
		},
	};
}
