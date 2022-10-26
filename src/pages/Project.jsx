import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProjectProvider from "../hooks/useProjectProvider";

const Project = () => {
  const params = useParams();
  const { getProject } = useProjectProvider();

  useEffect(() => {
    getProject(params.id);
  }, []);

  return (
    <div className="my-14">
      <h1 className="font-bold text-4xl m-0 text-center">Project</h1>
    </div>
  );
};

export default Project;
