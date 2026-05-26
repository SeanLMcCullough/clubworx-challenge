import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import type { Gym } from 'shared'

import L from 'leaflet'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

const brisbaneCenter: [number, number] = [-27.47, 153.02]

const defaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

interface GymMapProps {
  gyms: Gym[]
}

export default function GymMap({ gyms }: GymMapProps) {
  return (
    <MapContainer
      center={brisbaneCenter}
      zoom={11}
      className="h-full w-full z-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {gyms.map((gym) => (
        <Marker key={gym.id} position={gym.location} icon={defaultIcon}>
          <Popup>
            <div className="font-sans">
              <h3 className="font-bold text-lg mb-1">{gym.businessName}</h3>
              <p className="text-sm text-gray-600 mb-2">{gym.address}</p>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                <span className="font-semibold text-blue-600">
                  ${gym.membershipPrice}/wk
                </span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {gym.gymType}
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
