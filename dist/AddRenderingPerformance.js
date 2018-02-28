"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _puppeteer = require("puppeteer");

var _puppeteer2 = _interopRequireDefault(_puppeteer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddRenderingPerformance = function () {
    function AddRenderingPerformance(url) {
        _classCallCheck(this, AddRenderingPerformance);

        this.getAddRenderingMetrics(url);
    }

    _createClass(AddRenderingPerformance, [{
        key: "getAddRenderingMetrics",
        value: function getAddRenderingMetrics(url) {

            return _puppeteer2.default.launch().then(async function (browser) {

                var page = await browser.newPage();
                await page.goto(url, { waitUntil: "load" });

                var advertisements = await page.$$eval("div[data-mod='ad']", function (divs) {
                    return divs.map(function (div) {

                        return {
                            id: div.getAttribute("id"),
                            destination: div.getAttribute("data-dest"),
                            rendertime: Number(div.getAttribute("data-rendertime")),
                            generatetime: Number(div.getAttribute("data-generatetime"))
                        };
                    });
                });

                console.log(advertisements);

                await browser.close();
            });
        }
    }]);

    return AddRenderingPerformance;
}();

exports.default = AddRenderingPerformance;