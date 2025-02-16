import { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStops } from "../../features/stopSlice";
import { setMapCenter } from "../../features/mapSlice";
import { useDebounce } from "../../hooks/useDebounce";
import { AppDispatch, RootState } from "../../store";
import styles from "./style.module.scss";

const getTransportIcon = (mode: string) => {
  let icon = "directions_bus";
  let colorClass = styles.bus;

  switch (mode) {
    case "TRAM":
      icon = "tram";
      colorClass = styles.tram;
      break;
    case "SUBWAY":
      icon = "subway";
      colorClass = styles.subway;
      break;
    case "RAIL":
      icon = "train";
      colorClass = styles.rail;
      break;
    case "FERRY":
      icon = "directions_ferry";
      colorClass = styles.ferry;
      break;
    default:
      icon = "directions_bus";
      colorClass = styles.bus;
  }

  return <span className={`material-symbols-outlined ${colorClass}`}>{icon}</span>;
};

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const debouncedQuery = useDebounce(query, 500);
  const dispatch = useDispatch<AppDispatch>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const stops = useSelector((state: RootState) => state.stops.stops);

  const handleSearch = useCallback(() => {
    if (debouncedQuery.trim()) {
      dispatch(getStops(debouncedQuery));
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }
  }, [debouncedQuery, dispatch]);

  useEffect(() => {
    if (debouncedQuery) {
      handleSearch();
    }
  }, [debouncedQuery, handleSearch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    }

    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  const handleStopClick = (stop: any) => {
    setQuery(stop.name);
    dispatch(setMapCenter([stop.lat, stop.lon]));
    setIsDropdownVisible(false);
  };

  return (
    <div className={styles.searchBar} ref={dropdownRef}>
      <div className={styles.inputWrapper}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsDropdownVisible(true)}
          placeholder="Search stops or routes..."
          className={styles.input}
        />
        <span className="material-symbols-outlined">search</span>
      </div>

      {isDropdownVisible && (
        <div className={styles.dropdown}>
          {stops.length > 0 ? stops.map((stop, index) => (
            <div
              key={`stops-${index}`}
              className={styles.item}
              onClick={() => handleStopClick(stop)} // 
            >
              {getTransportIcon(stop.patterns[0].route.mode)}
              <div className={styles.details}>
                <p className={styles.stopName}>{stop.name}</p>
                <p className={styles.stopLocation}>{stop.patterns[0].route.longName}, {stop.zoneId}</p>
              </div>
              <span className={styles.stopCode}>{stop.code}</span>
            </div>
          )) : <div className={styles.item}><p>Searching...</p></div>}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
