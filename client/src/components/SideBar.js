import { IoIosPerson } from "react-icons/io";
import { RiUserSearchFill } from "react-icons/ri";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdWork, MdOutlinePendingActions } from "react-icons/md"
import { NavLink } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi"

const SideBar = () => {
    return(
        <div className="w-58 bg-slate-800 pt-10 col-span-1">
           <SideBarNav />
        </div>
    )
}

const SideBarNav = () => {
    const activeClass = "flex gap-x-2 pl-4 p-3 bg-slate-600 leading-7 align-middle"
    const hoverClass = "flex gap-x-2 pl-4 p-3 hover:bg-slate-700 leading-7 align-middle"

    return (
        <div className="flex flex-col w-full">
            <NavLink className="flex gap-x-2 pl-4 p-3 bg-slate-400 mb-1">
                <HiMenuAlt2 className="text-2xl" />
                <h2 className="text-white font-medium">Freelancer Menu</h2>
            </NavLink>

            <NavLink to="/freelancer" className={({isActive}) => (isActive ? activeClass : hoverClass)}>
                <IoIosPerson className="text-2xl text-slate-500" />
                <h2 className="text-white font-medium">Become a Freelancer</h2>
            </NavLink>
            <NavLink to="/find-work" className={({isActive}) => (isActive ? activeClass : hoverClass)}>
                <AiOutlineFileSearch className="text-2xl text-slate-500" />
                <h2 className="text-white font-medium">Find Work</h2>
            </NavLink>
            <NavLink to="/my-projects" className={({isActive}) => (isActive ? activeClass : hoverClass)}>
                <MdOutlinePendingActions className="text-2xl text-slate-500" />
                <h2 className="text-white font-medium">My Projects</h2>
            </NavLink>

            <NavLink className="flex gap-x-2 pl-4 p-3 bg-slate-400 mt-2 mb-1">
                <HiMenuAlt2 className="text-2xl" />
                <h2 className="text-white font-medium">Employer Menu</h2>
            </NavLink>

            <NavLink to="/employer" className={({isActive}) => (isActive ? activeClass : hoverClass)}>
                <IoIosPerson className="text-2xl text-slate-500" />
                <h2 className="text-white font-medium">Become a Employer</h2>
            </NavLink>
            <NavLink to="/find-candidate" className={({isActive}) => (isActive ? activeClass : hoverClass)}>
                <RiUserSearchFill className="text-2xl text-slate-500" />
                <h2 className="text-white font-medium">Find Candidates</h2>
            </NavLink>
            <NavLink to="/post-project" className={({isActive}) => (isActive ? activeClass : hoverClass)}>
                <MdWork className="text-2xl text-slate-500" />
                <h2 className="text-white font-medium">Post Project</h2>
            </NavLink>
        </div>    
    )
}

export default SideBar
export { SideBarNav }