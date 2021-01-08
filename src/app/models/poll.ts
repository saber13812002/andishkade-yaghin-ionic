export class Poll {
  id: number;
  question: string;
  choices: any;
  createdBy: any;
  creationDateTime;
  expirationDateTime:Date;
  totalVotes:number;
  expired:Boolean;
}