import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { getRoutePlan } from "../../features/routeSlice";
import { AppDispatch } from "../../store";
import styles from "./style.module.scss";

const FindRoute = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [from, setFrom] = useState("60.1720, 25.0433");
    const [to, setTo] = useState("60.176109, 24.96105");
    const [loading, setLoading] = useState(false);

    const handleSearch = useCallback(() => {
        if (from && to) {
            setLoading(true);
            dispatch(getRoutePlan({ from, to }))
                .finally(() => setLoading(false));
        }
    }, [dispatch, from, to]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Find Route</h2>
            <div className={styles.inputContainer}>
                <label>From</label>
                <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="Enter starting place (lat, lon)"
                />
            </div>
            <div className={styles.inputContainer}>
                <label>To</label>
                <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="Enter destination (lat, lon)"
                />
            </div>
            <button
                className={styles.button}
                onClick={handleSearch}
                disabled={loading}
            >
                {loading ? "Loading..." : "Find Route"}
            </button>
        </div>
    );
};

export default FindRoute;
