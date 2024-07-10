import "./App.css";
import { ButtonNew } from "./component";
import Form from "./user/Form";
import { useCount } from "./hooks";

const MyButton = ({ increment, count }) => {
  return (
    <ButtonNew className="btn-sm " color="danger" onClick={increment}>
      {count} Count
    </ButtonNew>
  );
};

const App = () => {
  const { count, increment } = useCount();

  return (
    <div>
      <Form />
      {/* <MyButton increment={increment} count={count} /> */}
    </div>
  );
};

export default App;
