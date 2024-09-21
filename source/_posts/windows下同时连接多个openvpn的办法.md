---
title: windows下同时连接多个openvpn的办法
date: 2024-09-21 13:55:28
categories:
 - 杂类
tags:
 - openvpn
---

# windows下同时连接多个openvpn的办法

- WIN+R 打开运行， 输入 C:\Program Files\TAP-Windows\bin 回车
- 右键，以管理员身份运行 addtap.bat 创建虚拟网络适配器，需要几个就运行几次
- 同时连接多个openvpn配置