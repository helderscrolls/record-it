import { Document } from 'mongoose';

export interface Project extends Document {
  readonly description: string;
  readonly name: string;
  readonly exercice_directory: string;
  readonly folder: string;
  readonly option: string;
  readonly index: string[];
  readonly created_at: Date;
  readonly users: string[];
}