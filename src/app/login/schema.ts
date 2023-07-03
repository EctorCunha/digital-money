import * as z from "zod";

export const loginSchema = z.object({
  login: z.string().email("E-mail inválido").nonempty("Campo obrigatório"),
  password: z
    .string()
    .min(6, { message: "Mínimo de 6 caracteres" })
    .max(20, { message: "Máximo de 20 caracteres" })
    .nonempty("Campo obrigatário"),
});

export type zodInfer = z.infer<typeof loginSchema>;
