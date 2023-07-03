import * as z from "zod";

export const FormRechargeForm = z.object({
  card: z.string().nonempty({ message: "Campo obrigatário" }),
  value: z
    .string()
    .nonempty({ message: "Campo obrigatário" })
    .min(1, { message: "Campo obrigatário" })
    .superRefine((value, ctx) => {
      if (!value || value === undefined) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatário",
        });
      }

      if (value) {
        const formatted = Number(
          value.replaceAll(" ", "").replaceAll(",", ".")
        );

        if (formatted < 0) {
          ctx.addIssue({
            code: "custom",
            message: "Valor deve ser maior que 0",
          });
        }

        if (!formatted) {
          ctx.addIssue({
            code: "custom",
            message: "Valor inválido",
          });
        }
      }
    })
    .transform((value) => {
      const formatted = Number(value.replaceAll(" ", "").replaceAll(",", "."));
      return formatted && Number(formatted);
    }),
});

export type TypeFormRechargeForm = z.infer<typeof FormRechargeForm>;
