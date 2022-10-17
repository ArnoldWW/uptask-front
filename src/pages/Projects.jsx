import { Link } from "react-router-dom";
import useProjectProvider from "../hooks/useProjectProvider";
import { useEffect } from "react";

const Projects = () => {
  const { projects, getProjects } = useProjectProvider();

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <div className="my-14">
        <h1 className="font-bold text-4xl m-0 text-center">My projects</h1>
        <ul className="bg-white my-5">
          {projects.map((project) => (
            <li
              className="flex justify-between items-center border-b p-5"
              key={project._id}
            >
              <div>
                <h2 className="text-xl font-bold">{project.name}</h2>
                <span>{project.client}</span>
              </div>

              <Link className="btn" to={`${project._id}`}>
                See Project
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/projects/new-project"
          className="btn text-center w-full block"
        >
          Create new Project
        </Link>
      </div>
    </>
  );
};

export default Projects;
