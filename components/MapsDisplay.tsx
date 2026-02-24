'use client';

import { Map, Marker } from '@vis.gl/react-google-maps';
import React from 'react';

interface LatLngLiteral {
    mapsUrl: string;
    zoom?: number;
}
export default function MapsDisplay({ mapsUrl, zoom }: React.PropsWithChildren<LatLngLiteral>) {

    const extractCoordsFromUrl = (mapsUrl: string) => {
        // Regex to find numbers following the '@' symbol
        const match = mapsUrl.match(/@([-0-9.]+),([-0-9.]+)/);
        if (match) {
            return {
                lat: parseFloat(match[1]),
                lng: parseFloat(match[2])
            };
        }
        return null;
    };

    return (
        <>

            <div>{mapsUrl}</div>
            <div style={{ height: '400px', width: '100%' }}>
                <Map
                    defaultCenter={{
                        lat: 0,
                        lng: 0,
                    }}
                    defaultZoom={zoom ?? 10}
                >
                    <Marker position={{
                        lat: 0,
                        lng: 0,
                    }} />
                </Map>
            </div>
        </>
    );
}