import { useEffect, useState } from "react"
import { getUser } from "../services/user.service"
import { downloadFile } from "../services/message.service";
import {IoDocumentAttachOutline} from "react-icons/io5"
import fileDownload from 'js-file-download';

function MessageCard({ _id, message, sender, connection, accountType}) {
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
                            <div className="">
                                { 
                                    message === "Attachment" ? 
                                        <div className="flex gap-x-1">
                                            <IoDocumentAttachOutline className="text-xl text-slate-500"/>
                                            <h2 className="" onClick={handleDownloadFile}>Contains Attachment</h2>
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