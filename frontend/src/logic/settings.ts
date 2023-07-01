import { backendRequest } from "./request";

export const getSettings = async () => {
    const response = await backendRequest('user/settings', 'GET', true);
    return await response.json();
};

export const updateSettings = async (settings: any) => {
    const response = await backendRequest('user/settings', 'PUT', true, settings);
    return response.status;
}