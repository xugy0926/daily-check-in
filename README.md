# daily-check-in

 一个打卡小程序, 基于 leancloud 数据存储。所以不需要建立额外的 webapp 和数据库。

# 开始

1. 注册小程序

去小程序官网注册。

2. 注册 leancloud 

 https://leancloud.cn

3. 在 leancloud 创建一个应用

开发版本即可（免费）。

4. 下载 daily-check-in 项目

```
git clone https://github.com/xugy0926/daily-check-in.git
```

5. 将 leancloud 的 id 填入 daily-check-in 项目

修改 app.js 中的 appId 和 appKey，这两个 id 就是你在 leancloud 上创建的项目的 id。

```
AV.init({
  appId: 'xxxxxxxxxx',
  appKey: 'xxxxxxxxxx',
});
```

6. 将 小程序的 id 填入到 leancloud 新项目中。

先在 leancloud 中进入到你创建的项目中，选择 **组件** -> **社交**, 在 微信小程序菜单那填入你的小程序的 ID 和 Secret Key。

7. 用微信开发者工具导入项目
8. 运行项目

# 开发资源

1. [leancloud](https://leancloud.cn)
2. [WeUI](https://github.com/weui/weui-wxss)
3. [iconfont](http://www.iconfont.cn/)
