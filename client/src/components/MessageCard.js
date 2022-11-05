function MessageCard({ message, sender, connection}) {
	return (
		<div className="w-full">
			<div className="pr-20 pl-20 mt-4">
				<div className="card w-full bg-base-100 shadow-xl">
					<div className="p-4 flex flex-col">
                        <div className={`text-${sender === connection.account ? "right" : "left"}`}>{ message }</div>
					</div>
				</div>
			</div>
        </div>
	)
}

export default MessageCard