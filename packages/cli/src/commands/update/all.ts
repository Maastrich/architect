import { Command, Flags } from "@oclif/core";

class UpdateAll extends Command {
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
    const { flags, args, ...rest } = await this.parse(UpdateAll);
    // console.log(flags, args, rest);
    // console.log(this.config);
    this.log("Not implemented");
    throw new Error("Not ed");
  }

  async catch(error: Error) {
    console.log(error.message);
  }
}

UpdateAll.description = "Create a new project";

export default UpdateAll;
