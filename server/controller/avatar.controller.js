import prisma from "../prisma/prisma.js"
import jwt from 'jsonwebtoken'
import { deleteFiles } from "../utils/deleteFile.js"

export async function UploadAvatar(req,res){
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
}

export async function DeleteAvatar(req,res){
    try{
        const oldImg = await prisma.User.findFirst({
            where: {id: req.user.userId},
            select: {avatar: true}
        })
        deleteFiles(oldImg)
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
}

export async function GetAvatar(req, res){
    const token = req.cookies.refreshToken;
    if(!token){
        return res.status(401).json({message: "no token"})
    }
    try{
        const userDecoded = jwt.verify(token, process.env.REFRESH_SECRET)
        const avatar = await prisma.User.findFirst({
            where: {id: userDecoded.userId},
            select: { avatar: true,}
        });
        res.status(200).json(avatar);
    } catch (e){
        return res.status(500).json({message: e.message})
    }
}