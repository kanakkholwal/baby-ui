<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import Section from "./approval-gate-section.svelte";
import { approvalGateState } from "./context";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();

const ctx = approvalGateState("ApprovalGateBody");
</script>

<!-- Everything before the decision; folds away once the request is resolved. -->
<Section open={!ctx.resolved}>
	<div class={cn(ctx.styles.body(), classProp)}>{@render children?.()}</div>
</Section>
