<script lang="ts">
import Badge from "../../badge/svelte/badge.svelte";
import { cn } from "../../lib/cn";
import { formatRemaining } from "../approval-core";
import { RISK_BADGE } from "../variants";
import { approvalGateState } from "./context";

let { class: classProp }: { class?: string } = $props();

const ctx = approvalGateState("ApprovalGateHeader");
</script>

<!-- The tool name, its risk tier and the time left to decide. -->
<div class={cn(ctx.styles.header(), classProp)}>
	<span class={ctx.styles.tool()}>{ctx.request.tool}</span>
	<Badge variant={RISK_BADGE[ctx.request.risk]} size="sm" dot>
		{ctx.labels[`risk-${ctx.request.risk}`]}
	</Badge>
	{#if ctx.remaining !== null}
		<span class={ctx.styles.countdown()}>
			{ctx.lapsed ? ctx.labels.expired : `${ctx.labels.expiresIn} ${formatRemaining(ctx.remaining)}`}
		</span>
	{/if}
</div>
