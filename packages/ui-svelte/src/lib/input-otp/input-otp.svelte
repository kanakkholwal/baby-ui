<script lang="ts">
import { PinInput as InputOTPPrimitive } from "bits-ui";
import { cn } from "../lib/cn";
import { setInputOtpSize } from "./context";
import { type InputOtpSize, inputOtp } from "./variants";

let {
	ref = $bindable(null),
	value = $bindable(""),
	size = "md",
	class: classProp,
	...rest
}: Omit<InputOTPPrimitive.RootProps, "size"> & { size?: InputOtpSize } = $props();

setInputOtpSize(() => size);
const s = $derived(inputOtp({ size }));
</script>

<!-- One real input under the slots, so paste and one-time-code autofill work natively. -->
<InputOTPPrimitive.Root
	bind:ref
	bind:value
	data-slot="input-otp"
	spellcheck={false}
	autocomplete="one-time-code"
	class={cn(s.root(), s.input(), classProp)}
	{...rest}
/>
