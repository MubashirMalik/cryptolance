import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postUser, getUser } from "../services/user.service";
import { createToast } from "../Util"
import CountrySelect from "./CountrySelect";
import LanguageSelect from "./LanguageSelect"
import SideBar from "./SideBar";

const Employer = ({ connection }) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullName: "",
        // email: "",
        language: "Afrikaans",
        country: "Afghanistan",
        bio: "",
    })

    useEffect(() => {
        if (connection.isConnected) {
            getUser(connection.account, "Employer")
            .then(res =>  {
                if (!res) {
                    console.log("Something went wrong..")
                } else {
                    console.log(res)
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
        formData.accountType = "Employer"
        postUser(formData)
        .then(res =>  {
            if (!res) {
                console.log("Something went wrong..")
            } else {
                createToast({text: "Saved successfully."})
                navigate('/find-candidate')
            }
        })
    }

    return (
        <div className="max-w-screen grid grid-flow-col grid-cols-4 gap-4">
            <SideBar />
            {
                connection.isConnected ? 
                    <div className="bg-slate-900 col-span-3">
                        <h1 className="pl-20 pt-10 pb-5 text-2xl font-bold">Enter Details to Become an Employer</h1>
                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="form-control pr-20 pl-20">
                                <label className="label">
                                    <span className="label-text text-slate-300">Your Name</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="fullName"
                                    placeholder="Shahmeer Mehmood" 
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
                                    <span className="label-text text-slate-300">Country</span>
                                </label>
                                <CountrySelect 
                                    handleChange={handleChange}
                                    selectedCountry={formData.country}
                                /> 
                                <label className="label">
                                    <span className="label-text text-slate-300">Primary Language</span>
                                </label>
                                <LanguageSelect 
                                    handleChange={handleChange}
                                    selectedLanguage={formData.language}
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

export default Employer;