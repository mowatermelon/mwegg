import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo): DefaultConfig => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1610873522430_9893';

  // add your config here
  config.middleware = ['logger', 'errorHandler'];

  config.security = {
    csrf: false,
    domainWhiteList: ['http://localhost'],
  };
  config.swagger = {
    title: 'demo-swagger',
    description: 'swagger-ui for demo api',
    version: '1.0.0',
    // termsOfService: '',
    contact: {
      name: 'API extension Support',
      url: 'http://test@test.com',
      email: 'test@test.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  };

  return config;
};
