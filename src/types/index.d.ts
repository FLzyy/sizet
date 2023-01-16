export interface Options {
  tempDir?: string;
  output?: string | false;
  cwd?: string | false;
}

export interface Sizes {
  tarGzipped: number;
  min: number;
  unpacked: number;
}
