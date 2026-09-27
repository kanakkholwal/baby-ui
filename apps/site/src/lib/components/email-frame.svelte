<script lang="ts">
import { mode } from "mode-watcher";

let {
	html,
	text,
	bytes,
	view,
	pending = false,
	title,
}: {
	html: string;
	text: string;
	bytes: number;
	view: "html" | "text";
	/** Keeps the last render on screen, dimmed, while the next one loads. */
	pending?: boolean;
	title: string;
} = $props();

let frame = $state<HTMLIFrameElement>();
let height = $state(640);

// No allow-scripts: same-origin only lets the page read the email's height, never run its code.
function fit() {
	const doc = frame?.contentDocument;
	if (doc) height = Math.max(320, doc.documentElement.scrollHeight);
}

// Gmail clips anything past 102KB behind "View entire message".
const CLIP = 102 * 1024;
</script>

<figure class={["w-full max-w-[680px] self-start transition-opacity", pending && "opacity-60"]}>
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
			class="block w-full rounded-lg border-0"
		></iframe>
	{:else}
		<pre
			class="max-h-[640px] overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-card p-5 font-mono text-foreground text-xs leading-relaxed">{text}</pre>
	{/if}
	<figcaption class="mt-2 text-center text-muted-foreground text-xs">
		{(bytes / 1024).toFixed(1)} KB of HTML, {bytes < CLIP ? "under" : "over"} Gmail's 102 KB clip
	</figcaption>
</figure>
