import { useState, createContext, useContext } from "react";
import { useSettingsValue } from "./settings";

export const RewardsContext = createContext();
export const RewardsProvider = ({ children }) => {
  const defaultReward = 300;
  const defaultMissedTarget = -300;
  const defaultMissedShot = -100;
  const [rewards, setRewards] = useState({
    targetHit: defaultReward,
    targetMissed: defaultMissedTarget,
    shotMissed: defaultMissedShot,
  });

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
