---
title: 构建electron开发调试环境
date: 2024-09-13 15:05:52
categories: electron
tags: electron
---

# Windows下构建electron开发调试环境

## 环境依赖
- Windows 10 / Server 2012 R2 或更高版本
- [Visual Studio 2022 (>=17.0.0)](https://www.visualstudio.com/vs/)
  - 参考[Chromium构建文档](https://chromium.googlesource.com/chromium/src/+/main/docs/windows_build_instructions.md#visual-studio)，了解需要安装的Visual Studio组件
- [Nodejs](https://nodejs.org/download/)
- [Git](https://git-scm.com/)


## 构建工具
Electrong构建工具[build-tools](https://github.com/electron/build-tools)
```bash
# 全局安装构建工具
$ npm i -g @electron/build-tools

# 初始化 Electron 本地开发环境
$ e init

# 从主分支制作 “release” 和 “testing” 构建版本。
$ e init main-releaseg -i release --root=/project
Creating '/project'
New build config 'main-releaseg' created
Now using config 'main-releaseg'

# 显示已经初始化的配置
$ e show configs
* main-release

# 显示当前配置
$ e show current
main-release

# 切换到指定配置
$ e use main-testing
Now using config 'main-testing'

# 显示项目目录
$ e show root
/project

# 同步代码
$ e sync
Running "gclient sync --with_branch_heads --with_tags" in '/project/src'
[sync output omitted]
```
