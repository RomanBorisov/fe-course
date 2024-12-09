(() => {
    "use strict";
    var o = {
        170: (o, e) => {
            Object.defineProperty(e, "__esModule", {value: !0}), e.module2 = function () {
                console.log("module2")
            }
        }
    }, e = {};

    function r(l) {
        var t = e[l];
        if (void 0 !== t) return t.exports;
        var n = e[l] = {exports: {}};
        return o[l](n, n.exports, r), n.exports
    }

    (() => {
        var o = r(170);
        throw console.log("Hello World!"), (0, o.module2)(), console.log("module1"), new Error
    })()
})();
