import { email, z } from "zod";

export const validationUser = z.object({
    email: z.email(),
    password: z.string(),
    firstName: z.string().min(1),
    surName: z.string().min(1),
    lastName: z.string().min(1).optional()
});