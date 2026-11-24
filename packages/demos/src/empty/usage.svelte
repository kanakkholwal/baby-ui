<script lang="ts">
import {
	Button,
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@baby-ui/svelte";
</script>

<Empty>
	<EmptyHeader>
		<EmptyMedia variant="icon" tone="primary">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
				<path d="M12 5v14M5 12h14" stroke-linecap="round" />
			</svg>
		</EmptyMedia>
		<EmptyTitle>No projects yet</EmptyTitle>
		<EmptyDescription>Create a project to start inviting your team.</EmptyDescription>
	</EmptyHeader>
	<EmptyContent>
		<Button class="rounded-full px-5">New project</Button>
		<Button variant="secondary" class="rounded-full px-5">Import</Button>
	</EmptyContent>
</Empty>
