export const addPodiumPrediction = async (competitionId: string, eventId: string, firstPlaceWcaId: string, secondPlaceWcaId: string, thirdPlaceWcaId: string) => {
    if (checkPodiumPrediction(firstPlaceWcaId, secondPlaceWcaId, thirdPlaceWcaId)) {
        const prediction = {
            competitionId,
            eventId,
            firstPlaceWcaId,
            secondPlaceWcaId,
            thirdPlaceWcaId,
        };
        const response = await fetch("http://localhost:5000/predictions/podium/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(prediction),
            redirect: "follow",
            credentials: "include",
        });
        const data = await response.json();
        return { message: data.message, statusCode: response.status };
    }
    return { message: 'You cannot put the same person for two places!' };
};

export const checkPodiumPrediction = (firstPlaceWcaId: string, secondPlaceWcaId: string, thirdPlaceWcaId: string) => {
    return !(firstPlaceWcaId === secondPlaceWcaId || firstPlaceWcaId === thirdPlaceWcaId || secondPlaceWcaId === thirdPlaceWcaId);
};

export const getYourPrediction = async (competitionId: string, eventId: string) => {
    try {
        const response = await fetch(`http://localhost:5000/predictions/podium/my/${competitionId}/${eventId}`, {
            method: "GET",
            credentials: "include",
        });
        return await response.json();
    } catch (err) {
        console.log(err);
        return [];
    }
};