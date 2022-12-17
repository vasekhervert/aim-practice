import React, { useEffect } from "react";
import { useSettingsValue, useRewardsValue } from "../contexts";
import Tooltip from "./Tooltip";
import Rewards from "./Rewards";

export default function Settings() {
  const { settings, setSettings } = useSettingsValue();
  const { defaultReward, rewards, setRewards } = useRewardsValue();

  useEffect(() => {
    const delayPenalty = settings.delay / 10; // def 50
    const targetTimePenalty = settings.targetTime / 10; // def 100
    const reward = defaultReward - delayPenalty - targetTimePenalty; // 300 - 50 - 100
    const targetMiss = delayPenalty + targetTimePenalty; // 50 + 100
    const shotMiss = targetMiss / 2; // 150 / 2
    setRewards((prevState) => ({
      ...prevState,
      targetHit: reward,
      targetMissed: targetMiss,
      shotMissed: shotMiss,
    }));
  }, [settings]);

  return (
    <>
      <div className="settings">
        <h2>Settings: </h2>
        <div className="settings-field">
          <div className="label">
            Target delay{" "}
            <Tooltip label="?" id="delay">
              Delay of showing the next target
            </Tooltip>
          </div>
          <div className="input">
            <button
              onClick={() =>
                setSettings((prevState) => ({
                  ...prevState,
                  delay: prevState.delay - 100,
                }))
              }
              disabled={settings.delay === 0}
            >
              -
            </button>
            <span>{settings.delay / 1000} s</span>
            <button
              onClick={() =>
                setSettings((prevState) => ({
                  ...prevState,
                  delay: prevState.delay + 100,
                }))
              }
              disabled={settings.delay === 1000}
            >
              +
            </button>
          </div>
        </div>
        <div className="settings-field">
          <div className="label">
            Target time{" "}
            <Tooltip label="?" id="targetTime">
              Length of target's visibility
            </Tooltip>
          </div>
          <div className="input">
            <button
              onClick={() =>
                setSettings((prevState) => ({
                  ...prevState,
                  targetTime: prevState.targetTime - 100,
                }))
              }
              disabled={settings.targetTime === 500}
            >
              -
            </button>
            <span>{settings.targetTime / 1000} s</span>
            <button
              onClick={() =>
                setSettings((prevState) => ({
                  ...prevState,
                  targetTime: prevState.targetTime + 100,
                }))
              }
              disabled={settings.targetTime === 1500}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <Rewards rewards={rewards} />
    </>
  );
}
