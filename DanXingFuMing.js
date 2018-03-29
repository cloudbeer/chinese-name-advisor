var Constants = require("./Constants");


var ZiLoader = require("./ZiLoader");

//单姓复名
var DanXingFuMing = {
    getJiGroup: function (tian, isBoy) {
        var jis = Constants.BoyJis;
        if (!isBoy) {
            jis = Constants.GirlJis;
        }

        var groups = {};
        jis.forEach(function (value) {
            var x = value - tian;
            if (x > 0) {
                groups[x] = [];
                jis.forEach(function (xvalue) {
                    var y = xvalue - x;
                    if (y > 0 && y < 31) {
                        if (jis.indexOf(tian + x + y) > -1 && jis.indexOf(y + 1) > -1)
                            groups[x].push(y);
                    }
                });
            }
        });

        //去掉没有值的数组
        for (var key in groups) {
            if (groups[key].length == 0 || key > 30) {
                delete groups[key];
            }
        }
        //console.log(groups);
        return groups;
    },
    //姓的笔画，第二个字补啥，第三个字补啥,是否男孩 (后面两个字补的顺序无所谓)
    getZiGroup: function (tian, bu2, bu3, isBoy) {
        console.log(tian, bu2, bu3, isBoy);
        var groups = DanXingFuMing.getJiGroup(tian, isBoy);

        var zi2Array = ZiLoader[bu2];
        var zi3Array = ZiLoader[bu3];

        var result = [];

        for (var zi2No in groups) {
            var label = bu2 + " " + zi2No;

            var zi2 = zi2Array.filter(function (el) {
                return el.no == zi2No;
            });
            if (zi2.length > 0) {
                var zi3NoArray = groups[zi2No];
                for (var i3No in zi3NoArray) {
                    var z3No = zi3NoArray[i3No];
                    var label2 = " -- " + bu3 + " " + z3No;

                    var zi3 = zi3Array.filter(function (el) {
                        return el.no == z3No;
                    });


                    result.push({
                        label: label + label2, zi2: zi2.map(function (el) {
                            return el.zi;
                        }), zi3: zi3.map(function (el) {
                            return el.zi;
                        })
                    });
                }
            }
        }
        return result;
    }

};


module.exports = DanXingFuMing;


//姓氏的笔画，我姓谢(謝)，所以是 17 画
//var groups = DanXingFuMing.getJiGroup(17, false);


//console.dir(groups);