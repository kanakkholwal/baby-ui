<script lang="ts">
import { PinInput as InputOTPPrimitive } from "bits-ui";
import { cn } from "../lib/cn";
import { getInputOtpSize } from "./context";
import { inputOtp } from "./variants";

let {
	ref = $bindable(null),
	cell,
	class: classProp,
	...rest
}: InputOTPPrimitive.CellProps = $props();

const s = $derived(inputOtp({ size: getInputOtpSize() }));
</script>

<InputOTPPrimitive.Cell {cell} bind:ref data-slot="input-otp-slot" class={cn(s.slot(), classProp)} {...rest}>
	{cell.char}
	{#if cell.hasFakeCaret}
		<div class={s.caret()}>
			<div class={s.caretLine()}></div>
		</div>
	{/if}
</InputOTPPrimitive.Cell>
