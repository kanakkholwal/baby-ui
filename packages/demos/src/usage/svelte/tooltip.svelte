<script lang="ts">
import { Tooltip, TooltipContent, TooltipTrigger } from "@baby-ui/svelte";
</script>

<Tooltip placement="top">
	<TooltipTrigger>
		<button type="button">Copy</button>
	</TooltipTrigger>
	<TooltipContent>Copy to clipboard</TooltipContent>
</Tooltip>
