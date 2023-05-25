'use client';

import { TravelLogWithId } from '@/models/TravelLog/TravelLogs';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const createIcon = (fill = '#56BC58', iconSize = 32) => {
    return L.divIcon({
        className: 'bg-transparent',
        html: `
      <svg viewBox="0 0 24 24" width="${iconSize}" stroke='black' stroke-width="2" height="${iconSize}" fill="${fill}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle stroke='black' stroke-width="2" cx="12" cy="10" r="3"></circle>
      </svg>
    `,
        iconSize: [iconSize, iconSize],
        iconAnchor: [12, 24],
    });
};

L.Marker.prototype.options.icon = createIcon();

const currentMarkerIcon = createIcon('#F2BB05');

type TravelLOgMapProps = {
    logs: TravelLogWithId[];
};

type InitMapProps = {
    logs: TravelLogWithId[];
    onMapClick: (event: L.LeafletMouseEvent) => void;
};

const InitMap = ({ logs, onMapClick }: InitMapProps) => {
    const map = useMap();

    const initMap = () => {
        if (logs.length) {
            map.invalidateSize();
            // Center map in the middle of all log points
            const bounds = new L.LatLngBounds(
                logs.map((log) => [log.latitude, log.longitude])
            );
            map.fitBounds(bounds);
        } else {
            // If no logs, map is centered in the middle of map
            map.setZoom(3);
            map.setView([34.854, -41.898]);
        }
        map.on('click', onMapClick);
    };

    useEffect(() => {
        setTimeout(initMap, 200);
    }, [map, logs]);

    return null;
};

import { useLocationStore, useSidebarStateStore } from '@/store/store';

const Map = ({ logs }: TravelLOgMapProps) => {
    const router = useRouter();

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch('/api/logs', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(id),
            });
            const deleted = await response.json();
            console.log(deleted);
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const isOpened = useSidebarStateStore((state) => state.isOpened);
    const setIsOpened = useSidebarStateStore((state) => state.setIsOpened);
    const location = useLocationStore((state: any) => state.location);
    const setLocation = useLocationStore((state: any) => state.setLocation);

    return (
        <MapContainer className='w-full h-full'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <InitMap
                logs={logs}
                onMapClick={(e) => {
                    setLocation(e.latlng);
                    if (!isOpened) {
                        setIsOpened(true);
                    }
                }}
            />
            {location && (
                <Marker
                    icon={currentMarkerIcon}
                    eventHandlers={{
                        dragend(e) {
                            setLocation(e.target.getLatLng());
                        },
                    }}
                    draggable={true}
                    position={location}
                />
            )}
            {logs.map((log) => (
                <Marker
                    key={log._id.toString()}
                    position={[log.latitude, log.longitude]}
                >
                    <Popup offset={[0, -25]}>
                        <p className='text-lg font-bold'>{log.title}</p>
                        <div className='flex justify-center items-center'>
                            <img
                                alt={log.title}
                                src={log.image}
                                className='w-100'
                            />
                        </div>
                        <p>{log.description}</p>
                        <p>Rating: {log.rating} out of 10</p>
                        <button
                            className='btn btn-error'
                            onClick={() => handleDelete(log._id.toString())}
                        >
                            Delete Experience
                        </button>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
