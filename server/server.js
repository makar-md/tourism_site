import express, { json } from 'express';
import dotenv from 'dotenv'
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './prisma/generated/client.ts';
import cors from 'cors'
import helmet from 'helmet'

import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' with { type: 'json' };

import * as valid from './dataValidate.js';

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import auth from "./middlewear/auth.js"
import validation from './middlewear/validate.js';

import upload from "./middlewear/uploadFiles.js"

const SALT = 10

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
app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
)

app.use( json(),helmet(
    {crossOriginResourcePolicy: false,}
), cookieParser())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/uploads", express.static("uploadFiles",));
//========== Express app ==========//


//========== Requests ==========//
async function main(){
    app.post('/register/user',validation(valid.validationRegisterUser), async (req,res) =>{
        const {email, password, firstName, surName, lastName} = req.body;
        const data = { email, password, firstName, surName, lastName };
        try{
            const exist = await prisma.User.findUnique({
                where: {email: data.email}
            });
            if(exist){
                return res.status(400).json({message: "User already exists"})
            }
            const hash = await bcrypt.hash(password, SALT);
            const user = await prisma.User.create({
                data: {
                    email,
                    password: hash,
                    firstName,
                    surName,
                    lastName,
                    roleId: 1
                }
            });
            res.status(200).json({
                id: user.id,
                email: user.email,
                message: "user register"
            });
        }catch(e){
            return res.status(500).json({message: e.message})
        }
    })

    app.post('/login/user',validation(valid.validationLoginUser) ,async(req,res) =>{
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
        const accessToken = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        )
        const refreshToken = jwt.sign(
            { 
                userId: user.id,
                email: user.email
            },
            process.env.REFRESH_SECRET,
            { expiresIn: "7d" }
        );
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 15 * 60 * 1000
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.json({ message: "loggined" });
    })
    app.post('/refresh', (req, res)=>{
        const token = req.cookies.refreshToken;
        if(!token){
            return res.status(401).json({message: "no token"})
        }
        try{
            const decoded = jwt.verify(token, process.env.REFRESH_SECRET)
            const newAccessTooken = jwt.sign(
                {
                    userId: decoded.userId,
                    email: decoded.email
                },
                process.env.JWT_SECRET,
                { expiresIn: "15m" }
            );
            res.cookie("accessToken", newAccessTooken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 15 * 1000
            })
            res.json({message: "token refreshed"})
        }catch (e){
            return res.sendStatus(401);
        }
    })

    app.post("/logout", (req, res) => {
        res.clearCookie("accessToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        });

        res.json({ message: "Logged out" });
    });


    app.get("/profile", auth, async (req, res) => {
        const token = req.cookies.refreshToken;
        if(!token){
            return res.status(401).json({message: "no token"})
        }
        try{
            const userDecoded = jwt.verify(token, process.env.REFRESH_SECRET)
            const userData = await prisma.User.findUnique({
                where: {id: userDecoded.userId}
            });
            res.status(200).json(userData);
        } catch (e){
            return res.status(500).json({message: e.message})
        }
        
    });
    app.get("/isAuth", auth, async (req, res) => {
        res.status(200).json({message: "ok"});
    });

    app.put("/user/update", auth, validation(valid.validationUpdateUser), async(req, res) => {
        const {email, firstName, lastName, surName, password} = req.body;
        try{
            const updatetdData = {
                email, firstName, lastName, surName
            }
            if(password){updatetdData.password = await bcrypt.hash(password, SALT)}

            const existEmail= await prisma.user.findFirst({
                where: { email, NOT: {id: req.user.userId}}
            });

            if (existEmail) {
                return res.status(400).json({
                    message: "Email уже занят"
                });
            }

           const user = await prisma.user.update({
                where: {id: req.user.userId},
                data: updatetdData
            });
            res.status(200).json({
                message: "user updatet",
                user
            })

        } catch(e){
            return res.status(500).json(e.message)
        }
    })

    app.post("/upload/avatar", auth, upload.single("avatar"), async(req,res) => {
        try{
            await prisma.User.update({
                where: {id: req.user.userId},
                data: {avatar: req.file.filename}
            })
            res.status(200).json({
                avatar: req.file.filename
            })
        } catch (e){ 
            res.status(500).json({message: e.message})
        }
        
    })
    app.delete("/delete/avatar", auth, async(req,res) => {
        try{
            await prisma.User.update({
                where: {id: req.user.userId},
                data: {avatar: ''}
            })
            res.status(200).json({
                avatar: ""
            })
        } catch (e){ 
            res.status(500).json({message: e.message})
        }
    })


    app.listen(process.env.PORT || 4200, ()=>{
        console.log(`🗲 server start on ${process.env.PORT || 4200} port 🗲`)
        console.log(`server http://localhost:4200`)
        console.log(`swagger http://localhost:4200/api-docs`)
    })
}


main()
