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

export const getProjects = async (status, filter = "all", address = "0") => {
    try {
        const res = await fetch(`${BASE_URL}/get-projects/${status}/${filter}/${address}`)
        return await res.json();
    } catch (e) {
        console.log("[MongoDb] getProjects(): ", e)
        return null;
    }
}

export const getProject = async (projectId) => {
    try {
        const res = await fetch(`${BASE_URL}/get-project/${projectId}`)
        return await res.json();
    } catch (e) {
        console.log("[MongoDb] getProject(): ", e)
        return null;
    }
}

export const updateProject = async(projectId, status, awardedTo) => {
    try {
        const res = await fetch(BASE_URL + "/update-project", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({projectId, status, awardedTo})
        })
        return await res.json();
    } catch (e) {
        console.log("[MongoDb] updateProject(): ", e)
        return null;
    }
}