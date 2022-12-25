import { useState, useEffect } from "react";
import { getFreelancers } from "../services/user.service";
import CategorySelect from "./CategorySelect";
import CountrySelect from "./CountrySelect";
import FreelancerCard from "./FreelancerCard";
import LanguageSelect from "./LanguageSelect";
import { SideBarNav } from "./SideBar";

const FindCandidate = ({ connection }) => {
    const [freelancers, setFreelancers] = useState([])
    const [filteredFreelancers, setFilteredFreelancers] = useState([])

    const [formData, setFormData] = useState({
        category: "Web, Mobile & Software Dev",
        language: "Afrikaans",
        country: "Afghanistan",
        minHourlyRate: "",
        maxHourlyRate: ""
    })

    const handleChange = (event) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [event.target.name]: event.target.value
        }))
    }

    const filterFreelancers = () => {
        setFilteredFreelancers(
            freelancers.filter(freelancer => { 
                const result = freelancer.category === formData.category && freelancer.country === formData.country && freelancer.language === formData.language
                if (formData.minHourlyRate === "" || formData.maxHourlyRate === "") {
                    return result
                } 
                const hourlyRate = parseFloat(freelancer.hourlyRate)
                const minHourlyRate = parseFloat(formData.minHourlyRate)
                const maxHourlyRate = parseFloat(formData.maxHourlyRate)
                return result && hourlyRate <= maxHourlyRate && hourlyRate >= minHourlyRate 
            })
        )
    }

    useEffect(() => {
        getFreelancers()
        .then(res =>  {
            if (!res) {
                console.log("Something went wrong..")
            } else {
                setFreelancers(res)
                setFilteredFreelancers(res)
            }
        })
    }, [])

    const displayFreelancers = filteredFreelancers.map((freelancer) => <FreelancerCard {...freelancer} key={freelancer._id} />)

    return (
        <div className="max-w-screen grid grid-flow-col grid-cols-4">
            <div className="flex flex-col items-center w-58 gap-y-8 bg-slate-800 pt-10 col-span-1">
                <SideBarNav />
                <div className="flex flex-col bg-slate-900 p-4 bg-opacity-60 rounded-lg w-11/12 mb-10">
                    <h1 className="p-2">Filter Results</h1>
                    <label className="label">
                        <span className="label-text text-slate-300">Category</span>
                    </label>
                    <CategorySelect 
                        handleChange={handleChange}
                        selectedCategory={formData.category}
                    />
                    <label className="label">
                        <span className="label-text text-slate-300">Min. Hourly Rate (ether)</span>
                    </label>
                    <input 
                        type="text"
                        name="minHourlyRate" 
                        placeholder="0.1" 
                        className="input input-bordered" 
                        onChange={handleChange}
                        value={formData.minHourlyRate}
                    />
                    <label className="label">
                        <span className="label-text text-slate-300">Max. Hourly Rate (ether)</span>
                    </label>
                    <input 
                        type="text"
                        name="maxHourlyRate" 
                        placeholder="5.3" 
                        className="input input-bordered" 
                        onChange={handleChange}
                        value={formData.maxHourlyRate}
                    />
                    <label className="label">
                        <span className="label-text text-slate-300">Country</span>
                    </label>
                    <CountrySelect 
                        handleChange={handleChange}
                        selectedCountry={formData.country}
                    />
                    <label className="label mt-2">
                        <span className="label-text text-slate-300">Language</span>
                    </label>
                    <LanguageSelect 
                        handleChange={handleChange}
                        selectedLanguage={formData.language}
                    />
                    <button className="btn w-50 mt-4" onClick={filterFreelancers}>Save Preferences</button>
                    <button className="btn w-50 mt-4" onClick={() => setFilteredFreelancers(freelancers)}>Reset</button>
                </div>
            </div>
            {
                connection.account ? 
                    <div className="bg-slate-900 col-span-3 new-bg">
                        <h1 className="text-center pt-10 pb-5 text-3xl font-bold underline">Choose from List of Freelancers</h1>
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