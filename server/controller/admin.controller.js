import prisma from '../prisma/prisma.js'

export async function getAllUsers(req, res){
    const token = req.cookies.refreshToken;
    if(!token){
        return res.status(401).json({message: "no token"})
    } 
    try{
        const data = await prisma.User.findMany({
            select: {
                id: true,
                email:true,
                firstName: true,
                surName:true,
                lastName:true,
                roleId:true,
            }
        })
        res.status(200).json(data);
    }catch (e){
        console.log(e)
        res.status(500).json({message: e.message})
    } 
}

export async function getAllRoles(req, res){
    const token = req.cookies.refreshToken;
    if(!token){
        return res.status(401).json({message: "no token"})
    } 
    try{
        const data = await prisma.Role.findMany({
            select: {
                id: true,
                name:true,
            }
        })
        res.status(200).json(data);
    }catch (e){
        console.log(e)
        res.status(500).json({message: e.message})
    } 
}
export async function changeRole(req, res){
    const {id, roleId} = req.params;

    const currentUser = await prisma.User.findUnique({
        where: { id: req.user.userId },
        select : {
            roleId:true
        }
    });

    if (currentUser.roleId !== 1) {
        return res.status(403).json({
            message: "Нет доступа"
        });
    }
    try{
        const result = await prisma.User.update({
            where: { id: id },
            data:{
                roleId: Number(roleId)
            }   
        })
        res.status(200).json({message: "change role"})
    } catch (e){
        console.log(e)
        res.status(500).json({message: e.message})
    }
}