import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../components/Toasts";
import axiosClient from "../config/AxiosClient";

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [loadingProject, setLoadingProject] = useState(true);

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

      //Reset active project
      setProject({});
      setLoadingProject(true);
    } catch (error) {
      toastError(error.message);
    }
  };

  const getProject = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const { data } = await axiosClient(`/projects/${id}`, config);
      setProject(data);
    } catch (error) {
      console.log(error.response.data);
      navigate("/projects");
    } finally {
      setLoadingProject(false);
    }
  };

  const editProject = async (project) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    console.log(project.name);
    try {
      await axiosClient.put(`/projects/${project.id}`, project, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      toastSuccess("Project edited successfully");
      navigate("/");
    } catch (error) {
      toastError(error.message);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        project,
        loadingProject,
        createProject,
        getProjects,
        getProject,
        editProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider };
export default ProjectContext;
