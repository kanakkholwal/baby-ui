<script lang="ts">
import {
	ContextMeter,
	ContextMeterBar,
	ContextMeterBody,
	ContextMeterCompact,
	ContextMeterFooter,
	ContextMeterHeader,
	ContextMeterIcon,
	ContextMeterList,
	ContextMeterPercent,
	ContextMeterSubtitle,
	ContextMeterSummary,
	ContextMeterTitle,
	type ContextSegment,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ContextMeter>>(props));

const LIMIT = 200_000;
const COMPACT_AT = 0.85;

// The demo plays a session: each turn adds messages and tool results until it compacts.
let conversation = $state(63_000);
let results = $state(30_000);
let files = $state(31_400);
let messages = $state(38);
let calls = $state(21);
let compacting = $state(false);
let timer = 0;

function compact() {
	compacting = true;
	window.clearTimeout(timer);
	timer = window.setTimeout(() => {
		conversation = 9_000;
		messages = 1;
		compacting = false;
	}, 900);
}

$effect(() => {
	const id = setInterval(() => {
		conversation += 4_200;
		results += 2_600;
		messages += 2;
		calls += 1;
	}, 1600);
	return () => {
		clearInterval(id);
		window.clearTimeout(timer);
	};
});

const segments = $derived<ContextSegment[]>([
	{
		id: "system",
		label: "System prompt",
		detail: "Instructions",
		value: 3_200,
		pinned: true,
		color: "var(--muted-foreground)",
	},
	{
		id: "tools",
		label: "Tool definitions",
		detail: "14 tools",
		value: 11_800,
		pinned: true,
		color: 4,
	},
	{
		id: "files",
		label: "Pinned files",
		detail: "6 files",
		value: files,
		action: files ? "Unpin" : undefined,
		color: 2,
	},
	{
		id: "conversation",
		label: "Conversation",
		detail: `${messages} messages`,
		value: conversation,
		color: 1,
	},
	{
		id: "results",
		label: "Tool results",
		detail: `${calls} calls`,
		value: results,
		action: results ? "Clear" : undefined,
		color: 3,
	},
]);
const used = $derived(segments.reduce((sum, s) => sum + s.value, 0));
// Crossing the line compacts on its own, once.
$effect(() => {
	if (used >= LIMIT * COMPACT_AT && !compacting) compact();
});

function onAction(id: string) {
	if (id === "results") {
		results = 0;
		calls = 0;
	} else if (id === "files") files = 0;
}
</script>

<div class="w-full max-w-md">
	<ContextMeter {segments} limit={LIMIT} compactAt={COMPACT_AT} variant={p.variant} {onAction}>
		<ContextMeterHeader>
			<ContextMeterIcon />
			<ContextMeterTitle>Context window</ContextMeterTitle>
			<ContextMeterSubtitle>Sonnet 5.5</ContextMeterSubtitle>
			<ContextMeterPercent />
		</ContextMeterHeader>
		<ContextMeterBody>
			<ContextMeterSummary />
			<ContextMeterBar />
			<ContextMeterList />
			<ContextMeterFooter note="Auto-compacts at {COMPACT_AT * 100}%">
				<ContextMeterCompact onclick={compact} loading={compacting} />
			</ContextMeterFooter>
		</ContextMeterBody>
	</ContextMeter>
</div>
