import express, { json } from 'express';
import dotenv from 'dotenv'
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './prisma/generated/client.ts';
import cors from 'cors'
import helmet from 'helmet'

import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' with { type: 'json' };

import {validationUser} from './dataValidate.js';

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import auth from "./middlewear/auth.js"
import validation from './middlewear/validate';

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
app.use( json(), helmet(), cookieParser())
app.use(cors({
        origin: 'http://localhost:5173'
    })
)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
//========== Express app ==========//


//========== Requests ==========//
async function main(){
    

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

        const test = await prisma.test.create({
            data: data
        });
        res.status(201).json({message:"успешно"});
    });

    app.post('/register/user', async (req,res) =>{
        const {email, password, firstName, surName, LastName} = req.body;
        const data = { email, password, firstName, surName, lastName };
        const validation =  validationUser.safeParse(data)
        if(!validation.success){
            return res.status(400).json({ message: "validation error"})
        }
        try{
            const exist = await prisma.User.findUnique({
                where: {email: data.email}
            });
            if(exist){
                return res.status(400).json({message: "User already exists"})
            }
            const hash = await bcrypt.hash(password, process.env.SALT_ROUNDS || 10);
            const user = await prisma.User.create({
                data: {
                    email,
                    password: hash,
                    firstName,
                    surName,
                    lastName,
                    role: 1
                }
            });
            res.json({
                id: user.id,
                email: user.email,
            });
        }catch(e){
            return res.status(500).json({message: e.message})
        }
    })

    app.post('/login/user', async(req,res) =>{
        const{email, password} = req.body;
        const user = await prisma.User.findUnique({
            where: {email}
        });
        if(!user){
            return res.status(400).json({message: "not found user"})
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )
        res.json({ token });
    })

    app.get("/profile", auth, async (req, res) => {
        res.json({
            message: "Ты авторизован",
            user: req.user
        });
    });

    app.listen(process.env.PORT || 4200, ()=>{
        console.log(`🗲 server start on ${process.env.PORT || 4200} port 🗲`)
        console.log(`server http://localhost:4200`)
        console.log(`swagger http://localhost:4200/api-docs`)
    })
}


main()
