<script lang="ts">
import { VoiceOrb } from "@baby-ui/svelte";

let { level, speaking }: { level: number; speaking: boolean } = $props();
</script>

<VoiceOrb activity={level} active={speaking} label={speaking ? "Assistant is speaking" : "Assistant is idle"} />
