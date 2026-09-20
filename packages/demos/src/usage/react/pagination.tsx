"use client";

import { useState } from "react";
import { Pagination } from "@baby-ui/react";

export function Example() {
	const [page, setPage] = useState(3);

	return <Pagination page={page} onPageChange={setPage} total={12} />;
}
