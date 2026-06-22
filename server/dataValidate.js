import { z } from "zod";

export const validationTestStr = z.object({
    text: z.string().min(1).max(100),
    num: z.number().min(5, 'number is very small')
});