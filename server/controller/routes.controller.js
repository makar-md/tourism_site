import prisma from "../prisma/prisma.js"
import upload from "../middlewear/uploadFiles.js"
import { deleteFiles } from "../utils/deleteFile.js";

async function getRoutes(where) {
    const routes = await prisma.Routes.findMany({
        where,
        select: {
            id: true,
            name: true,
            description: true,
            user: { select: {email: true}},
            images: { take: 1, select: { img: true }
            }
        }
    });
    return routes.map(route => ({
        id: route.id,
        name: route.name,
        description: route.description,
        email: route.user.email,
        image: route.images[0]?.img ?? null
    }));
}

async function getRoute(where){
    return prisma.Routes.findFirst({
        where,
        select:{
            name:true,
            description:true,
            isPublic:true,
            statusId: true,
            points:{ select:{ id:true, lng:true, lat:true } },
            images:{select:{img:true}}
        }
    });
}


export async function CreateRoute (req, res){
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

export async function UpdateRoute(req, res) {
    const { id } = req.params;
    try {
        const data = JSON.parse(req.body.data);
        // проверка владельца
        const OldRoute = await getRoute({
                id: Number(id),
                userId: req.user.userId
            }
        );
        if (!OldRoute) {
            return res.status(404).json({ message: "Маршрут не найден" });
        }
        // Проверяем уникальность имени
        const existName = await prisma.Routes.findFirst({
            where: {
                name: data.name,
                NOT: {id: Number(id)}
            }
        });

        if (existName) {
            if (req.files?.length) {
                try{
                    await deleteFiles(req.files);
                } catch (e){
                    throw new Error(e)
                }
            }
            return res.status(409).json({
                message: "Имя маршрута уже занято"
            });
        }

        const updateData = {
            name: data.name,
            description: data.description,
            isPublic: data.isPublic,
            statusId: data.isPublic ? 2 : 1,
            points: {
                deleteMany: {},
                create: data.points.map(point => ({
                    lng: point.coords[0],
                    lat: point.coords[1]
                }))
            }
        };

        if (req.files?.length) {
            updateData.images = {
                deleteMany: {},
                create: req.files.map(file => ({
                    img: file.filename
                }))
            };
        }

        await prisma.Routes.update({
            where: {
                id: Number(id)
            },
            data: updateData
        });


        const lastVersion = await prisma.historyRoutes.aggregate({
            where: { routeId: Number(id)},
            _max: { version: true }
        });

        const version = (lastVersion._max.version ?? 0) + 1;

        await prisma.historyRoutes.create({
             data: {
                routeId: Number(id),
                version,
                userId: req.user.userId,
                name: OldRoute.name,
                description: OldRoute.description,
                isPublic: OldRoute.isPublic,
                statusId: OldRoute.statusId,
                points: {
                    create: OldRoute.points.map(point => ({
                        lng: point.lng,
                        lat: point.lat,
                        address: point.address
                    }))
                },
                images: {
                    create: OldRoute.images.map(image => ({
                        img: image.img
                    }))
                }
            }
        })
        return res.status(200).json({ message: "Маршрут успешно обновлён" });
    } catch (e) {
        console.log(e);
        if (req.files?.length) {
            try{
                await deleteFiles(req.files);
            } catch (e){
                throw new Error(e)
            }
        }
        if (e.code === "P2002") {
            return res.status(409).json({
                message: "Имя маршрута уже занято"
            });
        }
        return res.status(500).json({
            message: e.message
        });
    }
}

export async function DeleteRoute(req, res){
    const { id } = req.params;
    try{
        const route = await prisma.Routes.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                images: true,
            },
        });
        if(!route){
           return res.status(404).json({ message: "Маршрут не найден" }); 
        }
        const oldImg = route.images;
        const result = await prisma.Routes.delete({
            where: { id: Number(id) }   
        })
        await deleteFiles(oldImg);
        res.status(200).json({message: "delete route"})
    } catch (e){
        console.log(e);
        return res.status(500).json({
            message: e.message
        });        
    }
}


export async function getPublicRoutes(req, res){
    try{
        const routes = await getRoutes({
            status:{
                name:"public"
            }
        });

        res.json(routes);
    }catch(e){
        res.status(500).json({message:e.message});
    }  
}
export async function getUserRoutes(req, res){
    try{
        const routes = await getRoutes({
            userId:req.user.userId
        });

        res.json(routes);
    }catch(e){
        res.status(500).json({message:e.message});
    }   
}


//========== current route ==========//
export async function getPublicRouteById(req, res){
    const {id} = req.params
    try{
        const data = await getRoute({
            id:Number(id),
            status:{ name:"public" }
        });
        res.status(200).json(data)
    } catch (e) {
        console.log(e.message)
        res.status(500).json({message: e.message})
    }
}
export async function getUserRouteById(req, res){
    const {id} = req.params
    try{
       const data = await getRoute({
            id:Number(id),
            userId:req.user.userId
        });
        res.status(200).json(data)
    } catch (e) {
        console.log(e.message)
        res.status(500).json({message: e.message})
    }
}




//========== moderation ==========//
export async function MakeRoutePublic(req, res){
    const { id } = req.params;
    try{
        const result = await prisma.Routes.update({
            where: { id: Number(id) },
            data:{ statusId: 3 }   
        })
        res.status(200).json({message: "make route public"})
    } catch (e){
        console.log(e);
        return res.status(500).json({
            message: e.message
        });        
    }
}

export async function getRouteById(req, res){
    const {id} = req.params
    try{
        const data = await getRoute({
            id:Number(id),
        });
        res.status(200).json(data)
    } catch (e) {
        console.log(e.message)
        res.status(500).json({message: e.message})
    }
}
export async function getModerateRoutes(req, res){
    try{
        const routes = await getRoutes({
            status:{
                name:"moderate"
            }
        });

        res.json(routes);
    }catch(e){
        res.status(500).json({message:e.message});
    }    
}