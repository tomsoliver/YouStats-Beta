export interface PoliticalParty {
  name: string;
  colour: string;
}

export interface GovernmentTerm {
  party: PoliticalParty;
  startDate: Date;
  endDate: Date;
  leader: string;
  color: string;
}
