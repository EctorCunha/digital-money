import * as z from "zod";

export const FormPayService = z.object({
  accountNumber: z.number(),
  card: z.string().min(1, { message: "Campo obrigatário" }),
});

export type TypeFormPayService = z.infer<typeof FormPayService>;
