<script lang="ts">
import {
	Button,
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
	type InputOtpSize,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

// The code a real backend would have emailed; demo only.
const SAMPLE_CODE = "418206";

let value = $state("");
const size = $derived((props.size as InputOtpSize) ?? "md");
const status = $derived(
	value.length < 6 ? "idle" : value === SAMPLE_CODE ? "verified" : "wrong",
);
</script>

<div class="flex flex-col items-center gap-3">
	<p class="text-muted-foreground text-sm">
		Enter the code we emailed you. Try <span class="font-mono">{SAMPLE_CODE}</span>.
	</p>
	<InputOTP maxlength={6} bind:value {size} aria-invalid={status === "wrong" || undefined}>
		{#snippet children({ cells })}
			<InputOTPGroup>
				{#each cells.slice(0, 3) as cell (cell)}
					<InputOTPSlot {cell} aria-invalid={status === "wrong" || undefined} />
				{/each}
			</InputOTPGroup>
			<InputOTPSeparator />
			<InputOTPGroup>
				{#each cells.slice(3, 6) as cell (cell)}
					<InputOTPSlot {cell} aria-invalid={status === "wrong" || undefined} />
				{/each}
			</InputOTPGroup>
		{/snippet}
	</InputOTP>
	<p class="h-5 text-sm" aria-live="polite">
		{status === "verified"
			? "Verified. Signing you in."
			: status === "wrong"
				? "That code doesn't match. Check the email and try again."
				: ""}
	</p>
	<Button size="sm" variant="ghost" onclick={() => (value = "")}>Clear</Button>
</div>
