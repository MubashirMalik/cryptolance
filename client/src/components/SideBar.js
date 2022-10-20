import { IoIosPerson } from "react-icons/io";
import { RiUserSearchFill } from "react-icons/ri";
import { AiOutlineFileSearch } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const SideBar = () => {
    return(
        <div className="w-58 bg-slate-800 pt-10 col-span-1">
           <SideBarNav />
        </div>
    )
}

const SideBarNav = () => {
    const activeClass = "flex justify-start items-end gap-x-2 pl-4 p-4 bg-slate-600"
    const hoverClass = "flex justify-start items-end gap-x-2 pl-4 p-4 hover:bg-slate-700"

    return (
        <>
            <NavLink to="/freelancer" className={({isActive}) => (isActive ? activeClass : hoverClass)}>
                <IoIosPerson className="text-3xl text-slate-500" />
                <h2 className="text-white font-medium">Become a Freelancer</h2>
            </NavLink>
            <NavLink to="/employer" className={({isActive}) => (isActive ? activeClass : hoverClass)}>
                <IoIosPerson className="text-3xl text-slate-500" />
                <h2 className="text-white font-medium">Become a Employer</h2>
            </NavLink>
            <NavLink to="/findWork" className={({isActive}) => (isActive ? activeClass : hoverClass)}>
                <AiOutlineFileSearch className="text-3xl text-slate-500" />
                <h2 className="text-white font-medium">Find Work</h2>
            </NavLink>
            <NavLink to="/findCandidate" className={({isActive}) => (isActive ? activeClass : hoverClass)}>
                <RiUserSearchFill className="text-3xl text-slate-500" />
                <h2 className="text-white font-medium">Find Candidates</h2>
            </NavLink>
        </>    
    )
}

export default SideBar
export { SideBarNav }