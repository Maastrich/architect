export interface ResolveUrlOptions {
  provider?: "github" | "gitlab" | "bitbucket" | "codecommit";
  protocol?: "ssh" | "https";
}

export class GitUrl {
  private url: string;
  constructor(
    public name: string,
    { provider = "github", protocol = "https" }: ResolveUrlOptions
  ) {
    this.url =
      protocol === "https"
        ? this.resolveHttpsUrl(provider)
        : this.resolveSshUrl(provider);
  }

  private resolveHttpsUrl(provider: ResolveUrlOptions["provider"]) {
    switch (provider) {
      case "github":
        return `https://github.com/${this.name}.git`;
      case "gitlab":
        return `https://gitlab.com/${this.name}.git`;
      case "bitbucket":
        return `https://bitbucket.org/${this.name}.git`;
      case "codecommit":
        return `https://git-codecommit.us-east-1.amazonaws.com/v1/repos/${this.name}`;
      default:
        throw new Error(`Unknown provider: ${provider}`);
    }
  }

  private resolveSshUrl(provider: ResolveUrlOptions["provider"]) {
    switch (provider) {
      case "github":
        return `git@github.com:${this.name}.git`;
      case "gitlab":
        return `git@gitlab.com:${this.name}.git`;
      case "bitbucket":
        return `git@bitbucket.org:${this.name}.git`;
      case "codecommit":
        throw new Error("CodeCommit does not support SSH URLs.");
      default:
        throw new Error(`Unknown provider: ${provider}`);
    }
  }

  public toString() {
    return this.url;
  }
}
