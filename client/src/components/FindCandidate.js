import { useState, useEffect } from "react";
import { getFreelancers } from "../services/user.service";
import CategorySelect from "./CategorySelect";
import CountrySelect from "./CountrySelect";
import FreelancerCard from "./FreelancerCard";
import LanguageSelect from "./LanguageSelect";
import { SideBarNav } from "./SideBar";

const FindCandidate = ({ connection }) => {
    const [freelancers, setFreelancers] = useState([])

    useEffect(() => {
        getFreelancers()
        .then(res =>  {
            if (!res) {
                console.log("Something went wrong..")
            } else {
                setFreelancers(res)
            }
        })
    }, [])

    const displayFreelancers = freelancers.map((freelancer) => <FreelancerCard {...freelancer} />)

    return (
        <div className="h-screen max-w-screen grid grid-flow-col grid-cols-4 gap-4">
            <div className="flex flex-col items-center w-58 gap-y-8 bg-slate-800 pt-10 col-span-1">
                <SideBarNav />
                <div className="flex flex-col bg-slate-900 p-4 bg-opacity-60 rounded-lg w-11/12">
                    <h1 className="p-2">Filter Results</h1>
                    <label className="label">
                        <span className="label-text text-slate-300">Category</span>
                    </label>
                    <CategorySelect />
                    <label className="label">
                        <span className="label-text text-slate-300">Min. Hourly Rate (ether)</span>
                    </label>
                    <input 
                        type="text"
                        name="jobTitle" 
                        placeholder="0.1" 
                        className="input input-bordered" 
                        required
                    />
                    <label className="label">
                        <span className="label-text text-slate-300">Max. Hourly Rate (ether)</span>
                    </label>
                    <input 
                        type="text"
                        name="jobTitle" 
                        placeholder="5.3" 
                        className="input input-bordered" 
                        required
                    />
                    <label className="label">
                        <span className="label-text text-slate-300">Country</span>
                    </label>
                    <CountrySelect />
                    <label className="label mt-2">
                        <span className="label-text text-slate-300">Language</span>
                    </label>
                    <LanguageSelect />
                    <button className="btn w-50 mt-4">Save Preferences</button>
                </div>
            </div>
            {
                connection.account ? 
                    <div className="bg-slate-900 col-span-3">
                        <h1 className="pt-10 text-2xl font-bold">Find Candidates that fit your need</h1>
                        { displayFreelancers }
                    </div> 
                :
                    <div className="bg-slate-900 col-span-3 flex justify-center items-center">
                        <h1>You have no accounts connected. Please see How it works section for more information</h1>
                    </div>
            }
        </div >
    );
}

export default FindCandidate;