'use client';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import L from 'leaflet';

// Correção para o ícone do marcador não sumir no Next.js
const icon = L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png' });

export default function MapaLocalizacao({ aoSelecionar }) {
    const [posicao, setPosicao] = useState([-27.091126815167442, -52.6714010345906]); // Posição inicial (exemplo: Chapecó)

    function CliquesNoMapa() {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosicao([lat, lng]);
                aoSelecionar({ lat, lng });
            },
        });
        return posicao ? <Marker position={posicao} icon={icon} /> : null;
    }

    return (
        <div className="h-64 w-full rounded-xl overflow-hidden border border-gray-200 mt-4">
            <MapContainer center={posicao} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <CliquesNoMapa />
            </MapContainer>
        </div>
    );
}