import "./App.css";
import React, { useState, useEffect } from "react";
import Desktop from "./Desktop";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [loading]);

  return <div className="App">{loading ? <LoadingScreen /> : <Desktop />}</div>;
}

export default App;
