var express = require('express');
var router = express.Router();
const project_root = require("../project_root").project_root;



router.get('/css/:filename', function(req, res) {
  res.sendFile(project_root + "/public/css/" + req.params.filename)
})
router.get('/layout/:filename', function(req, res) {
  res.sendFile(project_root + "/public/layout/" + req.params.filename)
})
router.get('/:filename', function(req, res) {
  res.sendFile(project_root + "/public/" + req.params.filename)
})
router.get('/', function(req, res){
   res.sendFile(project_root + '/public/main.html');
});

module.exports = router;