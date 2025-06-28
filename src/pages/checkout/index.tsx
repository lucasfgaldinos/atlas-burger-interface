import { Button, CheckoutForm } from "@/components"
import { stripePromise } from "@/config"
import { Elements } from "@stripe/react-stripe-js"
import { useLocation, useNavigate } from "react-router-dom"

export function Checkout() {
	const navigate = useNavigate()
	const {
		state: { clientSecret }
	} = useLocation()

	if (!clientSecret) {
		return (
			<div className="bg-foreground min-h-screen flex flex-col items-center justify-center gap-4 p-2">
				<h1 className="text-white inline-block text-center">
					Algo de nossa parte deu errado! Por favor, volte e tente novamente.
				</h1>
				<Button onClick={() => navigate("/carrinho")}>Voltar</Button>
			</div>
		)
	}

	return (
		<Elements stripe={stripePromise} options={{ clientSecret }}>
			<div className="min-h-screen w-full flex items-center justify-center p-2">
				<CheckoutForm />
			</div>
		</Elements>
	)
}
