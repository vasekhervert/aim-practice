import { useState, createContext, useContext } from "react";

export const StatsContext = createContext();
export const StatsProvider = ({ children }) => {
  const [stats, setStats] = useState([]);

  return (
    <StatsContext.Provider value={{ stats, setStats }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStatsValue = () => useContext(StatsContext);
