import { Hook } from "@oclif/core";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import { stringify } from "yaml";

const ensureConfig: Hook<"init"> = async function (this, options) {
  if (process.env.CLEAR_ARCHITECT_CONFIG) {
    this.log("Clearing config");
    rmSync(options.config.configDir, { recursive: true, force: true });
  }
  const path = join(options.config.configDir, "config.yml");
  if (!existsSync(path)) {
    this.log("Creating default config");
    mkdirSync(options.config.configDir, { recursive: true });
    const defaultConfig = stringify({
      blueprints: ["toto"],
    });
    this.debug(`Writing default config to ${path}`);
    this.debug(defaultConfig);

    writeFileSync(path, defaultConfig);
  }
};

export default ensureConfig;
