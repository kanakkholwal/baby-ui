<script lang="ts">
import { Button } from "@baby-ui/components/svelte/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
} from "@baby-ui/components/svelte/button-group";

const PATHS = {
	photo:
		"M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2ZM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM21 15l-5-5L5 21",
	video:
		"m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 11ZM4 6h9a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z",
	more: "M12 12h.01M19 12h.01M5 12h.01",
} as const;
</script>

{#snippet icon(name: keyof typeof PATHS)}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<path d={PATHS[name]} />
	</svg>
{/snippet}

<div class="flex flex-col items-start gap-4">
	<ButtonGroup aria-label="Content type">
		<Button variant="secondary" roundness="full">{@render icon("photo")}Photos</Button>
		<ButtonGroupSeparator />
		<Button variant="secondary" roundness="full">{@render icon("video")}Videos</Button>
		<ButtonGroupSeparator />
		<Button variant="secondary" roundness="full" size="icon" aria-label="More options">{@render icon("more")}</Button>
	</ButtonGroup>
	<ButtonGroup aria-label="Text alignment">
		<Button variant="secondary" roundness="full">Left</Button>
		<ButtonGroupSeparator />
		<Button variant="secondary" roundness="full">Center</Button>
		<ButtonGroupSeparator />
		<Button variant="secondary" roundness="full">Right</Button>
	</ButtonGroup>
</div>
