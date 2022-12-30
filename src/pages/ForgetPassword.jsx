import Logo from "/logo.svg";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toastError, toastSuccess } from "../components/Toasts";
import axiosClient from "../config/AxiosClient";
import { checkEmail } from "../helpers/index";
import useAuthProvider from "../hooks/useAuthProvider";

const ForgetPassword = () => {
  const { redirectAuthenticatedUser } = useAuthProvider();
  const [email, setEmail] = useState("");

  useEffect(() => {
    redirectAuthenticatedUser();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "") return toastError("Email field is required.");

    if (!checkEmail(email)) return toastError("Invalid email.");

    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      };

      const { data } = await axiosClient.post(
        "/users/forget-password",
        { email },
        config
      );
      console.log(data);
      toastSuccess(data.msg);
      setEmail("");
    } catch (error) {
      console.log(error.response.data.msg);
      toastError(error.response.data.msg);
    }
  };

  return (
    <div>
      <img src={Logo} className="mx-auto mb-2" />
      <p className="text-xl text-center">Recover your password.</p>

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="recover password"
          className="mt-4 btn w-full"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to="/signup" className="hover:underline block">
          No account yet? Sign up
        </Link>

        <Link to="/" className="hover:underline block">
          Already have a account? Log in
        </Link>
      </nav>
    </div>
  );
};

export default ForgetPassword;
