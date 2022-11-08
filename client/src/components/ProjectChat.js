import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { createToast } from "../Util";
import { AiFillStar } from "react-icons/ai"
import { releasePayment, completeProject } from "../Web3Client";
import { updateProject } from "../services/project.service";
import { SiEthereum } from "react-icons/si"
import { getMessages, postMessage } from "../services/message.service";
import { getProject } from "../services/project.service";
import { SideBarNav } from "./SideBar";
import MessageCard from "./MessageCard";

const ProjectChat = ({ connection }) => {
    const [messages, setMessages] = useState([])
    const [project, setProject] = useState({})
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
        
        formData.sender = connection.account
        postMessage(formData)
        .then(res =>  {
            if (!res) {
                console.log("Something went wrong..")
            } else {
                setMessages(prevMessages => [...prevMessages, res])
                createToast({text: "Posted successfully."})
            }
        })
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

    const displayMessages = messages.map((message) => <MessageCard {...message} key={message._id} connection={connection} accountType={message.sender === project.walletAddress ? "Employer" : "Freelancer"}
    />)

    return (
        <div className="max-w-screen grid grid-flow-col grid-cols-4 gap-4">
            <div className="w-50 bg-slate-800 pt-10 col-span-1">
               <SideBarNav />
            </div>
            {
                connection.account ? 
                    <div className="bg-slate-900 col-span-3">
                        <ProjectCard {...project} connection={connection} />
                        <h1 className="pl-10 pt-10 text-2xl font-bold text-center">Project Chat</h1>
                        { messages.length === 0 ?
                            <div className="bg-slate-900 col-span-3 flex justify-center items-center mb-4">
                                <h1>No messages found. You can send a message by typing and pressing the send button.</h1>
                            </div> :
                            displayMessages
                        }
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
                                <div className="flex ">{ budget } ether per hour</div>
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
                                    <div className="flex items-center">
                                        <AiFillStar />
                                        <AiFillStar />
                                        <AiFillStar />
                                        <AiFillStar />
                                        <AiFillStar />
                                    </div>	
                                    <div className="flex items-center">0 feedbacks</div>
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

export default ProjectChat