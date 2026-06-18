import express, { json } from 'express';
import dotenv from 'dotenv'
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './prisma/generated/client.ts';


dotenv.config()
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });


const app = express()
app.use(json())

async function main(){

    app.get('/get', (req,res) =>{
        res.status(200).json({
            message: "hello"
        })
    })
    app.listen(process.env.PORT || 4200, ()=>{
        console.log(`server start on ${process.env.PORT || 4200} port`)
    })

    app.get('/get/test_str', async (req, res) =>{
        const data = await prisma.test.findMany();

        const str = data[Math.floor(Math.random() * data.length)];
        console.log(str);
        res.status(200).json(str);
    })
}

main()
