import { Command, Flags } from "@oclif/core";

class Update extends Command {
  public static enableJsonFlag = true;

  static flags = {
    "git-init": Flags.boolean({
      description: "Initialize a git repository",
      default: true,
      allowNo: true,
    }),
    "skip-install": Flags.boolean({
      description: "Skip installing dependencies",
      default: false,
    }),
  };

  async run() {
    const { flags, args, ...rest } = await this.parse(Update);
    // console.log(flags, args, rest);
    // console.log(this.config);
    throw new Error("Not implemented");
  }

  async catch(error: Error) {
    console.log(error.message);
  }
}

Update.description = "Create a new project";

export default Update;
