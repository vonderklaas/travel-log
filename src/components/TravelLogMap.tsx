'use client';

import { TravelLogWithId } from '@/models/TravelLog/TravelLogs';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useEffect } from 'react';

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

  useEffect(() => {
    map.invalidateSize();
    const bounds = new L.LatLngBounds(
      logs.map((log) => [log.latitude, log.longitude])
    );
    map.fitBounds(bounds);
  }, [map, logs]);

  return null;
};

export const TravelLogMap = ({ logs }: TravelLOgMapProps) => {
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
              <img alt={log.title} src={log.image} className='w-96' />
            </div>
            <p>{log.description}</p>
            <p className='text-sm'>
              Visited at{' '}
              {new Date(log.visitDate.toString()).toLocaleDateString()}
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
