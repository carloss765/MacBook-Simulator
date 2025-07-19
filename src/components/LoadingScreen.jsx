import React from "react";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <video
        src="../../public/lock.gif"
        alt="Loading..."
      />
    </div>
  );
};

export default LoadingScreen;
