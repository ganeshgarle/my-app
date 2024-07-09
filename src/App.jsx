import { useState } from "react";
import "./App.css";
import Form from "./component/Form";

const MyButton = ({ increment, count }) => {
  return <button onClick={increment}>{count} Coutner</button>;
};

const App = () => {
  const [count, setCount] = useState(0);
  const increment = () => {
    const value = count + 1;
    setCount(value);
  };

  return (
    <div>
      <Form />
      <MyButton increment={increment} count={count} />
      <MyButton increment={increment} count={count} />
    </div>
  );
};

export default App;
