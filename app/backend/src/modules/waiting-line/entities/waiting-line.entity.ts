export class WaitingLine {
  id?: string;
  name: string;
  createdAt: Date;
  status: Status;
  initialServiceTime?: Date
  finishedServiceTime?: Date
}

export type Status = 'WAITING' 
  | 'IN_PROGRESS' 
  | 'FINISHED' 
  | 'ABSENT'
