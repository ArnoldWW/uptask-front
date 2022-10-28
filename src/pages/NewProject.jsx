import ProjectForm from "../components/ProjectForm";

const NewProject = () => {
  return (
    <div className="my-14">
      <h1 className="font-bold text-4xl mb-10 text-center">
        Create new project
      </h1>

      <ProjectForm />
    </div>
  );
};

export default NewProject;
