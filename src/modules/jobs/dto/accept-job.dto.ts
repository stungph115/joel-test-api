import { IsNotEmpty, IsString } from 'class-validator';

export class AcceptJobDto {
  @IsString()
  @IsNotEmpty()
  jobId: string;
}
