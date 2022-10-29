import { useEffect } from "react";
import { useState } from "react";
import useProjectProvider from "../hooks/useProjectProvider";
import { toastError } from "./Toasts";

const initialProjectData = {
  name: "",
  description: "",
  finishdate: "",
  client: ""
};

const ProjectForm = () => {
  const { project, createProject, editProject } = useProjectProvider();
  const [projectData, setProjectData] = useState(initialProjectData);
  const isCreating = Object.values(project).length === 0;

  useEffect(() => {
    if (isCreating) {
      console.log("creating");
    } else {
      console.log("editing");
      setProjectData({
        id: project._id,
        name: project.name,
        description: project.description,
        finishdate: project.finishDate.split("T")[0],
        client: project.client
      });
    }
  }, []);

  const handleChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const empty = (value) => value.trim() === "";
    if (Object.values(projectData).some(empty)) {
      return toastError("All fields are required.");
    }

    if (isCreating) {
      console.log(project._id);
      await createProject(projectData);
      setProjectData(initialProjectData);
    } else {
      await editProject(projectData);
      setProjectData(initialProjectData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-2/3 mx-auto bg-white p-5 border"
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
          placeholder="project name"
          className="input"
          value={projectData.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="font-bold">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          htmlFor="description"
          placeholder="project description"
          className="input resize-none h-28"
          value={projectData.description}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="finishdate" className="font-bold">
          Finish date:
        </label>
        <input
          id="finishdate"
          name="finishdate"
          htmlFor="finishdate"
          type="date"
          className="input"
          value={projectData.finishdate}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="client" className="font-bold">
          Client:
        </label>
        <input
          id="client"
          name="client"
          htmlFor="client"
          type="text"
          placeholder="project client"
          className="input"
          value={projectData.client}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        value={`${isCreating ? "Create" : "edit"}`}
        className="mt-4 btn w-full"
      />
    </form>
  );
};

export default ProjectForm;
