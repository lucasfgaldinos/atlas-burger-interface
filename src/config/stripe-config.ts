import { loadStripe } from "@stripe/stripe-js"

export const stripeData = {
	pk: ""
}

export const stripePromise = loadStripe(stripeData.pk)
