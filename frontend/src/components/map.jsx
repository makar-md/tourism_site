// https://api-maps.yandex.ru/v3/?apikey=ТВОЙ_КЛЮЧ&lang=ru_RU
// c1b475b8-063c-4269-8362-8569cbee864a
// https://api-maps.yandex.ru/v3/?apikey=3ce309bc-953b-4b11-8a7f-5b6660b2aad5&lang=ru_RU

import React, { useCallback, useEffect, useRef, useState } from "react";
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
} from "ymap3-components";

export default function Map(){
    const ymap3Ref = useRef();
    const api = "3ce309bc-953b-4b11-8a7f-5b6660b2aad5"
    
    const location = {
        center: [37.6176, 55.7558],
        zoom: 12
    };
    return (
        <div className="bg-green-300" style={{
            width:"500px",
            height:"500px"
        }}>
            <YMapComponentsProvider apiKey={api} lang="ru_RU">
                <YMap
                    key="map"
                    ref={ymap3Ref}
                    location={location}
                    mode="vector"
                    theme="dark"
                    lang="en_EN"
                    >
                    <YMapDefaultSchemeLayer />
                    <YMapDefaultFeaturesLayer />
                </YMap>
            </YMapComponentsProvider>
        </div>
    );
}