<script lang="ts">
import { BentoCell, BentoGrid } from "@baby-ui/svelte";
</script>

<BentoGrid columns={3}>
	<BentoCell span="2x1" title="Registry" description="One spec, two ports." />
	<BentoCell title="Tokens" description="Shared across frameworks." />
	<BentoCell title="Motion" description="Timing lives in CSS." />
	<BentoCell span="2x1" title="Docs" description="Generated from the spec." />
</BentoGrid>
