import { useState } from "react";
import { toastError } from "../components/Toasts";
import useProjectProvider from "../hooks/useProjectProvider";

const initialProjectData = {
  name: "",
  description: "",
  finishdate: "",
  client: ""
};

const NewProject = () => {
  const [projectData, setProjectData] = useState(initialProjectData);
  const { createProject } = useProjectProvider();

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

    await createProject(projectData);
    setProjectData(initialProjectData);
  };

  return (
    <div className="my-14">
      <h1 className="font-bold text-4xl my-5 text-center">
        Create a new project
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full md:w-2/3 mx-auto bg-white p-5"
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

        <input type="submit" value="create" className="mt-4 btn w-full" />
      </form>
    </div>
  );
};

export default NewProject;
