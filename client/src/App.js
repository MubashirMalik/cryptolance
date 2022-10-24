import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import Freelancer from './components/Freelancer';
import Employer from './components/Employer';
import FindWork from './components/FindWork';
import FindCandidate from './components/FindCandidate';
import Footer from './components/Footer';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import { useState } from "react";

function App() {
	const [connection, setConnection] = useState({
        isConnected: false,
        account: ""
    })

	return (
		<>
			<div className="App bg-slate-900">
				<Navbar connection={connection} setConnection={setConnection} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="freelancer" element={<Freelancer connection={connection} />} />
					<Route path="employer" element={<Employer connection={connection} />} />
					<Route path="find-work" element={<FindWork connection={connection}/>} />
					<Route path="find-candidate" element={<FindCandidate connection={connection}/>} />
				</Routes>
			</div>
			<Footer />
			<ToastContainer/>
		</>
	);
}

export default App;
