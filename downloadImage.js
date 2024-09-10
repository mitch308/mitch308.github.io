/**
 * 下载图片
 * 使用方式： node downloadImage.js ./source/_posts/{filename}.md
 */
const fs = require('fs')
const https = require('https')
const http = require('http')
const path = require('path')
const { argv } = require('process')

/**
 * 下载图片到本地
 */
function downloadUrl (url, dir, floder) {
  const protal = url.includes('https') ? https : http
  // Download the file
  protal.get(url, (res) => {
    // Open file in local filesystem
    const file = fs.createWriteStream(path.join(dir, floder, url.match(/(?<=\/)[^/]+$/)[0]))
    // Write data into local file
    res.pipe(file)
    // Close the file
    file.on('finish', () => {
        file.close();
    });
  }).on("error", (err) => {
    console.log("Error: ", err.message)
  });
}
const [, , ...files] = argv
files.forEach(filePath => {
  const fileObj = path.parse(filePath)
  let content = fs.readFileSync(filePath, 'utf-8')

  // 下载markdown语法中的图片
  content = content.replace(/\!\[([^\[\]]*?)\]\((https?\:\/\/.*\.(png|jpg|jpeg|gif))\)/g, (source, title, url) => {
    downloadUrl(url, fileObj.dir, fileObj.name)
    const img = url.match(/(?<=\/)[^/]+$/)[0]
    return `{% asset_img ${img} ${title} %}`
  })

  // 下载img标签中的图片
  content = content.replace(/(?<=src['"]?)https?\:\/\/.*\.(png|jpg|jpeg|gif)(?=['"])/g, (url) => {
    downloadUrl(url, fileObj.dir, fileObj.name)
    const img = url.match(/(?<=\/)[^/]+$/)[0]
    return img
  })
  fs.writeFileSync(filePath, content, 'utf-8')
})

