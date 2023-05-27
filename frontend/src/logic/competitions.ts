export const getUpcomingCompetitions = async () => {
    try {
        const response = await fetch('http://localhost:5000/competitions/upcoming');
        return await response.json();
    } catch (err) {
        console.log(err);
        return [];
    }
};
