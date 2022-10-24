const BASE_URL = "http://localhost:3001/project"

export const postProject = async (formData) => {
    try {
        const res = await fetch(BASE_URL + "/post-project", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...formData})
        })
        return await res.json();
    } catch (e) {
        console.log("[MongoDb] postProject(): ", e)
        return null;
    }
}

export const getProjects = async () => {
    try {
        const res = await fetch(`${BASE_URL}/get-projects`)
        return await res.json();
    } catch (e) {
        console.log("[MongoDb] getProjects(): ", e)
        return null;
    }
}