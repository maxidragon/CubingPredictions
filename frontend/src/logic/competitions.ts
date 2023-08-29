import { wcaApiRequest } from "./request";
import {
  Person,
  Round,
  Event as EventInterface,
  PersonalBest,
  Result,
  Venue,
  Room,
  Activity,
  formatCentiseconds,
} from "@wca/helpers";
import {
  Competition,
  CompetitionInfo,
  Competitor,
  PublicWCIF,
} from "./interfaces";
import { decodeMultiResult } from "./results";

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
      `competitions?start=${todayString}&end=${nextMonthString}&per_page=50`,
    );
    const data = await response.json();
    const upcomingCompetitions: Competition[] = [];
    data.forEach((competition: CompetitionInfo) => {
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
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getPodiumForEvent = (
  competitionInfo: PublicWCIF,
  eventId: string,
) => {
  if (competitionInfo.events) {
    const eventInfo = competitionInfo.events.find(
      (event: EventInterface) => event.id === eventId,
    );
    if (!eventInfo) {
      return null;
    }
    const roundsCount = eventInfo.rounds.length;
    const round = eventInfo.rounds.find(
      (round: Round) => round.id === `${eventId}-r${roundsCount}`,
    );
    if (!round || !roundHasResults(round)) {
      return null;
    }
    const firstPlace = round.results.find(
      (result: Result) => result.ranking === 1,
    );
    const secondPlace = round.results.find(
      (result: Result) => result.ranking === 2,
    );
    const thirdPlace = round.results.find(
      (result: Result) => result.ranking === 3,
    );
    let firstPlaceWcaId: Competitor = {
      name: "No one",
      wcaId: "",
      wcaUserId: 0,
      worldRank: 999999999999,
    };
    let secondPlaceWcaId: Competitor = {
      name: "No one",
      wcaId: "",
      wcaUserId: 0,
      worldRank: 999999999999,
    };
    let thirdPlaceWcaId: Competitor = {
      name: "No one",
      wcaId: "",
      wcaUserId: 0,
      worldRank: 999999999999,
    };
    if (firstPlace) {
      const person = competitionInfo.persons.find(
        (person: Person) => person.registrantId === firstPlace.personId,
      );
      if (person) {
        firstPlaceWcaId = {
          name: person.name,
          wcaId: person.wcaId || "",
          wcaUserId: person.wcaUserId,
          worldRank: 0,
        };
      }
    }
    if (secondPlace) {
      const person = competitionInfo.persons.find(
        (person: Person) => person.registrantId === secondPlace.personId,
      );
      if (person) {
        secondPlaceWcaId = {
          name: person.name,
          wcaId: person.wcaId || "",
          wcaUserId: person.wcaUserId,
          worldRank: 0,
        };
      }
    }
    if (thirdPlace) {
      const person = competitionInfo.persons.find(
        (person: Person) => person.registrantId === thirdPlace.personId,
      );
      if (person) {
        thirdPlaceWcaId = {
          name: person.name,
          wcaId: person.wcaId || "",
          wcaUserId: person.wcaUserId,
          worldRank: 0,
        };
      }
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
  event: string,
  type: string,
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
    if (person.registration) {
      const stringEvents = person.registration.eventIds.join(",");
      if (!stringEvents.includes(event)) {
        return;
      }
      person.personalBests?.forEach((pb: PersonalBest) => {
        if (pb.eventId === event && pb.type === type) {
          let result = "";
          if (event === "333mbf") {
            result = decodeMultiResult(pb.best);
          } else {
            result = formatCentiseconds(pb.best);
          }
          ranking.push({
            id: person.wcaUserId,
            name: person.name,
            wcaId: person.wcaId || "",
            country: person.countryIso2,
            result: result,
            worldRank: pb.worldRanking,
            notResult: false,
          });
        }
      });
      if (
        !person.personalBests?.some(
          (pb: PersonalBest) => pb.eventId === event && pb.type === type,
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

export const getFinalStartTime = async (id: string, eventId: string) => {
  try {
    const competitionInfo = await getCompetitionInfo(id);
    const eventInfo = competitionInfo.events.find(
      (event: EventInterface) => event.id === eventId,
    );
    const roundsCount = eventInfo.rounds.length;
    const venues = competitionInfo.schedule.venues;
    let finalStartTime: Date = new Date("2000-01-01");
    venues.forEach((venue: Venue) => {
      venue.rooms.forEach((room: Room) => {
        room.activities.forEach((activity: Activity) => {
          if (eventId !== "333mbf" && eventId !== "333fm") {
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
    return "2000-01-01";
  }
};

export const getCompetitorsForEvent = async (
  competitors: Person[],
  event: string,
) => {
  const competitorsForEvent: Competitor[] = [];
  if (competitors) {
    competitors.forEach((competitor: Person) => {
      if (
        competitor.registration &&
        competitor.wcaId &&
        competitor.personalBests
      ) {
        const stringRegistration = competitor.registration.eventIds.join(",");
        if (stringRegistration.includes(event)) {
          const pb = competitor.personalBests.find(
            (pb: PersonalBest) => pb.eventId === event && pb.type === "average",
          );
          if (pb && pb.worldRanking) {
            competitorsForEvent.push({
              name: competitor.name,
              wcaId: competitor.wcaId,
              wcaUserId: competitor.wcaUserId,
              worldRank: pb.worldRanking,
            });
          }
        }
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
  if (!round.results.some((result: Result) => result.best > 0)) {
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
      `competitions?q=${name}&start=${start}&per_page=50&sort=start_date`,
    );
    const data = await response.json();
    const competitions = data.filter(
      (competition: CompetitionInfo) =>
        new Date(competition.start_date).getFullYear() >= 2023,
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
    };
  }
};

export const isRegistrationClosed = async (id: string) => {
  const data = await getRegistrationData(id);
  return data.isRegistrationClosed;
};
