var express = require('express');
var router = express.Router();
const project_root = require("../project_root").project_root;

const folders = [
  "comm",
  "css",
  "control",
  "draw",
  "sttags3",
  "init",
  "layout",
  "verify",
  "types",
]

for (const folder of folders) {
  router.get(`/${folder}/:filename`, function(req, res) {
    res.sendFile(`${project_root}/public/${folder}/${req.params.filename}`)
  })
}

router.post("/hmi_login", function(req, res) {
  console.log(req.body)
  res.send("OK")
})

router.get('/demo_id=:id', function(req, res) {
  res.sendFile(project_root + '/public/main.html');
})
router.get('/:filename', function(req, res) {
  res.sendFile(project_root + "/public/" + req.params.filename)
})
router.get('/', function(req, res){
   res.sendFile(project_root + '/public/main.html');
});

module.exports = router;