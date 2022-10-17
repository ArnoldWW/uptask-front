import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import useAuthProvider from "../hooks/useAuthProvider";

const ProtectedRoute = () => {
  const { auth, loadingUser } = useAuthProvider();

  if (loadingUser) return <p>loading...</p>;

  return (
    <>
      {auth?._id ? (
        <>
          <Header />
          <main className="custom-container">
            <Outlet />
          </main>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default ProtectedRoute;
