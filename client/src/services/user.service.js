
const BASE_URL = "http://localhost:3001/user"

export const postUser = async (formData) => {
    try {
        const res = await fetch(BASE_URL + "/post-user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...formData})
        })
        return await res.json();
    } catch (e) {
        console.log("[MongoDb] postUser(): ", e)
        return null;
    }
}


export const getUser = async (walletAddress) => {
    try {
        const res = await fetch(`${BASE_URL}/get-user?walletAddress=${walletAddress}`)
        return await res.json();
    } catch (e) {
        console.log("[MongoDb] getUser(): ", e)
        return null;
    }
}