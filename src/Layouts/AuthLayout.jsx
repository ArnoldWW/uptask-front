import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="container p-2 mx-auto min-h-screen flex items-center justify-center">
        <div className="max-w-xl lg:w-1/2">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
