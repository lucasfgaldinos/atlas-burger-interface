import { Button, type CategoryProps, type ProductProps } from "@/components"
import { useCart } from "@/hooks/cart-context"
import { api } from "@/services/api"
import { formatPrice } from "@/utils"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import BagIcon from "../../assets/images/bag-icon.png"
import MenuBanner from "../../assets/images/menu-banner.jpg"

export function Menu() {
	const { addProductInCart } = useCart()
	const navigate = useNavigate()
	const { search } = useLocation()
	const [categories, setCategories] = useState<CategoryProps[] | []>([])
	const [products, setProducts] = useState<ProductProps[] | []>([])
	const [filteredProducts, setFilteredProducts] =
		useState<ProductProps[]>(products)
	const [selectedCategory, setSelectedCategory] = useState<number>(() => {
		const categoryId = new URLSearchParams(search).get("categoria")

		if (categoryId) {
			return +categoryId
		}

		return 0
	})

	useEffect(() => {
		async function getCategories() {
			const token = localStorage.getItem("token")
			const { data } = await api.get("/categories", {
				headers: {
					authorization: `Bearer ${token}`
				}
			})

			const newCategories = [{ id: 0, name: "Tudo" }, ...data]

			setCategories(newCategories)
		}

		getCategories()

		async function getProducts() {
			const token = localStorage.getItem("token")
			const { data } = await api.get("/products", {
				headers: {
					authorization: `Bearer ${token}`
				}
			})

			const allProducts = data.map((product: ProductProps) => ({
				formattedPrice: formatPrice(product.price),
				...product
			}))

			setProducts(allProducts)
		}

		getProducts()
	}, [])

	useEffect(() => {
		if (selectedCategory === 0) {
			setFilteredProducts(products)
		} else {
			const newFilteredProducts = products.filter(
				(product) => product.category_id === selectedCategory
			)

			setFilteredProducts(newFilteredProducts)
		}
	}, [products, selectedCategory])

	return (
		<main>
			<div className="w-full h-[50vh] relative">
				<h1 className="text-center uppercase absolute leading-15 font-tagesschrift top-[25%] right-[20%] z-10 text-secondary font-bold text-5xl">
					Hambúrguer <br /> de verdade <br />é aqui!!!
				</h1>

				<img
					className="w-full h-full object-cover -scale-x-100"
					src={MenuBanner}
					alt="Banner Bem-vindo (a)!"
				/>
			</div>

			<section className="w-full min-h-[50vh] bg-primary/10">
				<div className="w-full px-4 py-5">
					<ul className="flex justify-center items-center gap-5">
						{categories.length ? (
							categories.map((category) => (
								<li
									className={clsx(
										"border-b-2 border-transparent font-bold text-gray-600 hover:text-primary duration-300",
										{
											"border-b-primary text-primary":
												category.id === selectedCategory
										}
									)}
									key={category.id}
								>
									<button
										onClick={() => {
											setSelectedCategory(category.id)
											navigate(
												{
													pathname: "/cardapio",
													search: `?categoria=${category.id}`
												},
												{ replace: true }
											)
										}}
										onKeyUp={(e) => {
											if (e.key === "Enter") {
												setSelectedCategory(category.id)
											}
										}}
										className="cursor-pointer"
										type="button"
									>
										{category.name}
									</button>
								</li>
							))
						) : (
							<div className="flex items-center justify-center">
								<p>Faça login para visualizar todos os produtos!</p>
							</div>
						)}
					</ul>
				</div>

				<div className="max-w-[1200px] pb-20 pt-6 mx-auto min-h-[50vh] grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 p-4">
					{filteredProducts.length > 0 &&
						filteredProducts.map((product) => (
							<div
								style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
								className="shadow-[0px_0_2px_0px_rgba(60,64,67,0.3)] rounded-lg bg-white p-4"
								key={product.id}
							>
								<img
									style={{ filter: "drop-shadow(0px 14px 7px #46424279)" }}
									className="w-fit h-[80px] mx-auto mb-4"
									src={product.url}
									alt={product.name}
								/>

								<p className="text-lg font-extrabold">{product.name}</p>

								<div className="flex justify-between items-center">
									<span className="font-extrabold text-primary">
										{product.formattedPrice}
									</span>

									<Button onClick={() => addProductInCart(product)}>
										<img
											className="w-5"
											src={BagIcon}
											alt="Ícone de adicionar item no carrinho."
										/>
									</Button>
								</div>
							</div>
						))}
				</div>
			</section>
		</main>
	)
}
