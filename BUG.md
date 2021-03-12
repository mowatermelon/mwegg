# 项目问题

#### 基础描述

egg 项目，发布到线上之后，函数调用异常。

按照官网说法[eggjs & mw2](https://www.yuque.com/midwayjs/midway_v2/eggjs) 和 [migrate_egg](https://www.yuque.com/midwayjs/midway_v2/migrate_egg)，在 `@Controller('/test')`注入之后，使用默认的 `f.yml`,就会自动生成 function 信息，但是并没有。

#### 环境信息

|环境|版本信息|
|:--|:--|
|node|14.4.0|
|npm|7.6.0|
|npm registry|cnpm|
|OS|macOS Big Sur|

#### 依赖信息

`@midwayjs/cli ` `v1.2.38`

```javascript
[Verbose]  Plugin load list [
  { mod: '@midwayjs/cli-plugin-build', command: 'build' },
  { mod: '@midwayjs/cli-plugin-dev', command: 'dev' },
  { mod: '@midwayjs/cli-plugin-test', command: 'test' },
  { mod: '@midwayjs/cli-plugin-test', command: 'cov' },
  { mod: '@midwayjs/cli-plugin-clean', command: 'clean' },
  { mod: '@midwayjs/cli-plugin-faas', name: 'FaaSPlugin' },
  { mod: '@midwayjs/cli-plugin-add', name: 'AddPlugin' }
]
// (faas:src/index.ts:42)
 [
  { mod: '@midwayjs/fcli-plugin-package', name: 'PackagePlugin' },
  { mod: '@midwayjs/fcli-plugin-deploy', name: 'DeployPlugin' }
] 
```

#### 函数计算信息

没有配置 layer 信息权限

#### 复现步骤

- `npm i` 安装项目依赖
- `npm run init:config` 初始化本地阿里云配置
- `npm run dev` 本地开发，swagger 正常访问
- `npm run build` 构建项目开发包
- `npm run deploy` 发布到线上
- 访问 [函数计算控制台](https://fc.console.aliyun.com/fc/service/)
- 选择 `midway-egg` 服务
- 选择 `app_index` 函数
- 选择代码执行，通过默认的地址, 调试 HTTP 触发器。
- 页面提示 502 代码错误

## 期望结果

![image](https://user-images.githubusercontent.com/18508817/110926903-eca06b00-835f-11eb-8edc-ae2762075fbc.png)

四个接口能被正常读取，同时正常可访问。

---

## 相关文件说明

#### swagger.json

```json
{
  "openapi": "3.0.0",
  "info": {
    "description": "swagger-ui for demo api",
    "version": "1.0.0",
    "title": "demo-swagger",
    "contact": {
      "name": "API extension Support",
      "url": "http://test@test.com",
      "email": "test@test.com"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  "tags": [
    {
      "name": "test",
      "description": "test"
    }
  ],
  "paths": {
    "/test/ok": {
      "get": {
        "tags": [
          "test"
        ],
        "summary": "Test success msg",
        "description": "测试接口成功消息",
        "parameters": [],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },
    "/test/error": {
      "get": {
        "tags": [
          "test"
        ],
        "summary": "Test error msg",
        "description": "测试接口错误消息",
        "parameters": [],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },
    "/test/init": {
      "get": {
        "tags": [
          "test"
        ],
        "summary": "init database data",
        "description": "初始化数据",
        "parameters": [],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },
    "/test/all": {
      "get": {
        "tags": [
          "test"
        ],
        "summary": "Test database data",
        "description": "测试数据库数据",
        "parameters": [],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    }
  },
  "components": {
    "schemas": {}
  }
}
```

#### f.yml

基于项目原本配置的发布信息，自动构建的项目信息

```yml
service:
  name: midway-egg
provider:
  name: aliyun
  initTimeout: 10
deployType: egg
package:
  include:
    - dist
functions:
  app_index:
    handler: index.handler
    events:
      - http:
          path: /*
globalDependencies:
  '@midwayjs/simple-lock': '*'
layers:
  eggLayer:
    path: 'npm:@midwayjs/egg-layer'

```

#### f.origin.yml

项目原本配置的发布信息

```yml
service: midway-egg  ## 应用发布到云平台的名字，一般指应用名

provider:
  name: aliyun        ## 发布的云平台，aliyun，tencent 等

deployType: egg       ## 部署的应用类型

```

#### 发布信息概要

```sh


Resources Changes(Beta version! Only FC resources changes will be displayed):

┌────────────────┬──────────────────────────────┬────────┬───────────────────────┐
│ Resource       │ ResourceType                 │ Action │ Property              │
├────────────────┼──────────────────────────────┼────────┼───────────────────────┤
│                │                              │        │ Initializer           │
│                │                              │        ├───────────────────────┤
│                │                              │        │ Handler               │
│                │                              │        ├───────────────────────┤
│                │                              │        │ Runtime               │
│                │                              │        ├───────────────────────┤
│                │                              │        │ CodeUri               │
│ app_index      │ Aliyun::Serverless::Function │ Add    ├───────────────────────┤
│                │                              │        │ Timeout               │
│                │                              │        ├───────────────────────┤
│                │                              │        │ InitializationTimeout │
│                │                              │        ├───────────────────────┤
│                │                              │        │ MemorySize            │
│                │                              │        ├───────────────────────┤
│                │                              │        │ InstanceConcurrency   │
├────────────────┼──────────────────────────────┼────────┼───────────────────────┤
│                │                              │        │ AuthType              │
│ http-app_index │ HTTP                         │ Add    ├───────────────────────┤
│                │                              │        │ Methods               │
└────────────────┴──────────────────────────────┴────────┴───────────────────────┘

Waiting for service midway-egg to be deployed...
        Waiting for function app_index to be deployed...
                Waiting for HTTP trigger http-app_index to be deployed...
                triggerName: http-app_index
                methods: [ 'GET', 'PUT', 'POST', 'DELETE', 'HEAD' ]
                url: https://xxxx.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/midway-egg/app_index/
                Http Trigger will forcefully add a 'Content-Disposition: attachment' field to the response header, which cannot be overwritten 
                and will cause the response to be downloaded as an attachment in the browser. This issue can be avoided by using CustomDomain.

                trigger http-app_index deploy success
        function app_index deploy success
service midway-egg deploy success

Detect 'DomainName:Auto' of custom domain 'midway_auto_domain'
Request a new temporary domain ...
could not found service: [object Object]
```

> 一直不知道怎么打印 最后这句 service 报错 could not found service: [object Object]

#### index.js

通过日志控制台信息说明 `runtime` 未被正常赋值，所以是 `layers` 未被成功赋值，但是这个文件是通过 `f.yml` 配置 和 `midway-bin package` 自动构建生成的，是底层能力出错了么？

```javascript
const { asyncWrapper, start } = require('@midwayjs/serverless-fc-starter');
const SimpleLock  = require('@midwayjs/simple-lock').default;
const lock = new SimpleLock();
const layers = [];

try {
  const layer_npm_eggLayer = require('@midwayjs/egg-layer');
  layers.push(layer_npm_eggLayer);
} catch(e) { }


let runtime;
let inited = false;

const initializeMethod = async (initializeContext = {}) => {
  return lock.sureOnce(async () => {
    runtime = await start({
      layers: layers,
      isAppMode: true,
      initContext: initializeContext,
    });
  }, 'APP_START_LOCK_KEY');
};

exports.initializer = asyncWrapper(async (...args) => {
  if (!inited) {
    inited = true;
    await initializeMethod();
  }
});


  exports.handler = asyncWrapper(async (...args) => {
    if (!inited) {
      await initializeMethod();
    }

    return runtime.asyncEvent()(...args);
  });


```

#### 函数计算控制台

> 基础效果

![image](https://user-images.githubusercontent.com/18508817/110929325-d1832a80-8362-11eb-8eb2-85db2cfa6218.png)

> app_index 测试效果

![image](https://user-images.githubusercontent.com/18508817/110929735-3dfe2980-8363-11eb-8c0e-f094e91b59e2.png)


#### 异常 body 信息

body Tab 提示

```json
{
   "errorMessage": "Function timed out after 3 seconds (maxMemoryUsage: 112.24MB)"
}

```

#### 异常 Abstract 信息

Abstract Tab 提示

```text
RequestID xxxxxxxxx
代码校验 xxxx
函数执行时间 3000.00 ms
函数收费时间 3000 ms
函数设置内存 512 MB
实际使用内存 112.24 MB
函数执行状态函数执行失败(UnhandledInvocationError)

```

#### 异常日志信息

Logs Tab 提示

```text
load code for handler:index.handler
[31m2021-03-10 14:01:48,401 ERROR 9 nodejs.TypeError: Cannot read property 'asyncEvent' of undefined[39m
[31m    at exports.handler.asyncWrapper (/code/index.js:38:20)[39m
[31m    at args (/code/node_modules/_@midwayjs_runtime-engine@2.8.2@@midwayjs/runtime-engine/dist/util.js:31:28)[39m
[31m[39m
[31mpid: 9[39m
[31mhostname: f27fc3158efa[39m
[31m[39m
[31m2021-03-10 14:01:48,401 ERROR 9 nodejs.TypeError: Cannot read property 'asyncEvent' of undefined[39m
[31m    at exports.handler.asyncWrapper (/code/index.js:38:20)[39m
[31m    at args (/code/node_modules/_@midwayjs_runtime-engine@2.8.2@@midwayjs/runtime-engine/dist/util.js:31:28)[39m
[31m[39m
[31mpid: 9[39m
[31mhostname: f27fc3158efa[39m
[31m[39m

```

---
