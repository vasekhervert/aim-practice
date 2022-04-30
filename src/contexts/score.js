import { useState, createContext, useContext } from "react";

export const ScoreContext = createContext();
export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState({
    score: 0,
  });

  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScoreValue = () => useContext(ScoreContext);
