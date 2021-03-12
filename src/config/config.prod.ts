import { EggAppConfig, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (): DefaultConfig => {
  const config = {} as DefaultConfig;

  config.orm = {
    type: 'mysql',
    host: '',
    port: 3306,
    username: '',
    password: '',
    database: undefined,
    synchronize: false,
    logging: false,
  };

  return config;
};
