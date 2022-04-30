import React, { useEffect, useState } from "react";
import Target from "./Target";
import { useScoreValue, useSettingsValue, useRewardsValue } from "../contexts";
import { minMax } from "../constants";
import ShotPoints from "./ShotPoints";

export default function Grid({ game, setGame, setView }) {
  const [shouldShowTarget, setShouldShowTarget] = useState(false);
  const [shouldShowPoints, setShouldShowPoints] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [top, setTop] = useState(300);
  const [left, setLeft] = useState(400);
  const [points, setPoints] = useState(null);
  const [counter, setCounter] = useState(0);
  const { settings } = useSettingsValue();
  const { rewards } = useRewardsValue();
  const { setScore } = useScoreValue();

  const { topMax, topMin, leftMax, leftMin } = minMax;

  const randomTop = Math.floor(Math.random() * (topMax - topMin) + topMin);
  const randomLeft = Math.floor(Math.random() * (leftMax - leftMin) + leftMin);

  let show;
  let hide;

  function startRound() {
    setTop(randomTop);
    setLeft(randomLeft);
    show = setTimeout(function () {
      setShouldShowTarget(true);
      hide = setTimeout(function () {
        setShouldShowTarget(false);
        setCounter(counter + 1);
      }, settings.targetTime); // target is visible for XXXX ms
    }, settings.delay); // delay before showing next target
  }

  function hitTarget(e) {
    e.stopPropagation();
    setShouldShowTarget(false);
    setCounter(counter + 1);
  }

  function showShotPoints(points) {
    setShouldShowPoints(true);
    setPoints(points);
    setTimeout(() => {
      setShouldShowPoints(false);
    }, 500);
  }

  function missTarget(cordX, cordY) {
    setScore((prevState) => ({
      ...prevState,
      score: prevState.score - rewards.shotMissed,
    }));
    showShotPoints({
      points: rewards.shotMissed,
      top: cordY,
      left: cordX,
      isNegative: true,
    });
  }

  useEffect(() => {
    if (game && counter < 50) {
      startRound();
    } else {
      setGame(false);
      setCounter(0);
      if (counter === 50) {
        setGameOver(true);
      }
    }
    if (gameOver) {
      setView("postgame");
    }
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [counter, game]);

  return (
    <div
      className={`grid-wrapper ${game && "game"}`}
      onClick={(e) => {
        let rect = document
          .querySelector("div.grid-wrapper")
          .getBoundingClientRect();
        let cordX = e.clientX - rect.left;
        let cordY = e.clientY - rect.top;
        missTarget(cordX, cordY);
      }}
    >
      {game && shouldShowTarget && (
        <Target
          hitTarget={hitTarget}
          showShotPoints={showShotPoints}
          top={top}
          left={left}
        />
      )}
      {game && shouldShowPoints && <ShotPoints points={points} />}

      <div className="counter">{counter} / 50</div>
    </div>
  );
}
