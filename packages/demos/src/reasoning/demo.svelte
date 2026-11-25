<script lang="ts">
import Example from "./usage.svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<Example variant={props.variant === "framed" ? "framed" : "default"} live={props.thinking !== false} />
