import { FormatStrategy } from "../strategies/FormatStrategy";
import { TextFormatStrategy } from "../strategies/TextFormatStrategy";
import { JsonFormatStrategy } from "../strategies/JsonFormatStrategy";

export enum FormatType {
  TEXT = "txt",
  JSON = "json",
}

export class FormatStrategyFactory {
  static createStrategy(formatType: FormatType): FormatStrategy {
    switch (formatType) {
      case FormatType.TEXT:
        return new TextFormatStrategy();
      case FormatType.JSON:
        return new JsonFormatStrategy();
      default:
        throw new Error(`Unsupported format type: ${formatType}`);
    }
  }

  static getAvailableFormats(): FormatType[] {
    return [FormatType.TEXT, FormatType.JSON];
  }
}
