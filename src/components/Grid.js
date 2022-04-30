import React, { useEffect, useState } from "react";
import Target from "./Target";
import { useScoreValue, useSettingsValue, useRewardsValue } from "../contexts";
import { minMax } from "../constants";
import ShotPoints from "./ShotPoints";
import Countdown from "./Countdown";

export default function Grid({
  game,
  setGame,
  setView,
  shouldShowGrid,
  counter,
  setCounter,
  shouldShowCountdown,
}) {
  const [shouldShowTarget, setShouldShowTarget] = useState(false);
  const [shouldShowPoints, setShouldShowPoints] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [top, setTop] = useState(300);
  const [left, setLeft] = useState(400);
  const [points, setPoints] = useState(null);
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

  function startCoundDown() {}

  useEffect(() => {
    if (game && counter < 25) {
      startRound();
    } else {
      setGame(false);
      setCounter(0);
      if (counter === 50) {
        setGameOver(true);
      }
    }
    if (gameOver) {
      setTimeout(() => {
        setView("postgame");
      }, 1500);
    }
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [counter, game]);

  useEffect(() => {
    if (shouldShowGrid) {
      startCoundDown();
    }
  });

  return (
    <div
      className={`grid-wrapper ${shouldShowGrid && "game"}`}
      onClick={(e) => {
        if (game) {
          let rect = document
            .querySelector("div.grid-wrapper")
            .getBoundingClientRect();
          let cordX = e.clientX - rect.left;
          let cordY = e.clientY - rect.top;
          missTarget(cordX, cordY);
        }
      }}
    >
      {shouldShowCountdown && <Countdown />}
      {game && shouldShowTarget && (
        <Target
          hitTarget={hitTarget}
          showShotPoints={showShotPoints}
          top={top}
          left={left}
        />
      )}
      {game && shouldShowPoints && <ShotPoints points={points} />}
    </div>
  );
}
