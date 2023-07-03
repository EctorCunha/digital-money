import { getMonth, getYear, monthsInYear } from "date-fns";
import * as z from "zod";

export const cardSchema = z.object({
  number_id: z
    .string()
    .nonempty("Campo obrigatário")
    .superRefine((value, ctx) => {
      if (
        value.replaceAll(" ", "").replaceAll("_", "").replaceAll("/", "").trim()
          .length < 16
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Número cartão inválido",
        });
      }
    })
    .transform((value) =>
      value ? Number(value.replaceAll(" ", "").replaceAll("_", "")) : 0
    ),
  expiration_date: z
    .string()
    .nonempty("Campo obrigatário")
    .superRefine((value, ctx) => {
      const [month, year] = value.split("/");

      if (month) {
        const formattedMonth = Number(month);

        if (formattedMonth > 12) {
          ctx.addIssue({
            code: "custom",
            message: "O mês deve ser até dezembro",
          });
        }
      }

      if (year) {
        const formattedYear = Number(year);

        if (formattedYear < 2000 || formattedYear > 2099) {
          ctx.addIssue({
            code: "custom",
            message: "Ano deve começar com 20XX",
          });
        }
      }

      if (month && year) {
        const formattedMonth = Number(month);
        const formattedYear = Number(year);

        const currentMonth = getMonth(new Date());
        const currentYear = getYear(new Date());

        if (
          formattedYear < currentYear ||
          (formattedYear === currentYear && formattedMonth < currentMonth)
        ) {
          ctx.addIssue({
            code: "custom",
            message: "A data de expiração deve ser posterior a data atual",
          });
        }
      }

      if (
        value.replaceAll(" ", "").replaceAll("_", "").replaceAll("/", "").trim()
          .length < 6
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Data inválida",
        });
      }
    })
    .transform((value) => value && value.replaceAll("_", "")),
  first_last_name: z
    .string()
    .nonempty("Campo obrigatário")
    .min(4, "Nome inválido"),
  cod: z
    .string()
    .nonempty("Campo obrigatário")
    .superRefine((value, ctx) => {
      if (value.replaceAll(" ", "").replaceAll("_", "").trim().length < 3) {
        ctx.addIssue({
          code: "custom",
          message: "Nome inválido",
        });
      }
    })
    .transform((value) =>
      value ? Number(value.replaceAll(" ", "").replaceAll("_", "").trim()) : 0
    ),
});

export type cardInferSchemaType = z.infer<typeof cardSchema>;
// "cod": 0,
// "expiration_date": "08/2025",
// "first_last_name": "string",
// "number_id": 0
