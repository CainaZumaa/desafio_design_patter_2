import * as fs from "fs";
import * as path from "path";
import { Resume } from "../models/Resume";
import { FormatStrategy } from "../strategies/FormatStrategy";
import {
  FormatStrategyFactory,
  FormatType,
} from "../factories/FormatStrategyFactory";
import { ConfigManager } from "../singletons/ConfigManager";

export class ResumeService {
  private configManager: ConfigManager;

  constructor() {
    this.configManager = ConfigManager.getInstance();
    this.ensureOutputDirectory();
  }

  private ensureOutputDirectory(): void {
    const outputDir = this.configManager.getOutputDirectory();
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  }

  saveResume(resume: Resume): void {
    const availableFormats = FormatStrategyFactory.getAvailableFormats();

    availableFormats.forEach((formatType) => {
      const strategy = FormatStrategyFactory.createStrategy(formatType);
      const content = strategy.format(resume);
      const filename = this.generateFilename(
        resume.name,
        strategy.getFileExtension()
      );
      const filepath = path.join(
        this.configManager.getOutputDirectory(),
        filename
      );

      fs.writeFileSync(filepath, content, "utf8");
      console.log(`Currículo salvo em: ${filepath}`);
    });
  }

  private generateFilename(name: string, extension: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const sanitizedName = name.toLowerCase().replace(/\s+/g, "_");
    return `${sanitizedName}_${timestamp}.${extension}`;
  }
}
