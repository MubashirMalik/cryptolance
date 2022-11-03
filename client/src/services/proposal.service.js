const BASE_URL = "http://localhost:3001/proposal"

export const postProposal = async (formData) => {
    try {
        const res = await fetch(BASE_URL + "/post-proposal", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...formData})
        })
        return await res.json();
    } catch (e) {
        console.log("[MongoDb] postProposal(): ", e)
        return null;
    }
}

export const getProposals = async (projectId) => {
    try {
        const res = await fetch(`${BASE_URL}/get-proposals/${projectId}`)
        return await res.json();
    } catch (e) {
        console.log("[MongoDb] getProposals(): ", e)
        return null;
    }
}