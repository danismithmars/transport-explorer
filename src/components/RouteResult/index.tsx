import { RefObject } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { setMapCenter } from "../../features/mapSlice";
import styles from "./style.module.scss";

const RouteResults = ({ mapRef }: { mapRef: RefObject<HTMLDivElement | null> }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { itineraries } = useSelector((state: RootState) => state.routes);
  const handleScrollToMap = () => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLegClick = (from: { lat: number; lon: number }) => {
    dispatch(setMapCenter([from.lat, from.lon]));
    handleScrollToMap();
  };


  return (
    <div className={styles.routeResults}>
      <summary className={styles.summary}>
        <div className={styles.title}>
          <span className="material-symbols-outlined">route</span>
          <span>Route Results</span>
        </div>
        <span className="material-symbols-outlined">expand_more</span>
      </summary>

      <div className={styles.results}>
        {itineraries.length > 0 ? itineraries.map((itinerary, index) => (
          <div key={index} className={styles.routeCard}>
            <h3 className={styles.routeTitle}>Route {index + 1}</h3>
            <div className={styles.routeDetails}>
              {itinerary.legs.map((leg, idx) => (
                <div
                  key={idx}
                  className={styles.mode}
                  onClick={() => handleLegClick(leg.from)}
                  style={{ cursor: "pointer" }}
                >
                  <div className={styles.symbol}>
                    <span className="material-symbols-outlined">
                      {leg.mode === "WALK" ? "directions_walk" : leg.mode === "BUS" ? "directions_bus" : "subway"}
                    </span>
                    <div className={styles.modeInfo}>
                      <p className={styles.modeType}>{leg.mode}</p>
                      <p className={styles.modeDuration}>
                        <span>Duration: </span>{Math.round(leg.duration / 60)} min
                      </p>
                    </div>
                  </div>
                  <div>
                    From <strong>{leg.from.name}</strong> to <strong>{leg.to.name}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )) :
          <div className={styles.routeCard}>
            <h3 className={styles.routeTitle}>No Result</h3>
          </div>
        }
      </div>
    </div>
  );
};

export default RouteResults;
