import React from "react";
import { useSettingsValue, useRewardsValue } from "../contexts";
import Tooltip from "./Tooltip";
import Rewards from "./Rewards";

const xhairSizes = [
  { setting: "xhairSize", id: "small", value: "Small" },
  { setting: "xhairSize", id: "medium", value: "Medium" },
  { setting: "xhairSize", id: "large", value: "Large" },
];

const xhairColors = [
  { setting: "xhairColor", id: "green", value: "Green" },
  { setting: "xhairColor", id: "red", value: "Red" },
];

export default function Settings() {
  const { settings, setSettings } = useSettingsValue();
  const { rewards } = useRewardsValue();

  const handleRadioChange = (setting, id) => {
    setSettings((prevState) => ({
      ...prevState,
      [setting]: id,
    }));
  };

  return (
    <div className="grid grid-col-2 max-w-800 gap-8">
      <div className="settings grid-half">
        <h2 className="text-left">Settings: </h2>
        <div className="grid grid-col-2 gap-4">
          <div className="grid-half text-left">
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
                  Time of target's visibility
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
          <div className="grid-half">
            <div className="label mb-4 text-left">Crosshair</div>
            <div className="radio">
              {xhairSizes.map((i) => (
                <button
                  id={i.id}
                  className={i.id === settings.xhairSize && "active"}
                  onClick={() => {
                    handleRadioChange(i.setting, i.id);
                  }}
                >
                  {i.value}
                </button>
              ))}
            </div>

            <div className="radio">
              {xhairColors.map((i) => (
                <button
                  id={i.id}
                  className={i.id === settings.xhairColor && "active"}
                  onClick={() => {
                    handleRadioChange(i.setting, i.id);
                  }}
                >
                  {i.value}
                </button>
              ))}
            </div>
            <div className="xhair-box">
              <img
                className="m-auto"
                alt="crosshair"
                src={`/img/xhair/xhair-${settings.xhairSize}-${settings.xhairColor}.png`}
              />
            </div>
          </div>
        </div>
      </div>
      <Rewards rewards={rewards} classes="grid-half text-left" />
    </div>
  );
}
