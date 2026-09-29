import { persisted } from "./persisted-state.svelte";

const REPO = "kanakkholwal/baby-ui";
const TTL = 60 * 60 * 1000;

const cache = persisted<{ count: number | null; at: number }>("baby-ui:github-stars", {
	count: null,
	at: 0,
});

/**
 * The repo's star count. Fetched by the browser, so each visitor spends their own GitHub
 * quota (60 an hour), and cached for an hour. A stale count beats none when GitHub fails.
 */
export async function githubStars(): Promise<number | null> {
	const { count, at } = cache.current;
	if (count !== null && Date.now() - at < TTL) return count;
	try {
		const res = await fetch(`https://api.github.com/repos/${REPO}`, {
			headers: { Accept: "application/vnd.github+json" },
		});
		if (!res.ok) return count;
		const body: { stargazers_count?: unknown } = await res.json();
		if (typeof body.stargazers_count !== "number") return count;
		cache.current = { count: body.stargazers_count, at: Date.now() };
		return body.stargazers_count;
	} catch {
		return count;
	}
}

export const GITHUB_URL = `https://github.com/${REPO}`;
