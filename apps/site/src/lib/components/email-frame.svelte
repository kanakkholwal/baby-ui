<script lang="ts" module>
import { tv } from "tailwind-variants";

// Desktop is a reading pane wider than the 600px layout; mobile is a 375px phone, the common
// floor clients lay out at.
const frameWidth = tv({
	base: "block border-0 transition-[width] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none",
	variants: {
		viewport: {
			desktop: "w-full rounded-lg",
			mobile: "w-[375px] max-w-full rounded-[20px] outline outline-border",
		},
	},
});
</script>

<script lang="ts">
import { mode } from "mode-watcher";

let {
	html,
	text,
	bytes,
	view,
	viewport = "desktop",
	pending = false,
	title,
}: {
	html: string;
	text: string;
	bytes: number;
	view: "html" | "text";
	viewport?: "desktop" | "mobile";
	/** Keeps the last render on screen, dimmed, while the next one loads. */
	pending?: boolean;
	title: string;
} = $props();

let frame = $state<HTMLIFrameElement>();
let height = $state(640);

// No allow-scripts: same-origin only lets the page read the email's height, never run its code.
// body, not the root: the root never reports less than the iframe's current height.
function fit() {
	const body = frame?.contentDocument?.body;
	if (body) height = Math.max(320, body.scrollHeight);
}

// Width changes reflow the email, so the height follows them instead of clipping or gapping.
$effect(() => {
	if (!frame) return;
	const observer = new ResizeObserver(fit);
	observer.observe(frame);
	return () => observer.disconnect();
});

// Gmail clips anything past 102KB behind "View entire message".
const CLIP = 102 * 1024;
</script>

<figure
	class={[
		"flex w-full max-w-[720px] flex-col items-center self-start transition-opacity",
		pending && "opacity-60",
	]}
>
	{#if view === "html"}
		<!-- color-scheme on the element sets prefers-color-scheme inside, so the email follows the site theme. -->
		<iframe
			bind:this={frame}
			srcdoc={html}
			{title}
			sandbox="allow-same-origin"
			onload={fit}
			style:height="{height}px"
			style:color-scheme={mode.current === "dark" ? "dark" : "light"}
			class={frameWidth({ viewport })}
		></iframe>
	{:else}
		<pre
			class="max-h-[640px] w-full overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-card p-5 font-mono text-foreground text-xs leading-relaxed">{text}</pre>
	{/if}
	<figcaption class="mt-2 text-center text-muted-foreground text-xs">
		{viewport === "mobile" && view === "html" ? "375px wide · " : ""}{(bytes / 1024).toFixed(1)} KB of HTML, {bytes < CLIP ? "under" : "over"} Gmail's 102 KB clip
	</figcaption>
</figure>
