import { Injectable } from '@nestjs/common';
import axios from '../axios';

@Injectable()
export class CompetitionsService {
  async getCompetitionInfo(id: string) {
    try {
      const response = await axios.get('competitions/' + id + '/wcif/public');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  async getFinalStartTime(compId: string, eventId: string) {
    const competitionInfo = await this.getCompetitionInfo(compId);
    const eventInfo = competitionInfo.events.find(
      (event) => event.id === eventId,
    );
    const roundsCount = eventInfo.rounds.length;
    const venues = competitionInfo.schedule.venues;
    let finalStartTime = new Date();
    venues.map((venue) => {
      venue.rooms.map((room) => {
        room.activities.map((activity) => {
          if (activity.activityCode === `${eventId}-r${roundsCount}`) {
            finalStartTime = new Date(activity.startTime);
            return activity.startTime;
          }
        });
      });
    });
    return finalStartTime;
  }
  async getUpcomingCompetitions() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const nextMonthYear = nextMonth.getFullYear();
    const nextMonthMonth = String(nextMonth.getMonth() + 1).padStart(2, '0');
    const nextMonthDay = String(nextMonth.getDate()).padStart(2, '0');
    const nextMonthString = `${nextMonthYear}-${nextMonthMonth}-${nextMonthDay}`;
    try {
      const response = await axios.get('competitions', {
        params: {
          start: todayString,
          end: nextMonthString,
          per_page: 50,
        },
      });
      const upcomingCompetitions = [];
      response.data.map((competition) => {
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
    } catch (error) {
      console.error(error);
    }
  }
  async getCompetitorsForEvent(compId: string, eventId: string) {
    const competitionInfo = await this.getCompetitionInfo(compId);
    const eventCompetitors = [];
    competitionInfo.persons.map((person) => {
      if (person.registration.eventIds.includes(eventId)) {
        const eventCompetitor = {
          name: person.name,
          wcaId: person.wcaId,
          countryIso2: person.countryIso2,
          personalBest: {
            single: null,
            average: null,
          },
        };
        person.personalBests.map((pb) => {
          if (pb.eventId === eventId) {
            if (pb.type === 'single') {
              eventCompetitor.personalBest.single = pb;
            } else {
              eventCompetitor.personalBest.average = pb;
            }
          }
        });
        eventCompetitors.push(eventCompetitor);
      }
    });
    return eventCompetitors;
  }
}
