import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';

@Provide('logger')
export class LoggerMiddleware implements IWebMiddleware {
  public resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      // 对于 swagger 地址不做说明
      const {
        url,
        params,
        request: { body, queries },
      } = ctx;
      if (url.indexOf('swagger') > -1) {
        ctx.infoTip(`request ${url}`);
        return await next();
      }
      const formatMsg = (msg) => (msg ? JSON.stringify(msg) : '{}');
      ctx.infoTip(
        `request start -->  params:${formatMsg(params)} body: ${formatMsg(body)}, query: ${formatMsg(queries)}`,
      );
      await next();
      const {
        response: { status: resStatus, body: resBody },
      } = ctx;
      ctx.infoTip(`request end -->  status: ${resStatus}, data: ${formatMsg(resBody)} `);
    };
  }
}
