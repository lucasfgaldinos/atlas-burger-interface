import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@/hooks/user-context"
import { cn } from "@/lib/utils"
import { api } from "@/services/api"
import { loginFormSchema } from "@/validators/schemas"
import type { loginFormData } from "@/validators/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { type SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"form">) {
	const navigate = useNavigate()
	const { putUserData } = useUser()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<loginFormData>({
		resolver: zodResolver(loginFormSchema)
	})

	const onSubmit: SubmitHandler<loginFormData> = async (
		data: loginFormData
	) => {
		try {
			const { status, data: userData } = await api.post(
				"/session",
				{
					email: data.email,
					password: data.password
				},
				{
					validateStatus: () => true
				}
			)

			if (status) {
				if (status === 201) {
					putUserData(userData)
					toast.success("Seja muito bem-vindo(a)!")
					setTimeout(() => {
						if (userData.admin) {
							navigate("/admin/pedidos")
						} else {
							navigate("/")
						}
					}, 1500)
				} else if (status === 401) {
					toast.warn("Email ou senha incorretos.")
				}
			} else {
				throw new Error()
			}
		} catch (error) {
			toast.error("Erro no sistema! Por favor, tente novamente.")
		}
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
					Faça login com seu e-mail e sua senha secreta.
				</p>
			</div>
			<div className="grid gap-6">
				<div className="grid gap-2">
					<Label htmlFor="email">E-mail</Label>
					<Input
						id="email"
						type="text"
						placeholder="Seu e-mail"
						{...register("email")}
					/>

					<p className="text-[12px] h-5 text-red-600">
						{errors?.email?.message}
					</p>
				</div>
				<div className="grid gap-2">
					<div className="flex items-center">
						<Label htmlFor="password">Senha secreta</Label>
						<Link
							to=""
							className="ml-auto text-sm underline underline-offset-4 hover:text-primary"
						>
							Esqueceu sua senha?
						</Link>
					</div>
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
				<Button type="submit" className="w-full">
					Login
				</Button>
				<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
					<span className="relative z-10 bg-background px-2 text-muted-foreground">
						Ou
					</span>
				</div>
				<Button type="button" variant="outline" className="w-full">
					Login com Google
				</Button>
			</div>
			<div className="text-center text-sm">
				Não possui conta?{" "}
				<Link
					className="underline underline-offset-4 hover:text-primary"
					to="/cadastro"
				>
					Cadastre-se
				</Link>
			</div>
		</form>
	)
}
