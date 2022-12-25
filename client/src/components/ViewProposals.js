import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createToast } from "../Util";
import { getProposals, postProposal } from "../services/proposal.service";
import ProposalCard from "./ProposalCard";
import { SideBarNav } from "./SideBar";


const ViewProposals = ({ connection }) => {
    const [proposals, setProposals] = useState([])
    const [formData, setFormData] = useState({
        amount: 0,
        description: "",
        projectId: useParams().projectId,
        projectOwner: useParams().projectOwner
    })

    const handleChange = (event) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        formData.walletAddress = connection.account
        postProposal(formData)
        .then(res =>  {
            if (!res) {
                console.log("Something went wrong..")
            } else {
                setProposals(prevProposals => [...prevProposals, res])
                createToast({text: "Posted successfully."})
            }
        })
    }
    useEffect(() => {
        getProposals(formData.projectId)
        .then(res =>  {
            if (!res) {
                console.log("Something went wrong..")
            } else {
                setProposals(res)
            }
        })
    }, [])

    const displayProposals = proposals.map((proposal, index) => <ProposalCard {...proposal} key={proposal._id} number={index+1} connection={connection} projectId={formData.projectId} />)

    return (
        <div className="max-w-screen grid grid-flow-col grid-cols-4 min-h-screen">
            <div className="w-50 bg-slate-800 pt-10 col-span-1">
               <SideBarNav viewType={useParams().viewType}/>
            </div>
            {
                connection.account ? 
                    <div className="bg-slate-900 col-span-3 new-bg">
                        <h1 className="pl-10 pt-10 text-3xl font-bold text-center">Proposals</h1>
                        { proposals.length === 0 ?
                            <div className="bg-slate-900 col-span-3 flex justify-center items-center mb-4 new-bg">
                                <h1 className="p-5 text-black text-md font-bold">Be the first to submit a proposal. There are no proposals submitted for this project.</h1>
                            </div> :
                            displayProposals
                        }
                        { connection.account !== formData.projectOwner &&
                            <>
                                <h1 className="pl-10 text-2xl font-bold text-center">Place Bid</h1>
                                <form onSubmit={handleSubmit} className="flex justify-center">
                                    <div className="form-control w-7/12">
                                        <label className="label">
                                            <span className="label-text text-slate-300">Wallet Address [Connected]</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            disabled 
                                            className="input input-bordered w-full max-w-screen" 
                                            value={connection.account} 
                                        />
                                        <label className="label">
                                            <span className="label-text text-slate-300">Amount (Ether)</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="amount"
                                            className="input input-bordered w-full max-w-screen " 
                                            value={formData.amount} 
                                            onChange={handleChange}
                                            required
                                        />     
                                        <label className="label">
                                            <span className="label-text text-slate-300">Description</span>
                                        </label>
                                        <textarea 
                                            className="textarea textarea-bordered "
                                            name="description" 
                                            cols={5} rows={5} 
                                            placeholder="Tell us a little about yourself" 
                                            onChange={handleChange}
                                            value={formData.description}
                                            required
                                        />
                                        <div className="flex justify-center mt-5">
                                            <button className="btn text-white mb-5">Submit Proposal</button>
                                        </div>
                                    </div>
                                </form>
                            </>
                        }
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