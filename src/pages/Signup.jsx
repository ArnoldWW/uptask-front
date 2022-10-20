import { useState } from "react";
import { Link } from "react-router-dom";
import { toastError, toastSuccess } from "../components/Toasts";
import axiosClient from "../config/AxiosClient";
import { checkEmail } from "../helpers";

const initialUserData = {
  name: "",
  email: "",
  password: "",
  confirmpassword: ""
};

const Signup = () => {
  const [userData, setUserData] = useState(initialUserData);

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

    if (userData.password !== userData.confirmpassword)
      return toastError("Passwords are diferent");

    if (userData.password.length < 6)
      return toastError("Password must be at least 6 characters");

    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      };

      const { data } = await axiosClient.post("/users", userData, config);

      toastSuccess(data.msg);
      setUserData(initialUserData);
    } catch (error) {
      console.log(error.response.data.msg);
      toastError(error.response.data.msg);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-4xl capitalize text-center">
        Sign up and create your projects.
      </h1>

      <form
        onSubmit={handleSubmit}
        className="my-5 shadow-sm bg-white p-5 border border-gray-200"
      >
        <div className="mb-4">
          <label htmlFor="name" className="font-bold">
            Name:
          </label>
          <input
            id="name"
            name="name"
            htmlFor="name"
            type="text"
            placeholder="jhon doe"
            className="input"
            value={userData.name}
            onChange={handleChange}
          />
        </div>

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

        <div className="mb-4">
          <label htmlFor="confirmpassword" className="font-bold">
            Confirm Password:
          </label>
          <input
            id="confirmpassword"
            name="confirmpassword"
            type="password"
            placeholder="confirm your password"
            className="input"
            value={userData.confirmpassword}
            onChange={handleChange}
          />
        </div>

        <input type="submit" value="Sign up" className="mt-4 btn w-full" />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to="/" className="hover:underline block">
          Already have an account? Log in
        </Link>

        <Link to="/forget-password" className="hover:underline block">
          Forgot password?
        </Link>
      </nav>
    </div>
  );
};

export default Signup;
