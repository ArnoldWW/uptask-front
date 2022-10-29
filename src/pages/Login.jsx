import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toastError } from "../components/Toasts";
import axiosClient from "../config/AxiosClient";
import { checkEmail } from "../helpers";
import useAuthProvider from "../hooks/useAuthProvider";

const initialUserData = {
  email: "",
  password: ""
};

const Login = () => {
  const [userData, setUserData] = useState(initialUserData);
  const { setAuth, redirectAuthenticatedUser } = useAuthProvider();
  const navigate = useNavigate();

  useEffect(() => {
    redirectAuthenticatedUser();
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const empty = (value) => value.trim() === "";
    if (Object.values(userData).some(empty)) {
      return toastError("All fields are required.");
    }

    if (!checkEmail(userData.email)) {
      return toastError("Invalid email");
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axiosClient.post("/users/login", userData, config);

      //Almacenar token local storage
      localStorage.setItem("token", res.data.token);
      setUserData(initialUserData);
      setAuth(res.data);
      navigate("/projects");
    } catch (error) {
      console.log(error.response.data.msg);
      toastError(error.response.data.msg);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-4xl capitalize text-center">
        Log in and create your projects.
      </h1>

      <form
        onSubmit={handleSubmit}
        className="my-5 shadow-sm bg-white p-5 border border-gray-200"
      >
        <div className="mb-4">
          <label htmlFor="email" className="font-bold">
            Email:
          </label>
          <input
            id="email"
            name="email"
            htmlFor="email"
            type="email"
            placeholder="jhondoe@gmail.com"
            className="input"
            value={userData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="font-bold">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="your password"
            className="input"
            value={userData.password}
            onChange={handleChange}
          />
        </div>

        <input type="submit" value="log in" className="mt-4 btn w-full" />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to="/signup" className="hover:underline block">
          No account yet? Sign up
        </Link>

        <Link to="/forget-password" className="hover:underline block">
          Forgot password?
        </Link>
      </nav>
    </div>
  );
};

export default Login;
