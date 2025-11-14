const SERVER_URL = 'http://localhost:3000/';

export async function get(url) {
    const api = `${SERVER_URL}${url}`;
    
    try {
        const response = await fetch(api);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('GET request failed:', error);
    }
}

export async function post(url, data) {
    const api = `${SERVER_URL}${url}`;

    return (await fetch(api, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })).json();
}

