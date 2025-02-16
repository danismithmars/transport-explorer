import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, CircleMarker } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import { forwardRef, useEffect, useState } from "react";
import { RootState, AppDispatch } from "../../store";
import { setMapCenter } from "../../features/mapSlice";
import styles from "./style.module.scss";
import "leaflet/dist/leaflet.css";
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';

const routeColors = ["blue", "green", "purple", "orange", "brown", "pink"];

const MapView = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const dispatch = useDispatch<AppDispatch>();
  const mapCenter = useSelector((state: RootState) => state.map.center);
  const { stops } = useSelector((state: RootState) => state.stops);
  const { itineraries } = useSelector((state: RootState) => state.routes);


  const markerIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][][]>([]);
  const [stopCoordinates, setStopCoordinates] = useState<[number, number][]>([]);

  useEffect(() => {
    if (itineraries.length > 0) {
      const extractedRoutes: [number, number][][] = itineraries.map((itinerary) =>
        itinerary.legs.flatMap((leg) => [
          [leg.from.lat, leg.from.lon] as [number, number],
          [leg.to.lat, leg.to.lon] as [number, number],
        ])
      );

      setRouteCoordinates(extractedRoutes);
      setStopCoordinates([...new Set(extractedRoutes.flat())]);

      if (extractedRoutes.length > 0) {
        dispatch(setMapCenter(extractedRoutes[0][0]));
      }
    }
  }, [itineraries, dispatch]);

  return (
    <div ref={ref} className={styles.container}>
      <h2 className={styles.title}>Map View</h2>
      <MapContainer center={mapCenter} zoom={13} className={styles.map} key={stops.length}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <AutoMoveMap center={mapCenter} />

        <CircleMarker center={mapCenter} radius={8} color="red" fillColor="red" fillOpacity={0.8}>
          <Popup>Current Center</Popup>
        </CircleMarker>

        {stops.map((stop, index) => (
          <Marker key={index} position={[stop.lat, stop.lon]} icon={markerIcon}>
            <Popup>{stop.name}</Popup>
          </Marker>
        ))}

        {stopCoordinates.map((stop, index) => (
          <Marker key={`stop-${index}`} position={stop} icon={markerIcon}>
            <Popup>Stop {index + 1}</Popup>
          </Marker>
        ))}

        {routeCoordinates.map((route, index) => (
          <Polyline
            key={`route-${index}`}
            positions={route}
            color={routeColors[index % routeColors.length]}
            weight={5}
          />
        ))}
      </MapContainer>
    </div>
  );
});

const AutoMoveMap = ({ center }: { center: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);

  return null;
};

export default MapView;
