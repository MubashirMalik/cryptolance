import { AiFillStar } from "react-icons/ai"
import { SiEthereum } from "react-icons/si"
import React from 'react'

function ProposalCard({ title, description, budget, category }) {
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
							<div>
                                <b className="font-semibold">Posted by: </b> 
                                0x0eB74ebD4Edb10BCB272957604E677408fe38466</div>
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
							<button className="btn">Place Bid</button>
                            <button className="btn">Proposals</button>
						</div>
						
					</div>
				</div>
			</div>
        </div>
	)
}

export default ProposalCard