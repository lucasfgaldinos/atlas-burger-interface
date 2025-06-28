import type { ProductProps } from "@/components"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/services/api"
import { updateProductFormSchema } from "@/validators/schemas"
import type { UpdateProductFormData } from "@/validators/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Image, Pencil } from "lucide-react"
import { useEffect, useState } from "react"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import Select from "react-select"
import { toast } from "react-toastify"
import type { CategoryProps, ResponseProps } from "../add-product"

type ProductDataProps = {
	changeProducts: boolean
	setChangeProducts: React.Dispatch<React.SetStateAction<boolean>>
	productData: ProductProps
}

export function EditProductModal({ productData, changeProducts, setChangeProducts }: ProductDataProps) {
	const [categories, setCategories] = useState<CategoryProps[]>([])
	const [fileName, setFileName] = useState<string | null>(null)
	const [dialogOpen, setDialogOpen] = useState<boolean>(false)
	const {
		register,
		formState: { errors },
		control,
		handleSubmit,
		setValue
	} = useForm<UpdateProductFormData>({
		resolver: zodResolver(updateProductFormSchema),
		defaultValues: {
			name: productData.name,
			price: productData.price,
			offer: Boolean(productData.offer)
		}
	})

	useEffect(() => {
		if (categories.length && productData.category) {
			const selectedCategory = categories.find(
				(category) => category.name === productData.category.name
			)
			if (selectedCategory) {
				setValue("category_id", {
					id: selectedCategory.id,
					value: selectedCategory.name,
					label: selectedCategory.name
				})
			}
		}
	}, [categories, productData.category, setValue])

	useEffect(() => {
		async function getCategories() {
			try {
				const response: ResponseProps = await api.get("/categories")

				if (response.status === 200 && response.data.length) {
					const newCategories = response.data.map((category) => {
						return {
							id: category.id,
							name: category.name
						}
					})

					setCategories(newCategories)
				} else {
					throw new Error("Erro ao buscar categorias!")
				}
			} catch (error) {
				console.error(error)
			}
		}

		getCategories()
	}, [])

	const categoryOptions = categories.map((category) => {
		return {
			id: category.id,
			value: category.name,
			label: category.name
		}
	})

	const onSubmit: SubmitHandler<UpdateProductFormData> = async (
		data: UpdateProductFormData
	) => {
		const productFormData = new FormData()

		productFormData.append("name", data.name)
		productFormData.append("price", String(data.price))
		productFormData.append("category_id", String(data.category_id.id))
		productFormData.append("offer", String(data.offer))
		if (data.file.length === 1) {
			productFormData.append("file", data.file[0])
		}

		const { status } = await api.put(
			`/products/${productData.id}`,
			productFormData
		)

		if (status === 200) {
			toast.success("Produto atualizado com sucesso!")
			setDialogOpen(false)
         if(changeProducts) {
            setChangeProducts(false)
         }
         else {
            setChangeProducts(true)
         }
		} else {
			toast.error(
				"Algo deu errado ao atualizar o produto! Por favor, tente novamente."
			)
		}
	}

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">
					<Pencil />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogHeader>
						<DialogTitle>Editar produto</DialogTitle>
						<DialogDescription>
							Você está editando os dados do produto:{" "}
							<span className="font-bold">{productData.name}</span>
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="name">Nome</Label>
							<Input {...register("name")} id="name" />
							<p className="text-[12px] h-5 text-red-600">
								{errors?.name?.message}
							</p>
						</div>

						<div className="grid gap-1">
							<Label htmlFor="price">Preço</Label>
							<Input
								id="price"
								type="number"
								{...register("price", { valueAsNumber: true })}
							/>

							<p className="text-[12px] h-5 text-red-600">
								{errors?.price?.message}
							</p>
						</div>
						<div className="grid gap-1">
							<Label htmlFor="category_id">Categoria</Label>
							<Controller
								name="category_id"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										options={categoryOptions}
										className="w-[full]"
									/>
								)}
							/>

							<p className="text-[12px] h-5 text-red-600">
								{errors?.category_id?.message}
							</p>
						</div>
						<div className="grid gap-1">
							<Label
								htmlFor="file"
								className="flex px-2 gap-4 justify-center items-center w-full h-[36px] border-dashed border-primary border-2 rounded-md cursor-pointer"
							>
								<Image size={20} />
								<Input
									className="hidden"
									id="file"
									type="file"
									accept="image/png, image/jpeg"
									{...register("file")}
									onChange={(value) => {
										if (value.target.files) {
											setFileName(value?.target?.files[0]?.name)
										}
										register("file").onChange(value)
									}}
								/>
								<span className="truncate max-w-[200px] block">
									{fileName || "Adicione uma imagem"}
								</span>
							</Label>

							<p className="text-[12px] h-5 text-red-600">
								{typeof errors?.file?.message === "string" &&
									errors.file.message}
							</p>
						</div>
						<div className="grid gap-1">
							<div className="flex gap-2 items-end">
								<Label className="cursor-pointer" htmlFor="offer">
									Em oferta?
								</Label>
								<Input
									className="w-5 h-5 cursor-pointer accent-green-600"
									id="offer"
									type="checkbox"
									{...register("offer")}
								/>
							</div>

							<p className="text-[12px] h-5 text-red-600">
								{errors?.offer?.message}
							</p>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancelar</Button>
						</DialogClose>
						<Button type="submit">Salvar</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
