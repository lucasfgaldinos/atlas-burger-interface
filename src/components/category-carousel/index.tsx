import { api } from "@/services/api"
import { useEffect, useState } from "react"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { useNavigate } from "react-router-dom"

export type CategoryProps = {
	id: number
	name: string
	url: string
}

export function CategoryCarousel() {
	const navigate = useNavigate()
	const [categories, setCategories] = useState<CategoryProps[]>([])

	useEffect(() => {
		async function getCategories() {
			const { data } = await api.get("/categories")

			setCategories(data)
		}

		getCategories()
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
		<div className="max-w-[1000px] mx-auto p-6 mb-10">
			<h2 className="pb-4 mt-8 after:transform after:content-[''] after:absolute after:w-14 after:h-1 after:bg-primary after:bottom-0 after:left-[50%] after:-translate-x-[50%] relative text-center text-3xl font-extrabold mb-4 text-primary">
				Categorias
			</h2>
			{categories.length ? (
				<Carousel responsive={responsive} draggable={false}>
					{categories.map((category) => (
						<div
							className="px-2.5 select-none aspect-[4/3] relative w-full max-h-[250px]"
							key={category.id}
						>
							<button
								onClick={() => navigate(`/cardapio?categoria=${category.id}`)}
								type="button"
								className="duration-300 border-2 z-10 border-transparent hover:text-primary hover:border-primary cursor-pointer absolute bottom-[20%] text-[18px] font-bold text-secondary left-[10%] rounded-full bg-[#000000aa] px-4 py-2"
							>
								{category.name}
							</button>

							<img
								draggable="false"
								className="w-full h-full object-cover rounded-2xl drop-shadow-md p-2"
								src={category.url}
								alt={category.name}
							/>
						</div>
					))}
				</Carousel>
			) : (
				<div className="w-full p-4 flex items-center justify-center">
					<p>Faça login para visualizar as categorias!</p>
				</div>
			)}
		</div>
	)
}
