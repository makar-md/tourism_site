import prisma from "../prisma/prisma.js"
import upload from "../middlewear/uploadFiles.js"

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
                userId: req.body.userId,
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
        upload.array("images", 10)
        res.status(200).json({message: "create route"})
    } catch(e){
        console.log(e.message)
        if (e.code === "P2002") {
            return res.status(409).json({ message: "Route name already exists" });
        }
        res.status(500).json({message: e.message})
    }
}

export async function getPublicRoutes(req, res){
    console.log("get data")
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
        console.log(routes)
        const result = routes.map(route => ({
            id: route.id,
            name: route.name,
            description: route.description,
            email: route.user.email,
            image: route.images[0]?.img ?? null
        }));
        console.log(result)
        res.status(200).json(result)
    } catch(e){
        console.log(e.message)
        res.status(500).json({message: e.message})
    }    
}