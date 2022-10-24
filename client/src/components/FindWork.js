import { useState } from "react";
import { SideBarNav } from "./SideBar";

const FindWork = ({ connection }) => {
    const [minHourlyRate, setMinHourlyRate] = useState("0");
    const [maxHourlyRate, setMaxHourlyRate] = useState("0");
    const [country, setCountry] = useState("Pakistan");
    const [language, setLanguage] = useState(null);

    return (
        <div className="max-w-screen grid grid-flow-col grid-cols-4 gap-4">
            <div className="w-50 bg-slate-800 pt-10 col-span-1">
               <SideBarNav />
                <div className="bg-slate-900 m-10 pb-10 bg-opacity-60 rounded-lg">
                    <h1 className="p-2">Filter Results</h1>
                    <div className="form-control">
                        <div>
                            <input type="number" min={0.001} step={0.001} placeholder="Web Developer" className="input input-bordered max-w-xs mr-0 ml-0 m-2" value={minHourlyRate} onChange={(e) => setMinHourlyRate(e.target.value)} />
                            <input type="number" min={0.001} step={0.001} placeholder="Web Developer" className="input input-bordered max-w-xs mr-0 ml-0 m-2" value={maxHourlyRate} onChange={(e) => setMaxHourlyRate(e.target.value)} />
                        </div>
                        <div>
                            <input type="text" placeholder="Pakistan" className="input input-bordered max-w-xs mr-0 ml-0 m-2" value={country} onChange={(e) => setCountry(e.target.value)} />
                            <input type="text" placeholder="English" className="input input-bordered max-w-xs mr-0 ml-0 m-2" value={language} onChange={(e) => setLanguage(e.target.value)} />
                        </div>
                    </div>
                    <button className="btn w-50">Save Preferences</button>
                </div>
            </div>
            {
                connection.account ? 
                    <div className="bg-slate-900 col-span-3">
                        <h1 className="pt-10">Fill Details to Find Work</h1>
                        <form action="" method="post" className="w-full">
                            <div className="m-10">
                                <div className="card w-full bg-base-100 shadow-xl mb-4">
                                    <div className="card-body">
                                        <h2 className="card-title">NFT Marketplace on Ethereum Blockchain</h2>
                                        <p className="text-left">The NFT marketplaces must be user-friendly places with a simple and intuitive front-end environment for the display and brokering of files. They ...</p>
                                        <p className="text-left text-green-400">Budget: 2 Ether</p>
                                        <div className="card-actions justify-end">
                                            <button className="btn">Request for Work</button>
                                        </div>
                                    </div>
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

export default FindWork;