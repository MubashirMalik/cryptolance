import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import Freelancer from './components/Freelancer';
import Employer from './components/Employer';
import FindWork from './components/FindWork';
import FindCandidate from './components/FindCandidate';

import { useState } from "react";

function App() {
	const [connection, setConnection] = useState({
        isConnected: false,
        account: ""
    })

	return (
		<>
			<div className="App h-full bg-slate-900">
				<Navbar connection={connection} setConnection={setConnection} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="freelancer" element={<Freelancer connection={connection}/>} />
					<Route path="employer" element={<Employer />} />
					<Route path="findWork" element={<FindWork />} />
					<Route path="findCandidate" element={<FindCandidate />} />
				</Routes>
			</div>
			<footer className="bg-slate-900">
				<p>&copy; 2022 FOB. All rights are reserved.</p>
			</footer>
		</>
	);
}

export default App;
