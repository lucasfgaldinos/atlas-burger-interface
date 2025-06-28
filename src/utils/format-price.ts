export function formatPrice(value: number) {
	const price = value / 100
	const formattedPrice = price.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL"
	})

	return formattedPrice
}
