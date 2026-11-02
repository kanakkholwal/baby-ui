<script lang="ts">
import {
	Button,
	InputOTP,
	InputOTPGroup,
	InputOTPMessage,
	InputOTPResend,
	InputOTPSeparator,
	InputOTPSlot,
	InputOTPVerified,
	type InputOtpStatus,
} from "@baby-ui/svelte";
import { type ComponentProps, onDestroy } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof InputOTP>>(props));

// The code a real backend would have emailed; demo only.
const SAMPLE_CODE = "482913";
const RESEND_AFTER = 30;
const messageId = $props.id();

let value = $state("");
let phase = $state<InputOtpStatus>("idle");
let wrong = $state(false);
let seconds = $state(RESEND_AFTER);
let timers: ReturnType<typeof setTimeout>[] = [];
// The status control previews a state directly; otherwise the demo's own flow drives it.
const status = $derived(p.status && p.status !== "idle" ? p.status : phase);

const tick = setInterval(() => (seconds = Math.max(0, seconds - 1)), 1000);
onDestroy(() => {
	clearInterval(tick);
	timers.forEach(clearTimeout);
});

const later = (fn: () => void, ms: number) => {
	timers.push(setTimeout(fn, ms));
};
function verify(code: string) {
	phase = "verifying";
	later(() => {
		if (code === SAMPLE_CODE) {
			phase = "success";
			return;
		}
		phase = "idle";
		wrong = true;
		// The wrong code clears, so the next try starts fresh.
		later(() => (value = ""), 900);
	}, 1100);
}
$effect(() => {
	if (value) wrong = false;
});
function reset() {
	value = "";
	phase = "idle";
	wrong = false;
	seconds = RESEND_AFTER;
}
</script>

<div class="w-full max-w-sm rounded-2xl border border-border bg-muted/60 p-1">
	<div class="flex flex-col items-center rounded-[11px] border border-border bg-card px-6 py-8 text-center">
		<span class="grid size-11 place-items-center rounded-xl border border-border bg-muted text-muted-foreground">
			<svg viewBox="0 0 24 24" aria-hidden="true" class="size-5 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.6]">
				<path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-11ZM4.5 6.5l7.5 6 7.5-6" />
			</svg>
		</span>
		<h2 class="mt-4 font-semibold text-base text-foreground">Check your email</h2>
		<p class="mt-1 text-muted-foreground text-sm">We sent a code to <span class="text-foreground">maya@acme.com</span></p>
		<div class="mt-6">
			<InputOTP
				maxlength={6}
				bind:value
				onComplete={verify}
				variant={p.variant}
				size={p.size ?? "xl"}
				{status}
				invalid={wrong}
				invalidMotion={p.invalidMotion ?? "shake"}
				aria-label="Verification code"
				aria-describedby={wrong ? messageId : undefined}
			>
				{#snippet children({ cells })}
					<!-- Keyed by position: bits-ui hands out new cell objects on every keystroke. -->
					<InputOTPGroup>
						{#each cells.slice(0, 3) as cell, i (i)}
							<InputOTPSlot {cell} />
						{/each}
					</InputOTPGroup>
					<InputOTPSeparator />
					<InputOTPGroup>
						{#each cells.slice(3, 6) as cell, i (i)}
							<InputOTPSlot {cell} />
						{/each}
					</InputOTPGroup>
					<InputOTPVerified />
				{/snippet}
			</InputOTP>
		</div>
		<InputOTPMessage open={wrong} id={messageId}>That code didn't work. Try again.</InputOTPMessage>
		<InputOTPResend {seconds} onResend={() => (seconds = RESEND_AFTER)} hidden={status === "success"} class="mt-4" />
	</div>
	<div class="flex min-h-10 items-center justify-center gap-2 px-3 text-muted-foreground text-sm">
		{#if status === "success"}
			<Button size="sm" variant="ghost" onclick={reset}>Try it again</Button>
		{:else}
			<span>Demo code: <span class="text-foreground tabular-nums">482 913</span></span>
		{/if}
	</div>
</div>
