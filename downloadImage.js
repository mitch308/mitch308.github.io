const fs = require('fs')
const https = require('https')
const http = require('http')
const path = require('path')
const { argv } = require('process')

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
  content = content.replace(/https?\:\/\/.*\.(png|jpg|jpeg|gif)/g, (url) => {
    downloadUrl(url, fileObj.dir, fileObj.name)
    return url.match(/(?<=\/)[^/]+$/)[0]
  })
  fs.writeFileSync(filePath, content, 'utf-8')
})

