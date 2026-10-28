<script lang="ts">
import {
	ColorPicker,
	Field,
	FieldLabel,
	Input,
	PropertyPanel,
	PropertyPanelControls,
	PropertyPanelGroup,
	PropertyPanelGroupAction,
	PropertyPanelGroupContent,
	PropertyPanelGroupLabel,
	type PropertyValues,
	Slider,
	Switch,
	ToggleGroup,
	ToggleGroupItem,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { CARD_SCHEMA } from "../data/property-panel";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof PropertyPanel>>(props));
const composed = $derived(props.mode === "composed");

let values = $state<PropertyValues>();

let align = $state("left");
let fill = $state("#7dd3fc");
let opacity = $state(80);
let shadow = $state(true);
let blur = $state(24);
</script>

{#if composed}
<PropertyPanel variant={p.variant ?? "default"} class="max-w-72">
	<PropertyPanelGroup>
		<PropertyPanelGroupLabel>Layout</PropertyPanelGroupLabel>
		<PropertyPanelGroupContent>
			<Field orientation="horizontal" size="sm">
				<FieldLabel for="panel-width">Width</FieldLabel>
				<Input id="panel-width" size="sm" value="1280" inputmode="numeric" />
			</Field>
			<Field orientation="horizontal" size="sm">
				<FieldLabel>Align</FieldLabel>
				<ToggleGroup
					size="sm"
					label="Align"
					bind:value={() => align, (next) => typeof next === "string" && next && (align = next)}
				>
					<ToggleGroupItem value="left">Left</ToggleGroupItem>
					<ToggleGroupItem value="center">Center</ToggleGroupItem>
					<ToggleGroupItem value="right">Right</ToggleGroupItem>
				</ToggleGroup>
			</Field>
		</PropertyPanelGroupContent>
	</PropertyPanelGroup>
	<PropertyPanelGroup collapsible>
		<PropertyPanelGroupLabel>Fill</PropertyPanelGroupLabel>
		<PropertyPanelGroupContent>
			<Field orientation="horizontal" size="sm">
				<FieldLabel>Colour</FieldLabel>
				<ColorPicker size="sm" label="Fill" bind:value={fill} />
			</Field>
			<Field orientation="horizontal" size="sm">
				<FieldLabel>Opacity</FieldLabel>
				<Slider variant="track" size="sm" label="Opacity" bind:value={opacity} />
			</Field>
		</PropertyPanelGroupContent>
	</PropertyPanelGroup>
	<PropertyPanelGroup>
		<PropertyPanelGroupLabel>Shadow</PropertyPanelGroupLabel>
		<PropertyPanelGroupAction>
			<Switch size="sm" aria-label="Shadow" bind:checked={shadow} />
		</PropertyPanelGroupAction>
		<PropertyPanelGroupContent>
			<Field orientation="horizontal" size="sm" data-disabled={!shadow || undefined}>
				<FieldLabel>Blur</FieldLabel>
				<Slider
					variant="track"
					size="sm"
					label="Blur"
					max={64}
					disabled={!shadow}
					bind:value={blur}
				/>
			</Field>
		</PropertyPanelGroupContent>
	</PropertyPanelGroup>
</PropertyPanel>
{:else}
	<PropertyPanelControls
		variant={p.variant ?? "default"}
		title="Card"
		schema={CARD_SCHEMA}
		bind:values
		onAction={(path) => path === "reset" && (values = undefined)}
		class="max-w-72"
	/>
{/if}
