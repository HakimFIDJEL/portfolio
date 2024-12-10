import React, { useState, useEffect } from "react";

export const Tooltip = ({ children, label }) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  // Hide tooltip on global scroll
  useEffect(() => {
    const handleScroll = () => {
      setVisible(false);
    };

    // Attach scroll listener
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    window.addEventListener("click", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("click", handleScroll);
    };
  }, []);

  const showTooltip = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCoords({
      top: rect.top,
      left: rect.left + rect.width / 2,
    });
    setVisible(true);
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  return (
    <>
      {React.cloneElement(children, {
        onMouseEnter: showTooltip,
        onMouseLeave: hideTooltip,
        onFocus: showTooltip,
        onBlur: hideTooltip,
      })}
      <div
        className={`tooltip ${visible ? "active" : ""}`}
        style={{
          top: coords.top,
          left: coords.left,
        }}
      >
        {label}
      </div>
    </>
  );
};
