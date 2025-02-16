import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import Delays from "../../components/Delays";
import { getVehicles } from "../../features/vehicleSlice";
import Header from "../../components/Header";
import FindRoute from "../../components/FindRoute";
import MapView from "../../components/MapView";
import RouteResults from "../../components/RouteResult";
import StatsCard from "../../components/StatsCard";
import styles from "./style.module.scss";

const TransportDashboard = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getVehicles());
  }, [dispatch]);

  const { vehicles, loading } = useSelector((state: RootState) => state.vehicles);
  const busCount = vehicles.filter((vehicle) => vehicle.mode === "BUS").length;
  const trainCount = vehicles.filter((vehicle) => vehicle.mode === "RAIL").length;
  const tramCount = vehicles.filter((vehicle) => vehicle.mode === "TRAM").length;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.stats}>
        <StatsCard icon="directions_bus" title="Active Buses" count={loading ? 0 : busCount} color="blue" />
        <StatsCard icon="train" title="Active Trains" count={loading ? 0 : trainCount} color="green" />
        <StatsCard icon="tram" title="Active Trams" count={loading ? 0 : tramCount} color="purple" />
      </div>
      <MapView ref={mapRef} />
      <div className={styles.routes}>
        <FindRoute />
        <Delays />
      </div>
      <RouteResults mapRef={mapRef} />
    </div>
  );
};

export default TransportDashboard;
