import { useState, createContext, useContext } from "react";

export const SettingsContext = createContext();
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    delay: 500,
    targetTime: 1000,
    cursorColor: "green",
    cursorSize: "small",
  });

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsValue = () => useContext(SettingsContext);
