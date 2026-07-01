import { useEffect, useState } from "react";
import Map from "../components/map";

export default function CreateRoute(){
    const [points, setPoints] = useState([]);

    function handleMapClick(coords) {
        console.log(coords);

        setPoints(prev => [...prev, coords]);
    }

    return (
        <div className=" h-screen w-full">
            <div className="h-200 w-200" >
                <Map onClick={handleMapClick}/>
            </div>
        </div>
    );
}