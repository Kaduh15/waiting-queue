import { IsDate, IsString, IsUUID } from "class-validator";

export class WaitingLine {
  @IsUUID()
  id?: string;

  @IsString()
  name: string;

  @IsDate()
  createdAt: Date;
  
  @IsString()
  status: Status;

  @IsDate()
  initialServiceTime?: Date
  
  @IsDate()
  finishedServiceTime?: Date
}

export type Status = 'WAITING' 
  | 'IN_PROGRESS' 
  | 'FINISHED' 
  | 'ABSENT'
