import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEpisodeDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  mediaFile: string; // just the file name, e.g. "sample.mp4"
}
