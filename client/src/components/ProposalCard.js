import { AiFillStar } from "react-icons/ai"
import { SiEthereum } from "react-icons/si"
import React from 'react'

function ProposalCard({ number, walletAddress, amount, description, projectOwner, connection }) {
	return (
		<div className="w-full">
			<div className="m-10">
				<div className="card w-full bg-base-100 shadow-xl mb-4">
					<div className="p-10 pt-7 pb-7 flex flex-col gap-y-1">
						<div className="flex justify-between">
							<h2 className="text-2xl font-bold">Proposal # { number }</h2>
							<div className="flex items-center">
								<b>Amount:</b>&nbsp;<SiEthereum />
								<div className="flex ">{ amount } ether</div>
							</div>
						</div>
                        <div className="flex flex-col items-start mt-3">
                            <h2 className="text-lg font-semibold">Proposal Description</h2>
                            <div className="text-left">{ description }</div>
                        </div>
                        <div className="flex justify-between mt-3 mb-4">
							<div>
                                <b className="font-semibold">Posted by: </b> 
                                { walletAddress }</div>
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
                        { 
                            projectOwner === connection.account &&
                            <div className="flex justify-end gap-x-1">
                                <button className="btn">Accept Bid</button>
                            </div>
                        }   
					</div>
				</div>
			</div>
        </div>
	)
}

export default ProposalCard