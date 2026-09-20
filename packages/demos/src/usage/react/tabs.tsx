"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [value, setValue] = useState("overview");

	return (
		<Tabs value={value} onValueChange={setValue} variant="underline">
			<TabsList>
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="activity">Activity</TabsTrigger>
			</TabsList>
			<TabsContent value="overview">Deployment health and traffic.</TabsContent>
			<TabsContent value="activity">Every deploy and who triggered it.</TabsContent>
		</Tabs>
	);
}
