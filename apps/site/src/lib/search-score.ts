const words = (text: string) =>
	text
		.toLowerCase()
		.split(/[\s\-_/]+/)
		.filter(Boolean);

/**
 * Word-prefix ranking for site search. Fuzzy letter matching over many keywords found
 * nearly every component for any query, so only whole-word starts count here.
 */
export function scoreEntry(name: string, keywords: string, query: string): number {
	const q = query.trim().toLowerCase();
	if (!q) return 1;
	const title = name.toLowerCase();
	if (title === q) return 1;
	if (title.startsWith(q)) return 0.9;
	const tokens = words(q);
	const titleWords = words(name);
	if (tokens.every((t) => titleWords.some((w) => w.startsWith(t)))) return 0.8;
	if (title.includes(q)) return 0.7;
	const all = [...titleWords, ...words(keywords)];
	if (tokens.every((t) => all.some((w) => w.startsWith(t)))) return 0.5;
	return 0;
}
