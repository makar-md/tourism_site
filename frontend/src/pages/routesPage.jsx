import { useEffect, useState } from "react"
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
                const res = await api("/routes/public", {});
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
    console.log(routes)
    return(
        <Body>
            <main className="w-11/12 lg:w-9/12 mx-auto bg-white dark:bg-zinc-900 min-h-screen flex flex-col relative pt-15 items-center">
                <Header linksShow={true } isCheckAuthUser={true}/>
                <div className="border border-red-500 w-full min-h-screen p-10">
                    {   routes?.map((route,index)=>(
                            <RouteCard key={route.id} name={route.name} description={route.description} img={route.image} user={route.email}/>
                        ))
                    }
                </div>  
            </main>
        </Body>
    )
}