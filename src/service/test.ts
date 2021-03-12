import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Context } from 'egg';
import { Repository } from 'typeorm';
import { EState } from '../constants';
import { ITestDTO } from '../dto/test';
import { Test } from '../entity/test';

@Provide()
export class TestService {
  @InjectEntityModel(Test)
  public TestModel: Repository<Test>;
  @Inject()
  public ctx: Context;
  public async initData() {
    if (this.ctx.app.config.env === 'local') {
      const newTest : ITestDTO[] = [{
        id:1,
        state: EState.Valid
      },{
        id:2,
        state: EState.Invalid
      }]
      await this.TestModel.save(newTest);
    }
  }
  public async findAll():Promise<ITestDTO[]> {
    return await this.TestModel.find();
  }
}
