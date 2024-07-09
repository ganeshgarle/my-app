import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import data from "../data";

const defaultForm = {
  name: "",
  age: "",
  address: "",
};
const Form = () => {
  const localData = localStorage.getItem("userData");
  const [users, setUsers] = useState(localData ? JSON.parse(localData) : data);
  const [isUserEdit, setIsUserEdit] = useState(false);
  const [inputForm, setInputForm] = useState(defaultForm);

  const setOnLocal = () => {
    localStorage.setItem("userData", JSON.stringify(users));
  };
  useEffect(() => {
    setOnLocal();
  }, [users]);

  const addInput = () => {
    const { name, age, address } = inputForm;
    setUsers((prevState) => [
      ...prevState,
      {
        id: uuidv4(),
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
    console.log(users);
    setUsers((prevState) =>
      prevState.map((user) =>
        user.id === id ? { ...user, completed: isChecked } : user
      )
    );
  };

  const editHandler = (user) => {
    setInputForm(user);
    setIsUserEdit(true);
  };

  const updateHandler = () => {
    const { id } = inputForm;
    setUsers((prevState) =>
      prevState.map((user) =>
        user.id === id ? { ...user, ...inputForm } : user
      )
    );
    setInputForm(defaultForm);
    setIsUserEdit(false);
  };

  return (
    <div>
      <div className="center">
        <div>
          <input
            value={inputForm.name}
            onChange={(e) =>
              setInputForm({ ...inputForm, name: e.target.value })
            }
            placeholder="Enter name"
          />
          <input
            value={inputForm.age}
            type="number"
            onChange={(e) =>
              setInputForm({ ...inputForm, age: e.target.value })
            }
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
          {!isUserEdit && <button onClick={addInput}>Add</button>}
          {isUserEdit && (
            <>
              <button
                onClick={() => {
                  setInputForm(defaultForm);
                  setIsUserEdit(false);
                }}
              >
                Cancel
              </button>
              <button onClick={updateHandler}>Update</button>
            </>
          )}
          {users.filter((user) => user.completed).length > 0 && (
            <button
              onClick={() =>
                setUsers((prevState) =>
                  prevState.filter((child) => !child.completed)
                )
              }
            >
              Delete All
            </button>
          )}
        </div>
      </div>
      <div className="list-items">
        {users.map((user) => {
          return (
            <div key={user.id + user.name} className="items">
              <input
                type="checkbox"
                checked={user.completed}
                onChange={(e) => handleCheckBox(e.target.checked, user.id)}
              />
              <p>Name - {user.name}</p>
              <p>Age - {user.age}</p>
              <p>address - {user.address}</p>

              <button onClick={() => editHandler(user)}>Edit</button>
              <button
                onClick={() =>
                  setUsers((prevState) =>
                    prevState.filter((child) => child.id !== user.id)
                  )
                }
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Form;
