import { Config } from "@oclif/core";

declare module "@oclif/core" {
  abstract class Config {
    static defaultConfig: {
      blueprints: string[];
    };
    path: string;
    getPath(element: string): string;
    blueprint(name: string): string;
  }
}
