import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles.css"
import { useCart } from "@/hooks/cart-context"
import { api } from "@/services/api"
import { toast } from "react-toastify"

export function CheckoutForm() {
	const navigate = useNavigate()
	const { cartProducts, clearCart } = useCart()
	const stripe = useStripe()
	const elements = useElements()

	const [message, setMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!stripe || !elements) {
			console.error("Stripe ou Elements falharam!")
			return
		}

		setIsLoading(true)

		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			redirect: "if_required"
		})

		if (error?.type === "card_error" || error?.type === "validation_error") {
			setMessage(error?.message ?? "")
			toast.error(error?.message)
		} else if (paymentIntent?.status === "succeeded") {
			try {
				const products = cartProducts.map((product) => {
					return {
						id: product.id,
						price: product.price,
						quantity: product.quantity
					}
				})

				const { status } = await api.post(
					"/orders",
					{ products },
					{
						validateStatus: () => true
					}
				)

				if (status) {
					if (status === 201) {
						toast.success("Pedido realizado com sucesso!")
						setTimeout(() => {
							navigate(
								`/pagamento-confirmado?payment_intent_client_secret=${paymentIntent.client_secret}`
							)
						}, 1500)
						clearCart()
					}
				} else {
					throw new Error()
				}
			} catch (error) {
				toast.error("Erro no sistema! Por favor, tente novamente.")
			}
		} else {
			navigate(
				`/pagamento-confirmado?payment_intent_client_secret=${paymentIntent?.client_secret}`
			)
		}

		setIsLoading(false)
	}

	return (
		<form id="payment-form" onSubmit={handleSubmit}>
			<PaymentElement id="payment-element" options={{ layout: "accordion" }} />
			<button
				className="button-payment-form"
				type="submit"
				disabled={isLoading || !stripe || !elements}
				id="submit"
			>
				<span id="button-text">
					{isLoading ? <div className="spinner" id="spinner" /> : "Pagar agora"}
				</span>
			</button>
			{message && <div id="payment-message">{message}</div>}
		</form>
	)
}
