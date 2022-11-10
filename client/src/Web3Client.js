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

export const addProject = async (id, title, amount, awardedTo, projectOwner) => {
    const description = web3.utils.utf8ToHex('IPFS Description')
    const files = web3.utils.utf8ToHex('IPFS Files')

    try {
        const res = await cryptolance.methods
        .addProject(id, title, description, files, amount, awardedTo)
        .send({ from: projectOwner, value: web3.utils.toWei(amount.toString(), 'ether')})
        return await res;
    }  catch (e) {
        console.log("[Solidity] addProject(): ", e)
        return null;
    }
}

// should be called by the owner (employer) of the project 
export const releasePayment = async (projectId, projectOwner) => {
    try {
        const res = await cryptolance.methods
        .releasePayment(projectId)
        .send({ from: projectOwner })
        return await res;
    }  catch (e) {
        console.log("[Solidity] releasePayment(): ", e)
        return null;
    }
}

// should be called by the freelancer of the project
export const completeProject = async (projectOwner, projectId, freelancer) => {
    try {
        const res = await cryptolance.methods
        .completeProject(projectOwner, projectId)
        .send({ from: freelancer })
        return await res;
    }  catch (e) {
        console.log("[Solidity] completeProject(): ", e)
        return null;
    }
}