import { Inject, Controller, Provide, Get } from '@midwayjs/decorator';
import { Context } from 'egg';
import { TestService } from '../service/test';
import { ITestDTO } from '../dto/test';
@Provide()
@Controller('/test')
export class TestController {
  @Inject()
  public ctx: Context;

  @Inject()
  public TestService: TestService;

  @Get('/ok', { summary: 'Test success msg', description: '测试接口成功消息' })
  public async initOk() {
    return this.ctx.success('OK');
  }

  @Get('/error', { summary: 'Test error msg', description: '测试接口错误消息' })
  public async initError() {
    return this.ctx.error('error',500);
  }
  @Get('/init', { summary: 'init database data', description: '初始化数据' })
  public async initData() {
    await this.TestService.initData();
    return this.ctx.success('OK');
  }
  @Get('/all', { summary: 'Test database data', description: '测试数据库数据' })
  public async getAll():Promise<ITestDTO[]> {
    return this.ctx.success(await this.TestService.findAll());
  }
}
