import * as Md from 'module';

declare module 'module' {
  class Module extends Md {
    static _findPath(request: string, paths: string[], isMain: boolean): string;
    static _nodeModulePaths(path: string): string[];
    static _resolveLookupPaths(
      request: string,
      fakeParent: Module,
      deep: boolean
    );
  }
  export = Module;
}
