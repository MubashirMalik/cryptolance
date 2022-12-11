import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { postFeedback } from '../services/project.service'

function FeedbackCard({ setProject }) {
    const [formData, setFormData] = useState({
        message: "",
        ratings: 1,
        provider: useParams().viewType.toLowerCase(),
        projectId: useParams().projectId
    })

    const handleChange = (event) => {
        event.preventDefault()
        setFormData(prevFormData => ({...prevFormData, [event.target.name]: event.target.value}))
    }
    const handleSubmit = (event) => {
        postFeedback(formData)
        .then(res =>  {
            if (!res) {
                console.log("Something went wrong..")
            } else {
                setProject(res)
            }
        })
    }

    return (
        <div>
            <h1 className="pl-10 pt-10 text-2xl font-bold text-center">Project Feedback</h1>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="form-control pr-20 pl-20">
                    <label className="label">
                        <span className="label-text text-slate-300">Ratings</span>
                        </label>
                    <input 
                        type="number"
                        min={1}
                        max={5}
                        name="ratings" 
                        placeholder="3" 
                        className="input input-bordered w-full max-w-screen " 
                        value={formData.ratings} 
                        onChange={handleChange} 
                        required
                    /> 
                    <label className="label">
                        <span className="label-text text-slate-300">Feedback Message</span>
                    </label>
                    <textarea 
                        className="textarea textarea-bordered "
                        name="message" 
                        cols={5} rows={5} 
                        placeholder="Your experience" 
                        onChange={handleChange}
                        value={formData.message}
                        required
                    />
                </div>
                <div className="flex justify-center mt-5">
                    <button type="submit" className="btn text-white mb-5">Submit</button>
                </div>  
            </form>
        </div>
    )
}

export default FeedbackCard