declare module 'egg' {
  interface Context {
    success<T>(data: T): any;
    error(errMsg: string, errCode: number): any;
    infoTip(msg: string): void;
    errorTip(msg: string): void;
    warnTip(msg: string): void;
  }
}
