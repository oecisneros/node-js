// https://zirkelc.dev/posts/extract-class-methods
export type ExtractInstanceType<T> = T extends new (...args: any[]) => infer R
  ? R
  : T extends { prototype: infer P }
  ? P
  : any;

export type User = Readonly<{
  id: number;
  name: string;
  height: string;
  gender: string;
}>;
