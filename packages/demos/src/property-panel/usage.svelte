<script lang="ts">
import {
	Field,
	FieldLabel,
	Input,
	PropertyPanel,
	PropertyPanelGroup,
	PropertyPanelGroupContent,
	PropertyPanelGroupLabel,
} from "@baby-ui/svelte";
</script>

<PropertyPanel>
	<PropertyPanelGroup collapsible>
		<PropertyPanelGroupLabel>Layout</PropertyPanelGroupLabel>
		<PropertyPanelGroupContent>
			<Field orientation="horizontal" size="sm">
				<FieldLabel for="width">Width</FieldLabel>
				<Input id="width" size="sm" value="1280" />
			</Field>
		</PropertyPanelGroupContent>
	</PropertyPanelGroup>
</PropertyPanel>
