import { resultToString } from "./results";
import { wcaApiRequest } from "./request";
import {
  Person,
  Round,
  Event as EventInterface,
  PersonalBest,
  EventId,
} from "@wca/helpers";

export const getUpcomingCompetitions = async () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayString = `${year}-${month}-${day}`;
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const nextMonthYear = nextMonth.getFullYear();
  const nextMonthMonth = String(nextMonth.getMonth() + 1).padStart(2, "0");
  const nextMonthDay = String(nextMonth.getDate()).padStart(2, "0");
  const nextMonthString = `${nextMonthYear}-${nextMonthMonth}-${nextMonthDay}`;
  try {
    const response = await wcaApiRequest(
      `competitions?start=${todayString}&end=${nextMonthString}&per_page=50`
    );
    const data = await response.json();
    const upcomingCompetitions: any[] = [];
      data.forEach((competition: any) => {
        upcomingCompetitions.push({
          id: competition.id,
          name: competition.name,
          website: competition.url,
          countryIso2: competition.country_iso2,
          isRegistrationOpen:
            new Date(competition.registration_open) > new Date(),
        });
      });
    return upcomingCompetitions;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getCompetitionInfo = async (id: string) => {
  try {
    const response = await wcaApiRequest(`competitions/${id}/wcif/public`);
    return await response.json();
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getBasicCompetitionInfo = async (id: string) => {
    try {
        const response = await wcaApiRequest(`competitions/${id}`);
        return await response.json();
    } catch(err) {
        console.log(err);
        return null;
    }
};

export const getPodiumForEvent = (competitionInfo: any, eventId: string) => {
  if (competitionInfo.events) {
    const eventInfo = competitionInfo.events.find(
      (event: EventInterface) => event.id === eventId
    );
    const roundsCount = eventInfo.rounds.length;
    const round = eventInfo.rounds.find(
      (round: Round) => round.id === `${eventId}-r${roundsCount}`
    );
    if (!roundHasResults(round)) {
      return null;
    }
    const firstPlace = round.results.find(
      (result: any) => result.ranking === 1
    );
    const secondPlace = round.results.find(
      (result: any) => result.ranking === 2
    );
    const thirdPlace = round.results.find(
      (result: any) => result.ranking === 3
    );
    let firstPlaceWcaId = {};
    let secondPlaceWcaId = {};
    let thirdPlaceWcaId = {};
    if (!firstPlace) {
      firstPlaceWcaId = {
        name: "No one",
        wcaId: "",
      };
    } else {
      firstPlaceWcaId = competitionInfo.persons.find(
        (person: Person) => person.registrantId === firstPlace.personId
      );
    }
    if (!secondPlace) {
      secondPlaceWcaId = {
        name: "No one",
        wcaId: "",
      };
    } else {
      secondPlaceWcaId = competitionInfo.persons.find(
        (person: Person) => person.registrantId === secondPlace.personId
      );
    }
    if (!thirdPlace) {
      thirdPlaceWcaId = {
        name: "No one",
        wcaId: "",
      };
    } else {
      thirdPlaceWcaId = competitionInfo.persons.find(
        (person: Person) => person.registrantId === thirdPlace.personId
      );
    }
    return {
      firstPlace: firstPlaceWcaId,
      secondPlace: secondPlaceWcaId,
      thirdPlace: thirdPlaceWcaId,
    };
  }
};

export const generateRanking = (
  persons: Person[],
  event: EventId,
  type: string
) => {
  const ranking: {
    id: number;
    name: string;
    wcaId: string;
    country: string;
    result: string;
    worldRank: number;
    notResult: boolean;
  }[] = [];
  persons.forEach((person: Person) => {
    if (person.registration && person.registration.eventIds.includes(event)) {
      person.personalBests?.forEach((pb: PersonalBest) => {
        if (pb.eventId === event && pb.type === type) {
          ranking.push({
            id: person.wcaUserId,
            name: person.name,
            wcaId: person.wcaId || "",
            country: person.countryIso2,
            result: resultToString(pb.best, event, type),
            worldRank: pb.worldRanking,
            notResult: false,
          });
        }
      });
      if (
        !person.personalBests?.some(
          (pb: PersonalBest) => pb.eventId === event && pb.type === type
        )
      ) {
        ranking.push({
          id: person.wcaUserId,
          name: person.name,
          wcaId: person.wcaId || "",
          country: person.countryIso2,
          result: "",
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

export const getFinalStartTime = async (id: string, eventId: EventId) => {
  try {
    const competitionInfo = await getCompetitionInfo(id);
    const eventInfo = competitionInfo.events.find(
      (event: any) => event.id === eventId,
    );
    const roundsCount = eventInfo.rounds.length;
    const venues = competitionInfo.schedule.venues;
    let finalStartTime: any = '2000-01-01';
    venues.forEach((venue: any) => {
      venue.rooms.forEach((room: any) => {
        room.activities.forEach((activity: any) => {
          if (eventId !== '333mbf' && eventId !== '333fm') {
          if (activity.activityCode === `${eventId}-r${roundsCount}`) {
            finalStartTime = new Date(activity.startTime);
            return activity.startTime;
          }
        } else {
          if (activity.activityCode === `${eventId}-r${roundsCount}-a1`) {
            finalStartTime = new Date(activity.startTime);
            return activity.startTime;
          }
        }
        });
      });
      return finalStartTime;
    });
  } catch (err) {
    console.log(err);
    return '2000-01-01';
  }
};

export const getCompetitorsForEvent = async (
  competitors: Person[],
  event: EventId
) => {
  const competitorsForEvent: any[] = [];
  if (competitors) {
    competitors.forEach((competitor: any) => {
      if (
        competitor.registration &&
        competitor.registration.eventIds.includes(event) &&
        competitor.wcaId
      ) {
        competitorsForEvent.push({
          name: competitor.name,
          wcaId: competitor.wcaId,
          wcaUserId: competitor.wcaUserId,
          worldRank: competitor.personalBests.find(
            (pb: PersonalBest) => pb.eventId === event && pb.type === "average"
          )?.worldRanking,
        });
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
  if (!round.results.some((result: any) => result.best > 0)) {
    return false;
  }
  return true;
};

export const searchCompetitions = async (name: string) => {
  try {
    const today = new Date();
    let start = "";
    if (name.length < 1) {
      start = `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
    }
    const response = await wcaApiRequest(
      `competitions?q=${name}&start=${start}&per_page=50&sort=start_date`
    );
    const data = await response.json();
    console.log(data);
    const competitions = data.filter(
      (competition: any) => new Date(competition.start_date).getFullYear() >= 2023
    );
    return competitions;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getRegistrationData = async (id: string) => {
  try {
    const compData = await getBasicCompetitionInfo(id);
    return {
      registrationOpenDate: compData.registration_open,
      registrationCloseDate: compData.registration_close,
      isRegistrationOpen: new Date() > new Date(compData.registration_open),
      isRegistrationClosed: new Date() > new Date(compData.registration_close),
    };
  } catch (err) {
    console.log(err);
    return {
        registrationOpenDate: "",
        registrationCloseDate: "",
        isRegistrationOpen: false,
        isRegistrationClosed: false,
    }
  }
};

export const isRegistrationClosed = async (id: string) => {
  const data = await getRegistrationData(id);
  return data.isRegistrationClosed;
};
