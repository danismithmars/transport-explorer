import { useEffect } from "react";

export const useOfflineCache = (key: string, data: any) => {
  useEffect(() => {
    if (data) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }, [key, data]);

  return JSON.parse(localStorage.getItem(key) || "null");
};
