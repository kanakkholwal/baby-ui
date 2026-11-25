<script lang="ts">
import SpecDials from "@baby-ui/demos/controls";
import {
	IconAdjustmentsHorizontal,
	IconCode,
	IconEye,
	IconRefresh,
} from "@baby-ui/icons";
import type { ComponentSpec, Framework } from "@baby-ui/registry-schema";
import { Button } from "@baby-ui/svelte/button";
import { Tabs, TabsList, TabsTrigger } from "@baby-ui/svelte/tabs";
import type { Snippet } from "svelte";
import { track } from "#lib/analytics.js";
import type { DemoLoader } from "#lib/demos.js";
import { defaultProps } from "#lib/registry.js";
import CopyButton from "./copy-button.svelte";
import DemoPreview from "./demo-preview.svelte";
import PreviewToolbar from "./preview-toolbar.svelte";

let {
	spec,
	values = $bindable(),
	framework,
	demo,
	usage,
	href,
	gate,
}: {
	spec: ComponentSpec;
	values: Record<string, unknown>;
	framework: Framework;
	demo: DemoLoader | undefined;
	usage: { code: string; html: string } | null;
	/** The /frame URL for the current demo and controls. */
	href?: string;
	/** Replaces the code for gated (Pro) components. */
	gate?: Snippet;
} = $props();

const hasControls = $derived(spec.props.some((p) => p.control.kind !== "none"));
let tab = $state("preview");
let open = $state(false);
let resetKey = $state(0);
let reloadKey = $state(0);
let viewport = $state<"desktop" | "mobile">("desktop");

function reset() {
	values = defaultProps(spec);
	resetKey++;
}

const NUMBERED =
	"[counter-reset:line] [&_.line]:before:mr-5 [&_.line]:before:inline-block [&_.line]:before:w-5 [&_.line]:before:text-right [&_.line]:before:text-muted-foreground/50 [&_.line]:before:content-[counter(line)] [&_.line]:before:[counter-increment:line]";
</script>

<!-- Decision (architecture): concentric radii, outer 24px minus the 8px rim = 16px stage, which is also the pill tabs' corner. -->
<div class="rounded-[1.5rem] bg-card p-2" data-slot="demo-showcase">
	<div class="flex items-center justify-between gap-2 pb-2">
		<Tabs
			bind:value={
				() => tab,
				(next) => {
					tab = next;
					track("component_tab_selected", { tab: next });
				}
			}
			variant="segment"
			size="sm"
			class="min-w-0"
		>
			<TabsList aria-label="Component views" class="rounded-full [&_[data-slot=tabs-indicator]]:rounded-full">
				<TabsTrigger value="preview" class="rounded-full">
					<IconEye size={14} />
					Preview
				</TabsTrigger>
				<TabsTrigger value="usage" class="rounded-full">
					<IconCode size={14} />
					Code
				</TabsTrigger>
			</TabsList>
		</Tabs>

		{#if tab === "preview"}
			<div class="flex items-center gap-0.5">
				{#if hasControls}
					<Button
						variant="ghost"
						size="icon-sm"
						class="rounded-full text-muted-foreground aria-expanded:bg-foreground/[0.08] aria-expanded:text-foreground"
						aria-label="Controls"
						aria-expanded={open}
						aria-controls="demo-controls"
						onclick={() => (open = !open)}
					>
						<IconAdjustmentsHorizontal size={15} />
					</Button>
				{/if}
				<PreviewToolbar bind:viewport {href} onReload={() => reloadKey++} />
			</div>
		{/if}
	</div>

	{#if tab === "preview"}
		<div class="rounded-2xl bg-background">
			{#key reloadKey}
				<DemoPreview {framework} slug={spec.slug} {demo} props={values} bare class="rounded-[inherit]" />
			{/key}
		</div>

		{#if hasControls}
			<!-- Kept mounted so dial state survives closing; rows fold 0fr to 1fr like Collapsible. -->
			<div
				id="demo-controls"
				inert={!open}
				class={[
					"grid transition-[grid-template-rows] duration-(--duration-overlay) ease-(--ease-ui-out) motion-reduce:transition-none",
					open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
				]}
			>
				<div class="min-h-0 overflow-hidden">
					<div class="flex items-center justify-between px-3 pt-3 pb-1">
						<p class="m-0 font-medium text-muted-foreground text-xs">Options</p>
						<Button variant="ghost" size="xs" onclick={reset}>
							<IconRefresh />
							Reset
						</Button>
					</div>
					<div class="pb-1">
						{#key `${spec.slug}:${resetKey}`}
							<SpecDials {spec} bind:values />
						{/key}
					</div>
				</div>
			</div>
		{/if}
	{:else if gate}
		<div class="rounded-2xl bg-background p-4">{@render gate()}</div>
	{:else if usage}
		<div class="relative rounded-2xl bg-background">
			<div class="absolute top-2 right-2 z-10">
				<CopyButton text={usage.code} analytics={{ event: "usage_copied" }} iconOnly />
			</div>
			<div
				class={[
					"max-h-[32rem] overflow-auto px-4 py-4 font-mono text-[13px] leading-[1.7] [&_.shiki]:bg-transparent [&_pre]:!bg-transparent [&_pre]:!p-0",
					NUMBERED,
				]}
			>
				<!-- Shiki output, generated on the server from our own sources. -->
				{@html usage.html}
			</div>
		</div>
	{/if}
</div>
