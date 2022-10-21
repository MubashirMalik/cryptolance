import CategorySelect from "./CategorySelect";
import CountrySelect from "./CountrySelect";
import LanguageSelect from "./LanguageSelect";
import { SideBarNav } from "./SideBar";

const FindCandidate = ({ connection }) => {
    
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
                connection.account ? <div className="bg-slate-900 col-span-3">
                    <h1 className="pt-10">Fill Details to Find Work</h1>
                    <form action="" method="post" className="w-full">
                        <div className="m-10">
                            <div className="card w-full bg-base-100 shadow-xl mb-4">
                                <div className="card-body">
                                    <h2 className="card-title">Fullstack Blockchain Developer</h2>
                                    <p className="text-left">Master’s degree in computer science, IT, or equivalent experience. 3+ years of experience in developing Blockchain applications. Sound...</p>
                                    <p className="text-left text-green-400">Hourly Rate: 0.2 Ether</p>
                                    <div className="rating">
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    </div>
                                    <div className="card-actions justify-end">
                                        <button className="btn">Connect for Work</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <footer className="bg-slate-900">
                        <p>&copy; 2022 FOB. All rights are reserved.</p>
                    </footer>
                </div> :
                    <div className="bg-slate-900 col-span-3 flex justify-center items-center">
                        <h1>You have no accounts connected. Please see How it works section for more information</h1>
                    </div>
            }
        </div >
    );
}

export default FindCandidate;