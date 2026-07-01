import { useEffect, useState } from "react";
import Map from "../components/map";

export default function CreateRoute(){
    const [address, setAddress] = useState("");
    const API_KEY = "3ce309bc-953b-4b11-8a7f-5b6660b2aad5"
    const [points, setPoints] = useState([]);

    function handleMapClick(coords) {
        setPoints(prev => [...prev, coords]);
        console.log(points);
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
            const t = query.replace(/ /g, "+")
            const res = await fetch(
                `https://geocode-maps.yandex.ru/v1/?apikey=${API_KEY}&geocode=${encodeURIComponent(query)}&format=json`
            );

            const data = await res.json();

            const pos = data.response.GeoObjectCollection.featureMember[0]
                .GeoObject.Point.pos.split(" ")
                .map(Number);
            console.log([pos[0], pos[1]])
            return [pos[0], pos[1]];
        } catch (e){
            alert(e.message)
        }
    }

    return (
        <div className=" h-screen w-full">
            <div onClick={(e) => e.stopPropagation()}>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Введите адрес"
                className="border border-zinc-400 focus:border-teal-500 bg-white dark:bg-zinc-600 rounded-lg px-2 py-1"/>
                <button onClick={(e) => searchAddress(address)}>найти</button>
            </div>
            <div className="h-200 w-200" >
                <Map onClick={handleMapClick}/>
            </div>
            <button onClick={e => getAdress(points[points.length-1])}
                className="bg-zinc-400 p-2 ">Address</button>
        </div>
    );
}