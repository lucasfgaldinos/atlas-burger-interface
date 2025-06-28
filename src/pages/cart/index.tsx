import { Button } from "@/components"
import { useCart } from "@/hooks/cart-context"
import { api } from "@/services/api"
import { formatPrice } from "@/utils"
import { ChevronLeft, MinusIcon, PlusIcon, Trash2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import CartBanner from "../../assets/images/cart-banner.jpg"

export function Cart() {
	const navigate = useNavigate()
	const {
		cartProducts,
		removeProductFromCart,
		increaseProduct,
		decreaseProduct,
		clearCart,
		deliveryFee,
		totalValue
	} = useCart()

	async function onSubmit() {
		const products = cartProducts.map((product) => {
			return {
				id: product.id,
				price: product.price,
				quantity: product.quantity
			}
		})

		try {
			if (products.length > 0) {
				const { data } = await api.post("/create-payment-intent", {
					products,
					deliveryFee
				})

				navigate("/checkout", { state: data })
			} else {
				toast.warning("Seu carrinho está vazio!")
			}
		} catch (error) {
			toast.error("Ops, algo deu errado! Por favor, tente novamente.")
		}
	}

	return (
		<main>
			<div className="min-h-[100vh] bg-primary/10">
				<div className="w-full h-[300px]">
					<img
						className="w-full h-full object-cover"
						src={CartBanner}
						alt="Banner de pedido."
					/>
				</div>
				<h2 className="pb-4 mt-8 after:transform after:content-[''] after:absolute after:w-14 after:h-1 after:bg-primary after:bottom-0 after:left-[50%] after:-translate-x-[50%] relative text-center text-3xl font-extrabold mb-4 text-primary">
					Checkout - Pedido
				</h2>

				<div className="grid grid-cols-3 gap-10 max-w-7xl mx-auto mt-14 pb-30 px-4">
					<table className="bg-white h-fit col-span-2 rounded-xl overflow-hidden">
						<thead>
							<tr className="bg-primary text-white">
								<th className="p-2">Produto</th>
								<th className="p-2">Preço</th>
								<th className="p-2">Quantidade</th>
								<th className="p-2">Total</th>
								<th className="p-2" />
							</tr>
						</thead>

						{cartProducts.length ? (
							cartProducts.map((product) => (
								<tbody key={product.id}>
									<tr className="border-b-1 border-gray-400">
										<td className="text-center p-2">
											<div className="flex items-center gap-2">
												<img
													className="max-h-18 w-fit p-2"
													src={product.url}
													alt={product.name}
												/>
												<p>{product.name}</p>
											</div>
										</td>
										<td className="text-center p-2">
											{product.formattedPrice}
										</td>
										<td className="text-center p-2">
											<div className=" flex items-center justify-center">
												<button
													onClick={() => decreaseProduct(product.id)}
													className="bg-primary p-2 rounded-md active:scale-95 cursor-pointer duration-300"
													type="button"
												>
													<MinusIcon size={17} color="white" />
												</button>
												<p className="p-2">{product.quantity}</p>
												<button
													onClick={() => increaseProduct(product.id)}
													className="bg-primary p-2 rounded-md active:scale-95 cursor-pointer duration-300"
													type="button"
												>
													<PlusIcon size={17} color="white" />
												</button>
											</div>
										</td>
										<td className="text-center p-2 font-bold">
											{formatPrice((product.quantity ?? 0) * product.price)}
										</td>
										<td className="text-center p-2">
											<div className="flex justify-center">
												<button
													onClick={() => removeProductFromCart(product.id)}
													type="button"
												>
													<Trash2 className="hover:text-red-600 cursor-pointer" />
												</button>
											</div>
										</td>
									</tr>
								</tbody>
							))
						) : (
							<tbody>
								<tr>
									<td colSpan={5}>
										<div className="w-full p-6 flex items-center justify-center font-bold text-gray-900">
											<p>Sem produtos aqui, por enquanto!</p>
										</div>
									</td>
								</tr>
							</tbody>
						)}

						<tfoot>
							<tr>
								<td colSpan={5}>
									<div className="flex justify-between p-4">
										{cartProducts.length > 0 ? (
											<button
												className="text-red-800 cursor-pointer hover:text-red-600"
												type="button"
												onClick={() => clearCart()}
											>
												Limpar carrinho
											</button>
										) : (
											<div />
										)}

										<div className="flex items-center justify-center font-bold text-red-400">
											<Link
												className="w-fit text-foreground hover:text-primary underline duration-300 flex items-center justify-center gap-1 font-medium"
												to={"/cardapio"}
											>
												<ChevronLeft size={18} /> Adicionar produtos
											</Link>
										</div>
									</div>
								</td>
							</tr>
						</tfoot>
					</table>

					<div className="bg-white col-span-1 rounded-xl h-fit overflow-hidden">
						<div className="bg-foreground text-white">
							<p className="text-center p-2">Resumo do pedido</p>
						</div>

						<div className="w-full flex flex-col gap-3 p-2 text-sm">
							<div className="flex justify-between text-gray-800">
								<p className="font-medium">Produtos</p>
								<p className="font-bold">{formatPrice(totalValue)}</p>
							</div>
							<div className="flex justify-between text-gray-800 text-sm">
								<p className="font-medium">Taxa de entrega</p>
								<p className="font-bold">{formatPrice(deliveryFee)}</p>
							</div>

							<div className="flex justify-between text-gray-800 text-lg mt-10">
								<p className="font-medium">Total do pedido</p>
								<p className="font-bold">
									{formatPrice(totalValue && totalValue + deliveryFee)}
								</p>
							</div>
						</div>

						<div className="p-2">
							<Button onClick={() => onSubmit()} className="w-full">
								Finalizar pedido
							</Button>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
