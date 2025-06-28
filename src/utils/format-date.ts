export function formatDate(date: string) {
	const theDate = new Date(date)

	const formattedDate = theDate.toLocaleString("pt-BR", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	})

	const [data, hora] = formattedDate.split(", ")

	return `${data}, às ${hora}`
}
