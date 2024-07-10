import { useState } from "react";

const useCount = () => {
  const [count, setCount] = useState(0);
  const increment = () => {
    const value = count + 1;
    setCount(value);
  };

  return {
    count,
    increment,
  };
};

export default useCount;
