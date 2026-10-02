<script lang="ts">
import { ErrorBoundary } from "@baby-ui/svelte";

function revenue(): string {
	throw new Error("Revenue service unavailable");
}
</script>

<ErrorBoundary variant="outline" onerror={(error) => console.error(error)}>
	<p>{revenue()}</p>
</ErrorBoundary>
