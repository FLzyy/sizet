export interface Options {
  tempDir?: string;
  output?: string | false;
  verbose?: boolean;
}

export interface Sizes {
  tarGzipped: number;
  min: number;
  unpacked: number;
}
