import React, { useState } from "react";
import { useScoreValue } from "../contexts";
import Grid from "./Grid";
import Settings from "./Settings";

export default function Content() {
  const [view, setView] = useState("pregame");
  const [game, setGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [shouldShowGrid, setShouldShowGrid] = useState(false);
  const [shouldShowCountdown, setShouldShowCountdown] = useState(false);
  const [counter, setCounter] = useState(0);
  const { score, setScore } = useScoreValue();

  function startGameSequence() {
    setTimeout(() => {
      setShouldShowGrid(true);
    }, 1000);
    setTimeout(() => {
      setShouldShowCountdown(true);
    }, 2000);
    setTimeout(() => {
      setShouldShowCountdown(false);
    }, 7000);
    setTimeout(() => {
      setGame(!game);
    }, 7500);
  }

  return (
    <div className="content">
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
              startGameSequence();
            }}
          >
            Start game
          </button>
        </>
      )}
      {view === "game" && (
        <>
          <div className="game-head">
            <div>Score: {score.score}</div>
            <div className="counter">{counter} / 25</div>
          </div>

          <Grid
            game={game}
            setGame={setGame}
            setGameOver={setGameOver}
            shouldShowGrid={shouldShowGrid}
            setShouldShowGrid={setShouldShowGrid}
            shouldShowCountdown={shouldShowCountdown}
            setView={setView}
            counter={counter}
            setCounter={setCounter}
          />
        </>
      )}
      {gameOver && (
        <div className="end-game">
          <div className="content">
            <h2>Game over</h2>
            <p>Your score: {score.score}</p>
            <button
              onClick={() => {
                setView("pregame");
                setGameOver(false);
              }}
            >
              Play again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
