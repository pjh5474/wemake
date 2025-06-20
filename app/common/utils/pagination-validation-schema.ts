import { z } from "zod";

export const paginationValidationSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
});
