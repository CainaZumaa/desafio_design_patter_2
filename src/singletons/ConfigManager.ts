export class ConfigManager {
  private static instance: ConfigManager;
  private outputDirectory: string;

  private constructor() {
    this.outputDirectory = "./output";
  }

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  getOutputDirectory(): string {
    return this.outputDirectory;
  }

  setOutputDirectory(directory: string): void {
    this.outputDirectory = directory;
  }
}
