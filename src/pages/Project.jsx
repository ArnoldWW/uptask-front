import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NewTaskModal from "../components/NewTaskModal";
import useProjectProvider from "../hooks/useProjectProvider";

const Project = () => {
  const params = useParams();
  const { project, taskModal, getProject, loadingProject, setTaskModal } =
    useProjectProvider();

  useEffect(() => {
    getProject(params.id);
    console.log(project);
  }, []);

  if (loadingProject) {
    return (
      <div className="my-14">
        <h1 className="font-bold text-4xl m-0 text-center">...</h1>
      </div>
    );
  }

  return (
    <>
      <section className="mb-10 md:flex md:justify-between md:items-center md:gap-4">
        <div className="md:flex-grow mb-5 md:mb-0">
          <h1 className="text-center font-bold text-4xl capitalize mb-5 md:text-left">
            Project and tasks
          </h1>
          <h2 className="text-center font-bold text-2xl mb-4 md:m-0 md:text-left">
            {project.name}
          </h2>
        </div>

        <Link to={`/projects/edit/${params.id}`} className="btn-w-icon">
          Edit
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
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </Link>
      </section>

      <ul className="bg-white my-5 border">
        <li className="flex justify-between items-center border-b p-5">
          task #1
        </li>

        <li className="flex justify-between items-center border-b p-5">
          task #1
        </li>

        <li className="flex justify-between items-center border-b p-5">
          task #1
        </li>
      </ul>

      <button
        className="btn text-center w-full block"
        onClick={() => {
          setTaskModal(true);
        }}
      >
        Add new task
      </button>

      <NewTaskModal />
    </>
  );
};

export default Project;
