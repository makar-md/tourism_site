import { useEffect, useState } from "react";
import Map from "../components/map";
import InputCustom from './../components/inputCustom';
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { validateRouteData } from "../schemas/validate.schema";

export default function CreateRoute(){
    const API_KEY = "3ce309bc-953b-4b11-8a7f-5b6660b2aad5"
    const navigate = useNavigate();
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState({});
    const [points, setPoints] = useState([]);
    const [data, setData] = useState({
        name:"",
        description:"",
        points: []
    })

    function handleMapClick(coords) {
        setPoints(prev => [...prev, coords]);
         setData(prev => ({
            ...prev,
            points: [...prev.points, coords]
        }));
    }

    async function getAdress(coords){
        const [lon, lat] = coords;
        try{
            const res = await fetch( `https://geocode-maps.yandex.ru/v1/?apikey=${API_KEY}&geocode=${lon},${lat}&format=json`)
            const data = await res.json();
            const address = data.response.GeoObjectCollection.featureMember[0].GeoObject;
            console.log(address.description + " " + address.name )
            return address;
        } catch(e){
            alert(e.message);
        }
    }

    async function searchAddress(query) {
        try{
            const res = await fetch(
                `https://geocode-maps.yandex.ru/v1/?apikey=${API_KEY}&geocode=${encodeURIComponent(query)}&format=json`
            );
            const data = await res.json();
            const pos = data.response.GeoObjectCollection.featureMember[0]
                .GeoObject.Point.pos.split(" ")
                .map(Number);
            const point = [pos[0], pos[1]]
            setPoints( prev => [...prev, point])
            setData(prev => ({
                ...prev,
                points: [...prev.points, point]
            }));
        } catch (e){
            alert(e.message)
        }
    }
    async function createNewRoute(){
        const valid = validateRouteData.safeParse(data);
        if(!valid.success){
            setErrors(valid.error.flatten().fieldErrors);
            return;
        }
        try{
            const res = await api("/route/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            // заменить на все маршруты
            if(!res.ok){
                const messge = await res.json();
                alert(messge.message)
                return;
            }
            navigate("/profile") 
        }catch(e){
            alert(e.message)
        }
    }

    return (
        <div className=" h-screen w-full">
            <div>
                <InputCustom name="name" label="Name" type="text" value={data.name} error={errors.name?.[0]}
                 onChange={(e) => setData(prev => ({ ...prev, name: e.target.value })) } placeholder="route to mars"/>
                <textarea placeholder="description" name="description" value={data.description}
                 onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}/>

            </div>

            <div onClick={(e) => e.stopPropagation()}>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Введите адрес"
                className="border border-zinc-400 focus:border-teal-500 bg-white dark:bg-zinc-600 rounded-lg px-2 py-1"/>
                <button onClick={(e) => searchAddress(address)}>найти</button>
            </div>
            <div className="h-200 w-200" >
                <Map onClick={handleMapClick}  points={points}/>
            </div>
            <button onClick={e => getAdress(points[points.length-1])}
                className="bg-zinc-400 p-2 ">Address</button>
            <button onClick={(e) => createNewRoute()} className="bg-zinc-400 p-2 ">Create Route</button>
        </div>
    );
}