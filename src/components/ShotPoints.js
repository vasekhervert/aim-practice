import React from "react";

export default function ShotPoints({ points }) {
  return (
    <div
      className={`points ${points.isNegative ? "negative" : "positive"}`}
      style={{ top: points.top, left: points.left }}
    >
      {points.points}
    </div>
  );
}
