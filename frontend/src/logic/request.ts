export const backendRequest = (path: string, method: string, useAuth: boolean, body?: any) => {
    const token = localStorage.getItem("token");
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    if (token && useAuth) {
        headers.append("Authorization", `Bearer ${token}`);
    }
    return fetch(`http://localhost:5000/${path}`, {
        method: method,
        headers: headers,
        redirect: "follow",
        body: JSON.stringify(body),
    });
};

export const wcaApiRequest = (path: string) => {
    return fetch(`https://www.worldcubeassociation.org/api/v0/${path}`);
};