//========== Упращение Валидации ==========// 

export default function validation(schema) {
    return (req, res, next) => {

        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({message: "validation error"});
        }

        req.body = result.data;

        next();
    };
};