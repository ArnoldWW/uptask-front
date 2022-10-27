import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProjectProvider from "../hooks/useProjectProvider";

const Project = () => {
  const params = useParams();
  const { getProject, project, loadingProject } = useProjectProvider();
  let shouldFetch = true;

  useEffect(() => {
    if (shouldFetch) {
      getProject(params.id);
    }
    console.log(loadingProject);

    return () => {
      shouldFetch = false;
    };
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
      <h1 className="font-bold text-4xl m-0 text-center">
        Project - {project.name}
      </h1>
    </div>
  );
};

export default Project;
