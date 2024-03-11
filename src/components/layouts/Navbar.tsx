import { LuBadgePercent } from "react-icons/lu";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { FaRobot } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="sticky bottom-0 bg-black flex justify-around items-center py-4 border-t border-white/30 mt-5">
      <IoMdSettings size={30} />
      <LuBadgePercent size={30} />
      <FaCircleCheck size={27} />
      <AiFillPlusCircle size={30} />
      <FaRobot size={32} />
      <FaBell size={27} />
    </nav>
  );
};

export default Navbar;
