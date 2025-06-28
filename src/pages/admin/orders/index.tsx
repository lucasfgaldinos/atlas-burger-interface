import { api } from "@/services/api"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useEffect, useState } from "react"
import Select from "react-select"
import { orderStatusOptions } from "./order-status"
import { Row } from "./row"

type CreateDataRowProps = {
	id: string
	date: string
	name: string
	status: string
	products: [
		{
			id: string
			name: string
			price: number
			category: string
			url: string
			quantity: string
			_id: string
		}
	]
}

export type OrderProps = {
	_id: string
	user: {
		id: string
		name: string
	}
	products: [
		{
			id: string
			name: string
			price: number
			category: string
			url: string
			quantity: string
			_id: string
		}
	]
	status: string
	createdAt: string
	updatedAt: string
}

export function createData(order: OrderProps) {
	const data = {
		id: order._id,
		date: order.createdAt,
		name: order.user.name,
		status: order.status,
		products: order.products
	}

	return data
}

export function Orders() {
	const [orders, setOrders] = useState<OrderProps[]>([])
	const [filteredOrders, setFilteredOrders] = useState<OrderProps[]>(orders)
	const [rows, setRows] = useState<CreateDataRowProps[]>([])
	const [activeStatus, setActiveStatus] = useState(0)

	useEffect(() => {
		async function getOrders() {
			try {
				const { data } = await api.get<OrderProps[]>("/orders")

				if (data) {
					setOrders(data)
				}
			} catch (error) {
				console.error(error)
			}
		}

		getOrders()
	}, [])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (activeStatus === 0) {
			setFilteredOrders(orders)
		} else {
			const newOrders = orders.filter(
				(order) => order.status === orderStatusOptions[activeStatus].value
			)

			setFilteredOrders(newOrders)
		}
	}, [orders])

	useEffect(() => {
		if (filteredOrders.length > 0) {
			const newRows = filteredOrders.map((order) => {
				return createData(order)
			})

			setRows(newRows)
		} else {
			setRows([])
		}
	}, [filteredOrders])

	function filterOrders(
		optionId: number | undefined,
		optionValue: string | undefined
	) {
		setActiveStatus(optionId ?? 0)
		if (optionId === 0) {
			setFilteredOrders(orders)
		} else {
			const newOrders = orders.filter((order) => order.status === optionValue)

			setFilteredOrders(newOrders)
		}
	}

	return (
		<div className="h-screen p-10 pt-25 relative">
			<div className="absolute top-[40px] flex items-center gap-4">
				<p className="text-lg font-light">Filtrar pedidos por status:</p>
				<Select
					options={orderStatusOptions}
					className="w-60"
					defaultValue={orderStatusOptions[activeStatus]}
					onChange={(option) => filterOrders(option?.id, option?.value)}
				/>
			</div>
			<TableContainer
				component={Paper}
				sx={{
					height: "100%",
					overflowY: "auto"
				}}
			>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell
								sx={{
									fontWeight: "bold",
									color: "var(--primary)"
								}}
								align="center"
							>
								Pedido
							</TableCell>
							<TableCell
								sx={{
									fontWeight: "bold",
									color: "var(--primary)"
								}}
								align="center"
							>
								{"Data\u00A0/\u00A0Hora"}
							</TableCell>
							<TableCell
								sx={{
									fontWeight: "bold",
									color: "var(--primary)"
								}}
								align="center"
							>
								Cliente
							</TableCell>
							<TableCell
								sx={{
									fontWeight: "bold",
									color: "var(--primary)"
								}}
								align="center"
							>
								Status
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<Row
								orders={orders}
								setOrders={setOrders}
								key={row.name}
								row={row}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}
