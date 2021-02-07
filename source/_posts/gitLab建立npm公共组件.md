---
title: gitLab建立npm公共组件
date: 2021-02-07 14:53:07
tags:
---

# 使用gitLab建立npm公共组件
步骤如下：

1. 在gitLab上建立一个项目，用于存放组件代码
{% asset_img 1061609983902_.pic.jpg 建立gitLab项目 %}

2. 项目代码
`npm init` 初始化一个 `package.json`
```json
{
  "name": "@wjs-npm/fixedHeaderTable", // 组件名称
  "version": "1.0.0", // 组件版本（版本管理后续补充）
  "private": true, // 防止代码被公开发布
  "description": "HelloWorld",
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "https://git.wjs-dev.com/wjs-npm/fixedHeaderTable.git"
  },
  "author": "bayunjiang",
  "license": "ISC"
}
```
新建一个 `index.js` 文件，在其中写一个示例函数，内容参考如下。
```js
const HelloWorld = () => {
  console.log('Hello World')
}

export { HelloWorld }
```
也可以写成vue插件，以自己写的一个插件为例。
```js
import ElTable from './ElTable'

export default {
  install (Vue, options) {
    if (options) {
      ElTable.data = function () {
        return Object.assign({
          topOffset: 60,
          rightOffset: 12,
          tableWidth: 0,
          headerFixed: false
        }, options)
      }
    }
    Vue.component(ElTable.name, ElTable)
  }
}
```

3. 安装依赖
使用npm安装依赖
```
npm install -S git+https://git.wjs-dev.com/wjs-npm/fixedHeaderTable.git
```
默认安装的是 `master` 分支的代码 
安装完成之后我们可以在 `package.json` 文件中看到如下内容。
```json
"dependencies": {
   "@wjs-npm/fixedHeaderTable": "git+https://git.wjs-dev.com/wjs-npm/fixedHeaderTable.git"
}
```

4. 插件使用
和其它npm包的使用一样
```js
import Vue from 'Vue'
import fixedHeaderTable from '@wjs-npm/fixedHeaderTable'

Vue.use(fixedHeaderTable)
```

5. 存在的问题
和其它npm包一样，依赖安装后，不会自动随着依赖版本的迭代去更新 
如果想要更新，需要删除依赖重新安装