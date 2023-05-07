import { Command, ux } from "@oclif/core";
import ConfigOverload from "./config";

abstract class CommandOverload extends Command {
  public config!: ConfigOverload;

  async init(): Promise<void> {
    await super.init();
    console.log(`Config exists in init: ${!!this.config}`);
    console.log(`Config`, this.config.options);
    this.config = new ConfigOverload(this.config.options);
  }

  async run() {
    console.log(`Config exists in run: ${!!this.config}`);
  }
}

export default CommandOverload;
