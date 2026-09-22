export type TaskDetail = { label: string; meta: string };
export type TaskRowStatus = "pending" | "running" | "done" | "failed";

export type TaskRow = {
	key: string;
	label: string;
	amount: string;
	status: TaskRowStatus;
	step?: number;
	details: TaskDetail[];
};

export type TaskRowsLabels = {
	completed: string;
	failed: string;
};
