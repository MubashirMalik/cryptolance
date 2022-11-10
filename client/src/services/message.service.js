const BASE_URL = "http://localhost:3001/message"

export const postMessage = async (formData) => {
    try {
        const res = await fetch(BASE_URL + "/post-message", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...formData})
        })
        return await res.json();
    } catch (e) {
        console.log("[MongoDb] postMessage(): ", e)
        return null;
    }
}

export const getMessages = async (projectId) => {
    try {
        const res = await fetch(`${BASE_URL}/get-messages/${projectId}`)
        return await res.json();
    } catch (e) {
        console.log("[MongoDb] getMessages(): ", e)
        return null;
    }
}

export const postFile = async(data) => {
    try {
        let formData = new FormData();
        formData.append('sender', data.sender);
        formData.append('projectId', data.projectId);
        formData.append('file', data.file)

        const res = await fetch(BASE_URL + "/post-file", {
            method: "POST",
            body: formData
        })
        return await res.json();
    } catch (e) {
        console.log("[MongoDb] postFile(): ", e)
        return null;
    }
}

export const downloadFile = async (messageId) => {
    try {
        const res = await fetch(`${BASE_URL}/download-file/${messageId}`)
        return await res.json();
    } catch (e) {
        console.log("[MongoDb] downloadFile(): ", e)
        return null;
    }
}