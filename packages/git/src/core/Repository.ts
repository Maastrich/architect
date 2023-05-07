import { join } from "path";
import { GitUrl, ResolveUrlOptions } from "../utils/GitUrl";
import { SpawnSyncReturns, spawnSync } from "child_process";
import { mkdirSync } from "fs";
import { clone } from "../operations";

interface Options extends ResolveUrlOptions {}

export default class Repository {
  public path: string;
  public url: GitUrl;
  constructor(public name: string, directory: string, options: Options) {
    this.path = join(directory, name);
    this.url = new GitUrl(name, options);
  }

  protected exec(
    operation: Array<string>,
    {
      params = [],
      options = {},
    }: { params?: Array<string>; options?: object } = {}
  ): SpawnSyncReturns<Buffer> {
    const args: Array<string> = [...operation, ...params];
    for (const [key, value] of Object.entries(options)) {
      switch (typeof value) {
        case "boolean":
          if (value) {
            args.push(`--${key}`);
          }
          break;
        case "string":
          args.push(`--${key}=${value}`);
          break;
        case "number":
          args.push(`--${key}=${value}`);
          break;
        case "object":
          if (Array.isArray(value)) {
            for (const item of value) {
              args.push(`--${key}=${item}`);
            }
            break;
          }
        // fallthrough
        default:
          throw new Error(`Unknown option type: ${typeof value}`);
      }
    }
    mkdirSync(this.path, { recursive: true });
    return spawnSync("gh", args, { cwd: this.path });
  }

  public clone: typeof clone = clone;
}
