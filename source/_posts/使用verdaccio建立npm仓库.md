---
title: 使用verdaccio建立npm仓库
date: 2024-09-10 11:08:59
categories:
 - npm
tags:
 - npm
---

中文官网：https://verdaccio.org/zh-CN/

# 使用verdaccio建立npm仓库
步骤如下：

## 安装
nodejs版本14及以上
```bash
npm install --location=global verdaccio
```

## 配置修改
```yaml
# https://verdaccio.org/docs/configuration#uplinks
# a list of other known repositories we can talk to
uplinks:
  npmjs:
    # 修改npm代理地址为淘宝源
    url: https://registry.npmmirror.com

# Learn how to protect your packages
# https://verdaccio.org/docs/protect-your-dependencies/
# https://verdaccio.org/docs/configuration#packages
packages:
  "@*/*":
    # scoped packages
    # 访问权限 $all 对所有人开放
    access: $all
    
    # 发布权限，只对登录用户开放
    publish: $authenticated
    # 取消发布，只有admin用户可以操作
    unpublish: admin
    # if package is not available locally, proxy requests to 'npmjs' registry
    # 关闭代理，代理的包会缓存到设备上，占用大量空间
    # proxy: npmjs

auth:
  htpasswd:
    file: ./htpasswd
    # Maximum amount of users allowed to register, defaults to "+inf".
    # 设为-1，关闭注册功能
    # max_users: 1000
    # Hash algorithm, possible options are: "bcrypt", "md5", "sha1", "crypt".
    algorithm: bcrypt # by default is crypt, but is recommended use bcrypt for new installations
    # Rounds number for "bcrypt", will be ignored for other algorithms.
    rounds: 10

listen:
  - 0.0.0.0:4873 # listen on all addresses (INADDR_ANY)
```

## 配置nginx反向代理
```nginx
server {
    listen 80;
    # 域名
    server_name npm.etsme.com;
    charset utf-8;

    location / {
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $host;
      proxy_set_header X-NginX-Proxy true;
      # npm仓库地址
      proxy_pass http://127.0.0.1:4873/;
      proxy_redirect off;
    }
}
```

## 创建系统服务
```bash
# 从verdaccio拷贝服务配置文件
sudo cp /usr/lib/node_modules/verdaccio/systemd/verdaccio.service /lib/systemd/system/
# 重载系统服务配置
sudo systemctl daemon-reload
# 启动verdaccio服务
sudo systemctl start verdaccio
# 设置verdaccio服务开机自启
sudo systemctl enable verdaccio
```
修改verdaccio.service文件
```bash
[Unit]
Description=Verdaccio lightweight npm proxy registry

[Service]
Type=simple
Restart=on-failure
# 指定用户
User=etsme
# 添加环境变量
Environment=PATH=/usr/bin:/usr/local/bin:/home/etsme/.nvm/versions/node/v20.17.0/bin
# 修改启动指令
ExecStart=/home/etsme/.nvm/versions/node/v20.17.0/bin/verdaccio -c /home/etsme/verdaccio/config.yaml

[Install]
WantedBy=multi-user.target
```
   

```bash

```

## 开始使用
```bash
# 添加npm仓库地址
npm config set @etsme:registry=http://npm.etsme.com/

# 注册用户
npm adduser --registry http://npm.etsme.com

# 发布包
npm publish --registry http://npm.etsme.com

# 发布测试版本
npm publish --registry http://npm.etsme.com --tag beta

# 取消发布
npm unpublish --force --registry http://npm.etsme.com

#取消发布测试版本，会删除所有beta版本
npm unpublish --force --registry http://npm.etsme.com --tag beta

# 查看包
npm view @etsme/*
```
