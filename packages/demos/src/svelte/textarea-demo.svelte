<script lang="ts">
import { Textarea } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let value = $state(
	"Same field tokens as Input, so labels and focus rings stay consistent.",
);
</script>

<div class="w-full max-w-md">
	<Textarea
		bind:value
		label={(props.label as string) ?? "Message"}
		description={props.description as string}
		size={(props.size as "sm" | "md" | "lg" | "xl") ?? "md"}
		variant={(props.variant as "outline" | "soft") ?? "outline"}
		rows={Number(props.rows ?? 4)}
		autoGrow={Boolean(props.autoGrow)}
		maxRows={Number(props.maxRows ?? 10)}
		showCount={Boolean(props.showCount)}
		invalid={Boolean(props.invalid)}
		disabled={Boolean(props.disabled)}
	/>
</div>
