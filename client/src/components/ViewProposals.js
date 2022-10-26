import { useState, useEffect } from "react";
import { getProposals } from "../services/proposal.service";
import ProposalCard from "./ProposalCard";
import { SideBarNav } from "./SideBar";


const ViewProposals = ({ connection }) => {
    const [proposals, setProposals] = useState([])

    useEffect(() => {
        getProposals()
        .then(res =>  {
            if (!res) {
                console.log("Something went wrong..")
            } else {
                setProposals(res)
            }
        })
    }, [])

    const displayProposals = proposals.map((proposal) => <ProposalCard {...proposal} key={proposal._id} />)

    return (
        <div className="max-w-screen grid grid-flow-col grid-cols-4 gap-4">
            <div className="w-50 bg-slate-800 pt-10 col-span-1">
               <SideBarNav />
            </div>
            {
                connection.account ? 
                    <div className="bg-slate-900 col-span-3">
                        <h1 className="pl-10 pt-10 text-2xl font-bold">Proposals</h1>
                        { displayProposals }
                    </div> 
                :
                    <div className="bg-slate-900 col-span-3 flex justify-center items-center">
                        <h1>You have no accounts connected. Please see How it works section for more information</h1>
                    </div>
            }
        </div >
    );
}

export default ViewProposals