import { Resume } from "../models/Resume";

export interface FormatStrategy {
  format(resume: Resume): string;
  getFileExtension(): string;
}
