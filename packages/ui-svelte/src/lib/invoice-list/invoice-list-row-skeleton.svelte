<script lang="ts">
import Skeleton from "../skeleton/skeleton.svelte";
import TableCell from "../table/table-cell.svelte";
import TableRow from "../table/table-row.svelte";
</script>

<TableRow aria-hidden="true">
	<TableCell><Skeleton width="5.5rem" /></TableCell>
	<TableCell><Skeleton width="4.5rem" /></TableCell>
	<TableCell><Skeleton width="9rem" /></TableCell>
	<TableCell><Skeleton width="4rem" class="ml-auto" /></TableCell>
	<TableCell><Skeleton width="3.5rem" height="1.25rem" /></TableCell>
	<TableCell><Skeleton width="6rem" class="ml-auto" /></TableCell>
</TableRow>
