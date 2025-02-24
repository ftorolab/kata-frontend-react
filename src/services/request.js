import axios from 'axios';

async function serverFetchGet(request) {
    let url = request.url || 'http://localhost:3002/api/movies';
    const headers = request.headers || new Headers();
    try {
        const response = await axios.get(url, { headers });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

async function serverFetchPost(request) {
    let url = request.url || 'http://localhost:3002/api/movies';
    const headers = request.headers || { 'Content-Type': 'application/json' };
    const data = request.data || {};
    try {
        const response = await axios.post(url, data, { headers });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export {
    serverFetchGet,
    serverFetchPost
}