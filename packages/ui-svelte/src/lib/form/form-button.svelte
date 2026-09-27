<script lang="ts">
import type { ComponentProps } from "svelte";
import Button from "../button/button.svelte";

let { ref = $bindable(null), ...rest }: ComponentProps<typeof Button> = $props();
</script>

<Button bind:ref type="submit" {...rest} />
