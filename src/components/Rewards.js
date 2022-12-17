import React from "react";

export default function Rewards({ rewards }) {
  return (
    <div>
      <h2>Rewards:</h2>
      <p>
        Target hit:
        <span className="green">
          {rewards.targetHit} <span className="small"> pts</span>
        </span>
        <span className="small"> + Reaction time bonus</span>
      </p>
      <p>
        Target miss:{" "}
        <span className="red">
          -{rewards.targetMissed} <span className="small"> pts</span>
        </span>
      </p>
      <p>
        Shot miss:{" "}
        <span className="red">
          -{rewards.shotMissed} <span className="small"> pts</span>
        </span>
      </p>
    </div>
  );
}
