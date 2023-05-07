import { Config } from "@oclif/core";
import { join } from "path";

class ConfigOverload extends Config {
  static defaultConfig = {
    blueprints: ["Maastrich/canned"],
  };

  public path: string;
  constructor(options: Config["options"]) {
    super(options);
    console.log(`Config exists in constructor: ${!!this}`);
    this.path = join(this.configDir, "config.yml");
  }

  public getPath(element: string) {
    return join(this.configDir, element);
  }

  public blueprint(name: string) {
    return join(this.configDir, "blueprints", name);
  }
}

export default ConfigOverload;
