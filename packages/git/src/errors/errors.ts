export enum ErrorType {
  GhNotInstalled = "GhNotInstalled",
  GhNotLoggedIn = "GhNotLoggedIn",
}

interface ErrorPayload {
  message: string;
  hint?: string;
  fatal?: boolean;
}

const payloads: Record<ErrorType, ErrorPayload> = {
  [ErrorType.GhNotInstalled]: {
    message: "Gh is not installed.",
    hint: "Install gh by running `brew install gh`.",
    fatal: true,
  },
  [ErrorType.GhNotLoggedIn]: {
    message: "Gh is not logged in.",
    hint: "Log in to gh by running `gh auth login`.",
    fatal: true,
  },
};

export class GhError extends Error {
  public payload: ErrorPayload;
  constructor(type: ErrorType) {
    super();
    this.name = "GhError";
    this.payload = payloads[type];
  }
}
