import express, { json } from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import prisma from './prisma/prisma.js';

import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' with { type: 'json' };

import * as valid from './dataValidate.js';
import * as authUser from './controller/auth.controller.js'
import * as avatar from './controller/avatar.controller.js'
import * as routes from './controller/routes.controller.js'
//====================//
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
//====================//
import cookieParser from 'cookie-parser'

import auth from "./middlewear/auth.js"
import validation from './middlewear/validate.js';

import upload from "./middlewear/uploadFiles.js"

const SALT = 10

//========== .env ==========//
dotenv.config()
//========== .env ==========//

//========== Express app ==========//
const app = express()
app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
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
    app.post('/register/user',validation(valid.validationRegisterUser), authUser.RegisterUser); 
    app.post('/login/user',validation(valid.validationLoginUser), authUser.LoginUser)
    app.post('/refresh', authUser.Refresh)
    app.post("/logout", authUser.LogOut)
    app.get("/profile", auth, authUser.Profile);
    app.get("/isAuth", auth, authUser.isAuth);


    app.put("/user/update", auth, validation(valid.validationUpdateUser), async(req, res) => {
        const {email, firstName, lastName, surName, password} = req.body;
        try{
            const updatetdData = {
                email, firstName, lastName, surName
            }
            if(password){updatetdData.password = await bcrypt.hash(password, SALT)}

            const existEmail= await prisma.User.findFirst({
                where: { email, NOT: {id: req.user.userId}}
            });

            if (existEmail) {
                return res.status(400).json({
                    message: "Email уже занят"
                });
            }

           const user = await prisma.User.update({
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

    app.post("/upload/avatar", auth, upload.single("avatar"), avatar.UploadAvatar)
    app.delete("/delete/avatar", auth, avatar.DeleteAvatar)
    app.get("/user/avatar", auth, avatar.GetAvatar);

    app.post("/route/create", auth,  upload.array("images", 10), routes.CreateRoute)
    app.get("/routes/public", routes.getPublicRoutes)
    app.get("/routes/public/:id", routes.getRouteById)

    app.get("/routes/user", auth, routes.getUserRoutes)
    app.get("/routes/user/:id",auth, routes.getUserRouteById)

    app.patch("/route/update/:id", auth, upload.array("images", 10), routes.UpdateRoute)
    app.delete("/route/delete/:id", auth, routes.DeleteRoute)

    app.listen(process.env.PORT || 4200, ()=>{
        console.log(`🗲 server start on ${process.env.PORT || 4200} port 🗲`)
        console.log(`server http://localhost:4200`)
        console.log(`swagger http://localhost:4200/api-docs`)
    })
}


main()
