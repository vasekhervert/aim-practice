import React, { useState } from "react";
import { useScoreValue } from "../contexts";
import Grid from "./Grid";
import Settings from "./Settings";

export default function Content() {
  const [view, setView] = useState("pregame");
  const [game, setGame] = useState(false);
  const { score, setScore } = useScoreValue();

  return (
    <div>
      {view === "pregame" && (
        <>
          <Settings />
          <button
            className="cta"
            onClick={() => {
              setView("game");
              setScore((prevState) => ({
                score: 0,
              }));
              setTimeout(() => {
                setGame(!game);
              }, 5000);
            }}
          >
            Start game
          </button>
        </>
      )}
      {view === "game" && (
        <>
          <span>Score: {score.score}</span>
          <Grid game={game} setGame={setGame} setView={setView} />
        </>
      )}
      {view === "postgame" && (
        <>
          <h3>game over</h3>
          <p>Your score: {score.score}</p>
          <button onClick={() => setView("pregame")}>Play again</button>
        </>
      )}
    </div>
  );
}
