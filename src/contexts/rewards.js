import { useState, createContext, useContext, useEffect } from "react";
import { useSettingsValue } from "./settings";

export const RewardsContext = createContext();
export const RewardsProvider = ({ children }) => {
  const { settings } = useSettingsValue();
  const defaultReward = 300;
  const defaultMissedTarget = -300;
  const defaultMissedShot = -100;
  const [rewards, setRewards] = useState({
    targetHit: defaultReward,
    targetMissed: defaultMissedTarget,
    shotMissed: defaultMissedShot,
  });

  useEffect(() => {
    const delayPenalty = settings.delay / 10; // def 50
    const targetTimePenalty = settings.targetTime / 10; // def 100
    const reward = defaultReward - delayPenalty - targetTimePenalty; // def 300 - 50 - 100
    const targetMiss = delayPenalty + targetTimePenalty; // 50 + 100
    const shotMiss = targetMiss / 2;
    setRewards((prevState) => ({
      ...prevState,
      targetHit: reward,
      targetMissed: targetMiss,
      shotMissed: shotMiss,
    }));
  }, [settings]);

  return (
    <RewardsContext.Provider
      value={{
        defaultReward,
        defaultMissedTarget,
        defaultMissedShot,
        rewards,
        setRewards,
      }}
    >
      {children}
    </RewardsContext.Provider>
  );
};

export const useRewardsValue = () => useContext(RewardsContext);
