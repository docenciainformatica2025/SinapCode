import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Formato de correo inválido"),
    password: z.string().min(1, "La contraseña es requerida"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
