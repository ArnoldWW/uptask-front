import { Link } from "react-router-dom";
import useAuthProvider from "../hooks/useAuthProvider";

const Header = () => {
  const { auth } = useAuthProvider();

  return (
    <header className="bg-white p-5 border-b">
      <div className="flex gap-5 custom-container flex-col md:flex-row justify-center md:justify-between items-center">
        <h2 className="text-2xl font-bold">UpTask</h2>

        <nav className="flex items-center gap-5 overflow-x-auto">
          <Link to="/projects" className="hover:underline block capitalize">
            My Projects
          </Link>
          <span>User: {auth.name}</span>
          <button className="btn">Log Out</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
