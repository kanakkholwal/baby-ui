<script lang="ts">
import { cn } from "../../lib/cn";
import { formatTimer } from "../timer";
import { recordingPill } from "../variants";

/** Elapsed whole seconds, shown as m:ss. */
let { seconds, class: classProp }: { seconds: number; class?: string } = $props();
</script>

<span data-slot="recording-pill-timer" class={cn(recordingPill().timer(), classProp)}>
	{formatTimer(seconds)}
</span>
