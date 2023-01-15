import { Link } from "react-router-dom";
import useAuthProvider from "../hooks/useAuthProvider";
import Logo from "/logo.svg";

const Header = () => {
  const { auth } = useAuthProvider();

  return (
    <header className="bg-white p-5 border-b">
      <div className="flex gap-5 main-container flex-col md:flex-row justify-center md:justify-between items-center">
        <Link to="/projects">
          <img src={Logo} />
        </Link>
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
