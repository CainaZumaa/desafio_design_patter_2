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
    console.log("=== RESUME BUILDER ===\n");
    console.log("=== CONSTRUTOR DE CURRÍCULO ===\n");
    console.log(
      '[EN-US] Type "exit" or "sair" at any time to close the program.\n'
    );
    console.log(
      '[PT-BR] Digite "sair" a qualquer momento para encerrar o programa.\n'
    );

    while (true) {
      try {
        const resume = await this.buildResume();
        if (resume) {
          this.resumeService.saveResume(resume);
          console.log("\n[EN-US] Resume created successfully!\n");
          console.log("[PT-BR] Currículo criado com sucesso!\n");
        }
      } catch (error) {
        if (error instanceof Error && error.message === "EXIT") {
          break;
        }
        console.error(
          "[EN-US] Error:",
          error instanceof Error ? error.message : "Unknown error"
        );
        console.error(
          "[PT-BR] Erro:",
          error instanceof Error ? error.message : "Erro desconhecido"
        );
      }
    }

    this.rl.close();
    console.log("[EN-US] Program closed.");
    console.log("[PT-BR] Programa encerrado.");
  }

  private async buildResume() {
    const builder = new ResumeBuilder();

    // Nome
    const name = await this.askQuestion(
      "[EN-US] Enter your name: [PT-BR] Digite seu nome: "
    );
    if (this.shouldExit(name)) throw new Error("EXIT");
    builder.withName(name);

    // Contato
    const contact = await this.askQuestion(
      "[EN-US] Enter your contact (email/phone): [PT-BR] Digite seu contato (email/telefone): "
    );
    if (this.shouldExit(contact)) throw new Error("EXIT");
    builder.withContact(contact);

    // Experiências
    console.log(
      "\n--- [EN-US] Professional Experience / [PT-BR] Experiências Profissionais ---"
    );
    while (true) {
      const addMore = await this.askQuestion(
        "[EN-US] Do you want to add an experience? (y/n): [PT-BR] Deseja adicionar uma experiência? (s/n): "
      );
      if (this.shouldExit(addMore)) throw new Error("EXIT");

      if (addMore.toLowerCase() !== "s" && addMore.toLowerCase() !== "y") break;

      const position = await this.askQuestion(
        "[EN-US] Position: [PT-BR] Cargo: "
      );
      if (this.shouldExit(position)) throw new Error("EXIT");

      const company = await this.askQuestion(
        "[EN-US] Company: [PT-BR] Empresa: "
      );
      if (this.shouldExit(company)) throw new Error("EXIT");

      const period = await this.askQuestion(
        "[EN-US] Period: [PT-BR] Período: "
      );
      if (this.shouldExit(period)) throw new Error("EXIT");

      builder.addExperience(position, company, period);
    }

    // Formações
    console.log(
      "\n--- [EN-US] Academic Education / [PT-BR] Formação Acadêmica ---"
    );
    while (true) {
      const addMore = await this.askQuestion(
        "[EN-US] Do you want to add an education? (y/n): [PT-BR] Deseja adicionar uma formação? (s/n): "
      );
      if (this.shouldExit(addMore)) throw new Error("EXIT");

      if (addMore.toLowerCase() !== "s" && addMore.toLowerCase() !== "y") break;

      const degree = await this.askQuestion(
        "[EN-US] Degree/Course: [PT-BR] Curso/Grau: "
      );
      if (this.shouldExit(degree)) throw new Error("EXIT");

      const institution = await this.askQuestion(
        "[EN-US] Institution: [PT-BR] Instituição: "
      );
      if (this.shouldExit(institution)) throw new Error("EXIT");

      const period = await this.askQuestion(
        "[EN-US] Period: [PT-BR] Período: "
      );
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
    return input.toLowerCase() === "sair" || input.toLowerCase() === "exit";
  }
}

// Iniciar aplicação
const app = new ResumeApplication();
app.start().catch(console.error);
