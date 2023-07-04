import { backendRequest } from "./request";

export const addPodiumPrediction = async (competitionId: string, competitionName: string, eventId: string, firstPlaceWcaId: string, secondPlaceWcaId: string, thirdPlaceWcaId: string) => {
    if (checkPodiumPrediction(firstPlaceWcaId, secondPlaceWcaId, thirdPlaceWcaId)) {
        const prediction = {
            competitionId,
            competitionName,
            eventId,
            firstPlaceWcaId,
            secondPlaceWcaId,
            thirdPlaceWcaId,
        };
        const response = await backendRequest('predictions/podium/add', 'POST', true, prediction);
        const data = await response.json();
        return { message: data.message, statusCode: response.status };
    }
    return { message: 'You cannot put the same person for two places!' };
};

export const checkPodiumPrediction = (firstPlaceWcaId: string, secondPlaceWcaId: string, thirdPlaceWcaId: string) => {
    if (firstPlaceWcaId === 'NONE' || secondPlaceWcaId === 'NONE' || thirdPlaceWcaId === 'NONE') {
        if (firstPlaceWcaId === 'NONE' && secondPlaceWcaId === 'NONE' && thirdPlaceWcaId === 'NONE') {
            return true;
        } else {
            if (firstPlaceWcaId === 'NONE') {
                if (secondPlaceWcaId === thirdPlaceWcaId) {
                    return false;
                }
            }
            if (secondPlaceWcaId === 'NONE') {
                if (firstPlaceWcaId === thirdPlaceWcaId) {
                    return false;
                }
            }
            if (thirdPlaceWcaId === 'NONE') {
                if (firstPlaceWcaId === secondPlaceWcaId) {
                    return false;
                }
            }
        }
    } else {
        return !(firstPlaceWcaId === secondPlaceWcaId || firstPlaceWcaId === thirdPlaceWcaId || secondPlaceWcaId === thirdPlaceWcaId);
    }
};

export const getYourPrediction = async (competitionId: string, eventId: string) => {
    try {
        const response = await backendRequest(`predictions/podium/my/${competitionId}/${eventId}`, "GET", true);
        return await response.json();
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const getAllUserPredictions = async (userId: number) => {
    try {
        const response = await backendRequest(`predictions/user/podium/${userId}`, "GET", true);
        return await response.json();
    } catch (err) {
        console.log(err);
        return [];
    }
};