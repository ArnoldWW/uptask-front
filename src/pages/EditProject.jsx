import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import useProjectProvider from "../hooks/useProjectProvider";

const EditProject = () => {
  const params = useParams();
  const { getProject, project, loadingProject } = useProjectProvider();

  useEffect(() => {
    getProject(params.id);
  }, []);

  if (loadingProject) {
    return (
      <div className="my-14">
        <h1 className="font-bold text-4xl m-0 text-center">...</h1>
      </div>
    );
  }

  return (
    <div className="my-14">
      <div className="md:flex md:justify-between md:gap-4 md:items-center mb-10">
        <div>
          <h1 className="text-center font-bold text-4xl capitalize mb-5 md:text-left">
            Edit project
          </h1>
          <h2 className="text-center font-bold text-2xl mb-4 md:m-0 md:text-left">
            {project.name}
          </h2>
        </div>

        <Link to={`/projects/${params.id}`} className="btn-w-icon">
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
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          Back to project
        </Link>
      </div>

      <ProjectForm />
    </div>
  );
};

export default EditProject;
