<script lang="ts">
import { cn } from "../../lib/cn";
import { approvalGateState } from "./context";

let { class: classProp }: { class?: string } = $props();
const ctx = approvalGateState("ApprovalGateSummary");
</script>

<!-- What will happen, in words a reviewer can check. -->
<p class={cn(ctx.styles.summary(), classProp)}>{ctx.request.summary}</p>
