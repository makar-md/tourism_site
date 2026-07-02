import { email, z } from "zod";

export const validationRegisterUser = z.object({
    email:      z.email("Некорректный email"),
    password:   z.string().min(8, "Пароль должен содержать минимум 8 символов"),
    firstName:  z.string().min(1, "Обязательное поле"),
    surName:    z.string().min(1, "Обязательное поле"),
    lastName:   z.string().optional()
});

export const validationLoginUser = z.object({
    email:      z.email("Некорректный email"),
    password:   z.string().min(8, "Пароль должен содержать минимум 8 символов")
})

export const validationUpdateUser = z.object({
    email:      z.email("Некорректный email"),
    password:   z.string().optional(),
    firstName:  z.string().min(1, "Обязательное поле"),
    surName:    z.string().min(1, "Обязательное поле"),
    lastName:   z.string().min(1).optional()
});

export const validateRouteData = z.object({
    name:           z.string().min(1, "Название обязательное поле"),
    description:    z.string().optional(),
    points:         z.array()
});
export const validateRouteUpdateData = z.object({
    id:             z.int(),
    name:           z.string().min(1, "Название обязательное поле"),
    description:    z.string().optional(),
    points:         z.array()
});