export interface Options {
  tempDir?: string;
  output?: string | false;
  verbose?: boolean;
  force?: boolean;}
export interface Sizes {
  tarGzipped: number;
  min: number;
  unpacked: number;}
export declare const npmPackageRegex: RegExp;
export declare const remote: (name: string, options?: Options) => Sizes;
export declare const local: (src: string, options?: Options) => Sizes;