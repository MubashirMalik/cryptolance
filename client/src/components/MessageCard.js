import { useEffect, useState } from "react"
import { getUser } from "../services/user.service"

function MessageCard({ message, sender, connection, accountType}) {
    const [user, setUser] = useState({})

    useEffect(() => {
        getUser(sender, accountType)
        .then(res =>  {
            if (!res) {
                console.log("Something went wrong..")
            } else {
                console.log(res)
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
                            <div className="">{ message }</div>
                        </div>
					</div>
				</div>
			</div>
        </div>
	)
}

export default MessageCard