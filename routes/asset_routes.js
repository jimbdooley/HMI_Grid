var express = require('express')
var router = express.Router()
const fs = require('fs')
const project_root = require("../project_root").project_root;

let drawableFilenames = null
router.get('/get_drawable_filenames', async function(req, res) {
  if (drawableFilenames != null) { 
    return res.send(drawableFilenames) 
  }
  const rtn = {}
  const dir = await fs.promises.opendir("public/drawable")
  for await (const dirent of dir) {
    if (dirent.name.length == 0 || dirent.name[0] == ".") continue
    rtn[dirent.name] = []
    const dir2 = await fs.promises.opendir(`public/drawable/${dirent.name}`)
    for await (const dirent2 of dir2) {
      if (dirent2.name.length < 5) continue
      let isImage = false
      const last4 = dirent2.name.substring(dirent2.name.length - 4, dirent2.name.length)
      const last5 = dirent2.name.substring(dirent2.name.length - 5, dirent2.name.length)
      isImage |= [".png", ".jpg"].indexOf(last4) != -1
      isImage |= [".jpeg", ".webp"].indexOf(last5) != -1
      if (isImage) {
        rtn[dirent.name].push(dirent2.name)
      }
    }
  }
  drawableFilenames = JSON.stringify(rtn)
  res.send(drawableFilenames)
})

const imagesLastModified = new Date(2688341297289) // TODO setup system for this
router.get('/drawable/:foldername/:filename', function(req, res) {
  const ifModifiedSince = req.headers['if-modified-since'];

  if (ifModifiedSince && new Date(ifModifiedSince) >= imagesLastModified) {
    res.sendStatus(304); 
  } else {
    res.sendFile(`${project_root}/public/drawable/${req.params.foldername}/${req.params.filename}`)
  }
})

let all_assets = null
router.get('/get_all_assets', async function(req, res) {
  if (all_assets != null) {
    return res.send(all_assets)
  }
  const rtn = {}
  const dir = await fs.promises.opendir("public/assets")
  for await (const dirent of dir) {
    if (dirent.name.length == 0 || dirent.name[0] == ".") continue
    const dir2 = await fs.promises.opendir(`public/assets/${dirent.name}`)
    for await (const dirent2 of dir2) {
    const filedir = `public/assets/${dirent.name}/${dirent2.name}`
    rtn[`${dirent.name}/${dirent2.name}`] = fs.readFileSync(filedir, 'utf8')
    }
  }
  all_assets = JSON.stringify(rtn) 
  res.send(all_assets)
});

module.exports = router