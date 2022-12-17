import React, { useEffect } from "react";
import { useSettingsValue, useRewardsValue } from "../contexts";

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
          <div className="label">Delay</div>
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
          <div className="label">Target time</div>
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
      <div>
        <h2>Rewards:</h2>
        <p>
          Target hit:
          <span className="green">
            {rewards.targetHit} <span className="small"> pts</span>
          </span>
          <span className="small"> + Reaction time bonus</span>
        </p>
        <p>
          Target miss:{" "}
          <span className="red">
            -{rewards.targetMissed} <span className="small"> pts</span>
          </span>
        </p>
        <p>
          Shot miss:{" "}
          <span className="red">
            -{rewards.shotMissed} <span className="small"> pts</span>
          </span>
        </p>
      </div>
    </>
  );
}
