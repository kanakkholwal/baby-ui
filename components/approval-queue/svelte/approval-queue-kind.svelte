<script lang="ts">
import { cn } from "../../lib/cn";
import { TOOL_ICONS, type ToolKind } from "../../tool/variants";
import { approvalQueueState } from "./context";

let { kind = "function", class: classProp }: { kind?: ToolKind; class?: string } =
	$props();
const ctx = approvalQueueState("ApprovalQueueKind");
</script>

<!-- The tool's kind, with the same glyphs as Tool. -->
<span aria-hidden="true" class={cn(ctx.styles.kind(), classProp)}>
	<svg viewBox="0 0 24 24"><path d={TOOL_ICONS[kind]} /></svg>
</span>
