import { CirclePlus, ListOrdered, Rows4Icon } from "lucide-react"

export const menuSections = [
	{
		id: 1,
		title: "Pedidos",
		icon: <ListOrdered size={18} />,
		url: "/admin/pedidos"
	},
	{
		id: 2,
		title: "Adicionar produto",
		icon: <CirclePlus size={18} />,
		url: "/admin/adicionar-produto"
	},
	{
		id: 3,
		title: "Lista de produtos",
		icon: <Rows4Icon size={18} />,
		url: "/admin/lista-de-produtos"
	}
]
