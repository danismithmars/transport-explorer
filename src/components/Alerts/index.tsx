import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getAlerts } from "../../features/alertsSlice";
import styles from "./style.module.scss";

const Notification = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { alerts, loading, error } = useSelector((state: RootState) => state.alerts);
  const [isShow, setIsShow] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getAlerts());
  }, [dispatch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsShow(false);
      }
    }

    if (isShow) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShow]);

  return (
    <div className={styles.notification} ref={dropdownRef}>
      <div className={styles.summary} onClick={(e) => {
        e.stopPropagation();
        setIsShow(!isShow);
      }}>
        <div className={styles.iconWrapper}>
          <span className="material-symbols-outlined">notifications</span>
          {alerts.length ? <span className={styles.badge}>{alerts.length}</span> : null}
        </div>
      </div>

      <div className={`${styles.dropdown} ${isShow ? styles.show : ''}`}>
        <h3 className={styles.title}>Service Alerts</h3>
        {loading && <p>Loading alerts...</p>}
        {error && <p>{error}</p>}
        <div className={styles.alerts}>
          {alerts.map((alert) => (
            <div className={styles.alert} key={alert.id}>
              <span className="material-symbols-outlined">info</span>
              <div>
                <p><strong>{alert.alertHeaderText}</strong></p>
                <p>{alert.alertDescriptionText}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
