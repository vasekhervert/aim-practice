import React, { useEffect } from "react";
import { useScoreValue, useSettingsValue, useRewardsValue } from "../contexts";

export default function Target({ hitTarget, showShotPoints, top, left }) {
  const { setScore } = useScoreValue();
  const { settings } = useSettingsValue();
  const { rewards } = useRewardsValue();

  useEffect(() => {
    const start = Date.now();

    return () => {
      const end = Date.now();
      const diff = end - start;

      if (diff > settings.targetTime) {
        showShotPoints({
          points: rewards.targetMissed,
          top,
          left,
          isNegative: true,
        });
        setScore((prevState) => ({
          score: prevState.score - rewards.targetMissed,
        }));
      } else {
        const bonus = 2500 - settings.targetTime - diff;

        setScore((prevState) => ({
          score: prevState.score + rewards.targetHit + bonus,
        }));
        showShotPoints({
          points: rewards.targetHit + bonus,
          top: top,
          left: left,
          isNegative: false,
        });
      }
    };
  }, []);

  return (
    <div
      className="target"
      style={{ top: top, left: left }}
      onClick={hitTarget}
    ></div>
  );
}
