---
title: 通过JS判断浏览器类型
date: 2021-08-26 16:18:52
categories:
 - 前端
tags:
 - js
---

```js
// 火狐浏览器：
// Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0

// 谷歌浏览器
// Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36

// 360极速浏览器：
// Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36

// 360安全浏览器：
// Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36

// Edge浏览器：
// Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18363

// Opera浏览器：
// Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36 OPR/68.0.3618.63

// QQ浏览器：
// Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3756.400 QQBrowser/10.5.4039.400

// safari浏览器
// Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2

// UC浏览器：
// Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 UBrowser/6.2.4098.3 Safari/537.36

// IE11：
// Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; rv:11.0) like Gecko

// IE10：
// Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E)

// IE9：
// Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E)

// IE8：
// Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E)

// IE7及其以下：
// Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E)

function myBrowser() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  console.log(userAgent)
  var isOpera = userAgent.indexOf("Opera") > -1 
              || userAgent.indexOf("OPR") > -1; //判断是否Opera浏览器

  var isQQ = userAgent.indexOf("QQBrowser") > -1; //判断是否QQBrowser浏览器

  var isUC = userAgent.indexOf("UBrowser") > -1; //判断是否UC浏览器

  var isIE = userAgent.indexOf("compatible") > -1
          && userAgent.indexOf("MSIE") > -1; //判断是否IE7~IE10浏览器

  var isIE11 = userAgent.indexOf("compatible") === -1
            && userAgent.indexOf("Trident") > -1; //判断是否IE11浏览器

  var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器

  var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器

  var isSafari = userAgent.indexOf("Safari") > -1
              && userAgent.indexOf("Chrome") === -1; //判断是否Safari浏览器

  var isChrome = userAgent.indexOf("Chrome") > -1 
              && userAgent.indexOf("; Win") > -1
              && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

  var is360 = userAgent.indexOf("Chrome") > -1 
            && (userAgent.indexOf("; WOW") > -1 || userAgent.indexOf("; Intel Mac"))
            && userAgent.indexOf("Safari") > -1; //判断360浏览器


  if (isIE) {
    var reIE = /MSIE (\d+)\.\d+;/;
    // match() 返回一个数组。数组第一项是匹配到的所有文本；数组第二项是正则中小括号匹配到的文本
    var matchReg = userAgent.match(reIE)
    var fIEVersion = matchReg[1];
    if (fIEVersion == 7) {
      return "IE7及其以下";
    } else if (fIEVersion == 8) {
      return "IE8";
    } else if (fIEVersion == 9) {
      return "IE9";
    } else if (fIEVersion == 10) {
      return "IE10";
    } else {
      return "0";
    }//IE版本过低
    return "IE";
  }
  if (isUC) {
    return "UC";
  }
  if (isQQ) {
    return "QQBrowser";
  }
  if (isIE11) {
    return "IE11";
  }
  if (isOpera) {
    return "Opera";
  }
  if (isEdge) {
    return "Edge";
  }
  if (isFF) {
    return "Firefox";
  }
  if (isSafari) {
    return "Safari";
  }
  if (isChrome) {
    return "Chrome";
  }
  if (is360) {
    return "360";
  }    
}
alert(myBrowser())
```