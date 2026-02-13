"use client";

import { useEffect, useState } from "react";

export default function UserPreloader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const startFade = setTimeout(() => {
      setFadeOut(true);
    }, 900);

    const removeLoader = setTimeout(() => {
      setVisible(false);
    }, 1200);

    return () => {
      clearTimeout(startFade);
      clearTimeout(removeLoader);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`userpreloader ${fadeOut ? "fade-out" : ""}`}>
      <div className="userloader-wrapper">
        <div className="userloader-ring"></div>
        <p className="userloader-text">Preparing Xenra</p>
      </div>
    </div>
  );
}
