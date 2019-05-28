export class CreateVideoDTO {
  readonly position_in_chapter: number;
  readonly description: string;
  readonly video_duration: number;
  readonly exercice_file: string;
  readonly finished: boolean;
  readonly name: string;
  readonly position: number;
  readonly video_file: string;
  readonly comments: string;
  readonly created_at: Date;
}