"use client";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	paginationRange,
} from "@baby-ui/react";
import { useState } from "react";

const total = 12;

export function Example() {
	const [page, setPage] = useState(3);
	const entries = paginationRange(page, total);

	return (
		<Pagination>
			<PaginationPrevious disabled={page <= 1} onClick={() => setPage(page - 1)} />
			<PaginationContent>
				{entries.map((entry, i) => (
					<PaginationItem key={typeof entry === "number" ? entry : `gap-${i}`}>
						{entry === "gap" ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink active={entry === page} onClick={() => setPage(entry)}>
								{entry}
							</PaginationLink>
						)}
					</PaginationItem>
				))}
			</PaginationContent>
			<PaginationNext disabled={page >= total} onClick={() => setPage(page + 1)} />
		</Pagination>
	);
}
