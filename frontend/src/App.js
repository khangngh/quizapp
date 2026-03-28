import React, { useState } from "react";
import Quiz from "./Quiz";
import Result from "./Result";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div>
      {!result ? (
        <Quiz onFinish={setResult} />
      ) : (
        <Result data={result} onRestart={() => setResult(null)} />
      )}
    </div>
  );
}

export default App;