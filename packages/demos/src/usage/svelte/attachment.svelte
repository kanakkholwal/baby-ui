<script lang="ts">
import { Attachment } from "@baby-ui/svelte";
</script>

<Attachment
	name="design-review.pdf"
	size="2.4 MB"
	status="uploading"
	progress={62}
	onremove={() => console.log("removed")}
/>
