import { CategoryCarousel, OfferCarousel } from "@/components"
import WelcomeBanner from "../../assets/images/welcome-banner.jpg"

export function Home() {
	return (
		<main>
			<div className="w-full h-[50vh] relative">
				<h1 className="absolute font-tagesschrift top-[30%] right-[20%] z-10 text-secondary font-bold text-5xl text-bol">
					Bem-vindo (a)!
				</h1>
				<img
					className="w-full h-full object-cover"
					src={WelcomeBanner}
					alt="Banner Bem-vindo (a)!"
				/>
			</div>

			<section className="w-full min-h-[50vh] bg-primary/10">
				<CategoryCarousel />

				<OfferCarousel />
			</section>
		</main>
	)
}
