<script lang="ts">
import { Skeleton } from "@baby-ui/svelte";
</script>

<div class="flex items-center gap-3">
	<Skeleton shape="circle" width="2.5rem" height="2.5rem" />
	<div class="flex flex-1 flex-col gap-2">
		<Skeleton width="60%" />
		<Skeleton width="40%" />
	</div>
</div>
