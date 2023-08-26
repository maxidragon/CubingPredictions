import {
  Event as EventInterface,
  Person as WCIFPerson,
  Schedule,
  WcaId,
} from "@wca/helpers";
export interface Event {
  id: string;
  name: string;
  icon: string;
}

export interface PublicWCIF {
  formatVersion: string;
  id: string;
  name: string;
  shortName: string;
  events: EventInterface[];
  persons: WCIFPerson[];
  schedule: Schedule;
}

export interface Competitor {
  name: string;
  wcaId: WcaId;
  wcaUserId: number;
  worldRank: number;
}

export interface Prediction {
  firstPlace: Competitor;
  secondPlace: Competitor;
  thirdPlace: Competitor;
  isChecked: boolean;
  score: number;
}

export interface TablePrediction {
  event: string;
  score: number;
}

export interface User {
  id: string;
  username: string;
  wcaId?: string;
}

export interface Person {
  name: string;
  wcaId: string;
  wcaUserId: number;
  user: User;
  score: number;
  position: number;
}

export interface Competition {
  id: string;
  name: string;
  website: string;
  countryIso2: string;
  country_iso2?: string;
  isRegistrationOpen: boolean;
}

export interface CompetitionInfo {
  id: string;
  name: string;
  url: string;
  country_iso2: string;
  registration_open: string;
  start_date: string;
}

export interface Podium {
  firstPlace: Competitor;
  secondPlace: Competitor;
  thirdPlace: Competitor;
}

export interface PsychsheetPerson {
  id: number;
  name: string;
  wcaId: string;
  country: string;
  result: string;
  worldRank: number;
  notResult: boolean;
}

export interface Profile {
  id: number;
  username: string;
  wcaId: string;
  score: number;
  predictionsNumber: number;
}

export interface UserPrediction {
  competitionId: string;
  competitionName: string;
  predictions: TablePrediction[];
  sumOfScore: number;
}

export interface Settings {
  username: string;
  wcaId: string;
  email: string;
}
