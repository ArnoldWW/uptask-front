import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./Layouts/AuthLayout";
import ProtectedRoute from "./Layouts/ProtectedRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import NewPassword from "./pages/NewPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";

import { AuthProvider } from "./context/AuthProvider";
import { ProjectProvider } from "./context/ProjectProvider";

import { Toaster } from "react-hot-toast";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route path="new-password/:token" element={<NewPassword />} />
              <Route
                path="confirm-account/:token"
                element={<ConfirmAccount />}
              />
            </Route>

            <Route path="/projects" element={<ProtectedRoute />}>
              <Route index element={<Projects />} />
              <Route path="new-project" element={<NewProject />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>

          <Toaster />
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
