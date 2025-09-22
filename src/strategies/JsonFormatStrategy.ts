import { Resume } from "../models/Resume";
import { FormatStrategy } from "./FormatStrategy";

export class JsonFormatStrategy implements FormatStrategy {
  format(resume: Resume): string {
    const resumeData = {
      name: resume.name,
      contact: resume.contact,
      experiences: resume.experiences,
      educations: resume.educations,
      generatedAt: new Date().toISOString(),
    };

    return JSON.stringify(resumeData, null, 2);
  }

  getFileExtension(): string {
    return "json";
  }
}
