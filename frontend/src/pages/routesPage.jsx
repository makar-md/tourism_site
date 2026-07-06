import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import RouteCard from "../components/routeCard";
import Body from "../components/body";
import Header from "../components/header";
import { api } from "../api/api";

export default function RoutesPage({isPublic=true}){
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
                if(isPublic){
                    res = await api("/routes/public", {});
                } else{
                    res = await api("/routes/user", {});
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
                <div className="w-full min-h-screen py-5 px-10 flex flex-row flex-wrap gap-10 justify-around">
                    {   routes?.map((route,index)=>(
                            <Link to={isPublic ? `/routes/${route.id}` : `/routes/${route.id}/edit`}>
                                <RouteCard key={route.id} name={route.name} description={route.description} img={route.image} user={route.email}/>
                            </Link>
                        ))
                    }
                </div>  
            </main>
        </Body>
    )
}