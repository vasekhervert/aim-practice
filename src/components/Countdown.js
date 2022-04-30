import React, { useEffect, useState } from "react";

export default function Countdown() {
  const [text, setText] = useState(null);
  useEffect(() => {
    if (text === null) {
      setTimeout(() => {
        setText(3);
      }, 1000);
    } else if (text === 3) {
      setTimeout(() => {
        setText(2);
      }, 1000);
    } else if (text === 2) {
      setTimeout(() => {
        setText(1);
      }, 1000);
    } else {
      setTimeout(() => {
        setText("Shoot the targets");
      }, 1000);
    }
  }, [text]);

  return <div className="countdown">{text}</div>;
}
