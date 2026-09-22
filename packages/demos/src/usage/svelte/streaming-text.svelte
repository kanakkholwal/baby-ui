<script lang="ts">
import { StreamingText } from "@baby-ui/svelte";
</script>

<StreamingText
	content={"Pistachio is trending up this month.".split(" ").map((text) => ({ text }))}
/>
