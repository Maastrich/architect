import { Repository } from "../core";

interface CloneOptions {
  bare?: boolean;
  dissociate?: boolean;
  mirror?: boolean;
  noCheckout?: boolean;
  noRemoteSubmodules?: boolean;
  noShallowSubmodules?: boolean;
  noSingleBranch?: boolean;
  noTags?: boolean;
  remoteSubmodules?: boolean;
  singleBranch?: boolean;
  shallowSubmodules?: boolean;
  verbose?: boolean;
  depth?: number;
  jobs?: number;
  branch?: string;
  origin?: string;
  recurseSubmodules?: string;
  separateGitDir?: string;
  shallowSince?: string;
  shallowExclude?: string;
  template?: string;
}
function parseGitCloneError(errorMsg: string) {
  const regex = /(?:(fatal|error):)?\s?(.+?)(?:\n|$))/g;

  let match;
  const errorObj: {
    type?: string;
    message?: string;
    hint?: string;
    details?: string;
    error?: string;
  } = {};

  while ((match = regex.exec(errorMsg)) !== null) {
    if (match[1]) {
      errorObj.type = match[1];
    }
    if (match[2]) {
      errorObj.message = match[2];
    }
    if (match[3]) {
      errorObj.hint = match[3];
    }
    if (match[4]) {
      errorObj.details = match[4];
    }
  }

  if (Object.keys(errorObj).length === 0) {
    errorObj.error = "Unrecognized error message format.";
  }

  return errorObj;
}

function clone(this: Repository, options: CloneOptions = {}) {
  const result = this.exec(["repo", "clone"], {
    params: [this.name, "--"],
    options,
  });
  if (result.status !== 0) {
    const stdout = result.stdout.toString().trim().trim();
    const stderr = result.stderr.toString().trim();
    console.log(stdout, stderr);
    const error = parseGitCloneError(stdout);
    console.log(error);
    throw new Error(error.message);
  }
  return;
}

export default clone;
