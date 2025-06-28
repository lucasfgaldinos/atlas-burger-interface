import { AdminLayout, UserLayout } from "@/layouts"
import {
	Cart,
	Checkout,
	Home,
	Login,
	Menu,
	PaymentConfirmed,
	Register
} from "@/pages"
import { ProductList } from "@/pages/admin"
import { AddProduct } from "@/pages/admin"
import { Orders } from "@/pages/admin"
import { Navigate, Route, Routes } from "react-router-dom"

export function Router() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />

			<Route path="/cadastro" element={<Register />} />

			<Route path="/" element={<UserLayout />}>
				<Route path="/" element={<Home />} />
				<Route path="/cardapio" element={<Menu />} />
				<Route path="/carrinho" element={<Cart />} />
				<Route path="/checkout" element={<Checkout />} />
				<Route path="/pagamento-confirmado" element={<PaymentConfirmed />} />
			</Route>

			<Route path="/admin" element={<AdminLayout />}>
				<Route index element={<Navigate to="pedidos" replace />} />
				<Route path="/admin/pedidos" element={<Orders />} />
				<Route path="/admin/adicionar-produto" element={<AddProduct />} />
				<Route path="/admin/lista-de-produtos" element={<ProductList />} />
			</Route>
		</Routes>
	)
}
