import express, { json } from 'express';
import dotenv from 'dotenv'
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './prisma/generated/client.ts';
import cors from 'cors'
import helmet from 'helmet'


dotenv.config()
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });


const app = express()
app.use(json(), cors({
  origin: 'http://localhost:5173'
}), helmet())

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
        const user = await prisma.test.create({
            data: data
        });
        res.status(201).json({message:"успешно"});
    });

    app.listen(process.env.PORT || 4200, ()=>{
        console.log(`server start on ${process.env.PORT || 4200} port`)
    })
}

main()
