import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

interface StatsCardProps {
  icon: string;
  title: string;
  count: number;
  color: "blue" | "green" | "purple";
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, count, color }) => {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    const baseDuration = 600; 
    const duration = Math.min(baseDuration + count * 2, 10000); // Scale time, max 2s
    const startTime = performance.now();

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const animatedValue = Math.floor(progress * count);

      setDisplayCount(animatedValue);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [count]);

  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <span className="material-symbols-outlined">{icon}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.count}>{displayCount}</p>
    </div>
  );
};

export default StatsCard;
