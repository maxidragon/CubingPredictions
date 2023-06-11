export const getSettings = async () => {
    const response = await fetch('http://localhost:5000/user/settings', {
        method: 'GET',
        credentials: 'include',
    });
    return await response.json();
};

export const updateSettings = async (settings: any) => {
    const response = await fetch('http://localhost:5000/user/settings', {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
    });
    return response.status;
}