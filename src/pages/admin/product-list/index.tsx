import type { ProductProps } from "@/components"
import { api } from "@/services/api"
import { formatPrice } from "@/utils"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useEffect, useState } from "react"
import { EditProductModal } from "./edit-product-modal"

export function ProductList() {
	const [products, setProducts] = useState<ProductProps[]>([])
   const [changeProducts, setChangeProducts] = useState<boolean>(false)

	useEffect(() => {
		async function getProducts() {
			try {
				const { status, data } = await api.get<ProductProps[]>("/products")

				if (status === 200 && data.length > 0) {
					setProducts(data)
				} else {
					throw new Error()
				}
			} catch (error) {
				console.error(error)
			}
		}

		getProducts()
	}, [changeProducts])

	return (
		<div className="h-screen p-10 relative">
			<TableContainer
				component={Paper}
				sx={{
					height: "100%",
					overflowY: "auto"
				}}
			>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell
								sx={{
									fontWeight: "bold",
									color: "var(--primary)"
								}}
								align="center"
							>
								Imagem
							</TableCell>
							<TableCell
								sx={{
									fontWeight: "bold",
									color: "var(--primary)"
								}}
								align="center"
							>
								Nome
							</TableCell>
							<TableCell
								sx={{
									fontWeight: "bold",
									color: "var(--primary)"
								}}
								align="center"
							>
								Categoria
							</TableCell>
							<TableCell
								sx={{
									fontWeight: "bold",
									color: "var(--primary)"
								}}
								align="center"
							>
								Preço
							</TableCell>
							<TableCell
								sx={{
									fontWeight: "bold",
									color: "var(--primary)"
								}}
								align="center"
							>
								Em oferta
							</TableCell>
							<TableCell
								sx={{
									fontWeight: "bold",
									color: "var(--primary)"
								}}
								align="center"
							>
								Editar
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{products.map((product) => (
							<TableRow
								key={product.id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell align="center">
									<img
										className="max-w-14 max-h-14 object-contain mx-auto"
										src={product.url}
										alt={product.name}
									/>
								</TableCell>
								<TableCell align="center" sx={{ maxWidth: "100px" }}>
									{product.name}
								</TableCell>
								<TableCell align="center">{product.category.name}</TableCell>
								<TableCell align="center">
									{formatPrice(product.price)}
								</TableCell>
								<TableCell align="center">
									{product.offer ? (
										<p className="text-green-500 border-1 border-green-500 rounded-2xl p-1 px-2 w-fit h-fit mx-auto">
											Sim
										</p>
									) : (
										<p className="text-red-500 border-1 border-red-500 rounded-2xl p-1 px-2 w-fit h-fit mx-auto">
											Não
										</p>
									)}
								</TableCell>

								<TableCell align="center">
									<EditProductModal
										changeProducts={changeProducts}
										setChangeProducts={setChangeProducts}
										productData={product}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}
