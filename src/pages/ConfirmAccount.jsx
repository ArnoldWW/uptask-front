import { useRef } from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toastError, toastSuccess } from "../components/Toasts";

const ConfirmAccount = () => {
  const { token } = useParams();
  const [error, setError] = useState(false);
  let shouldFetch = true;

  useEffect(() => {
    if (shouldFetch) {
      const confirmAccount = async () => {
        try {
          const url = `${
            import.meta.env.VITE_BACKEND_URL
          }/api/users/confirm/${token}`;
          const res = await fetch(url);
          const data = await res.json();
          toastSuccess(data.msg);

          if (!res.ok) {
            throw new Error(data.msg);
          }
        } catch (error) {
          toastError(error.message);
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
