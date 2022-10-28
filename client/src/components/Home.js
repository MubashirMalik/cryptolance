import { RiCreativeCommonsZeroFill, RiQuestionAnswerFill } from "react-icons/ri";
import { SiBlockchaindotcom } from "react-icons/si";
import { TbFreeRights } from "react-icons/tb";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-screen bg-secondary">
            <main>
                <img className='main_img' src={require('../logo.png')} alt="" />
                <h1>FREELANCING ON BLOCKCHAIN</h1>
                <p className="m-4 mt-0">Hire or work for Ether cryptocurrency</p>
                <div className='main_buttons'>
                    <button className="btn text-white btn-outline mb-2 md:mr-2 w-52" onClick={() => navigate("/freelancer")}>Become a Freelancer</button>
                    <button className="btn text-white btn-outline mb-2 md:mr-2 w-52" onClick={() => navigate("/employer")}>Hire Freelancers</button>
                    <button className="btn text-white btn-outline mb-2 md:mr-2 w-52" onClick={() => navigate("/find-work")}>Find Work</button>
                    <button className="btn text-white btn-outline mb-2 md:mr-2 w-52" onClick={() => navigate("/find-candidate")}>Find Candidates</button>
                </div>
                <div className="hero_card grid grid-flow-col col-auto text-slate-900">
                    <div className="flex justify-center items-center">
                        <RiCreativeCommonsZeroFill className="text-4xl text-slate-500" />
                        <p className="text-sm text-slate-900 w-30 text-center">0% service fees. No hidden charges</p>
                    </div>
                    <div className="mr-2 ml-2 flex justify-center items-center">
                        <SiBlockchaindotcom className="text-4xl text-slate-500" />
                        <p className="text-sm text-slate-900  w-30 text-center">Fully decentralized on blockchain</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <TbFreeRights className="text-4xl text-slate-500" />
                        <p className="text-sm text-slate-900 w-30 text-center">No restrictions. Free membership</p>
                    </div>
                </div>
            </main >
            <section className="bg-slate-900 left-img">
                <div>
                    <h1>We take no cut!</h1>
                    <p>FOB doesn’t take a percentage of your earned Ether. The amount of Ether the employer pays is the amount the freelancer gets.</p>
                </div>
                <img src={require('../images/Savings-pana.png')} alt="" />
            </section>
            <section className="right-img">
                <div>
                    <h1>Fully Decentralized</h1>
                    <p>The FOB database is distributed on the Ethereum public blockchain and the source files are on IPFS. FOB is accessible to everyone forever, without any central authority having control over it.</p>
                </div>
                <img src={require('../images/p2p.png')} alt="" />
            </section>
            <section className="bg-slate-900 left-img">
                <div>
                    <h1>No hidden costs</h1>
                    <p>Everybody can apply for, or create, an unlimited number of jobs. All that is needed is to pay Ethereum gas fees associated with these operations.</p>
                </div>
                <img src={require('../images/calc.png')} alt="" />
            </section>
            <section className="bg-secondary">
                <div className="flex justify-center items-center flex-col  w-screen rounded-lg m-auto">
                    <h1 className="text-white flex"><RiQuestionAnswerFill className="pr-2" /> 24/7 Support</h1>
                    <p className="text-white m-2" style={{ "opacity": " 0.8" }}>Have a query? Feel free to contact our 24 hrs active support.</p>
                    <button className="btn text-white">Get in Contact</button>
                </div>
            </section>
        </div >
    );
}

export default Home;