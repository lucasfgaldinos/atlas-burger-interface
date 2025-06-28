import { z } from "zod"

export const updateProductFormSchema = z.object({
	name: z
		.string()
		.min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
		.regex(/^(?!\s*$).+/, { message: "Não pode conter apenas espaços" }),
	price: z
		.number({ message: "O preço deve ser um valor válido." })
		.positive({ message: "O preço deve ser positivo." })
		.min(100, { message: "O preço deve ser pelo menos 100 (1 real)." }),
	category_id: z.object(
		{
			id: z.number(),
			value: z.string(),
			label: z.string()
		},
		{ message: "Obrigatório!" }
	),
	file: z
		.any()
		.optional()
		.refine(
			(value) => {
				if (!value || value.length === 0) return true
				return value[0]?.size <= 5000000
			},
			{
				message: "Apenas imagens de até 5mb."
			}
		),
	offer: z.boolean()
})

export const createProductFormSchema = z.object({
	name: z
		.string()
		.min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
		.regex(/^(?!\s*$).+/, { message: "Não pode conter apenas espaços" }),
	price: z
		.number({ message: "O preço deve ser um valor válido." })
		.positive({ message: "O preço deve ser positivo." })
		.min(100, { message: "O preço deve ser pelo menos 100 (1 real)." }),
	category_id: z.object(
		{
			id: z.number(),
			value: z.string(),
			label: z.string()
		},
		{ message: "Obrigatório!" }
	),
	file: z
		.any()
		.refine((value) => value && value.length > 0, {
			message: "Adicione uma imagem."
		})
		.refine((value) => value[0]?.size <= 5000000, {
			message: "Apenas imagens de até 5mb."
		}),
	offer: z.boolean()
})

export const loginFormSchema = z.object({
	email: z.string().email({ message: "Isso não parece ser um e-mail." }),
	password: z
		.string({ required_error: "Digite sua senha secreta" })
		.min(6, { message: "Deve ter pelo menos 6 caracteres" })
})

export const registerFormSchema = z
	.object({
		name: z
			.string()
			.min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
			.regex(/^(?!\s*$).+/, { message: "Não pode conter apenas espaços" }),
		email: z.string().email({ message: "Isso não parece ser um e-mail." }),
		password: z.string().regex(/^(?=.*[A-Z])(?=.*\d)[^\s]{6,}$/, {
			message:
				"A senha deve conter pelo menos 6 caracteres, um número, uma letra maiúscula e sem espaço"
		}),
		confirmPassword: z.string().min(6, { message: "As senhas não coincidem" })
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				path: ["confirmPassword"],
				message: "As senhas não coincidem",
				code: z.ZodIssueCode.custom
			})
		}
	})
