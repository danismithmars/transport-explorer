import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getAlerts } from "../../features/alertsSlice";
import styles from "./style.module.scss";

const Delays = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { delays, loading, error } = useSelector((state: RootState) => state.alerts);

  useEffect(() => {
    dispatch(getAlerts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Route Delays</h3>

      {loading && <p>Loading delays...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.delays}>
        {delays.length > 0 ? (
          delays.map((delay, index) => (
            <div key={index} className={styles.delayItem}>
              <span>{delay.route}</span>
              <span className={styles.delayTime}>+{delay.delayMinutes} min</span>
            </div>
          ))
        ) : (
          !loading && <>
            <p>No current delays.</p>
            <div className={styles.delayItem}>
              <span>Sample Delay Description</span>
              <span className={styles.delayTime}>+20 min</span>
            </div>
            <div className={styles.delayItem}>
              <span>Karrintie Delays due to flux</span>
              <span className={styles.delayTime}>+20 min</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Delays;
