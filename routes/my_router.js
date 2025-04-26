var express = require('express');
var router = express.Router();
const project_root = require("../project_root").project_root;



router.get('/css/:filename', function(req, res) {
  res.sendFile(project_root + "/public/css/" + req.params.filename)
})
router.get('/control/:filename', function(req, res) {
  res.sendFile(project_root + "/public/control/" + req.params.filename)
})
router.get('/draw/:filename', function(req, res) {
  res.sendFile(project_root + "/public/draw/" + req.params.filename)
})
router.get('/sttags3/:filename', function(req, res) {
  res.sendFile(project_root + "/public/sttags3/" + req.params.filename)
})
router.get('/init/:filename', function(req, res) {
  res.sendFile(project_root + "/public/init/" + req.params.filename)
})
router.get('/layout/:filename', function(req, res) {
  res.sendFile(project_root + "/public/layout/" + req.params.filename)
})
router.get('/verify/:filename', function(req, res) {
  res.sendFile(project_root + "/public/verify/" + req.params.filename)
})
router.get('/types/:filename', function(req, res) {
  res.sendFile(project_root + "/public/types/" + req.params.filename)
})
router.get('/:filename', function(req, res) {
  res.sendFile(project_root + "/public/" + req.params.filename)
})
router.get('/', function(req, res){
   res.sendFile(project_root + '/public/main.html');
});

module.exports = router;