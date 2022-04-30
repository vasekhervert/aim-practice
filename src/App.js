import { useState, useEffect } from "react";
import "./app.scss";
import Content from "./components/Content";

import {
  SettingsProvider,
  StatsProvider,
  ScoreProvider,
  RewardsProvider,
} from "./contexts";

function App() {
  useEffect(() => {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
    return () => {
      document.removeEventListener("contextmenu", (event) =>
        event.preventDefault()
      );
    };
  }, []);

  return (
    <StatsProvider>
      <SettingsProvider>
        <RewardsProvider>
          <ScoreProvider>
            <div className="App">
              <Content />
            </div>
          </ScoreProvider>
        </RewardsProvider>
      </SettingsProvider>
    </StatsProvider>
  );
}

export default App;
