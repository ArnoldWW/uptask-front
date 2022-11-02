import { Link } from "react-router-dom";
import useProjectProvider from "../hooks/useProjectProvider";
import { useEffect } from "react";

const Projects = () => {
  const { projects, getProjects } = useProjectProvider();

  useEffect(() => {
    getProjects();
    console.log(projects.length);
  }, []);

  return (
    <>
      <h1 className="font-bold text-4xl mb-10 text-center">
        {projects.length > 0
          ? "My projects"
          : "You don't have projects created yet."}
      </h1>
      <ul className="bg-white my-5 border">
        {projects.map((project) => (
          <li
            key={project._id}
            className="flex justify-between items-center border-b p-5"
          >
            <div>
              <h2 className="text-xl font-bold">{project.name}</h2>
              <span>{project.client}</span>
            </div>

            <Link className="btn-w-icon" to={`${project._id}`}>
              See Project
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/projects/new-project" className="btn text-center w-full block">
        Create new Project
      </Link>
    </>
  );
};

export default Projects;
