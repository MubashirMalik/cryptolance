import React, { useState } from 'react'
import { postProject } from "../services/project.service"
import { createToast } from '../Util';
import SideBar from './SideBar';
import CategorySelect from './CategorySelect';

export default function PostProject({ connection }) {
    const [formData, setFormData] = useState({
        title: "",
        budget: "",
        category: "Web, Mobile & Software Dev",
        description: "",
    })

    const handleChange = (event) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        formData.walletAddress = connection.account
        postProject(formData)
        .then(res =>  {
            if (!res) {
                console.log("Something went wrong..")
            } else {
                createToast({text: "Posted successfully."})
            }
        })
    }

	return (
		<div className="max-w-screen grid grid-flow-col grid-cols-4 gap-4">
            <SideBar />
            {
                connection.isConnected ? 
                    <div className="bg-slate-900 col-span-3">
                        <h1 className="pt-10 text-2xl font-bold">Tell us what you need done</h1>
                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="form-control p-10 pr-20 pl-20">
                                <label className="label">
                                    <span className="label-text text-slate-300">Choose a title for your project</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="title"
                                    placeholder="e.g. Build me a website" 
                                    className="input input-bordered w-full max-w-screen " 
                                    value={formData.title} 
                                    onChange={handleChange}
                                    required 
                                />
                                <label className="label">
                                    <span className="label-text text-slate-300">Tell us more about the project</span>
                                </label>
                                <textarea 
                                    className="textarea textarea-bordered "
                                    name="description" 
                                    cols={5} rows={5} 
                                    placeholder="Describe your project here.." 
                                    onChange={handleChange}
                                    value={formData.description}
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
                                    <span className="label-text text-slate-300">What is your budget? (Ether)</span>
                                </label>
                                <input 
                                    type="text"
                                    name="budget" 
                                    placeholder="1.2" 
                                    className="input input-bordered w-full max-w-screen " 
                                    value={formData.budget} 
                                    onChange={handleChange} 
                                    required
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
                            </div>
                            <button className="btn text-white mb-10">Post Project</button>
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
