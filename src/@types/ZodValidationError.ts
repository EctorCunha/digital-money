import { FieldError } from "react-hook-form";

export interface ZodValidationError extends FieldError {
  type: "zod";
  message: string;
  path: string;
}
