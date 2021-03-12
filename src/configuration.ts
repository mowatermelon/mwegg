import { Configuration } from '@midwayjs/decorator';
import * as orm from '@midwayjs/orm';
import * as swagger from '@midwayjs/swagger';
@Configuration({
  imports: [
    orm, // 加载 orm 组件
    swagger, // 加载 swagger 组件
  ],
})
export class ContainerConfiguratin {}
