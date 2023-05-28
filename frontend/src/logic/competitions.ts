import {resultToString} from './results';

export const getUpcomingCompetitions = async () => {
    try {
        const response = await fetch('http://localhost:5000/competitions/upcoming');
        return await response.json();
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const getCompetitionInfo = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:5000/competitions/info/${id}`);
        return await response.json();
    } catch (err) {
        console.log(err);
        return {};
    }
};

export const generateRanking = (persons: any, event: string, type: string) => {
    const ranking: { name: string, country: string, result: string, worldRank: number }[] = [];
    persons.map((person: any)=> {
        console.log(person);
        if (person.registration && person.registration.eventIds.includes(event)) {
            person.personalBests.map((pb: any) => {
                if (pb.eventId === event && pb.type === type) {
                    ranking.push({
                        name: person.name,
                        country: person.country,
                        result: resultToString(pb.best, event, type),
                        worldRank: pb.worldRanking
                    });
                }
            });
        }
    });
    ranking.sort((a, b) => {
        return a.worldRank - b.worldRank;
    });
    return ranking;
};