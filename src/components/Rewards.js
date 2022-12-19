import React from "react";

export default function Rewards({ rewards, classes }) {
  return (
    <div className={`${classes}`}>
      <h3>Rewards:</h3>
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
