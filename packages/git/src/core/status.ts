import { spawnSync } from "child_process";
import { ErrorType, GhError } from "../errors/errors";

function status() {
  const which = spawnSync("which gh", { shell: true });
  if (which.status !== 0) {
    throw new GhError(ErrorType.GhNotInstalled);
  }
  const result = spawnSync("gh auth status", { shell: true });
  if (result.status !== 0) {
    throw new GhError(ErrorType.GhNotLoggedIn);
  }
  return;
}

export default status;
