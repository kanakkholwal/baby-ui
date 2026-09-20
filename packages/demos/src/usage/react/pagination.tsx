"use client";

import { Pagination } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [page, setPage] = useState(3);

	return <Pagination page={page} onPageChange={setPage} total={12} />;
}
