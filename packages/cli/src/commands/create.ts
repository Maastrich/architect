import { Flags, Command } from "@oclif/core";
import { Repository } from "@architect/git";

class Create extends Command {
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
    branch: Flags.string({
      description: "The branch to clone",
      summary: "The default value is the main branch of the repository",
    }),
  };

  async run() {
    const blueprint = new Repository(
      "Maastrich/canned",
      this.config.getPath("blueprints"),
      {
        provider: "github",
        protocol: "https",
      }
    );
    blueprint.clone();
  }

  async catch(error: Error) {
    this.error(error.message);
  }
}

Create.description = "Create a new project";

export default Create;
