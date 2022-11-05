import { AiFillStar } from "react-icons/ai"
import { SiEthereum } from "react-icons/si"
import { useNavigate } from "react-router-dom"

function ProjectCard({ _id, title, status, description, budget, category, walletAddress }) {
    const navigate = useNavigate()
	return (
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
                            { status === "Open" ?
                                <>
                                    <button className="btn" onClick={() => navigate(`/view-proposals/${walletAddress}/${_id}`)}>Place Bid</button>
                                    <button className="btn" onClick={() => navigate(`/view-proposals/${walletAddress}/${_id}`)}>Proposals</button>
                                </>
                            :
                                <button className="btn" onClick={() => navigate(`/project-chat/${_id}`)}>View Discussions</button>
                            }
						</div>
					</div>
				</div>
			</div>
        </div>
	)
}

export default ProjectCard