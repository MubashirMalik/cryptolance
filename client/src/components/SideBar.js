import { SiFreelancer } from "react-icons/si";
import { IoIosPerson } from "react-icons/io";
import { RiUserSearchFill } from "react-icons/ri";
import { AiOutlineFileSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

const SideBar = () => {
    return(
        <div className="w-58 bg-slate-800 pt-10 col-span-1">
            <Link to="/freelancer" className="flex justify-start items-center bg-slate-600 pl-4 p-2">
                <SiFreelancer className="text-4xl text-slate-500" />
                <h2 className="text-white font-medium">Become a Freelancer</h2>
            </Link>
            <Link to="/employer" className="flex justify-start items-center hover:bg-slate-700 pl-4 p-2">
                <IoIosPerson className="text-4xl text-slate-500" />
                <h2 className="text-white font-medium">Become a Employer</h2>
            </Link>
            <Link to="/findWork" className="flex justify-start items-center hover:bg-slate-700 pl-4 p-2">
                <AiOutlineFileSearch className="text-4xl text-slate-500" />
                <h2 className="text-white font-medium">Find Work</h2>
            </Link>
            <Link to="/findCandidate" className="flex justify-start items-center hover:bg-slate-700 pl-4 p-2">
                <RiUserSearchFill className="text-4xl text-slate-500" />
                <h2 className="text-white font-medium">Find Candidates</h2>
            </Link>
        </div>
    )
}

export default SideBar