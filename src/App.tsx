import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { PageSkeleton } from "@/components/feedback/PageSkeleton";
import { AppShell } from "@/components/layout/AppShell";

const HomePage = lazy(() =>
	import("@/pages/HomePage").then((module) => ({ default: module.HomePage })),
);
const UserPage = lazy(() =>
	import("@/pages/UserPage").then((module) => ({ default: module.UserPage })),
);
const RepoPage = lazy(() =>
	import("@/pages/RepoPage").then((module) => ({ default: module.RepoPage })),
);

export default function App() {
	return (
		<BrowserRouter>
			<Suspense fallback={<PageSkeleton />}>
				<Routes>
					<Route element={<AppShell />}>
						<Route index element={<HomePage />} />
						<Route path="users/:username" element={<UserPage />} />
						<Route path="users/:username/:repo" element={<RepoPage />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}
