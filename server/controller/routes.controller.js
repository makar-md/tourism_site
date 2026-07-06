import prisma from "../prisma/prisma.js"
import upload from "../middlewear/uploadFiles.js"
import { deleteFiles } from "../utils/deleteFile.js";

export async function CreateRoute (req, res){
    const token = req.cookies.refreshToken;
    if(!token){
        return res.status(401).json({message: "no token"})
    }
    try{
        const data = JSON.parse(req.body.data);
        const Route = await prisma.Routes.create({
            data:{
                name: data.name,
                description: data.description,
                userId: req.user.userId,
                isPublic:data.isPublic,
                statusId: data.isPublic ? 2 : 1,
                points: {
                    create: data.points.map(p => ({
                        lng: p.coords[0],
                        lat: p.coords[1]
                    }))
                },
                images: {
                    create: req.files.map((img) => ({
                        img: img.filename
                    }))
                }
            }
        })
        res.status(200).json({message: "create route"})
    } catch(e){
        console.log(e.message)
        if (req.files?.length) {
            await deleteFiles(req.files);
        }
        if (e.code === "P2002") {
            return res.status(409).json({ message: "Route name already exists" });
        }
        res.status(500).json({message: e.message})
    }
}

export async function getPublicRoutes(req, res){
    try{
        const routes = await prisma.Routes.findMany({
            where: {
                status: {name: "public"}
            },
            select: {
                id: true,
                name: true,
                description: true,
                user: { select: { email: true } },
                images: { select: { img: true }, take: 1}
            }
        });
        const result = routes.map(route => ({
            id: route.id,
            name: route.name,
            description: route.description,
            email: route.user.email,
            image: route.images[0]?.img ?? null
        }));
        res.status(200).json(result)
    } catch(e){
        console.log(e.message)
        res.status(500).json({message: e.message})
    }    
}
export async function getPrivateRoutes(req, res){
    console.log(req)
    try{
        const routes = await prisma.Routes.findMany({
            where: {
                user: {id: req.user.userId}
            },
            select: {
                id: true,
                name: true,
                description: true,
                user: { select: { email: true } },
                images: { select: { img: true }, take: 1}
            }
        });
        const result = routes.map(route => ({
            id: route.id,
            name: route.name,
            description: route.description,
            email: route.user.email,
            image: route.images[0]?.img ?? null
        }));
        res.status(200).json(result)
    } catch(e){
        console.log(e.message)
        res.status(500).json({message: e.message})
    }    
}
export async function getRouteById(req, res){
    const {id} = req.params
    try{
        const data = await prisma.Routes.findFirst({
            where:{
                id: Number(id),
                status: {name: "public"}
            },
            select: {
                name: true,
                description: true,
                isPublic: true,
                points: {select: {id:true, lng:true, lat:true}},
                images: { select: { img: true }}
            }
        })
        res.status(200).json(data)
    } catch (e) {
        console.log(e.message)
        res.status(500).json({message: e.message})
    }
}
