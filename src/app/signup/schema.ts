import * as z from "zod";

const passwordConstraint = z
  .string()
  .min(6, { message: "Mínimo de 6 caracteres" })
  .max(20, { message: "Máximo de 20 caracteres" })
  .nonempty("Campo obrigatário");

const nameConstraint = z
  .string()
  .max(20, { message: "Máximo de 20 caracteres" })
  .nonempty("O campo nome é obrigatório");

export const signupSchema = z
  .object({
    firstName: nameConstraint,
    lastName: nameConstraint,
    dni: z
      .string()
      .nonempty()
      .transform((val) => val.replaceAll(".", "").replace("-", "")),
    email: z
      .string()
      .email("E-mail inválido")
      .nonempty("Campo obrigatório")
      .toLowerCase(),
    password: passwordConstraint,
    confirmPassword: passwordConstraint,
    phone: z
      .string()
      .min(8, "Mínimo de oito caracteres")
      .max(16, "Máximo de dezesseis caracteres")
      .nonempty("Campo obrigatório")
      .refine((val) => val.replaceAll("_", "")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "A senha e a confirmação devem ser iguais",
  });

export type signupZodInfer = z.infer<typeof signupSchema>;
