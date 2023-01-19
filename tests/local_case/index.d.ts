export interface Options {
  tempDir?: string;
  verbose?: boolean;}
export interface Sizes {
  tarGzipped: number;
  unpacked: number;}
export declare const remote: (name: string, options?: Options) => Sizes;
export declare const local: (src: string, options?: Options) => Sizes;