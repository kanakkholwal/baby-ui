<script lang="ts">
import type { ComponentSpec, PropSpec } from "@baby-ui/registry-schema";
import {
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Slider,
	Switch,
} from "@baby-ui/svelte";
import { untrack } from "svelte";

let {
	spec,
	values = $bindable(),
}: { spec: ComponentSpec; values: Record<string, unknown> } = $props();

const dials = $derived(spec.props.filter((p) => p.control.kind !== "none"));

function seed(target: ComponentSpec): Record<string, unknown> {
	const out: Record<string, unknown> = {};
	for (const prop of target.props) {
		const { control } = prop;
		if (control.kind === "none") continue;
		if (control.kind === "boolean") out[prop.name] = Boolean(prop.default);
		else if (control.kind === "number")
			out[prop.name] = Number(prop.default ?? control.min ?? 0);
		else if (control.kind === "color") out[prop.name] = String(prop.default ?? "#a78bfa");
		else out[prop.name] = String(prop.default ?? "");
	}
	return out;
}

// The parent keys this component on the slug, so reading spec once is the intent.
let state = $state(untrack(() => seed(spec)));

$effect(() => {
	values = { ...state };
});

function label(prop: PropSpec) {
	return prop.name.replace(/([a-z])([A-Z])/g, "$1 $2");
}
</script>

{#snippet dial(prop: PropSpec)}
	{@const control = prop.control}
	<div class="flex min-h-8 items-center justify-between gap-3 px-3 py-1.5">
		<label
			for="dial-{prop.name}"
			class="truncate font-medium text-muted-foreground text-xs capitalize"
		>
			{label(prop)}
		</label>

		{#if control.kind === "boolean"}
			<Switch
				size="sm"
				label={label(prop)}
				bind:checked={() => Boolean(state[prop.name]), (next) => (state[prop.name] = next)}
			/>
		{:else if control.kind === "select"}
			<Select
				bind:value={() => String(state[prop.name] ?? ""), (next) => (state[prop.name] = next)}
			>
				<SelectTrigger aria-label={label(prop)} class="h-7 w-32 rounded-md text-xs">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{#each control.options as option (option)}
						<SelectItem value={option}>{option}</SelectItem>
					{/each}
				</SelectContent>
			</Select>
		{:else if control.kind === "number"}
			<div class="flex w-32 items-center gap-2">
				<Slider
					label={label(prop)}
					min={control.min ?? 0}
					max={control.max ?? 100}
					step={control.step}
					bind:value={() => Number(state[prop.name] ?? 0), (next) => (state[prop.name] = next)}
				/>
				<span class="w-8 shrink-0 text-right text-muted-foreground text-xs tabular-nums">
					{state[prop.name]}
				</span>
			</div>
		{:else if control.kind === "color"}
			<input
				id="dial-{prop.name}"
				type="color"
				aria-label={label(prop)}
				value={String(state[prop.name] ?? "#a78bfa")}
				oninput={(event) => {
					state[prop.name] = event.currentTarget.value;
				}}
				class="size-7 cursor-pointer rounded-md border border-border bg-transparent p-0.5"
			/>
		{:else if control.kind === "text"}
			<Input
				id="dial-{prop.name}"
				size="sm"
				placeholder={control.placeholder}
				bind:value={() => String(state[prop.name] ?? ""), (next) => (state[prop.name] = next)}
				class="h-7 w-32 text-xs"
			/>
		{/if}
	</div>
{/snippet}

<div class="divide-y divide-border rounded-xl border border-border bg-card/40 py-0.5">
	{#each dials as prop (prop.name)}
		{@render dial(prop)}
	{/each}
</div>
