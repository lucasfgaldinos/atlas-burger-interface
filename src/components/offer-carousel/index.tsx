import { api } from "@/services/api"
import { useEffect, useState } from "react"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { formatPrice } from "@/utils"
import { Button } from "../ui/button"

import { useCart } from "@/hooks/cart-context"
import BagIcon from "../../assets/images/bag-icon.png"

export type ProductProps = {
	id: number
	name: string
	url: string
	price: number
	offer: string
	category_id: number
	category: {
		id: string
		name: string
	}
	formattedPrice?: string
	quantity?: number
}

export function OfferCarousel() {
	const { addProductInCart } = useCart()
	const [productsOnOffer, setProductsOnOffer] = useState<ProductProps[]>([])

	useEffect(() => {
		async function getProducts() {
			const token = localStorage.getItem("token")
			const { data } = await api.get("/products", {
				headers: {
					authorization: `Bearer ${token}`
				}
			})

			const onlyOffers = data
				.filter((product: ProductProps) => product.offer)
				.map((product: ProductProps) => ({
					...product,
					formattedPrice: formatPrice(product.price)
				}))

			setProductsOnOffer(onlyOffers)
		}

		getProducts()
	}, [])

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 900 },
			items: 3
		},
		tablet: {
			breakpoint: { max: 900, min: 500 },
			items: 2
		},
		mobile: {
			breakpoint: { max: 500, min: 0 },
			items: 1
		}
	}

	return (
		<div className="max-w-[1000px] mx-auto px-6 pb-20">
			<h2 className="pb-4 mb-4 after:transform after:content-[''] after:absolute after:w-14 after:h-1 after:bg-green-600 after:bottom-0 after:left-[50%] after:-translate-x-[50%] relative text-center text-3xl font-extrabold text-green-600">
				Ofertas do dia
			</h2>
			{productsOnOffer.length ? (
				<Carousel className="py-4" responsive={responsive} draggable={false}>
					{productsOnOffer.map((product) => (
						<div
							style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
							className="shadow-[0px_0_2px_0px_rgba(60,64,67,0.3)] rounded-lg bg-white mx-4 p-4 h-full flex flex-col justify-between"
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
				</Carousel>
			) : (
				<div className="w-full p-4 flex items-center justify-center">
					<p>Faça login para visualizar os produtos em oferta!</p>
				</div>
			)}
		</div>
	)
}
