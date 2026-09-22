export type TableRowStatus = "todo" | "progress" | "done";

export type TableRow = {
	task: string;
	date: string;
	status: TableRowStatus;
	owner: string;
};

export type FilterTableLabels = {
	columns: { task: string; date: string; status: string; owner: string };
};
