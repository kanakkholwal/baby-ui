<script lang="ts">
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@baby-ui/svelte";

let code = $state("");
</script>

<InputOTP maxlength={6} bind:value={code}>
	{#snippet children({ cells })}
		<InputOTPGroup>
			{#each cells.slice(0, 3) as cell (cell)}
				<InputOTPSlot {cell} />
			{/each}
		</InputOTPGroup>
		<InputOTPSeparator />
		<InputOTPGroup>
			{#each cells.slice(3, 6) as cell (cell)}
				<InputOTPSlot {cell} />
			{/each}
		</InputOTPGroup>
	{/snippet}
</InputOTP>
