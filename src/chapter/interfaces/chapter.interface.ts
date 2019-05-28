import { Document } from 'mongoose';

export interface Chapter extends Document {
  readonly description: string;
  readonly name: string;
  readonly position_in_list: number;
  readonly videos: string[];
}