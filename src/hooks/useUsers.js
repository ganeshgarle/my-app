import { useState } from "react";

const useUsers = () => {
  const [apiUser, setApiUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setApiUsers(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    fetchUsers,
    apiUser,
    isLoading,
  };
};

export default useUsers;
