import { useState, useEffect, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../config/AxiosClient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const localStorageToken = localStorage.getItem("token");
  let shouldFetch = true;

  const navigate = useNavigate();
  const [auth, setAuth] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);

  const redirectAuthenticatedUser = () => {
    //redireccionar si ya esta autenticado
    if (Object.values(auth).length !== 0) {
      navigate("/projects");
      console.log("user authenticated");
    }
  };

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
          console.log(data);
        } catch (error) {
          console.log(error.response.data);
          navigate("/");
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
        setAuth,
        redirectAuthenticatedUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
