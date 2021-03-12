import { EggAppConfig, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (): DefaultConfig => {
  const config = {} as DefaultConfig;

  config.orm = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'zaozaorun',
    database: 'zaozaoliao',
    synchronize: false,
    logging: false,
  };
  
  return config;
};
