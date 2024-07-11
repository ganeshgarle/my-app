import { useEffect, useMemo, useState } from "react";
import { Spinner, Input } from "reactstrap";
import { useCount, useUsers, useDebounce } from "../hooks";

const Form = () => {
  const { apiUser, isLoading, fetchUsers } = useUsers();
  const [searchValue, setSearchValue] = useState("");
  const values = useDebounce(searchValue, 100);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const myData = useMemo(() => {
    return values.trim()
      ? apiUser.filter((el) =>
          el.name.toLowerCase().includes(values.trim().toLowerCase())
        )
      : apiUser;
  }, [values, apiUser]);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center">
        {isLoading && (
          <Spinner className="d-flex align-items-center justify-content-center" />
        )}
      </div>
      <div className="user-table">
        <Input
          placeholder="Search by name"
          value={searchValue}
          onChange={handleSearch}
        />
        <table className="table table-wrapper">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Website</th>
            </tr>
          </thead>
          <tbody>
            {myData?.length > 0 &&
              myData.map((user) => {
                const { id, name, email, phone, website } = user;
                return (
                  <tr key={id}>
                    <th scope="row">{id}</th>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td>{website}</td>
                  </tr>
                );
              })}
            {myData?.length === 0 && (
              <p className="text-center">Data not found</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Form;
