import { useEffect, useState } from "react";
import { postUser, getUser } from "../services/user.service";
import { createToast } from "../Util"
import CountrySelect from "./CountrySelect";
import CategorySelect from "./CategorySelect"
import LanguageSelect from "./LanguageSelect";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";

const Freelancer = ({connection}) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullName: "",
        jobTitle: "",
        // email: "",
        hourlyRate: 0,
        country: "Afghanistan",
        category: "Web, Mobile & Software Dev",
        language: "Afrikaans",
        bio: "",
    })

    useEffect(() => {
        if (connection.isConnected) {
            getUser(connection.account, "Freelancer")
            .then(res =>  {
                if (!res) {
                    console.log("Something went wrong..")
                } else {
                    setFormData(res)
                }
            })
        }
    }, [connection])

    const handleChange = (event) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        formData.walletAddress = connection.account
        formData.accountType = "Freelancer"
        postUser(formData)
        .then(res =>  {
            if (!res) {
                console.log("Something went wrong..")
            } else {
                createToast({text: "Saved successfully."})
                navigate('/find-work')
            }
        })
    }

    return (
        <div className="max-w-screen grid grid-flow-col grid-cols-4">
            <SideBar viewType="Freelancer" connection={connection} />
            {
                connection.isConnected ? 
                    <div className="bg-slate-900 col-span-3 new-bg">
                        <h1 className="pt-10 pb-5 text-3xl font-bold text-center underline">Enter Details to Become a Freelancer</h1>
                        <form onSubmit={handleSubmit} className="flex justify-center">
                            <div className="form-control w-7/12">
                                <label className="label">
                                    <span className="label-text text-slate-300">Your Name</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="fullName"
                                    placeholder="Ahmed Yar Khan" 
                                    className="input input-bordered w-full max-w-screen " 
                                    value={formData.fullName} 
                                    onChange={handleChange}
                                    required 
                                />
                                {/* <label className="label">
                                    <span className="label-text text-slate-300">Your Email</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="email"
                                    placeholder="Your email will be stored on public blockchain" 
                                    className="input input-bordered w-full max-w-screen " 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required
                                /> */}
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
                                    className="input input-bordered w-full max-w-screen " 
                                    value={formData.jobTitle} 
                                    onChange={handleChange} 
                                    required
                                />
                                <label className="label">
                                    <span className="label-text text-slate-300">Hourly Rate (Ether)</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="hourlyRate"
                                    className="input input-bordered w-full max-w-screen " 
                                    value={formData.hourlyRate} 
                                    onChange={handleChange}
                                    required
                                />
                                <label className="label">
                                    <span className="label-text text-slate-300">Category</span>
                                </label>
                                <CategorySelect 
                                    handleChange={handleChange}
                                    selectedCategory={formData.category}
                                />
                                <label className="label">
                                    <span className="label-text text-slate-300">Primary Language</span>
                                </label>
                                <LanguageSelect 
                                    handleChange={handleChange}
                                    selectedLanguage={formData.language}
                                /> 
                                <label className="label">
                                    <span className="label-text text-slate-300">Country</span>
                                </label>
                                <CountrySelect 
                                    handleChange={handleChange}
                                    selectedCountry={formData.country}
                                /> 
                                <label className="label">
                                    <span className="label-text text-slate-300">Bio</span>
                                </label>
                                <textarea 
                                    className="textarea textarea-bordered "
                                    name="bio" 
                                    cols={5} rows={5} 
                                    placeholder="Tell us a little about yourself" 
                                    onChange={handleChange}
                                    value={formData.bio}
                                    required
                                />
                                <div className="flex justify-center mt-5">
                                    <button className="btn text-white mb-5">
                                       {formData._id ? "Edit Details" : "Submit Details"}
                                    </button>
                                </div>
                            </div>
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