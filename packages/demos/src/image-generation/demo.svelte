<script lang="ts">
import {
	Button,
	ImageGeneration,
	ImageGenerationBadge,
	ImageGenerationCaption,
	ImageGenerationField,
	ImageGenerationFrame,
	ImageGenerationMedia,
	type ImageGenerationPhase,
	ImageGenerationPrompt,
	ImageGenerationRetry,
	ImageGenerationStatus,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { PRODUCT_SHOTS } from "../data/media";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ImageGeneration>>(props));
const shot = PRODUCT_SHOTS.payments;
const prompt = "A payments dashboard with recent transfers, calm and light";

// The demo plays a request: queued, generating, refining, then done or failed.
let status = $state<ImageGenerationPhase>("queued");
let timers: number[] = [];
function run(fail = false) {
	for (const t of timers) clearTimeout(t);
	status = "queued";
	const steps: [number, ImageGenerationPhase][] = fail
		? [
				[700, "generating"],
				[2600, "error"],
			]
		: [
				[700, "generating"],
				[2600, "refining"],
				[4200, "complete"],
			];
	timers = steps.map(([at, next]) => window.setTimeout(() => (status = next), at));
}
$effect(() => {
	run();
	return () => {
		for (const t of timers) clearTimeout(t);
	};
});
// The default status plays the script; any other status in the controls holds it.
let picked: string | undefined = "generating";
$effect(() => {
	const next = p.status;
	if (next === picked) return;
	picked = next;
	if (!next) return;
	for (const t of timers) clearTimeout(t);
	status = next;
});
</script>

<div class="flex w-full max-w-sm flex-col items-center gap-4">
	<ImageGeneration {status} variant={p.variant ?? "fluid"}>
		<ImageGenerationFrame label={status === "complete" ? shot.alt : prompt} aspectRatio="{shot.width} / {shot.height}">
			<ImageGenerationMedia>
				<img src={shot.light} alt="" class="dark:hidden" />
				<img src={shot.dark} alt="" class="hidden dark:block" />
			</ImageGenerationMedia>
			<ImageGenerationField />
			<ImageGenerationBadge>1600 × 900</ImageGenerationBadge>
		</ImageGenerationFrame>
		<ImageGenerationCaption>
			<ImageGenerationStatus />
			<ImageGenerationPrompt>{prompt}</ImageGenerationPrompt>
		</ImageGenerationCaption>
		<ImageGenerationRetry onclick={() => run()} />
	</ImageGeneration>
	<div class="flex gap-2">
		<Button size="sm" variant="secondary" class="rounded-full" onclick={() => run()}>Generate again</Button>
		<Button size="sm" variant="ghost" class="rounded-full" onclick={() => run(true)}>Fail a run</Button>
	</div>
</div>
