<script lang="ts">
import { StaggeredLetter, type StaggeredLetterDirection } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<StaggeredLetter text="Baby UI" direction={(props.direction as StaggeredLetterDirection) ?? "drop"} />
