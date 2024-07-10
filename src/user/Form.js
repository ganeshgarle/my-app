import { useEffect } from "react";
import { ButtonNew } from "../component";
import { Spinner } from "reactstrap";
import { useCount, useUsers } from "../hooks";

const Form = () => {
  const { apiUser, isLoading, fetchUsers } = useUsers();
  const { count, increment } = useCount();

  useEffect(() => {
    count !== 0 && fetchUsers();
  }, [count]);

  return (
    <div>
      {isLoading && (
        <Spinner className="d-flex align-items-center justify-content-center" />
      )}

      {apiUser?.map((user) => {
        return (
          <div key={user.id}>
            <p> Name : {user.name}</p>
            <p className="border"> Email : {user.email}</p>
          </div>
        );
      })}
      <ButtonNew onClick={increment}>{count} - Count</ButtonNew>
    </div>
  );
};

export default Form;
