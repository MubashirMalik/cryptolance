import { useState } from "react";
import CountrySelect from "./CountrySelect";
import CategorySelect from "./CategorySelect"
import SideBar from "./SideBar";

const Freelancer = ({connection}) => {
    const [formData, setFormData] = useState({
        fullName: "",
        jobTitle: "",
        email: "",
        hourlyRate: 0.2,
        country: "Afghanistan",
        category: "Web, Mobile & Software Dev",
        bio: ""
    })

    const handleChange = (event) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <div className="h-screen max-w-screen grid grid-flow-col grid-cols-4 gap-4">
            <SideBar />
            {
                connection.isConnected ? 
                    <div className="bg-slate-900 col-span-3">
                        <h1 className="pt-10">Enter Details to Become a Freelancer</h1>
                        <form action="" method="post" className="w-full">
                            <div className="form-control p-10 pr-20 pl-20">
                                <label className="label">
                                    <span className="label-text text-slate-300">Your Name</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="fullName"
                                    placeholder="Ahmed Yar Khan" 
                                    className="input input-bordered w-full max-w-screen" 
                                    value={formData.fullName} 
                                    onChange={handleChange} 
                                />
                                <label className="label">
                                    <span className="label-text text-slate-300">Your Email</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="email"
                                    placeholder="Your email will be stored on public blockchain" 
                                    className="input input-bordered w-full max-w-screen" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                />
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
                                    <span className="label-text text-slate-300">Job Title</span>
                                </label>
                                <input 
                                    type="text"
                                    name="jobTitle" 
                                    placeholder="Web Developer" 
                                    className="input input-bordered w-full max-w-screen" 
                                    value={formData.jobTitle} 
                                    onChange={handleChange} 
                                />
                                <label className="label">
                                    <span className="label-text text-slate-300">Hourly Rate (Ether)</span>
                                </label>
                                <input 
                                    type="number" 
                                    min={0.001} step={0.001} 
                                    className="input input-bordered w-full max-w-screen" 
                                    value={formData.hourlyRate} 
                                    onChange={handleChange}
                                />
                                <label className="label">
                                    <span className="label-text text-slate-300">Category</span>
                                </label>
                                <CategorySelect 
                                    handleChange={handleChange}
                                    selectedCountry={formData.category}
                                />
                                <label className="label">
                                    <span className="label-text text-slate-300">Country</span>
                                </label>
                                <CountrySelect 
                                    handleChange={handleChange}
                                    selectedCountry={formData.country}
                                /> 
                                {/* <select className="select select-bordered" value={country} onChange={(e) => setCountry(e.target.value)}>
                                    
                                </select> */}
                                <label className="label">
                                    <span className="label-text text-slate-300">Bio</span>
                                </label>
                                <textarea 
                                    className="textarea textarea-bordered"
                                    name="bio" 
                                    cols={5} rows={5} 
                                    placeholder="Tell us a little about yourself" 
                                    onChange={handleChange}
                                    value={formData.bio}
                                />
                            </div>
                            <button className="btn text-white mb-10">Submit Details</button>
                        </form>
                    </div> 
                :
                    <div className="bg-slate-900 col-span-3 flex justify-center items-center">
                        <h1>You have no accounts connected. Please see How it works section for more information</h1>
                    </div>
            }
        </div >
    );
}

export default Freelancer;