<script lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@baby-ui/svelte";
</script>

<div class="flex items-center gap-2">
	<Avatar size="sm">
		<AvatarFallback>AL</AvatarFallback>
	</Avatar>
	<Avatar>
		<AvatarFallback>GH</AvatarFallback>
		<AvatarImage src="/grace.jpg" alt="Grace Hopper" />
	</Avatar>
	<Avatar size="lg" shape="square">
		<AvatarFallback>AT</AvatarFallback>
	</Avatar>
</div>
