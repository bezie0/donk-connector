type Data = [number, string];
declare module "*donks.json" {
  const value: Record<string, Data>;
  export default value;
}

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
