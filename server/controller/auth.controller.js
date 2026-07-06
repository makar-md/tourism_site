import prisma from '../prisma/prisma.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export async function RegisterUser (req,res){
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
}

export async function LoginUser(req,res){
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
}

export async function Refresh(req, res){
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
            maxAge: 15 * 60 * 1000
        })
        res.json({message: "token refreshed"})
    }catch (e){
        return res.sendStatus(401);
    }
}

export async function LogOut(req, res){
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
};


export async function Profile (req, res){
    const token = req.cookies.refreshToken;
    if(!token){
        return res.status(401).json({message: "no token"})
    }
    try{
        const userDecoded = jwt.verify(token, process.env.REFRESH_SECRET)
        const userData = await prisma.User.findUnique({
            where: {id: userDecoded.userId}
        });
        console.log(userData)
        res.status(200).json(userData);
    } catch (e){
        return res.status(500).json({message: e.message})
    }
};

export async function isAuth (req, res){
    res.status(200).json({message: "ok"});
}