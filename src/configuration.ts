import { Configuration } from '@midwayjs/decorator';
import * as swagger from '@midwayjs/swagger';

const enabledEnvironment = ['local', 'unittest']
@Configuration({
  imports: [
    {
      component: swagger, // 加载 swagger 组件,
      enabledEnvironment,
    },
  ],
})
export class ContainerConfiguratin {}
