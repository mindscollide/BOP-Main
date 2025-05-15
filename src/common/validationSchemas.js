import { z } from "zod";

export const refreshIntervalSchema = z
  .number()
  .min(1, "Value must be at least 1")
  .max(30, "Value cannot be more than 30");

export const createTenorSchema = z.object({
  tenorName: z
    .string()
    .min(1, "Tenor Name is required")
    .max(10, "Max 10 characters allowed"),
  noOfDays: z
    .number()
    .min(1, "Number of Days is required")
    .max(4, "Max 4 digits allowed"),
});
