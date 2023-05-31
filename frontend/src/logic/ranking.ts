export const getPodiumPredictionsRanking = async () => {
    try {
        const response = await fetch('http://localhost:5000/ranking/podium');
        return await response.json();
    } catch (err) {
        console.log(err);
        return [];
    }
};
