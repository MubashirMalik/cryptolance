import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProjects } from "../services/project.service";
import ProjectCard from "./ProjectCard";
import { SideBarNav } from "./SideBar";

const MyProjects = ({ connection }) => {
    const [projects, setProjects] = useState([])
    const viewType = useParams().viewType;
    
    useEffect(() => {
        if (connection && connection.account) {
            getUserProjects(connection.account, viewType)
            .then(res =>  {
                if (!res) {
                    console.log("Something went wrong..")
                } else {
                    setProjects(res)
                }
            })
        }
    }, [connection, viewType])

    const displayProjects = projects.map((project) => <ProjectCard 
        {...project} key={project._id} viewType={viewType}
    />)

    return (
        <div className="max-w-screen grid grid-flow-col grid-cols-4">
            <div className="w-50 bg-slate-800 pt-10 col-span-1 min-h-screen">
               <SideBarNav viewType={viewType} connection={connection} />
            </div>
            {
                connection.account ? 
                    <div className="bg-slate-900 col-span-3 new-bg">
                         <h1 className="pl-10 pt-10 text-3xl font-bold underline text-center">Your Projects and Work History</h1>
                        { projects.length === 0 ?
                            <h2 className="pl-10 pt-10 text-lg text-white">No projects found.</h2>
                            :
                            displayProjects
                        }
                    </div> 
                :
                    <div className="bg-slate-900 col-span-3 flex justify-center items-center">
                        <h1>You have no accounts connected. Please see How it works section for more information</h1>
                    </div>
            }
        </div >
    );
}

export default MyProjects;