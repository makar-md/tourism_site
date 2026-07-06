import { useEffect, useState } from "react";
import Map from "../components/map";
import InputCustom from '../components/inputCustom';
import { api } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { validateRouteData } from "../schemas/validate.schema";
import PointCard from "../components/pointCard";
import Body from "../components/body";
import Header from "../components/header";
import RouteImg from "../components/routeImg";

export default function EditorRoute({mode = "viewing"}){
    const {id} = useParams();
    const API_KEY = "3ce309bc-953b-4b11-8a7f-5b6660b2aad5"
    const navigate = useNavigate();
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState({});
    const [dragActive, setDragActive] = useState(false);
    const [data, setData] = useState({
        id: id,
        name:"",
        description:"",
        isPublic: false,
        points: [],
        images: []
    })
    
    useEffect(() => {
        async function loadRoute(id){
            try{
                let res
                if(mode === "viewing"){
                    res = await api(`/routes/public/${id}`,{});
                } else {
                    res = await api(`/routes/user/${id}`)
                }
                if (!res.ok){
                    throw new Error('Ошибка загрузки');
                } 
                
                const resData = await res.json();
                setData({
                    ...resData,
                    points: resData.points.map(point => ({
                        id: point.id,
                        coords: [point.lng, point.lat],
                        address: point.address ?? ""
                    }))
                });
            } catch (e){
                alert(e.message)
            }
        }
        if (mode !== "create") {
            loadRoute(id);
        }
    }, []);

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

    async function UpdateRoute(Rid){
        try{
            console.log(data)
            const formData = new FormData();
            data.images.forEach(file => {
                formData.append("images", file);
            })
            formData.append(
                "data",
                JSON.stringify(data)
            );
            const res = await api(`/route/update/${Rid}`, {
                method: "PATCH",
                body: formData
            });
            if(!res.ok){
                const messge = await res.json();
                console.log("res " + messge.message)
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
    }
    function handleDeleteImage(index) {
        setData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    }
    function handleDrop(e) {
        e.preventDefault();
        setDragActive(false);

        if (e.dataTransfer.files?.length) {
            handleImages(e.dataTransfer.files);
        }
    }

    function handleDrag(e) {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        }

        if (e.type === "dragleave") {
            setDragActive(false);
        }
    }
    return (
        <Body>

            <Header linksShow={true} isCheckAuthUser={true} />
            <main className="w-11/12 xl:w-10/12 mx-auto py-18  bg-white p-4 min-h-screen  dark:bg-zinc-900" >
                <div className="grid grid-cols-1 xl:grid-cols-[6fr_5fr] gap-6">
                    
                    <div className="rounded-3xl overflow-hidden border border-zinc-200 dark:border-none shadow-xl shadow-zinc-900/5 h-[90vh] p-4">
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
                                            className="min-h-30 rounded-xl bg-white dark:bg-zinc-700/15 border border-zinc-200 dark:border-zinc-700 p-4 
                                            outline-none focus:border-teal-500 resize-none text-xl font-semibold text-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500"
                                            placeholder="some word about route"/>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label className="text-lg font-medium text-zinc-800 dark:text-zinc-100">
                                        Search place
                                    </label>
                                    <div className="flex gap-2 mt-2">
                                        <input value={address} onChange={(e)=>setAddress(e.target.value)} 
                                        className="flex-1 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-700/15 px-4 py-3 
                                        outline-none focus:border-teal-500 dark:placeholder:text-zinc-500 dark:text-zinc-50" placeholder="Paris..."/>

                                        <button onClick={()=>handleSearchAddress(address)} 
                                        className="rounded-xl bg-teal-500 hover:bg-teal-600 px-5 text-white font-medium transition">
                                            Find
                                        </button>
                                    </div>
                                </div>
                            </>
                        }
                        {mode === "viewing" &&
                            <>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">{data.name}</h1>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            <span className="rounded-full bg-teal-500/10 text-teal-500 px-4 py-1 text-sm font-semibold">
                                                {data.isPublic ? "Public route" : "Private route"}
                                            </span>
                                            <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-4 py-1 text-sm font-medium">
                                                {data.points.length} points
                                            </span>
                                            <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-4 py-1 text-sm font-medium">
                                                {data.images.length} photos
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/40 p-6">
                                    <p className="uppercase tracking-wider text-sm font-semibold text-zinc-500 mb-4">
                                        Description
                                    </p>

                                    <p className="leading-8 text-lg text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                                        {data.description || "No description"}
                                    </p>
                                </div>
                            </>
                        }
                        <div className="mt-6">
                            <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-lg shadow-zinc-900/5 h-[42vh]">
                                <Map onClick={mode !== "viewing" ? handleMapClick : ()=>{}} points={data.points}/>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white dark:bg-zinc-900 px-6 py-2 h-[90vh] flex flex-col border border-zinc-200
                     dark:border-none shadow-xl shadow-zinc-900/5">

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
                </div>
                <div className="mt-8 border-t border-zinc-200 dark:border-zinc-700 pt-6">
                        {mode !== "viewing" && <p className="mb-5 text-sm uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400">Route settings</p>}

                        {mode !== "viewing" &&
                            <div className="flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/4
                            0 px-4 py-3 cursor-pointer transition hover:border-teal-500">
                                <input type="checkbox" checked={data.isPublic} onChange={(e) => setData(prev => ({ ...prev, isPublic: e.target.checked }))} className="h-5 w-5 accent-teal-500 rounded-xl" />
                                <div>
                                    <p className="font-medium text-zinc-900 dark:text-zinc-100">Public route</p>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">The route will be visible to other users after moderation.</p>
                                </div>
                            </div>
                        }

                         {mode !== "viewing" &&
                            <div className="mt-8">
                                <label htmlFor="images" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                                    className={`relative flex flex-col items-center justify-center gap-3 h-44 rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
                                        dragActive
                                            ? "border-teal-500 bg-teal-500/10"
                                            : "border-zinc-300 dark:border-zinc-700 hover:border-teal-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                                    }`}>

                                    <svg className="w-12 h-12 text-zinc-500 dark:text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0l-4 4m4-4l4 4M4 17v1a2 2 0 002 2h12a2 2 0 002-2v-1"/>
                                    </svg>

                                    <div className="text-center">
                                        <p className="font-semibold text-zinc-800 dark:text-zinc-100">
                                            Drag and drop the images here
                                        </p>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                            or click to select files
                                        </p>
                                    </div>

                                    <input id="images" type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleImages(e.target.files)} />
                                </label>
                            </div>
                        }

                        {data.images.length > 0 &&
                            <div className="mt-5 p-5">
                                <p className="mb-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">Images ({data.images.length})</p>

                                <div className="flex gap-4 overflow-x-auto py-8 px-4">

                                    {data.images.map((file, index) => (
                                        <RouteImg key={index} index={index} file={file} mode={mode} onDelete={mode !=="viewing" ? handleDeleteImage: () =>{}}/>
                                    ))}

                                </div>
                            </div>
                        }

                        {mode === "create" &&
                            <div className="mt-8 flex justify-center">
                                <div className="flex flex-row w-1/2 gap-8">
                                    <button onClick={() => navigate(-1)} className="flex-1 rounded-xl border border-zinc-300 dark:border-zinc-800
                                     bg-white dark:bg-zinc-900 py-3 text-lg font-semibold text-zinc-700 dark:text-zinc-300 transition
                                      hover:border-teal-500 hover:text-teal-500">
                                        Cancel
                                    </button>
                                    <button onClick={createNewRoute} className="flex-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-800
                                     dark:hover:bg-teal-600 py-3 text-lg font-semibold text-white transition">
                                        Create route
                                    </button>
                                </div>
                            </div>
                        }

                        {mode === "edit" &&
                            <div className="mt-8 flex gap-4 justify-center">
                                <div className="w-full md:w-1/2 flex flex-col md:flex-row justify-between gap-10">
                                    <button onClick={() => UpdateRoute(id)} className="px-6 rounded-xl bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-800
                                     dark:hover:bg-zinc-700 py-2 md:py-3 text-lg font-semibold text-white transition w-full">
                                        Save changes
                                    </button>

                                    <button className="py-2 md:py-3 w-full rounded-xl border border-red-400 px-6 text-red-500 font-semibold transition hover:bg-red-500 hover:text-white">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
            </main>
        </Body>
    );
}