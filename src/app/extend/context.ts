import { Context } from 'egg';

interface IRes {
  success: boolean;
  data?: any;
  errMsg?: string;
  errCode?: number;
}

export default {
  success<T>(data: T):IRes {
    return {
      success: true,
      data,
    };
  },
  error(errMsg: string, errCode: number):IRes {
    return {
      success: false,
      errMsg,
      errCode,
    };
  },
  infoTip(msg: string): void {
    // eslint-disable-next-line no-console
    ((this as unknown) as Context).logger.info('[test]', msg);
  },
  errorTip(msg: string): void {
    // eslint-disable-next-line no-console
    ((this as unknown) as Context).logger.error('[test]', msg);
  },
  warnTip(msg: string): void {
    // eslint-disable-next-line no-console
    ((this as unknown) as Context).logger.warn('[test]', msg);
  },
};
