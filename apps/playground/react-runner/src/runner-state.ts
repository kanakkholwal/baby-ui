export type RunnerState = { slug: string; props: Record<string, unknown> };

export function initialState(): RunnerState {
	const params = new URLSearchParams(location.search);
	const raw = params.get("props");
	let props: Record<string, unknown> = {};
	if (raw) {
		try {
			props = JSON.parse(raw) as Record<string, unknown>;
		} catch {
			// A malformed query shouldn't blank the runner; defaults are better than nothing.
		}
	}
	return { slug: params.get("slug") ?? "button", props };
}

/** Announces readiness so the shell replays state after an HMR restart. */
export function connect(
	framework: "react" | "svelte",
	onState: (state: RunnerState) => void,
): () => void {
	const handler = (event: MessageEvent) => {
		const data = event.data as Partial<RunnerState> & { source?: string };
		if (data?.source !== "baby-ui-shell") return;
		onState({ slug: data.slug ?? "button", props: data.props ?? {} });
	};
	window.addEventListener("message", handler);
	parent.postMessage({ source: "baby-ui-runner", framework, ready: true }, "*");
	return () => window.removeEventListener("message", handler);
}
