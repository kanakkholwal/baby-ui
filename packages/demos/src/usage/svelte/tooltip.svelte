<script lang="ts">
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@baby-ui/svelte";
</script>

<TooltipProvider>
	<Tooltip>
		<TooltipTrigger>
			<button type="button">Copy</button>
		</TooltipTrigger>
		<TooltipContent side="top">Copy to clipboard</TooltipContent>
	</Tooltip>
</TooltipProvider>
