import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../components/Toasts";
import axiosClient from "../config/AxiosClient";

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const createProject = async (project) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await axiosClient.post("/projects", project, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      toastSuccess("Project created successfully");
      navigate("/");
    } catch (error) {
      toastError(error.message);
    }
  };

  const getProjects = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axiosClient("/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      setProjects(res.data);
    } catch (error) {
      toastError(error.message);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        createProject,
        getProjects
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider };
export default ProjectContext;
