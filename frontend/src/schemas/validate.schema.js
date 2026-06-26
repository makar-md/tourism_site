import { email, z } from "zod";

export const validationRegisterUser = z.object({
    email: z.email("Некорректный email"),
    password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
    firstName: z.string().min(1, "Обязательное поле"),
    surName: z.string().min(1, "Обязательное поле"),
    lastName: z.string().min(1).optional()
});

export const validationLoginUser = z.object({
    email: z.email("Некорректный email"),
    password: z.string().min(8, "Пароль должен содержать минимум 8 символов")
})

export const validationUpdateUser = z.object({
    email: z.email(),
    password: z.string().min(8).optional(),
    firstName: z.string().min(1),
    surName: z.string().min(1),
    lastName: z.string().min(1).optional()
});