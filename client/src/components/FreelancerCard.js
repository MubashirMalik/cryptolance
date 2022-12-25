import { AiFillStar } from "react-icons/ai"
import { FaStar } from "react-icons/fa"
import { SiEthereum } from "react-icons/si"
import { GoLocation } from "react-icons/go"
import React from 'react'
import { useNavigate } from "react-router-dom"

function FreelancerCard({ fullName, jobTitle, walletAddress, hourlyRate, country, category, language, ratings }) {
    const navigate = useNavigate()

    const displayRatings = () => {
        let ratingsIcon = []
        for (let i = 0; i < 5; i++) {
            if (i < ratings) {
                ratingsIcon.push(<FaStar key={i} color="orange" />)
            } else {
                ratingsIcon.push(<FaStar />)
            }
        }
        return ratingsIcon
    }

	return (
		<div className="w-full">
			<div className="m-10">
				<div className="card w-full bg-base-100 shadow-xl mb-4">
					<div className="p-10 pt-7 pb-7 flex flex-col gap-y-1">
						<div className="flex justify-between">
							<h2 className="text-2xl font-bold">{ fullName }</h2>
							<div className="flex items-center">
								<SiEthereum />
								<div className="flex ">{ hourlyRate } ether</div>
							</div>
						</div>
						<div className="flex justify-between">
							<h3 className="flex justify-start text-md">{ jobTitle }</h3>
							<div className="flex items-center gap-x-1"><GoLocation />{ country }</div>
						</div>
						
						<div className="flex justify-between">
							<div>{walletAddress}</div>
							<div className="flex items-center justify-between">
								<div className="flex gap-x-1">
									<div className="flex items-center">
                                        { displayRatings() } 
									</div>	
									<div className="flex items-center">Ratings</div>
								</div>
							</div>
						</div>
						<h3 className="flex justify-start text-md mt-4 mb-2 font-semibold">Categories & Skills</h3> 
						<div className="flex gap-x-1">
							<div className="bg-pink-100 p-1 pl-4 pr-4 rounded-full text-sm">{ category }</div>
						</div>
						<h3 className="flex justify-start text-md mt-4 mb-2 font-semibold">Speaks</h3> 
						<div className="flex gap-x-1">
							<div className="bg-pink-100 p-1 pl-4 pr-4 rounded-full text-sm">{ language }</div>
						</div>
						<div className="flex justify-end">
							<button className="btn" onClick={() => navigate(`/post-project?budget=${hourlyRate}&freelancer=${walletAddress}`)}>Connect for Work</button>
						</div>
						
					</div>
				</div>
			</div>
        </div>
	)
}

export default FreelancerCard