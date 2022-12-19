import React from "react";
import { useSettingsValue, useRewardsValue } from "../contexts";
import Tooltip from "./Tooltip";
import Rewards from "./Rewards";

export default function Settings() {
  const { settings, setSettings } = useSettingsValue();
  const { rewards } = useRewardsValue();

  return (
    <div className="grid grid-col-2">
      <div className="settings grid-half">
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
      <Rewards rewards={rewards} classes="grid-half text-left" />
    </div>
  );
}
