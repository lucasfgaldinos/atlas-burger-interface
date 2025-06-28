import type { PropsWithChildren } from "react"
import { CartProvider } from "./cart-context"
import { UserProvider } from "./user-context"

export function ContextProvider({ children }: PropsWithChildren) {
	return (
		<CartProvider>
			<UserProvider>{children}</UserProvider>
		</CartProvider>
	)
}
