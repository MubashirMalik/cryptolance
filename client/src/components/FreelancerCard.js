import { AiFillStar } from "react-icons/ai"
import { SiEthereum } from "react-icons/si"
import { GoLocation } from "react-icons/go"
import React from 'react'

function FreelancerCard() {
	return (
		<div className="w-full">
			<div className="m-10">
				<div className="card w-full bg-base-100 shadow-xl mb-4">
					<div className="p-10 pt-7 pb-7 flex flex-col gap-y-1">
						<div className="flex justify-between">
							<h2 className="text-2xl font-bold">Mubashir Ahmed</h2>
							<div className="flex items-center">
								<SiEthereum />
								<div className="flex ">0.2 ether per hour</div>
							</div>
						</div>
						<div className="flex justify-between">
							<h3 className="flex justify-start text-md">Fullstack Blockchain Developer</h3>
							<div className="flex items-center gap-x-1"><GoLocation />Pakistan</div>
						</div>
						
						<div className="flex justify-between">
							<div>0x0eB74ebD4Edb10BCB272957604E677408fe38466</div>
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
						<h3 className="flex justify-start text-md mt-4 mb-2 font-semibold">Categories & Skills</h3> 
						<div className="flex gap-x-1">	
							<div className="bg-pink-100 p-1 pl-4 pr-4 rounded-full text-sm">Web</div>
							<div className="bg-pink-100 p-1 pl-4 pr-4 rounded-full text-sm">React</div>
							<div className="bg-pink-100 p-1 pl-4 pr-4 rounded-full text-sm">Legal</div>	
						</div>
						<h3 className="flex justify-start text-md mt-4 mb-2 font-semibold">Speaks</h3> 
						<div className="flex gap-x-1">
							<div className="bg-pink-100 p-1 pl-4 pr-4 rounded-full text-sm">English</div>
						</div>
						<div className="flex justify-end">
							<button className="btn">Connect for Work</button>
						</div>
						
					</div>
				</div>
			</div>
        </div>
	)
}

export default FreelancerCard