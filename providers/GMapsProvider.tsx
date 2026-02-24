'use client';

import React from 'react'
import '../styles/globals.css'
import { APIProvider } from '@vis.gl/react-google-maps';

const API_KEY = process.env.NEXT_PUBLIC_GMAPS_API ?? '';

function GmapsApiProvider({ children }: { children: React.ReactNode }) {
    return (
        <APIProvider apiKey={API_KEY}>
            {children}
        </APIProvider>
    )
}

export default GmapsApiProvider
