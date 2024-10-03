import React, { useState, useEffect } from "react";
import {
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
    useMap
} from "@vis.gl/react-google-maps";

/**
 * Code reference: https://github.com/visgl/react-google-maps/discussions/93
 */

function GoogleMap ({itinerary}) {
    // reference to map 
    const mapRef = useMap();

    // state for controlling which marker's InfoWindow is open
    const [selectedPlace, setSelectedPlace] = useState(null);
    
    // Function to calculate bounds for all markers
    function calculateBounds () {
        const bounds = new google.maps.LatLngBounds();
        itinerary.places.forEach((place) => {
            bounds.extend(new google.maps.LatLng({lat: +place.lat, lng: +place.lng}));
        });
        return bounds;
    };

     // Gets map bounds for all markers (auto zoom)
    useEffect(() => {
        if(mapRef && itinerary && itinerary.places.length > 0){
            const bounds = calculateBounds();
            mapRef.fitBounds(bounds);
        }

    }, [mapRef, itinerary])

    // function to handle marker click
    function handleMarkerClick(place){
        setSelectedPlace(place);
     }

    return(
        <Map 
            mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
            defaultZoom = {5}
            defaultCenter = {{lat: +itinerary.lat, lng: +itinerary.lng}}
            controls = {{zoomControl: true}}
        >
    {itinerary.places.map(p => (
        <AdvancedMarker 
            key = {p.seq}
            position={{lat: +p.lat, lng: +p.lng}}
            onClick={() => handleMarkerClick(p)}>
            <Pin 
                scale= {1.5}
                background={"#66d195"}
                borderColor={"#499672"}
                glyph={p.seq.toString()}
                glyphColor="white"
            />
            {selectedPlace && selectedPlace.seq === p.seq && (
                <InfoWindow 
                    className = "m-0"
                    position={{lat: +p.lat, lng: +p.lng}}
                    onCloseClick = {() => setSelectedPlace(null)}>
                    <div>
                        <h6 className = "m-0">{p.name}</h6>
                        <p>{p.address}</p>
                    </div>
                </InfoWindow>
            )}
        </AdvancedMarker>
    ))}
    </Map>
    )
}

export default GoogleMap;