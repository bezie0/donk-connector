declare type Donks = Record<string, [number, string]>;

declare module "*.svg" {
  const value: any;
  export = value;
}

declare module "*.webp" {
  const value: any;
  export = value;
}

declare module "*.png" {
  const value: any;
  export = value;
}
