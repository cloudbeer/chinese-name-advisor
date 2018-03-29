var fs = require("fs");

var ZiLoader = {
    金: null,
    木: null,
    水: null,
    火: null,
    土: null,
    load: function () {
        ZiLoader.load1("金", function (data) {
            ZiLoader.金 = data;
        });
        ZiLoader.load1("木", function (data) {
            ZiLoader.木 = data;
        });
        ZiLoader.load1("水", function (data) {
            ZiLoader.水 = data;
        });
        ZiLoader.load1("火", function (data) {
            ZiLoader.火 = data;
        });
        ZiLoader.load1("土", function (data) {
            ZiLoader.土 = data;
        });
    },
    load1: function (wuxing, callback) {

        var wuxingArray = [];
        fs.readFile("./res/zi/" + wuxing + ".txt", "utf8", function (err, data) {
            if (err) throw err;
            var tmpV = data.split(' ');
            for (var i = 0; i < tmpV.length; i = i + 2) {
                if (i % 2 == 0) {
                    wuxingArray.push({zi: tmpV[i], no: tmpV[i + 1]});
                }
            }
            console.log(wuxing + " 字加载完毕...")
            callback(wuxingArray);
        });
    }

};

module.exports = ZiLoader;

ZiLoader.load();


