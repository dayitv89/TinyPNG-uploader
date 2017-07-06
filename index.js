var fs = require('fs');
var tinify = require('tinify');
var path = require('path');

if (process.argv.length <= 2) {
	console.log('Usage: please insert tinipng key as first argument');
	process.exit(-1);
}

if (process.argv.length <= 3) {
	console.log('Usage: ' + __filename + ' path/to/directory');
	process.exit(-1);
}

tinify.key = process.argv[2];
var path = process.argv[3];
tinifyImage(path);

function tinifyImage(file_path) {
	fs.readdir(file_path, function(err, items) {
		for (var i = 0; i < items.length; i++) {
			var fileuri = file_path + '/' + items[i];
			try {
				console.log(fileuri);
				if (!fs.statSync(fileuri).isFile()) {
					console.log(fileuri);
					tinifyImage(fileuri);
				} else if (getFileExtensions(items[i], ['png', 'PNG'])) {
					tinify.fromFile(fileuri).toFile(fileuri);
				}
			} catch (e) {
				console.log(e);
			}
		}
	});
}

function getFileExtensions(filename, extensions) {
	var ext = /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
	return ext ? extensions.indexOf(ext) > -1 : false;
}
