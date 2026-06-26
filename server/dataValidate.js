import { email, z } from "zod";

export const validationRegisterUser = z.object({
    email: z.email(),
    password: z.string().min(8),
    firstName: z.string().min(1),
    surName: z.string().min(1),
    lastName: z.string().min(1).optional()
});

export const validationLoginUser = z.object({
    email: z.email(),
    password: z.string().min(8)
})

export const validationUpdateUser = z.object({
    email: z.email(),
    password: z.string().optional(),
    firstName: z.string().min(1),
    surName: z.string().min(1),
    lastName: z.string().min(1).optional()
});