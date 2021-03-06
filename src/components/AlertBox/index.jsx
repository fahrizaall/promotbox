import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./alertbox.scss";

const AlertBox = ({
  components,
  message,
  redirect,
  isDanger,
  clickOutside,
}) => {
  const navigate = useNavigate();
  const nodeRef = useRef(null);

  const handleClickOutside = (e) => {
    if (nodeRef.current && !nodeRef.current.contains(e.target)) {
      redirect ? navigate(redirect) : clickOutside();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <div className="screen">
      <div className="box" ref={nodeRef}>
        <p>{message}</p>
        {components}
        {isDanger ? (
          ""
        ) : (
          <button onClick={() => navigate(redirect)}>Oke</button>
        )}
      </div>
    </div>
  );
};

export default AlertBox;
