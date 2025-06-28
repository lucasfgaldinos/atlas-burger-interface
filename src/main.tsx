import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { Elements } from "@stripe/react-stripe-js"
import { BrowserRouter } from "react-router-dom"
import { Slide, ToastContainer } from "react-toastify"
import { stripePromise } from "./config"
import { ContextProvider } from "./hooks"
import { Router } from "./routes"

const rootElement = document.getElementById("root")

if (!rootElement) {
	throw new Error("Element 'root' not found.")
}

const theme = createTheme({
	typography: {
		fontFamily: "'Nunito Sans', sans-serif"
	}
})

createRoot(rootElement).render(
	<StrictMode>
		<Elements stripe={stripePromise}>
			<ContextProvider>
				<BrowserRouter>
					<ThemeProvider theme={theme}>
						<Router />
					</ThemeProvider>
				</BrowserRouter>

				<ToastContainer
					position="bottom-right"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick={false}
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
					transition={Slide}
				/>
			</ContextProvider>
		</Elements>
	</StrictMode>
)
