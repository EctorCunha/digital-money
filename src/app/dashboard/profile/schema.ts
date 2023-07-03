import * as z from "zod";

export const FormProfileForm = z.object({
  email: z.string().nonempty().email({ message: "Email inválido" }).max(255, { message: "Email deve ter no máximo 255 caracteres" }),
  name: z.string().nonempty({ message: "Campo obrigatório" }).max(50, { message: "Nome deve ter no máximo 50 caracteres" }),
  cpf: z
    .string()
    .nonempty()
    .transform((val) => val.replaceAll(".", "").replace("-", "")),
  phone: z
    .string()
    .nonempty({ message: "Campo obrigatório" })
    .regex(/^\d{10,11}$/, { message: "Número de telefone inválido" }),
  password: z
    .string()
    .nonempty({ message: "Campo obrigatório" })
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    .max(20, { message: "A senha deve ter no máximo 20 caracteres" }),
});

export type TypeFormProfileForm = z.infer<typeof FormProfileForm>;

// phone: z.string().min(8, "Mínimo de oito caracteres").max(16, "Máximo de dezesseis caracteres").nonempty("Campo obrigatório").refine((val) => val.replaceAll("_", ""))
