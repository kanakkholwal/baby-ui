<script lang="ts">
import { OgChangelog } from "@baby-ui/svelte";
</script>

<OgChangelog
	version="v2.4.0"
	headline="Faster builds and a new CLI"
	site="Acme"
	date="Sep 26, 2026"
	highlights={[
		{ kind: "added", text: "acme init scaffolds a project" },
		{ kind: "changed", text: "Builds reuse the cache" },
		{ kind: "fixed", text: "Watch mode on Windows" },
	]}
/>
