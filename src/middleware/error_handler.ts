import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';

@Provide('errorHandler')
export class ErrorFoundHandlerMiddleware implements IWebMiddleware {
  public resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      const isProdEnv = ctx.app.config.env === 'production';
      try {
        await next();
        if (ctx.status === 404 && !ctx.body) {
          if (ctx.acceptJSON) {
            ctx.body = { error: 'Not Found' };
          } else {
            ctx.body = `
            <div>
              <h1>ops server is error</h1>
              ${isProdEnv ? '请联系系统管理员' : '<a href="/swagger-ui/index.html">查看 swagger 接口说明 </a>'}
            </div>
            `;
          }
        }
      } catch (err) {
        // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
        ctx.app.emit('error', err, ctx);
        const status = err.status || 500;
        const defaultErrMsg = '[catch error]';
        const isFieldCheckErr = Array.isArray(err.details);
        const reallyErrMsg = isFieldCheckErr ? err.details[0].message : err.message;
        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
        let errMsg = status === 500 && isProdEnv ? 'Internal Server Error' : reallyErrMsg;
        if (isFieldCheckErr) {
          const fieldErrCode = 422;
          // 这里是参数校验错误
          errMsg = `[field error] 字段不合法: ${errMsg}`;
          ctx.errorTip(errMsg);
          ctx.status = fieldErrCode;
          ctx.body = ctx.error(errMsg, fieldErrCode);
        } else {
          // 从 error 对象上读出各个属性，设置到响应中
          ctx.errorTip(`${defaultErrMsg} ${errMsg}`);
          ctx.status = status;
          ctx.body = ctx.error(`${defaultErrMsg} ${errMsg}`, status);
        }
      }
    };
  }
}
