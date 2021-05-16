import "./Header.css";
import { FaBook } from "react-icons/fa";

const Header = () => {
  return (
    <span onClick={() => window.scroll(0, 0)} className="header">
      <FaBook className="icon" />
      Riachuelo Books
    </span>
  );
};

export default Header;
