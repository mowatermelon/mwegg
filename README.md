# mw + egg

middway + typescript + egg + typeorm + swagger

## 项目说明

基于 middway + egg + typeorm + swagger 的后端服务项目

## 项目使用

#### 安装依赖

```sh
$ npm i 
```

#### 配置阿里云信息

```sh
$ npm run init:config
npm run init:config
> server@1.0.0 init:config
> npm run fun:config


> server@1.0.0 fun:config
> fun config

? Aliyun Account ID ***********
# https://fc.console.aliyun.com/fc/overview/cn-shanghai
? Aliyun Access Key ID *****************
? Aliyun Access Key Secret ***************
# https://fc.console.aliyun.com/fc/service/
? Default region name cn-shanghai
? The timeout in seconds for each SDK client invoking 
100
? The maximum number of retries for each SDK client 10
0
? Allow to anonymously report usage statistics to impr
ove the tool over time? Yes
? Use custom endpoint? Yes
```

#### 本地开发

```sh
$ npm run dev
```

> 如果要测试数据库 -表数据

注意将 `/src/config/config.local.ts` 中 数据库相关用户名，用户密码和数据库创建。

#### 查看接口文档信息

访问 localhost:7000/swagger-ui/index.html

![image](https://user-images.githubusercontent.com/18508817/110947545-42364100-837b-11eb-8db2-d3ded1750771.png)


#### 构建 egg 项目

```sh
$ npm run build
```

#### 构建 && 发布 midway 项目

```sh
$ npm run deploy
```
