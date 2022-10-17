import { useContext } from "react";
import ProjectContext from "../context/ProjectProvider";

const useProjectProvider = () => {
  return useContext(ProjectContext);
};

export default useProjectProvider;
