import "./App.css";
import React, { useState, useEffect } from "react";
import Desktop from "./Desktop";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return <div className="App">{loading ? <LoadingScreen /> : <Desktop />}</div>;
}

export default App;
