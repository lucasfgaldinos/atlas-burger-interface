import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { api } from "@/services/api"
import { createProductFormSchema } from "@/validators/schemas"
import type { CreateProductFormData } from "@/validators/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Image } from "lucide-react"
import { useEffect, useState } from "react"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import Select from "react-select"
import { toast } from "react-toastify"

export type CategoryProps = {
	id: number
	name: string
}

export type ResponseProps = {
	status: number
	data: [
		{
			id: number
			name: string
			createdAt: string
			path: string
			updatedAt: string
			url: string
		}
	]
}

export function AddProduct({
	className,
	...props
}: React.ComponentPropsWithoutRef<"form">) {
	const [categories, setCategories] = useState<CategoryProps[]>([])
	const [fileName, setFileName] = useState<string | null>(null)
	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<CreateProductFormData>({
		resolver: zodResolver(createProductFormSchema)
	})

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
					throw new Error()
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

	const onSubmit: SubmitHandler<CreateProductFormData> = async (
		data: CreateProductFormData
	) => {
		const productFormData = new FormData()

		productFormData.append("name", data.name)
		productFormData.append("price", String(data.price))
		productFormData.append("category_id", String(data.category_id.id))
		productFormData.append("offer", String(data.offer))
		productFormData.append("file", data.file[0])

		toast.promise(api.post("/products", productFormData), {
			pending: "Cadastrando novo produto...",
			success: "Produto cadastrado com sucesso!",
			error: "Algo deu errado! Por favor, tente novamente."
		})
	}

	return (
		<div className="h-full w-full p-2 flex items-center justify-center">
			<div className="border-2 h-fit w-full max-w-[450px] rounded-xl bg-accent p-10 border-gray-400/50 overflow-auto">
				<form
					className={cn("flex flex-col gap-6", className)}
					{...props}
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex flex-col items-center gap-2 text-center">
						<h1 className="text-2xl font-bold teste">Cadastrar novo produto</h1>
					</div>
					<div className="grid gap-3">
						<div className="grid gap-1">
							<Label htmlFor="name">Nome</Label>
							<Input
								id="name"
								type="string"
								placeholder="Nome"
								{...register("name")}
							/>

							<p className="text-[12px] h-5 text-red-600">
								{errors?.name?.message}
							</p>
						</div>
						<div className="grid gap-1">
							<Label htmlFor="price">Preço</Label>
							<Input
								id="price"
								type="number"
								placeholder="Preço"
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
										placeholder="Selecione a categoria"
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
						<Button type="submit" className="w-full">
							Cadastrar
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
