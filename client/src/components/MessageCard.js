import { useEffect, useState } from "react"
import { getUser } from "../services/user.service"
import { downloadFile } from "../services/message.service";
import {IoDocumentAttachOutline} from "react-icons/io5"
import {AiFillWarning} from "react-icons/ai"
import fileDownload from 'js-file-download';

function MessageCard({ _id, message, sender, connection, accountType, projectStatus, projectOwner}) {
    const [user, setUser] = useState({})

    const handleDownloadFile = async () => {
        downloadFile(_id)
        .then(res => {
            if (!res) {
                console.log("Something went wrong..")
            } else {
                fileDownload(new Blob([res.file.data.data]), res.file.name)
            }
        })
    }

    useEffect(() => {
        getUser(sender, accountType)
        .then(res =>  {
            if (!res) {
                console.log("Something went wrong..")
            } else {
                setUser(res)
            }
        })
    }, [])

    const messageClass = sender === connection.account ? "items-end" : "items-left"
	return (
		<div className="w-full">
			<div className="pr-20 pl-20 mt-4">
				<div className="card w-full bg-base-100 shadow-xl">
					<div className="p-4 flex flex-col ">
                        <div className={`flex flex-col ${messageClass}`}>
                            <div className="font-semibold text-teal-500">{ user.fullName }</div> 
                            <div className="flex">
                                { 
                                    message === "Attachment" ? 
                                        <div className="flex flex-col gap-y-1 justify-center">
                                            <button
                                                type="button"
                                                className="btn text-white my-2" 
                                                onClick={handleDownloadFile}
                                                disabled={
                                                    projectStatus === "In-Progress"
                                                    &&
                                                    // employer files are not protected
                                                    sender !== projectOwner
                                                }
                                                >
                                                    <IoDocumentAttachOutline className="text-xl text-slate-500"/>
                                                    Contains Attachment
                                            </button>
                                            { 
                                                // employer files are not protected
                                                sender !== projectOwner
                                                &&
                                                projectStatus === "In-Progress" 
                                                && 
                                                // project owner should see only
                                                projectOwner === connection.account ? 
                                                <div className="flex items-center">
                                                    <AiFillWarning/>
                                                    <span>View only mode: You can download the file after releasing payment</span>
                                                </div> : ""
                                            }
                                        </div>
                                    :
                                    message  
                                }
                            </div>
                        </div>
					</div>
				</div>
			</div>
        </div>
	)
}

export default MessageCard