import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../config/AxiosClient";

const ConfirmAccount = () => {
  const { token } = useParams();
  const [error, setError] = useState(false);
  let shouldFetch = true;

  useEffect(() => {
    if (shouldFetch) {
      const confirmAccount = async () => {
        try {
          const { data } = await axiosClient(`/users/confirm/${token}`);
        } catch (error) {
          console.log(error.response.data.msg);
          setError(true);
        }
      };
      confirmAccount();
    }

    return () => {
      shouldFetch = false;
    };
  }, []);

  return (
    <div>
      <h1
        className={`font-bold text-4xl text-center ${
          error ? "text-red-900" : "text-green-900"
        }`}
      >
        {error
          ? "There was an error, maybe your account is already confirmed."
          : "Your account has been confirmed"}
      </h1>
      <Link to="/" className="hover:underline block mt-5 text-center">
        Back to Log In
      </Link>
    </div>
  );
};

export default ConfirmAccount;
