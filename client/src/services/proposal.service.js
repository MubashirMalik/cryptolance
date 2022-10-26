const BASE_URL = "http://localhost:3001/proposal"

export const postProject = async (formData) => {
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

export const getProposals = async () => {
    try {
        const res = await fetch(`${BASE_URL}/get-proposals`)
        return await res.json();
    } catch (e) {
        console.log("[MongoDb] getProposals(): ", e)
        return null;
    }
}