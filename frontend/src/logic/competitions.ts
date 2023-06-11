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
export const getPodiumForEvent = (competitionInfo: any, eventId: string) => {
    const eventInfo = competitionInfo.events.find(
        (event: any) => event.id === eventId,
    );
    console.log(eventInfo);
    const roundsCount = eventInfo.rounds.length;
    const round = eventInfo.rounds.find(
        (round: any) => round.id === `${eventId}-r${roundsCount}`,
    );
    const firstPlace = round.results.find((result: any) => result.ranking === 1);
    const secondPlace = round.results.find((result: any) => result.ranking === 2);
    const thirdPlace = round.results.find((result: any) => result.ranking === 3);
    const firstPlaceWcaId = competitionInfo.persons.find(
        (person: any) => person.registrantId === firstPlace.personId,
    );
    const secondPlaceWcaId = competitionInfo.persons.find(
        (person: any) => person.registrantId === secondPlace.personId,
    );
    const thirdPlaceWcaId = competitionInfo.persons.find(
        (person: any) => person.registrantId === thirdPlace.personId,
    );
    return {
        firstPlace: firstPlaceWcaId,
        secondPlace: secondPlaceWcaId,
        thirdPlace: thirdPlaceWcaId,
    };
};
export const generateRanking = (persons: any, event: string, type: string) => {
    const ranking: { name: string, wcaId: string, country: string, result: string, worldRank: number, notResult: boolean }[] = [];
    persons.forEach((person: any) => {
        if (person.registration && person.registration.eventIds.includes(event)) {
            person.personalBests.forEach((pb: any) => {
                if (pb.eventId === event && pb.type === type) {
                    ranking.push({
                        name: person.name,
                        wcaId: person.wcaId,
                        country: person.country,
                        result: resultToString(pb.best, event, type),
                        worldRank: pb.worldRanking,
                        notResult: false,
                    });
                }
            });
            if (!(person.personalBests.some((pb: any) => pb.eventId === event && pb.type === type))) {
                ranking.push({
                    name: person.name,
                    wcaId: person.wcaId,
                    country: person.country,
                    result: '',
                    worldRank: 999999999999,
                    notResult: true,
                });
            }
        }
    });
    ranking.sort((a, b) => {
        return a.worldRank - b.worldRank;
    });
    return ranking;
};

export const getFinalStartTime = async (id: string, event: string) => {
    try {
        const response = await fetch(`http://localhost:5000/competitions/${id}/final/${event}`);
        return await response.json();
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const getCompetitorsForEvent = async (competitors: any, event: string) => {
    const competitorsForEvent: any[] = [];
    if (competitors) {
        competitors.forEach((competitor: any) => {
            if (competitor.registration && competitor.registration.eventIds.includes(event) && competitor.wcaId) {
                competitorsForEvent.push({
                    name: competitor.name,
                    wcaId: competitor.wcaId,
                    wcaUserId: competitor.wcaUserId,
                })
            }
        });
    }
    return competitorsForEvent;
};

export const searchCompetitions = async (name: string) => {
    try {
        const response = await fetch(`http://localhost:5000/competitions/search?query=${name}`);
        return await response.json();
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const getRegistrationData = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:5000/competitions/registration/${id}`);
        return await response.json();
    } catch (err) {
        console.log(err);
        return [];
    }
}

export const isRegistrationClosed = async (id: string) => {
    const data = await getRegistrationData(id);
    return data.isRegistrationClosed;
}
