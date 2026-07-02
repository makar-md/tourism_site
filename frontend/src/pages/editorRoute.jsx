import { useEffect, useState } from "react";
import Map from "../components/map";
import InputCustom from '../components/inputCustom';
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { validateRouteData } from "../schemas/validate.schema";
import PointCard from "../components/pointCard";
import Body from "../components/body";
import Header from "../components/header";

export default function EditorRoute({mode = "viewing", routeID = ""}){

    const API_KEY = "3ce309bc-953b-4b11-8a7f-5b6660b2aad5"
    const navigate = useNavigate();
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        id: routeID,
        name:"",
        description:"",
        isPublic: false,
        points: [],
        images: []
    })

    async function getAdress(coords){
        const [lon, lat] = coords;
        try{
            const res = await fetch( `https://geocode-maps.yandex.ru/v1/?apikey=${API_KEY}&geocode=${lon},${lat}&format=json`)
            const data = await res.json();
            const address = data.response.GeoObjectCollection.featureMember[0].GeoObject;
            return address
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
            return point
            
        } catch (e){
            alert(e.message)
        }
    }


    async function handleMapClick(coords) {
        const address = await getAdress(coords);
        const point = {
            id: crypto.randomUUID(),
            coords,
            address: `${address.description} ${address.name}`
        };
        setData(prev => ({
            ...prev,
            points: [...prev.points, point]
        }));
    }

   async function handleSearchAddress(query) {
        const coords = await searchAddress(query);
        if (!coords) return;
        const address = await getAdress(coords);
        const point = {
            id: crypto.randomUUID(),
            coords,
            address: `${address.description} ${address.name}`
        };
        setData(prev => ({
            ...prev,
            points: [...prev.points, point]
        }));
    }


    async function createNewRoute(){
        const valid = validateRouteData.safeParse(data);
        if(!valid.success){
            setErrors(valid.error.flatten().fieldErrors);
            return;
        }
        try{
            const formData = new FormData();
            valid.data.images.forEach(file => {
                formData.append("images", file);
            })
            formData.append(
                "data",
                JSON.stringify(valid.data)
            );

            

            const res = await api("/route/create", {
                method: "POST",
                body: formData
            });
            if(!res.ok){
                const messge = await res.json();
                alert(messge.message)
                return;
            }
            navigate(-1) 
        }catch(e){
            alert(e.message)
        }
    }
    async function UpdateRoute(routeID){
        const valid = validateRouteData.safeParse(data);
        if(!valid.success){
            setErrors(valid.error.flatten().fieldErrors);
            return;
        }
        try{
            const res = await api("/route/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(valid.data)
            });
            if(!res.ok){
                const messge = await res.json();
                alert(messge.message)
                return;
            }
            navigate(-1) 
        }catch(e){
            alert(e.message)
        }
    }

    function deletePoint(id) {
        setData(prev => ({
            ...prev,
            points: prev.points.filter(point => point.id !== id)
        }));
    }
    function handleImages(files){
        setData(prev => ({
            ...prev,
            images: [...prev.images, ...Array.from(files)]
        }));
        console.log(data);
    }
    console.log(data.images[0]);
    return (
        <Body>

            <Header linksShow={true} isCheckAuthUser={true} />
            <main className="w-11/12 xl:w-10/12 mx-auto pt-18  bg-white p-4 min-h-screen" >
                <div className="grid grid-cols-1 xl:grid-cols-[6fr_5fr] gap-6">
                    {/* Карта */}
                    <div className="rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-900/5 h-[90vh] p-4">
                    { mode !== "viewing" &&
                            <>
                                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                                    Route settings
                                </h2>

                                <div className="space-y-2">

                                    <InputCustom name="name" label="Name" value={data.name} error={errors.name?.[0]} onChange={(e)=>
                                            setData(prev=>({
                                                ...prev,
                                                name:e.target.value
                                            }))} placeholder="Trip to mountains"/>

                                    <div className="flex flex-col gap-2">

                                        <label className="text-lg font-medium text-zinc-800 dark:text-zinc-100">
                                            Description
                                        </label>

                                        <textarea value={data.description}
                                            onChange={(e)=>
                                                setData(prev=>({
                                                    ...prev,
                                                    description:e.target.value
                                                }))
                                            } 
                                            className="min-h-30 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-4 
                                            outline-none focus:border-teal-500 resize-none text-xl font-semibold text-zinc-900"/>
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <label className="text-lg font-medium text-zinc-800 dark:text-zinc-100">
                                        Search place
                                    </label>
                                    <div className="flex gap-2 mt-2">
                                        <input value={address} onChange={(e)=>setAddress(e.target.value)} 
                                        className="flex-1 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 
                                        outline-none focus:border-teal-500" placeholder="Paris..."/>

                                        <button onClick={()=>handleSearchAddress(address)} 
                                        className="rounded-xl bg-teal-500 hover:bg-teal-600 px-5 text-white font-medium transition">
                                            Find
                                        </button>
                                    </div>
                                </div>
                            </>
                        }
                        <div className="w-full h-[40vh] mt-4 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-900/5">
                            <Map onClick={mode !== "viewing" ? handleMapClick : ()=>{}} points={data.points} />
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white dark:bg-zinc-900 px-6 py-2 h-[90vh] flex flex-col border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-900/5">

                        <div className="flex-1 overflow-y-auto mt-2 pr-1">
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                                Points ({data.points.length})
                            </h3>
                            <div className="space-y-4">
                                {data.points.map((point,index)=>(
                                    <PointCard key={point.id} point={point} index={index} onDelete={deletePoint} mode={mode}/>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="bg-red-300 min-h-20">
                        {mode !== "viewing" &&
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={data.isPublic}
                                onChange={(e) => setData(prev => ({ ...prev, isPublic: e.target.checked })) }/>
                            Сделать маршрут публичным
                        </label>
                        }
                        <input type="file" multiple accept="image/*" onChange={(e) => handleImages(e.target.files)} className="bg-green-300 h-10 w-10"/>

                        {data.images.map(file => (
                            <img
                                key={file.name}
                                src={URL.createObjectURL(file)}
                                className="w-32 h-32 object-cover"
                            />
                        ))}

                        {mode==="create" &&
                            <div className="flex justify-between gap-4">
                                <button onClick={() => {navigate(-1)}}
                                    className="mt-6 rounded-xl border-2 border-teal-500 hover:border-teal-900 py-3 text-lg
                                    font-semibold text-teal-500 hover:text-teal-900 transition w-full">
                                    Cancel
                                </button>
                                <button onClick={createNewRoute}
                                    className="mt-6 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 py-3 text-lg
                                    font-semibold text-white transition w-full">
                                    Create route
                                </button>
                            </div>
                        }

                        {mode==="update" &&
                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <button onClick={()=>UpdateRoute(routeID)}
                                    className="rounded-xl bg-zinc-800 hover:bg-zinc-700 py-3 text-white font-semibold transition">
                                    Save
                                </button>
                                <button className="rounded-xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition">
                                    Delete
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </main>
        </Body>
    );
}