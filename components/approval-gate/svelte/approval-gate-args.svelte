<script lang="ts">
import { cn } from "../../lib/cn";
import { formatArgs } from "../approval-core";
import Section from "./approval-gate-section.svelte";
import { approvalGateState } from "./context";

const ctx = approvalGateState("ApprovalGateArgs");
const shown = $derived(ctx.argsOpen && ctx.status !== "editing");
</script>

<!-- The raw arguments behind a disclosure; closed while they are being edited. -->
<button
	type="button"
	aria-expanded={shown}
	aria-controls="{ctx.id}-args"
	disabled={ctx.status === "editing"}
	onclick={ctx.toggleArgs}
	class={ctx.styles.trigger()}
>
	{ctx.labels.args}
	<svg
		viewBox="0 0 16 16"
		fill="none"
		aria-hidden="true"
		class={cn(ctx.styles.chevron(), shown && "rotate-180 duration-(--duration-dropdown)")}
	>
		<path
			d="m4 6 4 4 4-4"
			stroke="currentColor"
			stroke-width="1.4"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</button>
<Section open={shown} id="{ctx.id}-args">
	<pre class={ctx.styles.code()}><code>{formatArgs(ctx.request.args)}</code></pre>
</Section>
