export interface Experience {
  position: string;
  company: string;
  period: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export class Resume {
  constructor(
    public name: string = "",
    public contact: string = "",
    public experiences: Experience[] = [],
    public educations: Education[] = []
  ) {}

  addExperience(experience: Experience): void {
    this.experiences.push(experience);
  }

  addEducation(education: Education): void {
    this.educations.push(education);
  }

  isValid(): boolean {
    return this.name.trim() !== "" && this.contact.trim() !== "";
  }
}
