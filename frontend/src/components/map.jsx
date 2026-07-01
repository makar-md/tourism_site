// https://api-maps.yandex.ru/v3/?apikey=ТВОЙ_КЛЮЧ&lang=ru_RU
// c1b475b8-063c-4269-8362-8569cbee864a
// https://api-maps.yandex.ru/v3/?apikey=3ce309bc-953b-4b11-8a7f-5b6660b2aad5&lang=ru_RU

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from '../ThemContext';
import {
    YMap,
    YMapComponentsProvider,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapListener,
    YMapFeature,
    YMapCollection,
    YMapControls,
    YMapGeolocationControl,
    YMapZoomControl,
    YMapHint,
    YMapDefaultMarker,
    YMapContainer,
    YMapControlButton,
    YMapCustomClusterer,
    YMapMarker,
    getYmaps3ReadyObject,
} from "ymap3-components";

export default function Map({onClick}){
    const [center, setCenter] = useState([43.936403, 56.334218])
    const {theme, toggleTheme} = useTheme();
    const API_KEY = "3ce309bc-953b-4b11-8a7f-5b6660b2aad5"
    
    const location = {
        center: center,
        zoom: 10
    };
    const [markers, setMarkers] = useState([]);

    function handleMapClick(coords) {
        setMarkers(prev => [...prev, coords]);
    }

    
    
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
                    {markers.map((coords, i) => (
                        <YMapDefaultMarker key={i} coordinates={coords}/>
                        // </YMapMarker>
                    ))}
                    <YMapListener
                        onClick={(object, event) => {
                            handleMapClick(event.coordinates)
                            setCenter(event.coordinates)
                            onClick(event.coordinates);
                        }}>
                    </YMapListener> 
                </YMap>
            </YMapComponentsProvider>
        </div>
    );
}