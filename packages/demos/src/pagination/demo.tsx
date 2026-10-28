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
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function PaginationDemo({ props }: { props: Props }) {
	const [page, setPage] = useState(4);
	useEffect(() => setPage(Number(props.page ?? 4)), [props.page]);
	const total = Number(props.total ?? 12);
	const entries = paginationRange(page, total, Number(props.siblings ?? 1));
	const size =
		controlProps<ComponentProps<typeof PaginationLink>>(props).size ?? "default";
	return (
		<Pagination>
			<PaginationPrevious
				size={size}
				disabled={page <= 1}
				onClick={() => setPage((p) => Math.max(1, p - 1))}
			/>
			<PaginationContent>
				{entries.map((entry, i) => (
					<PaginationItem key={typeof entry === "number" ? entry : `gap-${i}`}>
						{entry === "gap" ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink
								size={size}
								active={entry === page}
								onClick={() => setPage(entry)}
							>
								{entry}
							</PaginationLink>
						)}
					</PaginationItem>
				))}
			</PaginationContent>
			<PaginationNext
				size={size}
				disabled={page >= total}
				onClick={() => setPage((p) => Math.min(total, p + 1))}
			/>
		</Pagination>
	);
}
