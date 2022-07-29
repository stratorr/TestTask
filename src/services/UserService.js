import { useEffect, useState } from "react";

const UserService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [token, setToken] = useState(null);

  const getAllUsers = async (page = 1) => {
    const BASE_URL = `https://frontend-test-assignment-api.abz.agency/api/v1/users?&page=${page}&count=6`;
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      onError();
    }

    return response.json();
  };

  const getPositions = async () => {
    const BASE_URL_POSITIONS = `https://frontend-test-assignment-api.abz.agency/api/v1/positions`;
    const response = await fetch(BASE_URL_POSITIONS);

    if (!response.ok) {
      onError();
    }
    return response.json();
  };

  useEffect(() => {
    const getToken = async () => {
      const response = await fetch(
        "https://frontend-test-assignment-api.abz.agency/api/v1/token"
      )
        .then((res) => res.json())
        .then((data) => setToken(data));

      return response;
    };

    getToken();
  }, []);

  const postUserData = async (userData) => {
    const response = await fetch(
      "https://frontend-test-assignment-api.abz.agency/api/v1/users",
      {
        headers: {
          Token: token.token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: userData,
      }
    );
    const content = await response.json();

    if (content.success === true) {
      alert("SUCCESS");
    }

    console.log(content);
  };

  const onLoading = () => {
    setLoading(true);
  };

  const onLoaded = () => {
    setLoading(false);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  return {
    loading,
    error,
    getAllUsers,
    getPositions,
    onLoaded,
    onLoading,
    postUserData,
  };
};

export default UserService;
