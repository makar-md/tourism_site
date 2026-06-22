import express, { json } from 'express';
import dotenv from 'dotenv'
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './prisma/generated/client.ts';
import cors from 'cors'
import helmet from 'helmet'

import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' with { type: 'json' };

import {validationTestStr} from './dataValidate.js';

//========== .env ==========//
dotenv.config()
//========== .env ==========//

//========== Prisma ==========//
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });
//========== Prisma ==========//

//========== Express app ==========//
const app = express()
app.use( json(), helmet())
app.use(cors({
        origin: 'http://localhost:5173'
    })
)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
//========== Express app ==========//


//========== Requests ==========//
async function main(){
    
    app.get('/get/test_str', async (req, res) =>{
        const data = await prisma.test.findMany();

        const str = data[Math.floor(Math.random() * data.length)];
        console.log(str);
        res.status(200).json(str);
    })

    app.get('/get/test_str/:id', async (req, res) => {
        const { id } = req.params;
        
        const data = await prisma.test.findUnique({
            where: { id: Number(id) }
        });
        
        if (!data) return res.status(404).json({ error: 'User not found' });
        res.json(data);
    });

    app.post('/create/test_str', async (req, res) => {
        const data = req.body;
        const validation = validationTestStr.safeParse(data);
        if (!validation.success){
            return res.status(400).json({message: "no valid data"})
        }

        const user = await prisma.test.create({
            data: data
        });
        res.status(201).json({message:"успешно"});
    });

    app.listen(process.env.PORT || 4200, ()=>{
        console.log(`🗲 server start on ${process.env.PORT || 4200} port 🗲`)
        console.log(`server http://localhost:4200`)
        console.log(`swagger http://localhost:4200/api-docs`)
    })
}

//========== Zod ==========//
// export const validate = (schema) => {
//     return (req, res, next) => {

//         const result = schema.safeParse(req.body);

//         if (!result.success) {
//             return res.status(400).json(result.error);
//         }

//         req.body = result.data;

//         next();
//     };
// };

main()
