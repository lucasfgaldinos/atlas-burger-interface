import { Footer } from "@/components"
import { SideMenu } from "@/components/side-menu"
import { useUser } from "@/hooks/user-context"
import clsx from "clsx"
import { useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

export type MenuSizeProps = "max" | "min"

export function AdminLayout() {
	const { userInfo } = useUser()
	const userDataLocalStorage = localStorage.getItem("atlas-burger:userData")
	const isAdmin = userInfo?.admin
	const [menuSize, setMenuSize] = useState<MenuSizeProps>("max")

	if (isAdmin === undefined && userDataLocalStorage) {
		return (
			<div className="w-full min-h-screen bg-foreground text-white">
				Loading...
			</div>
		)
	}

	if (isAdmin === false || (userInfo === null && !userDataLocalStorage)) {
		return <Navigate to="/login" replace />
	}

	return (
		<>
			<div
				className={clsx("bg-gray-600/20 grid h-screen w-full", {
					"grid-cols-[250px_1fr]": menuSize === "max",
					"grid-cols-[50px_1fr]": menuSize === "min"
				})}
			>
				<SideMenu menuSize={menuSize} setMenuSize={setMenuSize} />
				<Outlet />
			</div>
			<Footer />
		</>
	)
}
