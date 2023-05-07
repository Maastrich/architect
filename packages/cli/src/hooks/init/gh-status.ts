import { GhError, status } from "@architect/git";
import { Hook, ux } from "@oclif/core";

const ghStatus: Hook<"init"> = async function (this) {
  ux.action.start("Checking gh auth status");
  try {
    status();
  } catch (error) {
    ux.action.stop("failed");
    if (error instanceof GhError) {
      this.error(error.payload.message);
      if (error.payload.hint) {
        this.log(error.payload.hint);
      }
      if (error.payload.fatal) {
        this.exit(1);
      }
    } else {
      this.error(error as Error);
    }
  }
  ux.action.stop();
};

export default ghStatus;
