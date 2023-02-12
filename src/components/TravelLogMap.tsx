'use client';

import { TravelLogWithId } from '@/models/TravelLog/TravelLogs';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
const DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [25 / 2, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface TravelLOgMapProps {
  logs: TravelLogWithId[];
}

const InitMap = ({ logs }: TravelLOgMapProps) => {
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
  };

  useEffect(() => {
    setTimeout(initMap, 200);
  }, [map, logs]);

  return null;
};

export const TravelLogMap = ({ logs }: TravelLOgMapProps) => {
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

  return (
    <MapContainer className='w-full h-full'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {<InitMap logs={logs} />}
      {logs.map((log) => (
        <Marker
          key={log._id.toString()}
          position={[log.latitude, log.longitude]}
        >
          <Popup offset={[0, -40]}>
            <p className='text-lg font-bold'>{log.title}</p>
            <div className='flex justify-center items-center'>
              <img alt={log.title} src={log.image} className='w-100' />
            </div>
            <p>{log.description}</p>
            <button
              className='btn btn-warning'
              onClick={() => handleDelete(log._id.toString())}
            >
              Remove Log
            </button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
