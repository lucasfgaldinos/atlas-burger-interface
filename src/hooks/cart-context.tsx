import type { ProductProps } from "@/components/offer-carousel"
import {
	type PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState
} from "react"
import { toast } from "react-toastify"

type CartContextProps = {
	cartProducts: ProductProps[]
	addProductInCart: (product: ProductProps) => void
	removeProductFromCart: (productId: number) => void
	increaseProduct: (productId: number) => void
	decreaseProduct: (productId: number) => void
	clearCart: () => void
	deliveryFee: number
	totalValue: number
}

const CartContext = createContext<CartContextProps | null>(null)

export function CartProvider({ children }: PropsWithChildren) {
	const [cartProducts, setCartProducts] = useState<ProductProps[]>([])
	const [totalValue, setTotalValue] = useState<number>(0)
	const [deliveryFee] = useState<number>(700)

	function addProductInCart(product: ProductProps) {
		const index = cartProducts.findIndex((prd) => prd.id === product.id)

		let updatedCart: ProductProps[] = []
		if (index >= 0) {
			updatedCart = [...cartProducts]
			updatedCart[index] = {
				...updatedCart[index],
				quantity: (updatedCart[index].quantity ?? 0) + 1
			}
			setCartProducts(updatedCart)
			toast.success("Carrinho atualizado com sucesso!")
		} else {
			updatedCart = [...cartProducts, { ...product, quantity: 1 }]
			setCartProducts(updatedCart)
			toast.success("Carrinho atualizado com sucesso!")
		}

		updateCartLocalStorage(updatedCart)
	}

	function removeProductFromCart(productId: number) {
		const updatedCart = cartProducts.filter((prd) => prd.id !== productId)

		setCartProducts(updatedCart)
		updateCartLocalStorage(updatedCart)
		toast.success("Produto removido do carrinho com sucesso!")
	}

	function increaseProduct(productId: number) {
		const updatedCart = cartProducts.map((prd) => {
			if (prd.id === productId) {
				return {
					...prd,
					quantity: (prd.quantity ?? 0) + 1
				}
			}
			return prd
		})

		setCartProducts(updatedCart)
		updateCartLocalStorage(updatedCart)
	}

	function decreaseProduct(productId: number) {
		const updatedCart = cartProducts.map((prd) => {
			if (prd.id === productId && (prd.quantity ?? 0) > 1) {
				return {
					...prd,
					quantity: (prd.quantity ?? 0) - 1
				}
			}
			return prd
		})

		setCartProducts(updatedCart)
		updateCartLocalStorage(updatedCart)
	}

	function clearCart() {
		setCartProducts([])
		localStorage.setItem("atlasburger-userCart", JSON.stringify([]))
	}

	function updateCartLocalStorage(products: ProductProps[]) {
		localStorage.setItem("atlasburger-userCart", JSON.stringify(products))
	}

	useEffect(() => {
		const newTotalValue = cartProducts.reduce((accumulator, currentValue) => {
			if (currentValue) {
				return accumulator + currentValue.price * (currentValue.quantity ?? 0)
			}
			return accumulator
		}, 0)

		setTotalValue(newTotalValue)
	}, [cartProducts])

	useEffect(() => {
		const localStorageCartData = localStorage.getItem("atlasburger-userCart")

		if (localStorageCartData) {
			setCartProducts(JSON.parse(localStorageCartData))
		}
	}, [])

	return (
		<CartContext.Provider
			value={{
				cartProducts,
				addProductInCart,
				removeProductFromCart,
				increaseProduct,
				decreaseProduct,
				clearCart,
				deliveryFee,
				totalValue
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export function useCart() {
	const context = useContext(CartContext)

	if (!context) {
		throw new Error("useCart must be a valid context.")
	}

	return context
}
