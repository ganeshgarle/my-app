import { useState } from "react";
import "./App.css";
import data from "./data";

const App = () => {
  const [users, setUsers] = useState(data);
  const [inputForm, setInputForm] = useState({
    name: "",
    age: "",
    address: "",
  });

  const addInput = () => {
    const { name, age, address } = inputForm;
    setUsers((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        name: name,
        age: age,
        address: address,
        completed: false,
      },
    ]);
    setInputForm({
      name: "",
      age: "",
      address: "",
    });
  };

  const handleCheckBox = (isChecked, id) => {
    // console.log(isChecked, id);
    setUsers((prevState) =>
      prevState.map((user) =>
        user.id === id ? { ...user, completed: isChecked } : user
      )
    );
  };

  // const deleteAll = () => {
  //   setUsers([]);
  // };

  return (
    <div>
      {/* <div className="center"> */}
      <div>
        <input
          value={inputForm.name}
          onChange={(e) => setInputForm({ ...inputForm, name: e.target.value })}
          placeholder="Enter name"
        />
        <input
          value={inputForm.age}
          type="number"
          onChange={(e) => setInputForm({ ...inputForm, age: e.target.value })}
          placeholder="Enter Age"
        />
        <input
          value={inputForm.address}
          onChange={(e) =>
            setInputForm({ ...inputForm, address: e.target.value })
          }
          placeholder="Enter Address"
        />
      </div>
      <div>
        <button onClick={addInput}>Add</button>
        {/* {users.length !== 5 && <button onClick={deleteAll}>Delete All</button>} */}
      </div>
      {/* </div> */}
      <div className="list-items">
        {users.map((user) => {
          return (
            <div key={user.id} className="items">
              <input
                type="checkbox"
                checked={user.completed}
                onChange={(e) => handleCheckBox(e.target.checked, user.id)}
              />
              <p>Name - {user.name}</p>
              <p>Age - {user.age}</p>
              <p>address - {user.address}</p>

              <button>Edit</button>
              {user.completed && <button>Delete</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
