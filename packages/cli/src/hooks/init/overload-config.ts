import { Config } from "@oclif/core";
import ConfigOverload from "../../oclif-overload/config";

Object.defineProperties(
  Config.prototype,
  Object.getOwnPropertyDescriptors(ConfigOverload.prototype)
);
