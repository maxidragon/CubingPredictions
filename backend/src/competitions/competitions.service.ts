import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class CompetitionsService {
  constructor(private readonly prisma: DbService) {}
  async getWcif(id: string) {
    try {
      const wcif = await this.prisma.competition.findUnique({
        where: {
          id,
        },
        select: {
          WCIF: true,
        },
      });
      return JSON.parse(wcif.WCIF.toString());
    } catch (error) {
      console.error(error);
    }
  }
  async updateWcif(id: string, wcif: string) {
    try {
      const competition = await this.prisma.competition.findUnique({
        where: {
          id,
        },
      });
      const wcifObject = JSON.parse(wcif);
      if (!competition) {
        await this.prisma.competition.create({
          data: {
            id: id,
            name: wcifObject.name,
            WCIF: wcif,
          },
        });
      } else {
        await this.prisma.competition.update({
          where: {
            id,
          },
          data: {
            WCIF: wcif,
          },
        });
        return wcif;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getEventsArrayFromWcif(id: string) {
    const wcif = await this.getWcif(id);
    const events = [];
    wcif.WCIF.events.map((event) => {
      events.push(event.id);
    });
    return events;
  }

  async getFinalStartTime(compId: string, eventId: string) {
    const competitionInfo = await this.getWcif(compId);
    const eventInfo = competitionInfo.events.find(
      (event) => event.id === eventId,
    );
    const roundsCount = eventInfo.rounds.length;
    const venues = competitionInfo.schedule.venues;
    let finalStartTime = new Date();
    venues.map((venue) => {
      venue.rooms.map((room) => {
        room.activities.map((activity) => {
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
    });
    return finalStartTime;
  }
  async getFinalEndTime(compId: string, eventId: string) {
    const competitionInfo = await this.getWcif(compId);
    const eventInfo = competitionInfo.events.find(
      (event) => event.id === eventId,
    );
    const roundsCount = eventInfo.rounds.length;
    const venues = competitionInfo.schedule.venues;
    let finalEndTime = new Date();
    venues.map((venue) => {
      venue.rooms.map((room) => {
        room.activities.map((activity) => {
          if (eventId !== '333mbf' && eventId !== '333fm') {
            if (activity.activityCode === `${eventId}-r${roundsCount}`) {
              finalEndTime = new Date(activity.endTime);
              return activity.endTime;
            }
          } else {
            if (activity.activityCode === `${eventId}-r${roundsCount}-a1`) {
              finalEndTime = new Date(activity.endTime);
              return activity.endTime;
            }
          }
        });
      });
    });
    return finalEndTime;
  }
}
