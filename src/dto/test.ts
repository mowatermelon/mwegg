import { Rule, RuleType } from '@midwayjs/decorator';

export class ITestDTO {
  @Rule(RuleType.number().required())
  public id: number;

  @Rule(RuleType.number().required())
  public state: number;
}
