import { useUser } from "@/hooks/user-context"
import clsx from "clsx"
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import BagIcon from "../../assets/images/bag-icon.png"
import PersonIcon from "../../assets/images/person-icon.png"

export function Header() {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { userInfo, logout } = useUser()

	const userFirstName = userInfo?.name.split(" ")[0]

	return (
		<header className="w-full p-5 pb-3 z-20 bg-foreground fixed">
			<div className="max-w-7xl mx-auto flex justify-between items-center">
				<nav className="text-white flex items-center gap-4">
					<Link
						className={clsx("duration-300 hover:text-primary relative", {
							"text-primary after:transform after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-primary after:-bottom-1 after:left-[50%] after:-translate-x-[50%]":
								pathname === "/"
						})}
						to={"/"}
					>
						Home
					</Link>
					<hr className="h-[14px] border-l-1 border-white" />
					<Link
						className={clsx("duration-300 hover:text-primary relative", {
							"text-primary after:transform after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-primary after:-bottom-1 after:left-[50%] after:-translate-x-[50%]":
								pathname === "/cardapio"
						})}
						to={"/cardapio"}
					>
						Cardápio
					</Link>
				</nav>

				<div className="flex items-center gap-10">
					<div className="flex items-center justify-center gap-2">
						<img src={PersonIcon} alt="Ícone de pessoa." />

						<div className="flex flex-col justify-between">
							<p className="text-white text-sm font-medium">
								Olá,{" "}
								<span className="text-blue-500 font-bold">{userFirstName}</span>
							</p>
							<button
								className="text-red-800 w-fit h-fit text-sm font-bold cursor-pointer hover:text-red-500  duration-300"
								type="button"
								onClick={() => {
									logout()
									navigate("/login")
								}}
							>
								Sair
							</button>
						</div>
					</div>

					<div className="flex items-center gap-2 text-white">
						<img className="w-6 h-fit" src={BagIcon} alt="Ícone de sacola." />

						<Link
							className={clsx("duration-300 hover:text-primary relative", {
								"text-primary after:transform after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-primary after:-bottom-1 after:left-[50%] after:-translate-x-[50%]":
									pathname === "/carrinho"
							})}
							to={"/carrinho"}
						>
							Pedido
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}
