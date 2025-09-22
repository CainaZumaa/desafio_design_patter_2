import * as readline from "readline";
import { ResumeBuilder } from "./builders/ResumeBuilder";
import { ResumeService } from "./services/ResumeService";

class ResumeApplication {
  private rl: readline.Interface;
  private resumeService: ResumeService;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.resumeService = new ResumeService();
  }

  async start(): Promise<void> {
    console.log("=== CONSTRUTOR DE CURRÍCULO ===\n");
    console.log('Digite "sair" a qualquer momento para encerrar o programa.\n');

    while (true) {
      try {
        const resume = await this.buildResume();
        if (resume) {
          this.resumeService.saveResume(resume);
          console.log("\nCurrículo criado com sucesso!\n");
        }
      } catch (error) {
        if (error instanceof Error && error.message === "EXIT") {
          break;
        }
        console.error(
          "Erro:",
          error instanceof Error ? error.message : "Erro desconhecido"
        );
      }
    }

    this.rl.close();
    console.log("Programa encerrado.");
  }

  private async buildResume() {
    const builder = new ResumeBuilder();

    // Nome
    const name = await this.askQuestion("Digite seu nome: ");
    if (this.shouldExit(name)) throw new Error("EXIT");
    builder.withName(name);

    // Contato
    const contact = await this.askQuestion(
      "Digite seu contato (email/telefone): "
    );
    if (this.shouldExit(contact)) throw new Error("EXIT");
    builder.withContact(contact);

    // Experiências
    console.log("\n--- Experiências Profissionais ---");
    while (true) {
      const addMore = await this.askQuestion(
        "Deseja adicionar uma experiência? (s/n): "
      );
      if (this.shouldExit(addMore)) throw new Error("EXIT");

      if (addMore.toLowerCase() !== "s") break;

      const position = await this.askQuestion("Cargo: ");
      if (this.shouldExit(position)) throw new Error("EXIT");

      const company = await this.askQuestion("Empresa: ");
      if (this.shouldExit(company)) throw new Error("EXIT");

      const period = await this.askQuestion("Período: ");
      if (this.shouldExit(period)) throw new Error("EXIT");

      builder.addExperience(position, company, period);
    }

    // Formações
    console.log("\n--- Formação Acadêmica ---");
    while (true) {
      const addMore = await this.askQuestion(
        "Deseja adicionar uma formação? (s/n): "
      );
      if (this.shouldExit(addMore)) throw new Error("EXIT");

      if (addMore.toLowerCase() !== "s") break;

      const degree = await this.askQuestion("Curso/Grau: ");
      if (this.shouldExit(degree)) throw new Error("EXIT");

      const institution = await this.askQuestion("Instituição: ");
      if (this.shouldExit(institution)) throw new Error("EXIT");

      const period = await this.askQuestion("Período: ");
      if (this.shouldExit(period)) throw new Error("EXIT");

      builder.addEducation(degree, institution, period);
    }

    return builder.build();
  }

  private askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  private shouldExit(input: string): boolean {
    return input.toLowerCase() === "sair";
  }
}

// Iniciar aplicação
const app = new ResumeApplication();
app.start().catch(console.error);
