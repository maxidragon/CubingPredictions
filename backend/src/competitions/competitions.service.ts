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
}
