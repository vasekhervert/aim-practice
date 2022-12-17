import { useState } from "react";

export default function Tooltip({ children, label, id }) {
  const [showTooltip, setShowTooltip] = useState(false);

  function setTooltipDirection() {
    const tooltip = document.getElementById(`tooltip-${id}`);
    const tooltipContent = document.querySelector(
      `#tooltip-${id} .tooltip-content`
    );
    const tooltipOffset = tooltip.getBoundingClientRect();

    if (!showTooltip) {
      tooltipContent.classList.add("is-open");
      if (tooltipOffset.x > 240) {
        tooltipContent.classList.add("left");
      } else {
        tooltipContent.classList.add("right");
      }
    } else {
      tooltipContent.classList.remove("is-open", "left", "right");
    }
  }

  return (
    <div
      className="tooltip"
      onClick={() => {
        setShowTooltip(!showTooltip);
        setTooltipDirection();
      }}
      id={`tooltip-${id}`}
    >
      <span>{label}</span>
      <div className="tooltip-content">{children}</div>
    </div>
  );
}
