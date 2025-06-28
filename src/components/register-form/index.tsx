import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { api } from "@/services/api"
import { registerFormSchema } from "@/validators/schemas"
import type { registerFormData } from "@/validators/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { type SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export function RegisterForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"form">) {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<registerFormData>({
		resolver: zodResolver(registerFormSchema)
	})

	const onSubmit: SubmitHandler<registerFormData> = async (
		data: registerFormData
	) => {
		try {
			const { status } = await api.post(
				"/users",
				{
					name: data.name,
					email: data.email,
					password: data.password
				},
				{
					validateStatus: () => true
				}
			)

			if (status) {
				if (status === 201) {
					toast.success("Cadastro realizado com sucesso!")
				}
				if (status === 409) {
					toast.warning("E-mail já cadastrado no sistema!")
				}
			} else {
				toast.error("Erro no sistema! Por favor, tente novamente.")
			}
		} catch (error) {}
	}

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			{...props}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold teste font-tagesschrift">
					Olá, seja bem-vindo ao Atlas Burger!
				</h1>
				<p className="text-balance text-sm text-muted-foreground">
					Cadastre-se para acessar nosso sistema.
				</p>
			</div>
			<div className="grid gap-6">
				<div className="grid gap-2">
					<Label htmlFor="name">Nome</Label>
					<Input
						id="name"
						type="text"
						placeholder="Seu nome"
						{...register("name")}
					/>

					<p className="text-[12px] h-5 text-red-600">
						{errors?.name?.message}
					</p>
				</div>
				<div className="grid gap-2">
					<div className="flex items-center">
						<Label htmlFor="email">E-mail</Label>
					</div>
					<Input
						id="email"
						type="email"
						placeholder="Sua e-mail"
						{...register("email")}
					/>
					<p className="text-[12px] h-5 text-red-600">
						{errors?.email?.message}
					</p>
				</div>
				<div className="grid gap-2">
					<Label htmlFor="password">Senha secreta</Label>
					<Input
						id="password"
						type="password"
						placeholder="Sua senha secreta"
						{...register("password")}
					/>

					<p className="text-[12px] h-5 text-red-600">
						{errors?.password?.message}
					</p>
				</div>
				<div className="grid gap-2">
					<Label htmlFor="confirmPassword">Confirme sua senha secreta</Label>
					<Input
						id="confirmPassword"
						type="password"
						placeholder="Confirme sua senha secreta"
						{...register("confirmPassword")}
					/>

					<p className="text-[12px] h-5 text-red-600">
						{errors?.confirmPassword?.message}
					</p>
				</div>
				<Button type="submit" className="w-full">
					Cadastrar
				</Button>
				<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
					<span className="relative z-10 bg-background px-2 text-muted-foreground">
						Ou
					</span>
				</div>
				<Button type="button" variant="outline" className="w-full">
					Cadastrar com Google
				</Button>
			</div>
			<div className="text-center text-sm">
				Já possui conta?{" "}
				<Link
					to="/login"
					className="underline underline-offset-4 hover:text-primary"
				>
					Faça login
				</Link>
			</div>
		</form>
	)
}
