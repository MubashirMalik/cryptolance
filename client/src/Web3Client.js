import Web3 from "web3"
import CryptolanceBuild from "contracts/Cryptolance.json"

const web3 = new Web3(window.ethereum)

let cryptolance;

export const initWeb3Client = async () => {
    const networkId = await web3.eth.net.getId()
    
    try {
        cryptolance = await new web3.eth.Contract(
            CryptolanceBuild.abi, 
            CryptolanceBuild.networks[networkId].address
        )
    } catch (e) {
        console.log(e)
    }
}