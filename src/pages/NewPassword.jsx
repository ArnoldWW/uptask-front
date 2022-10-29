import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../components/Toasts";
import axiosClient from "../config/AxiosClient";
import useAuthProvider from "../hooks/useAuthProvider";

const NewPassword = () => {
  const { token } = useParams();
  const { redirectAuthenticatedUser } = useAuthProvider();
  const [validToken, setValidToken] = useState(true);
  const [password, setPassword] = useState("");
  let shouldFetch = true;
  const navigate = useNavigate();

  useEffect(() => {
    redirectAuthenticatedUser();
  });

  useEffect(() => {
    if (shouldFetch) {
      const checkToken = async () => {
        try {
          await axiosClient(`/users/forget-password/${token}`);

          setValidToken(true);
        } catch (error) {
          setValidToken(false);
        }
      };
      checkToken();
    }

    return () => {
      shouldFetch = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return toastError("Password must be at least 6 characters.");
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const { data } = await axiosClient.post(
        `/users/forget-password/${token}`,
        { password },
        config
      );

      toastSuccess(data.msg);
      setPassword("");
      navigate("/");
    } catch (error) {
      toastError(error.message);
    }
  };

  if (!validToken) {
    return (
      <>
        <h1 className="font-bold text-4xl capitalize text-center">
          This page is not available.
        </h1>
        <Link to="/" className="hover:underline block mt-5 text-center">
          Back to Log In
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="font-bold text-4xl capitalize text-center text-slate-800">
        Create your new password.
      </h1>

      <form
        className="my-5 shadow-sm bg-white p-5 border border-gray-200"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="password" className="font-bold">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="your new password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="create new password"
          className="mt-4 btn w-full"
        />
      </form>
    </>
  );
};

export default NewPassword;
