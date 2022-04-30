import React, { useEffect } from "react";
import { useSettingsValue, useRewardsValue } from "../contexts";

export default function Settings() {
  const { settings, setSettings } = useSettingsValue();
  const { defaultReward, rewards, setRewards } = useRewardsValue();

  useEffect(() => {
    const delayPenalty = settings.delay / 10;
    const targetTimePenalty = settings.targetTime / 10;
    const reward = defaultReward - delayPenalty - targetTimePenalty;
    const targetMiss = delayPenalty + targetTimePenalty;
    const shotMiss = reward / 2;
    setRewards((prevState) => ({
      ...prevState,
      targetHit: reward,
      targetMissed: targetMiss,
      shotMissed: shotMiss,
    }));
  }, [settings]);

  return (
    <>
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
      <div>
        Body za trefený terč při tomto nastavení: {rewards.targetHit} + Reaction
        time bonus
      </div>
      <div>
        Trest za netrefený terč při tomto nastavení: -{rewards.targetMissed}
      </div>
      <div>Trest za střelu mimo při tomto nastavení: -{rewards.shotMissed}</div>
    </>
  );
}
