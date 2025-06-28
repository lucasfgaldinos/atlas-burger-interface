import { api } from "@/services/api"
import { formatDate, formatPrice } from "@/utils"
import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import Select from "react-select"
import { toast } from "react-toastify"
import type { OrderProps, createData } from "."
import { orderStatusOptions } from "./order-status"

export function Row(props: {
	row: ReturnType<typeof createData>
	orders: OrderProps[]
	setOrders: React.Dispatch<React.SetStateAction<OrderProps[]>>
}) {
	const { row, orders, setOrders } = props
	const [open, setOpen] = useState(false)
	const [selectLoading, setSelectLoading] = useState(false)

	async function updateStatus(
		statusValue: string | undefined,
		orderId: string
	) {
		try {
			setSelectLoading(true)
			const response = await api.put(`/orders/${orderId}`, {
				status: statusValue
			})

			if (response.status === 200) {
				const newOrders = orders.map((order) => {
					return order._id === orderId
						? {
								...order,
								status: statusValue ?? ""
							}
						: order
				})

				setOrders(newOrders)
				toast.success("Status do pedido atualizado com sucesso.")
			}
		} catch (error) {
			console.error(error)
			toast.error(
				"Erro ao atualizar o status do pedido! Por favor tente novamente."
			)
		} finally {
			setSelectLoading(false)
		}
	}

	return (
		<>
			<TableRow
				sx={{
					"& > *": {
						borderBottom: "unset"
					}
				}}
			>
				<TableCell align="center">
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <ChevronUp /> : <ChevronDown />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row" align="center">
					{row.id}
				</TableCell>
				<TableCell component="th" scope="row" align="center">
					{formatDate(row.date)}
				</TableCell>
				<TableCell align="center">{row.name}</TableCell>
				<TableCell align="center">
					<Select
						className="w-48 mx-auto"
						options={orderStatusOptions.filter(
							(options) => options.value !== "Todos."
						)}
						defaultValue={orderStatusOptions.find((status) =>
							status.value === row.status ? row.status : null
						)}
						onChange={(status) => updateStatus(status?.value, row.id)}
						isLoading={selectLoading}
					/>
				</TableCell>
			</TableRow>
			<TableRow sx={{ backgroundColor: "var(--accent)" }}>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								Produtos:
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell />
										<TableCell
											sx={{
												fontWeight: "bold"
											}}
											align="center"
										>
											Produto
										</TableCell>
										<TableCell
											sx={{
												fontWeight: "bold"
											}}
											align="center"
										>
											Preço
										</TableCell>
										<TableCell
											sx={{
												fontWeight: "bold"
											}}
											align="center"
										>
											Qnt
										</TableCell>
										<TableCell
											sx={{
												fontWeight: "bold"
											}}
											align="center"
										>
											Total
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.products.map((productRow) => (
										<TableRow key={productRow._id}>
											<TableCell component="th" scope="row" align="center">
												<img
													className="max-w-[60px] max-h-[60px] object-contain py-2 mx-auto"
													src={productRow.url}
													alt={productRow.name}
												/>
											</TableCell>
											<TableCell align="center">{productRow.name}</TableCell>
											<TableCell align="center">
												{formatPrice(productRow.price)}
											</TableCell>
											<TableCell align="center">
												{productRow.quantity}
											</TableCell>
											<TableCell align="center">
												{formatPrice(
													productRow.price * Number(productRow.quantity)
												)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	)
}
