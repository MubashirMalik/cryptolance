import { useState, useEffect, memo } from "react";
import { useParams } from "react-router-dom"
import { createToast } from "../Util";
import { releasePayment, completeProject } from "../Web3Client";
import { updateProject } from "../services/project.service";
import { SiEthereum } from "react-icons/si"
import { getMessages, postMessage, postFile } from "../services/message.service";
import { getProject } from "../services/project.service";
import { SideBarNav } from "./SideBar";
import MessageCard from "./MessageCard";
import FeedbackCard from "./FeedbackCard";

const ProjectChat = ({ connection }) => {
    const [file, setFile] = useState([])
    const [messages, setMessages] = useState([])
    const [project, setProject] = useState({})
    const viewType = useParams().viewType
    const [formData, setFormData] = useState({
        message: "",
        projectId: useParams().projectId
    })

    const handleChange = (event) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        postMessage({...formData, sender: connection.account })
        .then(res =>  {
            if (!res) {
                console.log("Something went wrong..")
            } else {
                setMessages(prevMessages => [...prevMessages, res])
                createToast({text: "Posted successfully."})
            }
        })
    }

    const handleUploadFile = (event) => {
        event.preventDefault();
        postFile({file: file[0], sender: connection.account, ...formData})
        .then(res =>  {
            if (!res) {
                console.log("Something went wrong..")
            } else {
                setMessages(prevMessages => [...prevMessages, res])
            }
        })
    }

    const handleFileUploadChange = (event) => {
        event.preventDefault();
        setFile([...file, event.target.files[0]])
    }

    useEffect(() => {
        getMessages(formData.projectId)
        .then(res =>  {
            if (!res) {
                console.log("Something went wrong..")
            } else {
                setMessages(res)
            }
        })

        getProject(formData.projectId)
        .then(res =>  {
            if (!res) {
                console.log("Something went wrong..")
            } else {
                setProject(res)
            }
        })
    }, [])

    const displayMessages = messages.map((message) => 
        <MessageCard 
            {...message} 
            key={message._id} 
            connection={connection} 
            projectStatus={project.status}
            projectOwner={project.walletAddress}
    />)

    return (
        <div className="max-w-screen grid grid-flow-col grid-cols-4">
            <div className="w-50 bg-slate-800 pt-10 col-span-1">
                <SideBarNav viewType={useParams().viewType}/>
            </div>
            {
                connection.account ? 
                    <div className="bg-slate-900 col-span-3 new-bg">
                        <ProjectCard {...project} connection={connection} />

                        {   
                            // show feedback form only if
                            // project is completed
                            project.status === "Completed-II" 
                            && 
                            (
                                // freelancer has not given feedback and view is open for freelancer
                                (
                                    project.freelancerFeedback === undefined && viewType === "Freelancer"
                                )
                                ||
                                // employer has not given feedback and view is open for employer
                                (
                                    project.employerFeedback === undefined && viewType === "Employer"
                                )
                            )
                            &&
                            <FeedbackCard setProject={setProject} />
                        }

                        <h1 className="pl-10 pt-10 text-2xl font-bold text-center">Project Chat</h1>
                        { messages.length === 0 ?
                            <div className="bg-slate-900 col-span-3 flex justify-center items-center mb-4">
                                <h1>No messages found. You can send a message by typing and pressing the send button.</h1>
                            </div> :
                            displayMessages
                        }

                        {   
                            (project.status === "Completed-I" || project.status === "In-Progress") &&
                            <>
                                <form onSubmit={handleSubmit} className="w-full">
                                    <div className="form-control pr-20 pl-20">
                                        <label className="label">
                                            <span className="label-text text-slate-300">Message</span>
                                        </label>
                                        <textarea 
                                            className="textarea textarea-bordered "
                                            name="message" 
                                            cols={5} rows={4} 
                                            placeholder="Type your message" 
                                            onChange={handleChange}
                                            value={formData.message}
                                            required
                                        />
                                        <div className="flex justify-center mt-5">
                                            <button className="btn text-white mb-5">Send</button>
                                        </div>
                                    </div>
                                </form>
                                <form onSubmit={handleUploadFile}>
                                    <div className="form-control pr-20 pl-20">
                                        <div className="flex justify-center items-center w-full">
                                            <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                                    <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                </div>
                                                <input 
                                                    name="file"
                                                    onChange={handleFileUploadChange}
                                                    id="dropzone-file" 
                                                    type="file" 
                                                    className="hidden" 
                                                />
                                            </label>
                                        </div> 
                                    </div>
                                    <div className="flex justify-center mt-5">
                                        <button className="btn text-white mb-5">Upload Files</button>
                                    </div>       
                                </form>
                            </>
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

function ProjectCard({ _id, connection, title, description, budget, category, walletAddress, status, awardedTo }) {
    const handleReleasePayment = () => {
        releasePayment(_id, walletAddress)
        .then(res =>  {
            if (!res) {
                console.log("Something went wrong..")
                createToast("Transaction failed!")
            } else {
                updateProject(_id, "Completed-I")
                .then(res => {
                    if (!res) {
                        console.log("Something went wrong..")
                    } else {
                        createToast("Payment Released!")
                    }
                }) 
            }
        })
    }

    const handleReleaseWork = () => {
        completeProject(walletAddress, _id, awardedTo)
        .then(res =>  {
            if (!res) {
                console.log("Something went wrong..")
                createToast("Transaction failed!")
            } else {
                updateProject(_id, "Completed-II")
                .then(res => {
                    if (!res) {
                        console.log("Something went wrong..")
                    } else {
                        createToast("Payment Released!")
                    }
                }) 
            }
        })
    }

    return(
        <div className="w-full">
            <div className="m-10">
                <div className="card w-full bg-base-100 shadow-xl mb-4">
                    <div className="p-10 pt-7 pb-7 flex flex-col gap-y-1">
                        <div className="flex justify-between">
                            <h2 className="text-2xl font-bold">{ title }</h2>
                            <div className="flex items-center">
                                <SiEthereum />
                                <div className="flex ">{ budget } ether  </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start mt-3">
                            <h2 className="text-lg font-semibold">Project Details</h2>
                            <div className="text-left">{ description }</div>
                        </div>
                        <h3 className="flex justify-start text-md mt-3 mb-2 font-semibold">Categories & Skills</h3> 
                        <div className="flex gap-x-1">
                            <div className="bg-pink-100 p-1 pl-4 pr-4 rounded-full text-sm">{ category }</div>
                        </div>
                        <div className="flex justify-between mt-3 mb-4">
                            <div><b className="font-semibold">Posted by: </b>{walletAddress}</div>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-x-1">
                                    <div className="flex items-center"><b>Status:&nbsp;</b> { status }</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-x-1">
                            {
                                connection.account === walletAddress && status === "In-Progress"? 
                                    <button className="btn" onClick={handleReleasePayment}>Release Payment</button>
                                :
                                connection.account !== walletAddress &&status === "Completed-I" && <button className="btn" onClick={handleReleaseWork}>Release Work</button>
                            } 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default memo(ProjectChat)