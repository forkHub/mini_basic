"use strict";
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Test {
            async load(file) {
                let hsl = await ha.comp.Util.Ajax2('get', file, '');
                console.group("file");
                console.log(hsl);
                console.groupEnd();
                console.log(ha.parse.parse.parse(hsl));
            }
        }
        parse.test = new Test();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
window.onload = () => {
    // ha.parse.test.load('./data/test2.txt');
    ha.parse.test.load('./data/test.txt');
};
