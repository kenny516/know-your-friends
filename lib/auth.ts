import { z } from "zod"

export const authSchema = z.object({
    email: z.string().email({
        message: "Veuillez entrer une adresse email valide",
    }),
    password: z.string().min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères",
    }),
})

export type AuthInput = z.infer<typeof authSchema>