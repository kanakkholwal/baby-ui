export const RUNNERS = [
	{ framework: "react" as const, url: "http://localhost:5174/" },
	{ framework: "svelte" as const, url: "http://localhost:5175/" },
];

export type ShellMessage = {
	source: "baby-ui-shell";
	slug: string;
	props: Record<string, unknown>;
};

export function broadcast(
	frames: (HTMLIFrameElement | undefined)[],
	message: ShellMessage,
) {
	for (const frame of frames) frame?.contentWindow?.postMessage(message, "*");
}
