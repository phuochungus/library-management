import { IsUUID } from 'class-validator';

export class CreateBookShelfDto {
  @IsUUID('4', { each: true })
  bookIds: string[];
}
