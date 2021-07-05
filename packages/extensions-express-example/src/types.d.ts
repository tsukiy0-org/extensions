declare module "logform/printf" {
  function printf(
    templateFunction: (info: TransformableInfo) => string
  ): Format;

  export default printf;

  export interface TransformableInfo {
    level: string;
    message: string;
    [key: string]: any;
  }

  export type TransformFunction = (
    info: TransformableInfo,
    opts?: any
  ) => TransformableInfo | boolean;

  export class Format {
    constructor(opts?: object);

    options?: object;
    transform: TransformFunction;
  }
}
