import { backendRequest } from "./request";

export const getPodiumPredictionsRanking = async () => {
    try {
        const response = await backendRequest('ranking/podium', 'GET', true);
        return await response.json();
    } catch (err) {
        console.log(err);
        return [];
    }
};
