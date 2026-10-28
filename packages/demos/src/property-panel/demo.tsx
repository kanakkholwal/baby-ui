"use client";

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
	propertyDefaults,
	Slider,
	Switch,
	ToggleGroup,
	ToggleGroupItem,
} from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";
import { CARD_SCHEMA } from "../data/property-panel";

type Props = Record<string, unknown>;

export function PropertyPanelDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof PropertyPanel>>(props);
	const [align, setAlign] = useState("left");
	const [fill, setFill] = useState("#7dd3fc");
	const [opacity, setOpacity] = useState(80);
	const [shadow, setShadow] = useState(true);
	const [blur, setBlur] = useState(24);

	const [values, setValues] = useState<PropertyValues>(() =>
		propertyDefaults(CARD_SCHEMA),
	);

	if (props.mode !== "composed")
		return (
			<PropertyPanelControls
				variant={p.variant ?? "default"}
				title="Card"
				schema={CARD_SCHEMA}
				values={values}
				onValuesChange={setValues}
				onAction={(path) => path === "reset" && setValues(propertyDefaults(CARD_SCHEMA))}
				className="max-w-72"
			/>
		);

	return (
		<PropertyPanel variant={p.variant ?? "default"} className="max-w-72">
			<PropertyPanelGroup>
				<PropertyPanelGroupLabel>Layout</PropertyPanelGroupLabel>
				<PropertyPanelGroupContent>
					<Field orientation="horizontal" size="sm">
						<FieldLabel htmlFor="panel-width">Width</FieldLabel>
						<Input id="panel-width" size="sm" defaultValue="1280" inputMode="numeric" />
					</Field>
					<Field orientation="horizontal" size="sm">
						<FieldLabel>Align</FieldLabel>
						<ToggleGroup
							size="sm"
							label="Align"
							value={align}
							onValueChange={(next) => typeof next === "string" && next && setAlign(next)}
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
						<ColorPicker size="sm" label="Fill" value={fill} onValueChange={setFill} />
					</Field>
					<Field orientation="horizontal" size="sm">
						<FieldLabel>Opacity</FieldLabel>
						<Slider
							variant="track"
							size="sm"
							label="Opacity"
							value={opacity}
							onValueChange={(v) => typeof v === "number" && setOpacity(v)}
						/>
					</Field>
				</PropertyPanelGroupContent>
			</PropertyPanelGroup>
			<PropertyPanelGroup>
				<PropertyPanelGroupLabel>Shadow</PropertyPanelGroupLabel>
				<PropertyPanelGroupAction>
					<Switch
						size="sm"
						aria-label="Shadow"
						checked={shadow}
						onCheckedChange={setShadow}
					/>
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
							value={blur}
							onValueChange={(v) => typeof v === "number" && setBlur(v)}
						/>
					</Field>
				</PropertyPanelGroupContent>
			</PropertyPanelGroup>
		</PropertyPanel>
	);
}
