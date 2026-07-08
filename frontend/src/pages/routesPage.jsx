import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import RouteCard from "../components/routeCard";
import Body from "../components/body";
import Header from "../components/header";
import { api } from "../api/api";
import { useAuth } from "../Contexts/AuthContext";

export default function RoutesPage({mode="public"}){
    const {user} = useAuth();
    const navigate = useNavigate()
    const [routes, setRoutes] = useState([{
        id: "",
        name: "",
        description: "",
        email: "",
        image: ""
    }])

    useEffect(()=>{
        async function loadRoutes(){
            try{
                let res;
                if(mode === "public"){
                    res = await api("/routes/public", {});
                } else if(mode === "private") {
                    res = await api("/routes/user", {});
                } else if(mode === "moderate"){
                    if(user.roleId !== 3){
                        navigate(-1) //заменить на стр ошибки
                    }
                    res = await api("/moderate/allRoutes",{})
                }
                if(!res.ok){
                    throw new Error ({message: "не удалось получить данные"})
                    return; 
                }
                const resData = await res.json()
                setRoutes(resData);
            } catch (e){
                alert(e.message)
            }
        }
        loadRoutes()
    }, [])
    return(
        <Body>
            <main className="w-11/12 lg:w-9/12 mx-auto bg-white dark:bg-zinc-900 min-h-screen flex flex-col relative pt-15 items-center">
                <Header linksShow={true } isCheckAuthUser={true}/>
                <div className="w-full py-5 px-10 flex flex-row flex-wrap gap-10 justify-around">
                    {   routes?.map((route,index)=>(
                            <Link to={mode === "public" ? `/routes/${route.id}` : mode === "private" ? `/routes/${route.id}/edit` : `/moderate/route/${route.id}`}>
                                <RouteCard key={route.id} name={route.name} description={route.description} img={route.image} user={route.email}/>
                            </Link>
                        ))
                    }
                </div>  
            </main>
        </Body>
    )
}