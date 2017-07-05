var fs = require('fs');
var tinify = require("tinify");
var path = require('path')

if (process.argv.length <= 2) {
    console.log("Usage: please insert tinipng key as first argument");
    process.exit(-1);
}

if (process.argv.length <= 3) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}

tinify.key = process.argv[2];
var path = process.argv[3];

fs.readdir(path, function(err, items) {
    for (var i=0; i<items.length; i++) {
        console.log(path + '/' +  items[i]);
        if(getFileExtensions(items[i], ['png', 'PNG'])) {
          var fileuri = path + '/' +  items[i]
          tinify.fromFile(fileuri).toFile(fileuri);
        }
    }
});

function getFileExtensions(filename, extensions) {
  var ext = (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
  return ext ? extensions.indexOf(ext) > -1 : false;
}
