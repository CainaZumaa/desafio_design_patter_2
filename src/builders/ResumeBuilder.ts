import { Resume, Experience, Education } from "../models/Resume";

export class ResumeBuilder {
  private resume: Resume;

  constructor() {
    this.resume = new Resume();
  }

  withName(name: string): ResumeBuilder {
    this.resume.name = name;
    return this;
  }

  withContact(contact: string): ResumeBuilder {
    this.resume.contact = contact;
    return this;
  }

  addExperience(
    position: string,
    company: string,
    period: string
  ): ResumeBuilder {
    const experience: Experience = { position, company, period };
    this.resume.addExperience(experience);
    return this;
  }

  addEducation(
    degree: string,
    institution: string,
    period: string
  ): ResumeBuilder {
    const education: Education = { degree, institution, period };
    this.resume.addEducation(education);
    return this;
  }

  build(): Resume {
    if (!this.resume.isValid()) {
      throw new Error("Resume must have at least name and contact");
    }
    return this.resume;
  }
}
