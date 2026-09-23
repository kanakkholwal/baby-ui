<script lang="ts">
import { cn } from "../lib/cn";
import { type JitterTextSize, jitterText } from "./variants";

let {
	text,
	durationSeconds = 0.6,
	size = "md",
	class: classProp,
}: {
	text: string;
	durationSeconds?: number;
	size?: JitterTextSize;
	class?: string;
} = $props();
</script>

<span
	data-slot="jitter-text"
	class={cn(jitterText({ size }), classProp)}
	style="--jt-duration: {durationSeconds}s"
>
	{text}
</span>
