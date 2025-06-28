import type { z } from "zod"
import type {
	createProductFormSchema,
	loginFormSchema,
	registerFormSchema,
	updateProductFormSchema
} from "./schemas"

export type CreateProductFormData = z.infer<typeof createProductFormSchema>

export type UpdateProductFormData = z.infer<typeof updateProductFormSchema>

export type LoginFormData = z.infer<typeof loginFormSchema>

export type RegisterFormData = z.infer<typeof registerFormSchema>
