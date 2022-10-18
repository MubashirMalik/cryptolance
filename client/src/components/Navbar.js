import { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ connection, setConnection }) => {

    const connectWallet = useCallback(() => {
        if (window.ethereum) {
            window.ethereum._metamask.isUnlocked().then(isUnlocked => {
                window.ethereum.request({
                    method: 'eth_requestAccounts'
                }).then(accounts => {
                    console.log("Account connected:", accounts)
                    setConnection({
                        isConnected: true,
                        account: accounts[0]
                    })
                })
                console.log("Account unlocked:", isUnlocked)
            });
        } else {
            alert("No wallet detected!")
        }
    }, [setConnection]);

    useEffect(() => {
        connectWallet()
    }, [connectWallet])

    return (
        <nav className="flex justify-between p-2 md:pl-10 md:pr-10 md:pt-2 md:pb-2 bg-black bg-opacity-40">
            <Link to="/" className="flex justify-center items-center">
                <img src={require('../logo.png')} className="App-logo" alt="logo" />
                <h2 className="text-white font-extrabold">FiverrBlock</h2>
            </Link>
            {connection.account !== "" ? 
                <button className="btn">
                    {connection.account.slice(0, 5)}...{connection.account.slice(-5)}
                </button> : 
                <button onClick={connectWallet} className="btn">Connect Wallet</button>
            }
        </nav>
    );
}

export default Navbar;