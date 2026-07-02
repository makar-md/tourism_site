// https://api-maps.yandex.ru/v3/?apikey=ТВОЙ_КЛЮЧ&lang=ru_RU
// c1b475b8-063c-4269-8362-8569cbee864a
// https://api-maps.yandex.ru/v3/?apikey=3ce309bc-953b-4b11-8a7f-5b6660b2aad5&lang=ru_RU

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from '../ThemContext';
import Pointer from './pointer';
import {
    YMap,
    YMapComponentsProvider,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapListener,
    YMapControls,
    YMapGeolocationControl,
    YMapZoomControl,
    YMapMarker,
} from "ymap3-components";

export default function Map({onClick, points}){
    const [center, setCenter] = useState([43.936403, 56.334218])
    const {theme, toggleTheme} = useTheme();
    const API_KEY = "3ce309bc-953b-4b11-8a7f-5b6660b2aad5"
    
    const location = {
        center: center,
        zoom: 10
    };

    
    
    return (
        <div className="w-full h-full">
            <YMapComponentsProvider apiKey={API_KEY} lang="ru_RU">
                <YMap
                    key="map"
                    location={location}
                    mode="vector"
                    theme={theme === "dark" ? "dark" : "light"}
                    lang="en_EN">
                    <YMapGeolocationControl position="top center"/>
                    <YMapDefaultSchemeLayer />
                    <YMapDefaultFeaturesLayer />
                    <YMapControls position="left">
                        <YMapZoomControl />
                    </YMapControls>
                    <YMapControls position="top left">
                        <YMapGeolocationControl />
                    </YMapControls>
                    {points.map((point, i) => (
                        <YMapMarker key={i} coordinates={point.coords}>
                            <Pointer number={i + 1}/>
                        </YMapMarker>
                    ))}
                    <YMapListener
                        onClick={(object, event) => {
                            setCenter(event.coordinates)
                            onClick(event.coordinates);
                        }}>
                    </YMapListener> 
                </YMap>
            </YMapComponentsProvider>
        </div>
    );
}