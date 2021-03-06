// Import the module
var readdirp = require('readdirp');
var fs = require('fs');

var entries = [];
// Glob file filter

var root = "./components";

readdirp({
        root: root,
        fileFilter: ['component.js', '*.html']
    })
    .on('data', function (entry) {
        // do something with each JavaScript file entry
        entries.push(entry.path);
    }).on('end', function () {

        var file = {};
        var copies = [];
        entries.forEach(function (item) {
            var parent = item.split("/")[0];
            file[parent + "/component"] = root + "/" + item;

            //html
            if (item.endsWith(".html")) {
                copies.push({
                    from: root + "/" + item,
                    to: parent,
                    transform: true
                });

                copies.push({
                    from: "./scripts/boiler_plates/js.txt",
                    to: parent
                });

                //htl sly
                var htl = {
                    from: root + "/" + parent + "/sly",
                    to: parent + "/sly"
                };

                copies.push(htl);
            }
        })

        file = "//auto generated from createEntry.js \n//" + new Date().toString() + "\n\n module.exports = " + JSON.stringify({
            entry: file,
            copies: copies
        });

        fs.writeFile("./scripts/entry.config.js", file, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("entry.config.js was created!");
        });


    });