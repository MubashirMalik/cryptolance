import './App.css';
import { useEffect, useState } from "react";
import Home from './components/Home';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import Freelancer from './components/Freelancer';
import Employer from './components/Employer';
import FindWork from './components/FindWork';
import FindCandidate from './components/FindCandidate';
import ViewProposals from './components/ViewProposals';
import Footer from './components/Footer';
import PostProject from './components/PostProject';
import ProjectChat from './components/ProjectChat';
import MyProjects from "./components/MyProjects"
import { ToastContainer } from "react-toastify"
import { initWeb3Client } from "./Web3Client"
import 'react-toastify/dist/ReactToastify.css';


function App() {
	const [connection, setConnection] = useState({
        isConnected: false,
        account: ""
    })

    useEffect(() => {
        initWeb3Client()
    }, [])

	return (
		<>
			<div className="bg-slate-900 min-h-screen">
				<Navbar connection={connection} setConnection={setConnection} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/freelancer" element={<Freelancer connection={connection} />} />
					<Route path="/employer" element={<Employer connection={connection} />} />
					<Route path="/find-work" element={<FindWork connection={connection}/>} />
					<Route path="/find-candidate" element={<FindCandidate connection={connection}/>} />
                    <Route path="/post-project" element={<PostProject connection={connection} />} />
                    <Route path="/view-proposals/:projectOwner/:projectId/:viewType" element={<ViewProposals connection={connection} />} />
                    <Route path="/project-chat/:projectId/:viewType" element={<ProjectChat connection={connection} />}/> 
                    <Route path="/my-projects/:viewType" element={<MyProjects connection={connection} />}/>
				</Routes>
			</div>
            <ToastContainer/>
			<Footer />
		</>
	);
}

export default App;
