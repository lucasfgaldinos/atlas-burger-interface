import { useUser } from "@/hooks/user-context"
import clsx from "clsx"
import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import AtlasBurgerLogo from "../../assets/images/atlas-burger-logo.png"
import type { MenuSizeProps } from "../../layouts/admin-layout"
import { menuSections } from "./menu-sections"

export function SideMenu(props: {
	menuSize: MenuSizeProps
	setMenuSize: React.Dispatch<React.SetStateAction<MenuSizeProps>>
}) {
	const { menuSize, setMenuSize } = props
	const { logout } = useUser()
	const navigate = useNavigate()
	const { pathname } = useLocation()

	function changeMenuSize() {
		if (menuSize === "max") {
			setMenuSize("min")
		} else {
			setMenuSize("max")
		}
	}

	return (
		<div
			className={clsx(
				"min-h-screen relative bg-foreground/70 pb-6 pt-16 flex flex-col justify-between border-r-1 border-b-1 border-gray-400/50",
				{
					"px-2": menuSize === "max",
					"px-1 pt-36": menuSize === "min"
				}
			)}
		>
			<button
				className="absolute top-1 right-1 cursor-pointer text-primary"
				type="button"
				onClick={() => changeMenuSize()}
			>
				{menuSize === "max" ? <PanelLeftClose /> : <PanelLeftOpen />}
			</button>
			<div className="flex flex-col gap-3">
				{menuSize === "max" && (
					<div className="mt-5 mb-5 w-full flex justify-center">
						<img
							className="max-w-[60%] object-contain"
							style={{
								animation:
									"logoToggle 4s cubic-bezier(.1,1.52,.97,1.06) infinite"
							}}
							src={AtlasBurgerLogo}
							alt={"Logo Atlas Burger"}
						/>
					</div>
				)}
				{menuSections.length > 0 &&
					menuSections.map((item) => (
						<button
							className={clsx(
								"bg-foreground/70 gap-2 rounded-sm cursor-pointer hover:bg-primary text-white duration-300 flex items-center w-full border-1 border-gray-400/50",
								{
									"bg-primary text-white": item.url === pathname,
									"py-2 px-4": menuSize === "max",
									"py-2 justify-center": menuSize === "min"
								}
							)}
							title={item.title}
							type="button"
							key={item.id}
							onClick={() => navigate(item.url)}
						>
							{item.icon}
							{menuSize === "max" && item.title}
						</button>
					))}
			</div>

			<div>
				<button
					className={clsx(
						"bg-foreground/70 justify-between rounded-sm cursor-pointer hover:bg-red-800 text-white duration-300 flex items-center gap-2 w-full border-1 border-gray-400/50",
						{
							"py-2 px-4": menuSize === "max",
							"py-2 justify-center": menuSize === "min"
						}
					)}
					type="button"
					onClick={() => logout()}
				>
					{menuSize === "max" && "Sair"} <LogOut />
				</button>
			</div>
		</div>
	)
}
