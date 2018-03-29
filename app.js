var serve = require('koa-static');
var koa   = require('koa');
var app   = module.exports = koa();
var _ = require('koa-route');

app.use(serve('./html'));


console.log("Begin...");

var ZiLoader      = require("./ZiLoader");
var DanXingFuMing = require("./DanXingFuMing");

ZiLoader.load();


app.use(_.get('/advice', function*() {

  var f = this.query;

  console.log(f);
  //console.log( DanXingFuMing.getZiGroup(17, "木", "水", f.gender==="男"));

  this.body = DanXingFuMing.getZiGroup(parseInt(f.fNameNumber), f.bu2, f.bu3, f.gender === "男");

}));


app.listen(8000);
console.log("http://localhost:8000");