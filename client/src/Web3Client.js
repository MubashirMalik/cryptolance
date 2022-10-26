import Web3 from "web3"
import FiverrBlockBuild from "contracts/FiverrBlock.json"

const web3 = new Web3(window.ethereum)

let fiverrBlock;

export const initWeb3Client = async () => {
    const networkId = await web3.eth.net.getId()
    
    try {
        fiverrBlock = await new web3.eth.Contract(
            FiverrBlockBuild.abi, 
            FiverrBlockBuild.networks[networkId].address
        )
    } catch (e) {
        console.log(e)
    }
}