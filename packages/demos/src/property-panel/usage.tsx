import {
	Field,
	FieldLabel,
	Input,
	PropertyPanel,
	PropertyPanelGroup,
	PropertyPanelGroupContent,
	PropertyPanelGroupLabel,
} from "@baby-ui/react";

export function Example() {
	return (
		<PropertyPanel>
			<PropertyPanelGroup collapsible>
				<PropertyPanelGroupLabel>Layout</PropertyPanelGroupLabel>
				<PropertyPanelGroupContent>
					<Field orientation="horizontal" size="sm">
						<FieldLabel htmlFor="width">Width</FieldLabel>
						<Input id="width" size="sm" defaultValue="1280" />
					</Field>
				</PropertyPanelGroupContent>
			</PropertyPanelGroup>
		</PropertyPanel>
	);
}
