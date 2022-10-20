import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/AxiosClient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const localStorageToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);
  let shouldFetch = true;

  useEffect(() => {
    if (shouldFetch) {
      const authenticateUser = async () => {
        if (!localStorageToken) {
          return setLoadingUser(false);
        }

        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorageToken}`
            }
          };
          const { data } = await axiosClient("/users/profile", config);

          setAuth(data);
          navigate("/projects");
        } catch (error) {
          setLoadingUser(false);
          setAuth({});
        }
        setLoadingUser(false);
      };
      authenticateUser();
    }

    return () => {
      shouldFetch = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        loadingUser,
        setAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
