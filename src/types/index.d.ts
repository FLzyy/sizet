export interface Options {
  tempDir?: string;
  output?: string | false;
  cwd?: string | false;
}

export interface Sizes {
  minzip: number;
  min: number;
  unpacked: number;
}
