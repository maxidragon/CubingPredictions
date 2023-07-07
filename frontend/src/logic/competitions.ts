import { resultToString } from './results';
import { backendRequest } from "./request";
import { Person, Round, Event as EventInterface, PersonalBest } from '@wca/helpers';

export const getUpcomingCompetitions = async () => {
    try {
        const response = await backendRequest('competitions/upcoming', 'GET', false);
        return await response.json();
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const getCompetitionInfo = async (id: string) => {
    try {
        const response = await backendRequest(`competitions/info/${id}`, 'GET', false);
        return await response.json();
    } catch (err) {
        console.log(err);
        return null;
    }
};
export const getPodiumForEvent = (competitionInfo: any, eventId: string) => {
    if (competitionInfo.events) {
        const eventInfo = competitionInfo.events.find(
            (event: EventInterface) => event.id === eventId,
        );
            const roundsCount = eventInfo.rounds.length;
            const round = eventInfo.rounds.find(
                (round: Round) => round.id === `${eventId}-r${roundsCount}`,
            );
            if (!roundHasResults(round)) {
                return null;
            }
            const firstPlace = round.results.find((result: any) => result.ranking === 1);
            const secondPlace = round.results.find((result: any) => result.ranking === 2);
            const thirdPlace = round.results.find((result: any) => result.ranking === 3);
            let firstPlaceWcaId = {};
            let secondPlaceWcaId = {};
            let thirdPlaceWcaId = {};
            if (!firstPlace) {
                firstPlaceWcaId = {
                    name: 'No one',
                    wcaId: '',
                };
            } else {
                firstPlaceWcaId = competitionInfo.persons.find(
                    (person: Person) => person.registrantId === firstPlace.personId,
                );
            }
            if (!secondPlace) {
                secondPlaceWcaId = {
                    name: 'No one',
                    wcaId: '',
                };
            } else {
                secondPlaceWcaId = competitionInfo.persons.find(
                    (person: Person) => person.registrantId === secondPlace.personId,
                );
            }
            if (!thirdPlace) {
                thirdPlaceWcaId = {
                    name: 'No one',
                    wcaId: '',
                }
            } else {
                thirdPlaceWcaId = competitionInfo.persons.find(
                    (person: Person) => person.registrantId === thirdPlace.personId,
                );
            }
            return {
                firstPlace: firstPlaceWcaId,
                secondPlace: secondPlaceWcaId,
                thirdPlace: thirdPlaceWcaId,
            };
    }
};

export const generateRanking = (persons: Person[], event: string, type: string) => {
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
            if (!(person.personalBests.some((pb: PersonalBest) => pb.eventId === event && pb.type === type))) {
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
        const response = await backendRequest(`competitions/${id}/final/${event}`, 'GET', false);
        return await response.json();
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const getCompetitorsForEvent = async (competitors: Person[], event: string) => {
    const competitorsForEvent: any[] = [];
    if (competitors) {
        competitors.forEach((competitor: any) => {
            if (competitor.registration && competitor.registration.eventIds.includes(event) && competitor.wcaId) {
                competitorsForEvent.push({
                    name: competitor.name,
                    wcaId: competitor.wcaId,
                    wcaUserId: competitor.wcaUserId,
                    worldRank: competitor.personalBests.find((pb: PersonalBest) => pb.eventId === event && pb.type === 'average')?.worldRanking,
                })
            }
        });
    }
    competitorsForEvent.sort((a, b) => {
        return a.worldRank - b.worldRank;
    });
    return competitorsForEvent;
};

export const roundHasResults = (round: Round) => {
    if (round.results.length > 0) {
        return true;
    }
    if (!(round.results.some((result: any) => result.best > 0))) {
        return false;
    }
    return true;
};

export const searchCompetitions = async (name: string) => {
    try {
        const response = await backendRequest(`competitions/search?query=${name}`, 'GET', false);
        return await response.json();
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const getRegistrationData = async (id: string) => {
    try {
        const response = await backendRequest(`competitions/registration/${id}`, 'GET', false);
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
