import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import useProjectProvider from "../hooks/useProjectProvider";

const EditProject = () => {
  const params = useParams();
  const { project, loadingProject, getProject, deleteProject } =
    useProjectProvider();

  useEffect(() => {
    getProject(params.id);
  }, []);

  const handleClick = () => {
    const isConfirm = confirm("Do you want delete this project?");

    if (isConfirm) {
      deleteProject(project._id);
    }
  };

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
        <div className="md:flex-grow mb-5 md:mb-0">
          <h1 className="text-center font-bold text-4xl capitalize mb-5 md:text-left">
            Edit project
          </h1>
          <h2 className="text-center font-bold text-2xl md:text-left">
            {project.name}
          </h2>
        </div>

        <div>
          <Link
            to={`/projects/${params.id}`}
            className="hover:underline flex gap-1 mb-5"
          >
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

          <button className="btn-w-icon w-full md:w-auto" onClick={handleClick}>
            Delete project
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>

      <ProjectForm />
    </div>
  );
};

export default EditProject;
