import { Footer, Header } from "@/components"
import { Outlet } from "react-router-dom"

export function UserLayout() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}
