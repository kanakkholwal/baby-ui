<script lang="ts">
import Example from "./usage.svelte";

let { props: _props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<Example />
