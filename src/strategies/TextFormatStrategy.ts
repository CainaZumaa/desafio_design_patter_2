import { Resume } from "../models/Resume";
import { FormatStrategy } from "./FormatStrategy";

export class TextFormatStrategy implements FormatStrategy {
  format(resume: Resume): string {
    let text = `CURRÍCULO\n`;
    text += `==========\n\n`;
    text += `Nome: ${resume.name}\n`;
    text += `Contato: ${resume.contact}\n\n`;

    if (resume.experiences.length > 0) {
      text += `EXPERIÊNCIA PROFISSIONAL\n`;
      text += `=======================\n`;
      resume.experiences.forEach((exp, index) => {
        text += `${index + 1}. ${exp.position}\n`;
        text += `   Empresa: ${exp.company}\n`;
        text += `   Período: ${exp.period}\n\n`;
      });
    }

    if (resume.educations.length > 0) {
      text += `FORMAÇÃO ACADÊMICA\n`;
      text += `==================\n`;
      resume.educations.forEach((edu, index) => {
        text += `${index + 1}. ${edu.degree}\n`;
        text += `   Instituição: ${edu.institution}\n`;
        text += `   Período: ${edu.period}\n\n`;
      });
    }

    return text;
  }

  getFileExtension(): string {
    return "txt";
  }
}
