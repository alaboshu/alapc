## 阿拉博数-企业全渠道数据中台

阿拉博数是一款针对企业的数据中台管理系统，可采用云端部SAAS模式和私有化方式部署，拥有大型云服务集群，可轻松应对大流量、高并发的复杂数字化云计算场景，多平台人、财、物数字化统一管理，帮助企业轻松实现数字化转型。

# 开源、免费
- 后台应用程序 https://github.com/zhongku/alabo
- 移动端：多网合一前端 https://github.com/zhongku/alaweb
- PC管理后台与PC前端 https://github.com/alaboshu/alapc
## 配置 src/service/config.js

```
const apiBaseUrl = 'http://localhost:1800'  // api服务地址
const isTenant = true   // 是否为租户模式
```

### 功能与特性

- 支持多租户,对 saas、paas 框架开发者具有参考价值，也可以独立私有部署
- 路由零代码：目前项目接近 500 个页面，除了几个通配符和测试路由外，几乎没有代码，新增页面、删除页面、修改页面不需要修改路由
- 一套代码支持:PC 前端、多个后台（管理员后台、供应商后台、省代理后台、市代理后台、区代理后台、合伙人后台）可根据自己的需求按需增加相关的后台
- 多模板支持：无论是前端，还是后台都可以支持多个模板

﻿



### 核心功能
- [x] **大数据支持**：SqlService 2016 和MongoDB两种数据库结合。高达10亿数据的客户已有多个
- [x] **高性能支持**：队列方式执行，在复杂的业务结构处理中，不都塞
- [x] **灵活**：公/私有云部署，支持多组织管理
- [x]  **高效**：高效支撑企业百万级订单处理需求
- [x]  稳：历经多年大促考验，系统不宕机
- [x] **安全**：使用多重加密机制
- [x] **全面的用户类型支持**：支持会员、供应商、市代理、区域代理、内部合伙人、股东等多用类型
- [x] **更多的分润维度**：支持二级分销、奖金池、城市代理分润等数十种分润维度
- [x] **B2C商城/B2B商城/BBC商城/微商城/快速建站** :满足用户的零售、批发、分销等业务需求，是适用于传统客户、淘品牌客户的独立商城展示与交易的网站系统


### 数字化人(Alabo.Data.People)
- ** BranchCompany 分公司 **：
-  **Circles商圈**：类似美团商圈管理，在某些行业的地推业务拓展中，使用商圈效果更快.包括商圈加盟、商圈管理、商圈等级等功能
-  **Cities市代理**：以城市为单位,可面向全国几百城市招商加盟。包含城市代理商分润、城市代理商分红、城市代理商管理等功能，还可以对城市按一线城市、二线城市、三线城市、四线城市进行分类
-  **Counties区县代理商**：可面向全国几千个区县招商加盟。包含区县代理商分润、区县代理商分红、区县代理商管理等功能
-  **Employes员工**：员工管理、岗位、权限功能等。配合分润系统、绩效系统可完成员工导购、员工绩效、员工考核等多维度激励功能
-   **Internals内部合伙人**：企业内部合伙人,在拓展市场
-   **Merchants线下门店**：线下门店、以及线下门店连锁体系


### 云市场
- ** 目标  **：目标和目标迭代，根据贡献值参与公司利润分配
-  **Circles商圈**：类似美团商圈管理，在某些行业的地推业务拓展中，使用商圈效果更快.包括商圈加盟、商圈管理、商圈等级等功能
-  **Cities市代理**：以城市为单位,可面向全国几百城市招商加盟。包含城市代理商分润、城市代理商分红、城市代理商管理等功能，还可以对城市按一线城市、二线城市、三线城市、四线城市进行分类
-  **Counties区县代理商**：可面向全国几千个区县招商加盟。包含区县代理商分润、区县代理商分红、区县代理商管理等功能
-  **Employes员工**：员工管理、岗位、权限功能等。配合分润系统、绩效系统可完成员工导购、员工绩效、员工考核等多维度激励功能
-   **Internals内部合伙人**：企业内部合伙人,在拓展市场
-   **Merchants线下门店**：线下门店、以及线下门店连锁体系


## 功能版本对比

| 版本       |     价格     | 说明                                                                                                                 |
| :--------- | :----------: | :------------------------------------------------------------------------------------------------------------------- |
| 开源免费版 | 永久开源免费 | 永久开源免费                                                                                                         |
| 授权版     |    1888元    | 后台菜单、页面可全部自定义<br/>终身商业授权，支持一个授权地址<br/>可设置版权信息，可商用，受法律保护<br/>优先解决BUG |
| 专业版     |     8888     | 拥有授权版所有权益<br/>所有统计功能可使用                                                                            |



## 后台部分预览图
![图片](https://coding-net-production-file-ci.codehub.cn/19cff000-ea28-11e9-a571-e756f4542f5b.png?sign=PN2zxwimhqkQk4sfRqaYK254BsZhPTEyNTcyNDI1OTkmaz1BS0lEYXk4M2xGbWFTNlk0TFRkek1WTzFTZFpPeUpTTk9ZcHImZT0xNTcwNzk1Mzk5JnQ9MTU3MDU3OTM5OSZyPTE5ODE3NDk0JmY9LzE5Y2ZmMDAwLWVhMjgtMTFlOS1hNTcxLWU3NTZmNDU0MmY1Yi5wbmcmYj1jb2RpbmctbmV0LXByb2R1Y3Rpb24tZmlsZQ==)
![图片](https://coding-net-production-file-ci.codehub.cn/01ba78a0-ea28-11e9-a571-e756f4542f5b.png?sign=SmeJzEZrtSt4lPDN+4TAKPdyu9lhPTEyNTcyNDI1OTkmaz1BS0lEYXk4M2xGbWFTNlk0TFRkek1WTzFTZFpPeUpTTk9ZcHImZT0xNTcwNzk1MzYwJnQ9MTU3MDU3OTM2MCZyPTczNTM0MjgyJmY9LzAxYmE3OGEwLWVhMjgtMTFlOS1hNTcxLWU3NTZmNDU0MmY1Yi5wbmcmYj1jb2RpbmctbmV0LXByb2R1Y3Rpb24tZmlsZQ==)
![图片](https://coding-net-production-file-ci.codehub.cn/ce4ec150-ea28-11e9-a571-e756f4542f5b.png?sign=qYArgLBoM4ojC7dQ3osDRevuH9ZhPTEyNTcyNDI1OTkmaz1BS0lEYXk4M2xGbWFTNlk0TFRkek1WTzFTZFpPeUpTTk9ZcHImZT0xNTcwNzk1NzAxJnQ9MTU3MDU3OTcwMSZyPTk2MjczNDg3JmY9L2NlNGVjMTUwLWVhMjgtMTFlOS1hNTcxLWU3NTZmNDU0MmY1Yi5wbmcmYj1jb2RpbmctbmV0LXByb2R1Y3Rpb24tZmlsZQ==)